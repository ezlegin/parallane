"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CouponFormValues, couponSchema } from "@/lib/formSchema"
import { Coupon } from "@/prisma/generated/prisma/client"
import { cn } from "cn"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { createCoupon, updateCoupon } from "@/actions/coupon"
import { handleRes } from "@/lib/handleRes"
import { useRouter } from "next/navigation"

export function CouponForm({ coupon }: { coupon?: Coupon }) {
  const router = useRouter()
  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      amount: coupon?.discountAmount.toString() ?? "0",
      code: coupon?.code ?? "",
      expiresAt: coupon?.expiresAt ?? new Date(),
      summary: coupon?.summary ?? "",
      type: coupon?.discountType ?? "fixed",
      usageLimit: coupon?.usageLimit?.toString() ?? "0",
    },
  })

  const couponType = form.watch("type")

  const onSubmit = async (data: CouponFormValues) => {
    const res = coupon
      ? await updateCoupon(coupon.id, data)
      : await createCoupon(data)
    handleRes(res, {
      onSuccess: () => !coupon && router.push("/admin/coupons"),
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Code</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="YOUTUBE10"
                    className="font-mono"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Discount type</FieldLabel>

                  <RadioGroup
                    value={couponType}
                    onValueChange={field.onChange}
                    className="flex gap-3"
                  >
                    {["percentage", "fixed"].map((item) => (
                      <label
                        key={item}
                        htmlFor={item}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border p-2"
                      >
                        <RadioGroupItem value={item} id={item} />
                        <p className="text-sm font-medium capitalize">{item}</p>
                      </label>
                    ))}
                  </RadioGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    {couponType === "percentage"
                      ? "Percentage"
                      : "Discount amount"}
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="amount"
                      type="number"
                      min="0"
                      step={couponType === "percentage" ? "1" : "0.1"}
                      placeholder={couponType === "percentage" ? "10" : "5"}
                      className={couponType === "percentage" ? "pr-8" : "pl-8"}
                    />

                    {couponType === "percentage" ? (
                      <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                    ) : (
                      <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                        €
                      </span>
                    )}
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <Controller
                name="expiresAt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Expiration date</FieldLabel>

                    <Popover modal={true}>
                      <PopoverTrigger
                        className={"h-12"}
                        render={
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        }
                      />

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="pointer-events-auto p-3"
                        />
                      </PopoverContent>
                    </Popover>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="usageLimit"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Limit</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="0"
                      type="number"
                      min="1"
                      step="1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="summary"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Summary</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="10% off membership for YouTube viewers."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="justify-end border-t pt-6">
          <Button type="submit">Save coupon</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
