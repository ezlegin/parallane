"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  CreditCard,
  Globe,
  LockKeyhole,
  ShieldCheck,
  Tag,
} from "lucide-react"

import Link from "next/link"

import { Alert, AlertDescription } from "@/components/ui/alert"
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
import { toast } from "../ui/toast"

const checkoutSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  city: z.string().trim().min(1, "City is required."),
  country: z.string().trim().min(1, "Country is required."),
  phoneNumber: z
    .string()
    .trim()
    .min(5, "Please enter a valid phone number.")
    .max(25, "Phone number is too long."),
  postalCode: z
    .string()
    .trim()
    .min(1, "Postal code is required.")
    .max(20, "Postal code is too long."),
  address: z.string().trim().min(3, "Address is required."),
})

type CheckoutValues = z.infer<typeof checkoutSchema>

type CheckoutFormProps = {
  plan: "monthly" | "annual"
  user: {
    firstName: string
    lastName: string
    country: string
    email: string
  }
  ipCountry: string | null
}

const plans = {
  monthly: {
    name: "Monthly Membership",
    price: 29,
    billing: "Billed monthly",
    description: "Flexible monthly access",
  },
  annual: {
    name: "Annual Membership",
    price: 228,
    billing: "Billed annually",
    description: "12 months of uninterrupted learning",
  },
}

const paymentMethods = ["VISA", "Mastercard", "AMEX", "PayPal"]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}

function FormField({
  label,
  name,
  placeholder,
  register,
  error,
  autoComplete,
}: {
  label: string
  name: keyof CheckoutValues
  placeholder: string
  register: ReturnType<typeof useForm<CheckoutValues>>["register"]
  error?: string
  autoComplete?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>

      <Input
        id={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className="h-11 rounded-xl border-border bg-background transition-colors focus-visible:ring-foreground/20"
        {...register(name)}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export function CheckoutForm({ plan, user, ipCountry }: CheckoutFormProps) {
  const [discountCode, setDiscountCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedPlan = plans[plan]

  const isIran = ipCountry === "IR"
  const isUnitedStates = ipCountry === "US"

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      city: "",
      country: user.country,
      phoneNumber: "",
      postalCode: "",
      address: "",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  async function onSubmit(values: CheckoutValues) {
    if (isIran || isUnitedStates) {
      toast.add({
        title: "Payment is currently unavailable for your location.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // TODO:
      // 1. Send billing details and selected plan to a server action/API.
      // 2. Validate the user's membership and plan on the server.
      // 3. Recheck country restrictions on the server.
      // 4. Create a payment session with your payment gateway.
      // 5. Redirect the user to the gateway's hosted checkout page.
      //
      // Never trust the client-side price or country check.

      console.log("Checkout values:", values)
      console.log("Selected plan:", plan)
      console.log("Discount code:", discountCode)

      //   toast.info("Payment gateway integration is coming next.")
    } catch {
      //   toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            parallane<span className="text-muted-foreground">.</span>
          </Link>

          <Badge
            variant={"outline"}
            className="flex items-center gap-2 py-3 sm:text-sm"
          >
            <LockKeyhole className="size-3.5" />
            Secure checkout
          </Badge>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Page heading */}
        <div className="mb-8">
          <Link
            href="/pricing"
            className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to pricing
          </Link>

          <div className="flex flex-col gap-3">
            <Badge
              variant="outline"
              className="w-fit gap-1.5 rounded-full px-3 py-1"
            >
              <ShieldCheck className="size-3.5" />
              Secure membership checkout
            </Badge>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Complete your membership
            </h1>

            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              You&apos;re one step away from accessing your courses and
              continuing your learning journey with Parallane.
            </p>
          </div>
        </div>

        {/* Geographic notices */}
        {isIran && (
          <Alert dir="rtl" className="mb-6 border-destructive bg-transparent">
            <Globe className="size-4" />

            <AlertDescription className="text-right text-sm leading-6">
              <span className="font-semibold text-foreground">
                امکان خرید از این موقعیت جغرافیایی وجود ندارد.
              </span>{" "}
              با توجه به محدودیت‌های قانونی و الزامات ارائه‌دهنده خدمات پرداخت،
              در حال حاضر امکان تکمیل خرید برای کاربران واقع در ایران فراهم
              نیست.
            </AlertDescription>
          </Alert>
        )}

        {isUnitedStates && (
          <Alert className="mb-6 border-destructive bg-transparent">
            <Globe className="size-4" />

            <AlertDescription className="text-sm leading-6">
              <span className="font-semibold text-foreground">
                Payments are currently unavailable in your location.
              </span>{" "}
              Our current payment provider cannot process payments from the
              United States. Though you can use a VPN to have another IP than
              US.
            </AlertDescription>
          </Alert>
        )}

        {/* Checkout layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          {/* Billing form */}
          <section>
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="space-y-2 border-b px-5 py-5 sm:px-7">
                <CardTitle className="text-xl">Billing information</CardTitle>

                <CardDescription>
                  Enter the details required to process your payment.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-5 py-6 sm:px-7">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Account information */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold">
                        Personal details
                      </h3>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Make sure your details match the information required by
                        your payment provider.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        label="First name"
                        name="firstName"
                        placeholder="John"
                        register={register}
                        error={errors.firstName?.message}
                        autoComplete="given-name"
                      />

                      <FormField
                        label="Last name"
                        name="lastName"
                        placeholder="Smith"
                        register={register}
                        error={errors.lastName?.message}
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Address */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold">Billing address</h3>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Provide your billing address.
                      </p>
                    </div>

                    <FormField
                      label="Address"
                      name="address"
                      placeholder="Street address, apartment, suite, etc."
                      register={register}
                      error={errors.address?.message}
                      autoComplete="street-address"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        label="City"
                        name="city"
                        placeholder="New York"
                        register={register}
                        error={errors.city?.message}
                        autoComplete="address-level2"
                      />

                      <FormField
                        label="Country"
                        name="country"
                        placeholder="United States"
                        register={register}
                        error={errors.country?.message}
                        autoComplete="country-name"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        label="Postal code"
                        name="postalCode"
                        placeholder="10001"
                        register={register}
                        error={errors.postalCode?.message}
                        autoComplete="postal-code"
                      />

                      <FormField
                        label="Phone number"
                        name="phoneNumber"
                        placeholder="+1 555 000 0000"
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

                  {/* Payment information */}
                  <div className="rounded-xl border bg-muted/20 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                        <CreditCard className="size-4" />
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">Payment details</p>

                        <p className="text-xs leading-5 text-muted-foreground">
                          You&apos;ll continue to our payment provider to
                          complete your purchase securely. Your card details
                          won&apos;t be collected on this page.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isIran || isUnitedStates}
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
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Order summary */}
          <aside className="space-y-5 lg:sticky lg:top-8">
            <Card className="overflow-hidden rounded-2xl shadow-sm">
              <CardHeader className="border-b px-5 py-5">
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
                      <h3 className="font-semibold">{selectedPlan.name}</h3>

                      {plan === "annual" && (
                        <Badge variant={"success"}>Best value</Badge>
                      )}
                    </div>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {selectedPlan.description}
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {plan === "annual" ? "$19/month equivalent" : "$29/month"}
                    </p>
                  </div>
                </div>

                {/* Membership benefits */}
                <div className="space-y-3 rounded-xl border bg-muted/20 p-4">
                  {[
                    "Access to all available courses",
                    "Follow structured learning roadpaths",
                    "Learn at your own pace",
                    "Ask tutor questions",
                  ].map((benefit) => (
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
                      onChange={(event) => setDiscountCode(event.target.value)}
                      placeholder="Enter code"
                      className="h-10 w-full min-w-0 rounded-xl"
                    />

                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 rounded-xl"
                      onClick={() =>
                        toast.add({
                          title: "Discount codes will be available soon.",
                        })
                      }
                    >
                      Apply
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

                    <span className="font-medium">
                      {formatPrice(selectedPlan.price)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Discount</span>

                    <span className="text-muted-foreground">—</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">Taxes</span>

                    <span className="text-muted-foreground">$0</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-semibold">Total</span>

                    <span className="text-3xl font-bold tracking-tight">
                      {formatPrice(selectedPlan.price)}
                    </span>
                  </div>

                  <p className="text-right text-xs text-muted-foreground">
                    {selectedPlan.billing}
                  </p>
                </div>

                {/* Annual savings */}
                {plan === "annual" && (
                  <div className="rounded-xl border bg-muted/30 p-4">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="size-5 text-green-500" />

                      <p className="text-sm font-semibold">
                        Save $120 per year
                      </p>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Pay $228 for 12 months instead of $348 when paying
                      monthly.
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

                {/* Security note */}
                <div className="flex items-center justify-center gap-2 border-t pt-4 text-xs text-muted-foreground">
                  <LockKeyhole className="size-3.5" />
                  Secure payment processing
                </div>
              </CardContent>
            </Card>

            {/* Help card */}
            <div className="rounded-2xl border p-5">
              <p className="text-sm font-semibold">
                Need help with your purchase?
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                If you have questions about membership or payment, our team is
                here to help.
              </p>

              <Link href="/contact">
                <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                  Contact support
                  <ArrowRight className="ml-1 size-3.5" />
                </Button>
              </Link>
            </div>
          </aside>
        </div>

        {/* Footer reassurance */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:gap-6">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            Secure checkout
          </span>

          <span className="hidden sm:block">·</span>

          <span>Transparent membership pricing</span>

          <span className="hidden sm:block">·</span>

          <span>Parallane Learning Platform</span>
        </div>
      </div>
    </main>
  )
}
