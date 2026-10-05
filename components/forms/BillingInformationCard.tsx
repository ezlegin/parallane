"use client"

import { UseFormReturn } from "react-hook-form"
import { ArrowRight, CreditCard, ShieldCheck } from "lucide-react"
import Link from "next/link"

import { CountryInput } from "@/components/CountryInput"
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
import { CheckoutFormType } from "@/lib/formSchema"

type Props = {
  form: UseFormReturn<CheckoutFormType>
  user: {
    email: string
  }
  selectedCountry: string
  onCountryChange: (code: string) => void
  isSubmitting: boolean
  disabled?: boolean
  onSubmit: (values: CheckoutFormType) => void
}

function FormField({
  label,
  name,
  register,
  error,
  autoComplete,
}: {
  label: string
  name: keyof CheckoutFormType
  register: UseFormReturn<CheckoutFormType>["register"]
  error?: string
  autoComplete?: string
}) {
  return (
    <div className="space-y-2">
      <Input
        id={name}
        label={label}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className="h-13 rounded-xl border-border bg-background transition-colors focus-visible:ring-foreground/20"
        {...register(name)}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export function BillingInformationCard({
  form,
  user,
  selectedCountry,
  onCountryChange,
  isSubmitting,
  disabled,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b px-5 sm:px-7">
        <CardTitle className="text-xl">Billing information</CardTitle>

        <CardDescription>
          Enter the details required to process your payment.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 py-6 sm:px-7">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold">Personal details</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Make sure your details match the information required by your
                payment provider.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="First name"
                name="firstName"
                register={register}
                error={errors.firstName?.message}
                autoComplete="given-name"
              />
              <FormField
                label="Last name"
                name="lastName"
                register={register}
                error={errors.lastName?.message}
                autoComplete="family-name"
              />
            </div>
          </div>

          <Separator />

          {/* Billing address */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold">Billing address</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Provide your billing address.
              </p>
            </div>

            <FormField
              label="Address"
              name="address"
              register={register}
              error={errors.address?.message}
              autoComplete="street-address"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="City"
                name="city"
                register={register}
                error={errors.city?.message}
                autoComplete="address-level2"
              />

              <CountryInput
                value={selectedCountry}
                onChange={onCountryChange}
                className="h-12"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="Postal code"
                name="postalCode"
                register={register}
                error={errors.postalCode?.message}
                autoComplete="postal-code"
              />
              <FormField
                label="Phone number"
                name="phoneNumber"
                register={register}
                error={errors.phoneNumber?.message}
                autoComplete="tel"
              />
            </div>
          </div>

          <Separator />

          {/* Account email */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Account email</Label>

            <Input
              value={user.email}
              readOnly
              className="h-11 rounded-xl bg-muted/40 text-muted-foreground"
            />

            <p className="text-xs text-muted-foreground">
              Your membership will be associated with this account.
            </p>
          </div>

          {/* Payment notice */}
          <div className="rounded-xl border bg-muted/20 p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                <CreditCard className="size-4" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Payment details</p>
                <p className="text-xs leading-5 text-muted-foreground">
                  You&apos;ll continue to our payment provider to complete your
                  purchase securely. Your card details won&apos;t be collected
                  on this page.
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || disabled}
            className="h-12 w-full rounded-xl text-sm font-semibold"
          >
            {isSubmitting ? (
              "Preparing checkout..."
            ) : (
              <>
                Continue to payment
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs leading-5 text-muted-foreground">
            By continuing, you agree to Parallane&apos;s{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Privacy & Terms of Service.
            </Link>
          </p>

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" />
            Your information is encrypted in transit
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
