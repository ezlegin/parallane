"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import PaymentCombobox from "@/components/PaymentCombobox"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import UserCombobox from "@/components/UserCombobox"
import { MembershipFormValues, membershipSchema } from "@/lib/formSchema"
import { Membership, Payment, User } from "@/prisma/generated/prisma/client"
import { cn } from "cn"
import { addMonths, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { createMembership, updateMembership } from "@/actions/membership"
import { handleRes } from "@/lib/handleRes"
import { useRouter } from "next/navigation"

type MembershipFormProps = {
  membership?: Membership & { payment: Payment | null; user: User }
}

export function MembershipForm({ membership }: MembershipFormProps) {
  const router = useRouter()

  const form = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      expiresAt: membership?.expiresAt ?? addMonths(new Date(), 1),
      from: membership?.startsAt ?? new Date(),
      paymentId: membership?.payment?.id ?? "",
      period: membership?.period ?? "monthly",
      userId: membership?.userId ?? "",
    },
  })

  const onSubmit = async (data: MembershipFormValues) => {
    const res = await (membership
      ? updateMembership(membership?.id, data)
      : createMembership(data))

    handleRes(res, {
      onSuccess: () => !membership && router.push("/admin/memberships"),
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            <Field>
              <FieldLabel>User</FieldLabel>

              <UserCombobox
                initialUser={membership?.user}
                value={form.watch("userId")}
                onChange={(value) => {
                  form.setValue("userId", value)
                }}
              />

              {form.formState.errors.userId && (
                <FieldDescription className="text-destructive">
                  {form.formState.errors.userId.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel>Payment</FieldLabel>

              <PaymentCombobox
                initiaPayment={membership?.payment}
                value={form.watch("paymentId") ?? ""}
                onChange={(value) => {
                  form.setValue("paymentId", value)
                }}
              />

              <FieldDescription>
                Optional. A membership can exist without a payment.
              </FieldDescription>
            </Field>

            <div className="grid gap-6 md:grid-cols-2">
              <Controller
                name="from"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>From</FieldLabel>

                    <Popover modal={true}>
                      <PopoverTrigger
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
                name="expiresAt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Expires At</FieldLabel>

                    <Popover modal={true}>
                      <PopoverTrigger
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
            </div>

            <Controller
              name="period"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Period</FieldLabel>

                  <RadioGroup
                    value={form.watch("period")}
                    onValueChange={field.onChange}
                    className="grid gap-3 md:grid-cols-2"
                  >
                    <label
                      htmlFor="monthly"
                      className="flex cursor-pointer items-center gap-3 rounded-lg border p-4"
                    >
                      <RadioGroupItem value="monthly" id="monthly" />

                      <div>
                        <p className="text-sm font-medium">Monthly</p>
                        <p className="text-xs text-muted-foreground">
                          Membership lasts one month.
                        </p>
                      </div>
                    </label>

                    <label
                      htmlFor="annual"
                      className="flex cursor-pointer items-center gap-3 rounded-lg border p-4"
                    >
                      <RadioGroupItem value="annual" id="annual" />

                      <div>
                        <p className="text-sm font-medium">Annual</p>
                        <p className="text-xs text-muted-foreground">
                          Membership lasts one year.
                        </p>
                      </div>
                    </label>
                  </RadioGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter className="justify-end border-t pt-6">
          <Button type="submit">Save membership</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
