"use client"

import {
  CalendarDays,
  CreditCard,
  MoreHorizontal,
  Tag,
  User as UserIcon,
} from "lucide-react"
import Link from "next/link"

import { deletePayment } from "@/actions/payment"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { handleRes } from "@/lib/handleRes"
import { Payment, User } from "@/prisma/generated/prisma/client"
import { format } from "date-fns"

const PaymnetsList = ({
  payments,
}: {
  payments: (Payment & { user: User })[]
}) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {payments.map((payment) => (
        <Card key={payment.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                  <UserIcon className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {payment.user.name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {payment.user.email}
                  </p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost">
                      <MoreHorizontal />
                      <span className="sr-only">Payment actions</span>
                    </Button>
                  }
                />

                <DropdownMenuContent align="end">
                  <Link
                    href={`/admin/payments/${payment.id}`}
                    className="h-full w-full"
                  >
                    <DropdownMenuItem>Edit payment</DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={async () =>
                      handleRes(await deletePayment(payment.id))
                    }
                  >
                    Delete payment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-5">
            {/* Discount */}
            <div className="rounded-lg border bg-muted/20 p-3">
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-muted-foreground" />

                <span className="text-xs font-medium text-muted-foreground">
                  Discount
                  {payment.discountAmount > 0 && ` -€${payment.discountAmount}`}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="font-mono text-sm font-medium">
                  {payment.discountCode ?? "—"}
                </span>

                {payment.discountCode && (
                  <Badge variant="secondary">{payment.discountType}</Badge>
                )}
              </div>

              {payment.discountType && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {payment.discountType === "percentage"
                    ? "Percentage discount"
                    : "Fixed discount"}
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Total</p>

                <p className="mt-1 text-sm font-medium">
                  €{payment.totalAmount.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Total paid</p>

                <p className="mt-1 text-lg font-semibold">
                  ${payment.paidAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t pt-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" />
                {payment.paidAt ? format(payment.paidAt, "PP") : "unpaid"}
              </div>

              <Badge
                variant={
                  payment.status === "success"
                    ? "success"
                    : payment.status === "failed"
                      ? "destructive"
                      : "warning"
                }
              >
                <CreditCard />
                {payment.status}
              </Badge>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default PaymnetsList
