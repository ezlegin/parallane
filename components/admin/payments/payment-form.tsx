"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const paymentSchema = z.object({
  discountCode: z.string(),
  discountAmount: z.coerce.number().min(0),
  discountType: z.enum(["fixed", "percentage"]).nullable(),
  total: z.coerce.number().min(0),
  totalPaid: z.coerce.number().min(0),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

type PaymentFormProps = {
  defaultValues: PaymentFormValues
}

export function PaymentForm({ defaultValues }: PaymentFormProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  })

  const onSubmit = (values: PaymentFormValues) => {
    // TODO: Update payment through API/database.
    console.log(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment details</CardTitle>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Discount code</FieldLabel>

              <Input
                placeholder="e.g. YOUTUBE10"
                {...form.register("discountCode")}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Discount amount</FieldLabel>

                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  {...form.register("discountAmount")}
                />
              </Field>

              <Field>
                <FieldLabel>Discount type</FieldLabel>

                <RadioGroup
                  value={form.watch("discountType") ?? undefined}
                  onValueChange={(value) =>
                    form.setValue(
                      "discountType",
                      value as "fixed" | "percentage"
                    )
                  }
                  className="flex h-10 items-center gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="fixed" />
                    <label className="text-sm">Fixed</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="percentage" />
                    <label className="text-sm">Percentage</label>
                  </div>
                </RadioGroup>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Total</FieldLabel>

                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  {...form.register("total")}
                />

                <FieldDescription>
                  Original amount before discount.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Total paid</FieldLabel>

                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  {...form.register("totalPaid")}
                />

                <FieldDescription>
                  Final amount paid by the student.
                </FieldDescription>
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save payment"}
        </Button>
      </div>
    </form>
  )
}
