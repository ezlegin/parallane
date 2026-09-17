"use client"

import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { adminCoupons } from "@/lib/admin-coupons"

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

export default function CouponsPage() {
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

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead className="w-15" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {adminCoupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>
                  <span className="font-mono text-sm font-medium">
                    {coupon.code}
                  </span>
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">
                    {coupon.type === "fixed" ? "Fixed amount" : "Percentage"}
                  </Badge>
                </TableCell>

                <TableCell className="font-medium">
                  {formatDiscount(coupon)}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {coupon.expiresAt}
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
                            (coupon.usageCount / coupon.usageLimit) * 100,
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
                        onClick={() => {
                          // TODO: delete coupon
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
    </div>
  )
}

function formatDiscount(coupon: (typeof adminCoupons)[number]) {
  return coupon.type === "percentage"
    ? `${coupon.amount}%`
    : `$${coupon.amount}`
}
