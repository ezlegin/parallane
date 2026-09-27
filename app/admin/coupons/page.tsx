import Link from "next/link"
import { Button } from "@/components/ui/button"
import CouponsList from "./CouponsList"
import { prisma } from "@/prisma/prisma"

export default async function CouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Coupons</h1>

          <p className="text-sm text-muted-foreground">
            Create and manage membership discount coupons.
          </p>
        </div>

        <Link href="/admin/coupons/new">
          <Button>Add coupon</Button>
        </Link>
      </div>

      <CouponsList coupons={coupons} />
    </div>
  )
}
