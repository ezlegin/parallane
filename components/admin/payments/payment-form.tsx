"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, CreditCard, Loader2, Tag } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/toast"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import UserCombobox from "@/components/UserCombobox"
import { membershipPrice } from "@/lib/membership"
import { Membership, Payment, User } from "@/prisma/generated/prisma/client"
import { MembershipPeriod } from "@/prisma/generated/prisma/enums"
import { createPayment, updatePayment } from "@/actions/payment"
import { handleRes } from "@/lib/handleRes"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

const paymentSchema = z.object({
  userId: z.string().min(1, "User is required"),
  discountCode: z.string().optional(),
  discountType: z.enum(["fixed", "percentage"]).optional(),
  status: z.enum(["pending", "success", "failed"]),
  discountAmount: z.number().min(0),
  totalAmount: z.number().min(0),
  paidAmount: z.number().min(0),
})

export type PaymentFormValues = z.infer<typeof paymentSchema>

export function PaymentForm({
  payment,
}: {
  payment?: Payment & {
    user: Omit<User, "password">
    membership: Membership | null
  }
}) {
  const router = useRouter()
  const [period, setPeriod] = useState<MembershipPeriod | null>(null)
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false)

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      discountAmount: payment?.discountAmount ?? 0,
      discountCode: payment?.discountCode ?? "",
      discountType: payment?.discountType ?? undefined,
      paidAmount: payment?.paidAmount ?? 0,
      totalAmount: payment?.totalAmount ?? 0,
      status: payment?.status ?? "success",
      userId: payment?.userId ?? "",
    },
  })

  const totalAmount = form.watch("totalAmount")
  const discountAmount = form.watch("discountAmount") ?? 0
  const paidAmount = form.watch("paidAmount")

  const onSubmit = async (data: PaymentFormValues) => {
    const res = await (payment
      ? updatePayment(payment.id, data)
      : createPayment(data))
    handleRes(res, {
      onSuccess: () => !payment && router.push("/admin/payments"),
    })
  }

  const onApplyDiscount = async () => {
    const code = form.getValues("discountCode")?.trim()

    if (!code) {
      toast.add({
        title: "Enter a discount code.",
      })

      return
    }

    setIsApplyingDiscount(true)

    // TODO: Validate discount code through the server.
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsApplyingDiscount(false)

    toast.add({
      title: "Discount codes are not available yet.",
    })
  }

  return (
    <div className="grid grid-cols-[5fr_2fr] gap-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Membership */}
        <Card>
          <CardHeader>
            <CardTitle>Membership</CardTitle>
            <CardDescription>
              Select the membership period for this payment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={period}
              onValueChange={(value) => {
                setPeriod(value as MembershipPeriod)
                const price =
                  value === "annual"
                    ? membershipPrice.annual
                    : membershipPrice.monthly
                form.setValue("totalAmount", price)
                form.setValue("paidAmount", price)
              }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {[
                {
                  value: "monthly",
                  label: "Monthly",
                  description: "Membership lasts one month.",
                  price: membershipPrice.monthly,
                },
                {
                  value: "annual",
                  label: "Annual",
                  description: "Membership lasts one year.",
                  price: membershipPrice.annual,
                },
              ].map((item) => (
                <label
                  key={item.value}
                  htmlFor={item.value}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-4"
                >
                  <RadioGroupItem value={item.value} id={item.value} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {item.label} — €{item.price}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
        {/* Discount */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User</CardTitle>
              <CardDescription>Select user for this payment.</CardDescription>
            </CardHeader>
            <CardContent>
              <Field>
                <UserCombobox
                  onChange={(userId) => form.setValue("userId", userId)}
                  value={form.watch("userId")}
                  initialUser={payment?.user}
                />

                {form.formState.errors.userId && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.userId.message}
                  </FieldDescription>
                )}
              </Field>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Discount</CardTitle>
              <CardDescription>
                Apply a promotional or discount code to this payment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Controller
                  name="discountCode"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Discount code</FieldLabel>
                      <div className="flex gap-2">
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="e.g. YOUTUBE10"
                          autoComplete="off"
                          disabled={isApplyingDiscount}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={onApplyDiscount}
                          disabled={isApplyingDiscount}
                          size={"lg"}
                        >
                          {isApplyingDiscount ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Tag className="size-4" />
                          )}
                          Apply
                        </Button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment amounts</CardTitle>
              <CardDescription>
                Adjust the payment amounts if necessary.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup className="flex flex-row gap-2">
                <Controller
                  name="totalAmount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Total amount</FieldLabel>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        type="number"
                        min={0}
                        step="0.01"
                        readOnly
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="paidAmount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Paid amount</FieldLabel>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        type="number"
                        min={0}
                        step="0.01"
                        readOnly
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment status</CardTitle>

              <CardDescription>
                Set the current status of this payment.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Status</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>

                        <SelectItem value="success">Success</SelectItem>

                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </CardContent>
          </Card>
        </div>
        {/* Amounts */}

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="size-4" />
                Save payment
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        <div className="h-min rounded-lg border">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">Membership</span>
            <span className="text-sm font-medium capitalize">{period}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-sm font-medium">
              €{totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">Discount</span>
            <span className="text-sm font-medium">
              - €{discountAmount.toFixed(2)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">Amount due</span>
            <span className="text-sm font-medium">
              €{Math.max(totalAmount - discountAmount, 0).toFixed(2)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between bg-muted/30 px-4 py-4">
            <div className="flex items-center gap-2">
              <CreditCard className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total paid</span>
            </div>
            <span className="text-lg font-semibold">
              €{paidAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {payment?.membership && (
          <div className="h-min rounded-lg border px-4 py-3">
            <div className="mb-2">Membership</div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Membership Id</span>
              <span>{payment?.membership?.reference}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Period</span>
              <span>{payment?.membership?.period}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Starts At</span>
              <span>{format(payment?.membership.startsAt, "PPPp")}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Expires At</span>
              <span>{format(payment?.membership.expiresAt, "PPPp")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
