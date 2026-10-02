import { verifyPayment } from "@/actions/yekPay"
import { incrementString } from "@/lib/incrementString"
import { MembershipPeriod } from "@/prisma/generated/prisma/enums"
import { prisma } from "@/prisma/prisma"
import { addMonths } from "date-fns"
import { NextRequest, NextResponse } from "next/server"

const route = "/checkout-result"

export async function POST(req: NextRequest) {
  try {
    const { searchParams, origin } = new URL(req.url)
    const authority = searchParams.get("authority")
    const plan = searchParams.get("plan") as MembershipPeriod | null
    const success = searchParams.get("success")

    if (!authority) {
      return NextResponse.redirect(
        `${origin}${route}?status=failed&reason=missing_authority`
      )
    }

    if (success !== "100") {
      await prisma.payment.update({
        where: { authority, status: "pending" },
        data: { status: "failed" },
      })

      return NextResponse.redirect(
        `${origin}${route}?status=failed&authority=${authority}`
      )
    }

    const payment = await prisma.payment.findFirst({
      where: { authority },
      include: { user: { select: { id: true } } },
    })

    if (!payment) {
      return NextResponse.redirect(
        `${origin}${route}?status=failed&reason=not_found`
      )
    }

    if (payment.status === "success") {
      return NextResponse.redirect(
        `${origin}${route}status=success&ref=${payment.reference}`
      )
    }

    const verify = await verifyPayment(authority)

    if (!verify.success) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "failed" },
      })

      return NextResponse.redirect(
        `${origin}${route}?status=failed&authority=${authority}`
      )
    }

    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: "success",
          paidAt: new Date(),
          paidAmount: payment.totalAmount - payment.discountAmount,
        },
      })

      if (payment.discountCode) {
        const code = payment.discountCode
        const existingCoupon = await prisma.coupon.findFirst({
          where: { code },
        })

        if (!existingCoupon) return { error: "Coupon code is not valid." }

        await prisma.couponUsage.create({
          data: {
            discountAmount: payment.discountAmount,
            paymentId: payment.id,
            couponId: existingCoupon.id,
            userId: payment.userId,
          },
        })

        await prisma.coupon.update({
          where: { code: existingCoupon.code },
          data: {
            usageCount: { increment: 1 },
          },
        })
      }

      await tx.membership.updateMany({
        where: { userId: payment.user.id },
        data: {
          status: "inactive",
        },
      })

      const lastMembership = await prisma.membership.findFirst({
        orderBy: { createdAt: "desc" },
        select: { reference: true },
      })

      await tx.membership.create({
        data: {
          period: plan!,
          reference: incrementString(lastMembership?.reference),
          expiresAt: addMonths(new Date(), plan === "monthly" ? 1 : 12),
          price: payment.paidAmount,
          userId: payment.user.id,
        },
      })
    })

    return NextResponse.redirect(
      `${origin}${route}?status=success&ref=${payment.reference}`,
      303
    )
  } catch (error) {
    return NextResponse.redirect(
      `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://parallane.com"}${route}?status=failed&reason=unkown_error`,
      303
    )
  }
}
