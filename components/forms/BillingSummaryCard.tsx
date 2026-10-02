"use client"

import { BadgeCheck, BookOpen, Check, LockKeyhole, Tag } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { membershipPrice } from "@/lib/membership"

type Plan = "monthly" | "annual"

type Props = {
  plan: Plan
  planName: string
  planPrice: number
  planBilling: string
  planDescription: string
  benefits: string[]
  total: number
  appliedCoupon: { amount: number; code: string } | null
  onDiscountApplied: (code: string) => void
}

const paymentMethods = ["VISA", "Mastercard", "AMEX", "PayPal"]

export function BillingSummaryCard({
  plan,
  planName,
  planPrice,
  planBilling,
  planDescription,
  benefits,
  total,
  appliedCoupon,
  onDiscountApplied,
}: Props) {
  const [discountCode, setDiscountCode] = useState("")

  const annualSavings = membershipPrice.monthly * 12 - membershipPrice.annual

  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm">
      <CardHeader className="border-b px-5">
        <CardTitle className="text-lg">Order summary</CardTitle>
        <CardDescription>
          Review your membership before continuing.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 p-5">
        {/* Product */}
        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted/40">
            <BookOpen className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">{planName}</h3>
              {plan === "annual" && <Badge variant="success">Best value</Badge>}
            </div>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {planDescription}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-1 rounded-xl border bg-muted/20 p-4 py-3">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span className="text-xs leading-5 text-muted-foreground">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* Discount code */}
        <div className="space-y-3">
          <Label
            htmlFor="discount-code"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Tag className="size-4" />
            Discount code
          </Label>

          <div className="grid w-full grid-cols-[1fr_auto] gap-2">
            <Input
              id="discount-code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Enter code"
              className="h-10 w-full min-w-0 rounded-xl"
            />

            <Button
              disabled={!discountCode}
              type="button"
              variant="outline"
              className="h-10 rounded-xl"

              onClick={() => onDiscountApplied(discountCode)}
            >
              {appliedCoupon ? "Remove" : "Apply"}
            </Button>
          </div>

          <p className="text-xs leading-5 text-muted-foreground">
            Have a promotional code? Enter it here.
          </p>
        </div>

        <Separator />

        {/* Price breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Membership</span>
            <span className="font-medium">€{planPrice}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-muted-foreground">
              -{appliedCoupon?.amount}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Taxes</span>
            <span className="text-muted-foreground">€0</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-end justify-between gap-4">
            <span className="font-semibold">Total</span>
            <span className="text-3xl font-bold tracking-tight">€{total}</span>
          </div>
          <p className="text-right text-xs text-muted-foreground">
            {planBilling}
          </p>
        </div>

        {/* Annual savings */}
        {plan === "annual" && (
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-5 text-green-500" />
              <p className="text-sm font-semibold">
                Save €{annualSavings} per year
              </p>
            </div>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Pay €{membershipPrice.annual} for 12 months instead of €
              {membershipPrice.monthly * 12}.
            </p>
          </div>
        )}

        {/* Payment methods */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">
            PAYMENT METHODS
          </p>

          <div className="grid grid-cols-4 items-center gap-2">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className="flex h-9 items-center justify-center rounded-lg border bg-background px-3 text-xs font-bold tracking-tight"
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 border-t pt-4 text-xs text-muted-foreground">
          <LockKeyhole className="size-3.5" />
          Secure payment processing
        </div>
      </CardContent>
    </Card>
  )
}
