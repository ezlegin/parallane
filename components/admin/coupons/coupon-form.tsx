"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const couponSchema = z.object({
  code: z
    .string()
    .min(1, "Coupon code is required")
    .max(50, "Coupon code is too long")
    .transform((value) => value.trim().toUpperCase()),

  type: z.enum(["fixed", "percentage"]),

  amount: z.number().positive("Discount must be greater than 0"),

  expiresAt: z.string().min(1, "Expiration date is required"),

  usageLimit: z
    .number()
    .int("Usage limit must be a whole number")
    .positive("Usage limit must be greater than 0"),

  summary: z
    .string()
    .min(1, "Summary is required")
    .max(200, "Summary is too long"),
})

export type CouponFormValues = z.infer<typeof couponSchema>

type CouponFormProps = {
  defaultValues: CouponFormValues
  onSubmit?: (values: CouponFormValues) => void
}

export function CouponForm({ defaultValues, onSubmit }: CouponFormProps) {
  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues,
  })

  const couponType = form.watch("type")

  return (
    <form
      onSubmit={form.handleSubmit((values) => {
        onSubmit?.(values)
      })}
    >
      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="code">Coupon code</FieldLabel>

              <Input
                id="code"
                placeholder="YOUTUBE10"
                className="font-mono uppercase"
                {...form.register("code")}
              />

              <FieldDescription>
                Users will enter this code when purchasing a membership.
              </FieldDescription>

              {form.formState.errors.code && (
                <FieldDescription className="text-destructive">
                  {form.formState.errors.code.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel>Discount type</FieldLabel>

              <RadioGroup
                value={couponType}
                onValueChange={(value) => {
                  form.setValue("type", value as CouponFormValues["type"], {
                    shouldValidate: true,
                  })
                }}
                className="grid gap-3 md:grid-cols-2"
              >
                <label
                  htmlFor="percentage"
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-4"
                >
                  <RadioGroupItem value="percentage" id="percentage" />

                  <div>
                    <p className="text-sm font-medium">Percentage</p>

                    <p className="text-xs text-muted-foreground">
                      Example: 20% off.
                    </p>
                  </div>
                </label>

                <label
                  htmlFor="fixed"
                  className="flex cursor-pointer items-center gap-3 rounded-lg border p-4"
                >
                  <RadioGroupItem value="fixed" id="fixed" />

                  <div>
                    <p className="text-sm font-medium">Fixed amount</p>

                    <p className="text-xs text-muted-foreground">
                      Example: $5 off.
                    </p>
                  </div>
                </label>
              </RadioGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="amount">
                {couponType === "percentage" ? "Percentage" : "Discount amount"}
              </FieldLabel>

              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step={couponType === "percentage" ? "1" : "0.01"}
                  placeholder={couponType === "percentage" ? "10" : "5"}
                  className={couponType === "percentage" ? "pr-8" : "pl-8"}
                  {...form.register("amount", {
                    valueAsNumber: true,
                  })}
                />

                {couponType === "percentage" ? (
                  <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground">
                    %
                  </span>
                ) : (
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                )}
              </div>

              {form.formState.errors.amount && (
                <FieldDescription className="text-destructive">
                  {form.formState.errors.amount.message}
                </FieldDescription>
              )}
            </Field>

            <div className="grid gap-6 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="expiresAt">Expiration date</FieldLabel>

                <Input
                  id="expiresAt"
                  type="date"
                  {...form.register("expiresAt")}
                />

                {form.formState.errors.expiresAt && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.expiresAt.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="usageLimit">Usage limit</FieldLabel>

                <Input
                  id="usageLimit"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="100"
                  {...form.register("usageLimit", {
                    valueAsNumber: true,
                  })}
                />

                <FieldDescription>
                  Maximum number of times this coupon can be used.
                </FieldDescription>

                {form.formState.errors.usageLimit && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.usageLimit.message}
                  </FieldDescription>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="summary">Summary</FieldLabel>

              <Input
                id="summary"
                placeholder="10% off membership for YouTube viewers."
                {...form.register("summary")}
              />

              <FieldDescription>
                A short internal description to help you identify the purpose of
                this coupon.
              </FieldDescription>

              {form.formState.errors.summary && (
                <FieldDescription className="text-destructive">
                  {form.formState.errors.summary.message}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="justify-end border-t pt-6">
          <Button type="submit">Save coupon</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
