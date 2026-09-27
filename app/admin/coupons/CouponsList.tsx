"use client"

import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Coupon, DiscountType } from "@/prisma/generated/prisma/client"
import { format } from "date-fns"
import { deleteCoupon } from "@/actions/coupon"
import { handleRes } from "@/lib/handleRes"

const CouponsList = ({ coupons }: { coupons: Coupon[] }) => {
  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead className="w-15" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>
                <span className="font-mono text-sm font-medium">
                  {coupon.code}
                </span>
              </TableCell>

              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {coupon.discountType}
                </Badge>
              </TableCell>

              <TableCell className="font-medium">
                {formatDiscount(coupon.discountType, coupon.discountAmount)}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {coupon.expiresAt
                  ? format(coupon.expiresAt, "PP")
                  : "No Expiary"}
              </TableCell>

              <TableCell>
                <div className="min-w-25 space-y-1.5">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span>{coupon.usageCount}</span>

                    <span className="text-muted-foreground">
                      / {coupon.usageLimit}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground transition-all"
                      style={{
                        width: `${Math.min(
                          (coupon.usageCount / (coupon.usageLimit ?? 0)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <p className="max-w-70 truncate text-sm text-muted-foreground">
                  {coupon.summary}
                </p>
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    }
                  />

                  <DropdownMenuContent align="end">
                    <Link href={`/admin/coupons/${coupon.id}`}>
                      <DropdownMenuItem>Edit coupon</DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={async () => {
                        handleRes(await deleteCoupon(coupon.id))
                      }}
                    >
                      Delete coupon
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CouponsList

function formatDiscount(couponType: DiscountType, amount: number) {
  return couponType === "percentage" ? `${amount}%` : `$${amount}`
}
