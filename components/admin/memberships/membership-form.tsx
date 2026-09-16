"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

const membershipSchema = z.object({
  userId: z.string().min(1, "User is required"),
  paymentId: z.string().optional(),
  from: z.string().min(1, "Start date is required"),
  expiresAt: z.string().min(1, "Expiration date is required"),
  period: z.enum(["monthly", "annual"]),
})

export type MembershipFormValues = z.infer<typeof membershipSchema>

type UserOption = {
  id: string
  name: string
  email: string
}

type PaymentOption = {
  id: string
  userName: string
  totalPaid: number
  paidAt: string
}

type MembershipFormProps = {
  defaultValues: MembershipFormValues
  users: UserOption[]
  payments: PaymentOption[]
  onSubmit?: (values: MembershipFormValues) => void
}

export function MembershipForm({
  defaultValues,
  users,
  payments,
  onSubmit,
}: MembershipFormProps) {
  const form = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipSchema),
    defaultValues,
  })

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
              <FieldLabel>User</FieldLabel>

              <UserCombobox
                value={form.watch("userId")}
                users={users}
                onChange={(value) => {
                  form.setValue("userId", value, {
                    shouldValidate: true,
                  })
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
                value={form.watch("paymentId")}
                payments={payments}
                onChange={(value) => {
                  form.setValue("paymentId", value, {
                    shouldValidate: true,
                  })
                }}
              />

              <FieldDescription>
                Optional. A membership can exist without a payment.
              </FieldDescription>
            </Field>

            <div className="grid gap-6 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="from">From</FieldLabel>

                <Input id="from" type="date" {...form.register("from")} />

                {form.formState.errors.from && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.from.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="expiresAt">Expires at</FieldLabel>

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
            </div>

            <Field>
              <FieldLabel>Period</FieldLabel>

              <RadioGroup
                value={form.watch("period")}
                onValueChange={(value) => {
                  form.setValue(
                    "period",
                    value as MembershipFormValues["period"],
                    {
                      shouldValidate: true,
                    }
                  )
                }}
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
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="justify-end border-t pt-6">
          <Button type="submit">Save membership</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

function UserCombobox({
  value,
  users,
  onChange,
}: {
  value: string
  users: UserOption[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  const selectedUser = users.find((user) => user.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selectedUser ? (
            <span className="truncate">
              {selectedUser.name}{" "}
              <span className="text-muted-foreground">
                ({selectedUser.email})
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground">
              Search user by email...
            </span>
          )}

          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search email..." />

          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>

            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={`${user.email} ${user.name}`}
                  onSelect={() => {
                    onChange(user.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm">{user.email}</p>

                    <p className="truncate text-xs text-muted-foreground">
                      {user.name}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function PaymentCombobox({
  value,
  payments,
  onChange,
}: {
  value?: string
  payments: PaymentOption[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  const selectedPayment = payments.find((payment) => payment.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selectedPayment ? (
            <span className="truncate">
              {selectedPayment.id}{" "}
              <span className="text-muted-foreground">
                · ${selectedPayment.totalPaid}
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground">Search payment ID...</span>
          )}

          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search payment ID..." />

          <CommandList>
            <CommandEmpty>No payments found.</CommandEmpty>

            <CommandGroup>
              {payments.map((payment) => (
                <CommandItem
                  key={payment.id}
                  value={`${payment.id} ${payment.userName}`}
                  onSelect={() => {
                    onChange(payment.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === payment.id ? "opacity-100" : "opacity-0"
                    )}
                  />

                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm">{payment.id}</p>

                    <p className="truncate text-xs text-muted-foreground">
                      {payment.userName} · ${payment.totalPaid} ·{" "}
                      {payment.paidAt}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
