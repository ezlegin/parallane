import { notFound } from "next/navigation"

import { CouponForm } from "@/components/admin/coupons/coupon-form"
import { prisma } from "@/prisma/prisma"

export default async function CouponEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const coupon = await prisma.coupon.findFirst({ where: { id } })

  if (!coupon) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit coupon</h1>

        <p className="text-sm text-muted-foreground">
          Update the coupon discount, expiration, and usage limit.
        </p>
      </div>

      <CouponForm coupon={coupon} />
    </div>
  )
}
