import { notFound } from "next/navigation"

import { getAdminCoupon } from "@/lib/admin-coupons"

import { CouponForm } from "@/components/admin/coupons/coupon-form"

export default async function CouponEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const coupon = getAdminCoupon(id)

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

      <CouponForm
        defaultValues={{
          code: coupon.code,
          type: coupon.type,
          amount: coupon.amount,
          expiresAt: toInputDate(coupon.expiresAt),
          usageLimit: coupon.usageLimit,
          summary: coupon.summary,
        }}
      />
    </div>
  )
}

function toInputDate(value: string) {
  return new Date(value).toISOString().split("T")[0]
}
