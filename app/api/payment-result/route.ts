import { verifyPayment } from "@/actions/yekPay"
import { MembershipPeriod } from "@/prisma/generated/prisma/enums"
import { prisma } from "@/prisma/prisma"
import { addMonths } from "date-fns"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl
  const authority = searchParams.get("authority")
  const plan = searchParams.get("plan") as MembershipPeriod | null
  const success = searchParams.get("success") // "0" = success from YekPay, non-zero = failure

  // 1. Missing authority — nothing we can do
  if (!authority) {
    return NextResponse.redirect(
      `${origin}/panel/checkout/result?status=failed&reason=missing_authority`
    )
  }

  // 2. Gateway explicitly reported a failure
  if (success !== "0") {
    await prisma.payment.updateMany({
      where: { authority, status: "pending" },
      data: { status: "failed" },
    })

    return NextResponse.redirect(
      `${origin}/panel/checkout/result?status=failed&authority=${authority}`
    )
  }

  // 3. Find our pending payment record
  const payment = await prisma.payment.findFirst({
    where: { authority },
    include: { user: true },
  })

  if (!payment) {
    return NextResponse.redirect(
      `${origin}/panel/checkout/result?status=failed&reason=not_found`
    )
  }

  // 4. Idempotency — if we already processed this, just redirect
  if (payment.status === "success") {
    return NextResponse.redirect(
      `${origin}/panel/checkout/result?status=success&ref=${payment.reference}`
    )
  }

  // 5. Verify with the gateway
  const verify = await verifyPayment(authority)

  if (!verify.success) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "failed" },
    })

    return NextResponse.redirect(
      `${origin}/panel/checkout/result?status=failed&authority=${authority}`
    )
  }

  // 6. Mark payment as paid + activate membership — atomic
  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "success",
        paidAt: new Date(),
        paidAmount: payment.totalAmount - payment.discountAmount,
        membership: {
          create: {
            period: plan!,
            expiresAt: addMonths(new Date(), plan === "monthly" ? 1 : 12),
            price: payment.paidAmount,
            userId: payment.user.id,
          },
        },
      },
    })
  })

  return NextResponse.redirect(
    `${origin}/checkout-result?status=success&ref=${payment.reference}`
  )
}
