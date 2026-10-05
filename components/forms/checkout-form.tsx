"use client"

import { startPayment } from "@/actions/checkout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/toast"
import { CheckoutFormType, checkoutSchemaSchema } from "@/lib/formSchema"
import { handleRes } from "@/lib/handleRes"
import { membershipPrice } from "@/lib/membership"
import { User } from "@/prisma/generated/prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Globe, LockKeyhole, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { SupportCard } from "../SupportCard"
import { BillingInformationCard } from "./BillingInformationCard"
import { BillingSummaryCard } from "./BillingSummaryCard"
import { getCouponByCode } from "@/lib/coupon"

type CheckoutFormProps = {
  plan: "monthly" | "annual"
  user: Omit<User, "password">
}

const plans = {
  monthly: {
    name: "Monthly Membership",
    price: membershipPrice.monthly,
    billing: "Billed monthly",
    description: "Flexible monthly access",
  },
  annual: {
    name: "Annual Membership",
    price: membershipPrice.annual,
    billing: "Billed annually",
    description: "12 months of uninterrupted learning",
  },
}

const benefits = [
  "Access to all available courses",
  "Follow structured learning roadpaths",
  "Learn at your own pace",
  "Ask tutor questions",
]

export function CheckoutForm({ plan, user }: CheckoutFormProps) {
  const router = useRouter()
  const selectedPlan = plans[plan]

  const [appliedCoupon, setAppliedCoupon] = useState<{
    amount: number
    code: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(user.country ?? "US")
  const [countryIp, setCountryIp] = useState<string | null>(null)
  const [total, setTotal] = useState(selectedPlan.price)

  const nameParts = user.name?.trim().split(/\s+/) ?? []
  const firstName = nameParts.shift() ?? ""
  const lastName = nameParts.join(" ")

  const isIran = countryIp === "IR"
  const isUnitedStates = countryIp === "US"

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutSchemaSchema),
    defaultValues: {
      firstName,
      lastName,
      city: user.city ?? "",
      phoneNumber: user.phoneNumber ?? "",
      postalCode: user.postalCode ?? "",
      address: user.address ?? "",
    },
  })

  async function onSubmit(values: CheckoutFormType) {
    if (isIran || isUnitedStates) {
      toast.add({
        title: "Payment is currently unavailable for your location.",
      })
      return
    }

    setIsSubmitting(true)

    const res = await startPayment(
      { ...values, country: selectedCountry },
      {
        totalAmount: selectedPlan.price,
        paidAmount: total,
        discountCode: appliedCoupon?.code ?? null,
        discountAmount: appliedCoupon?.amount ?? 0,
        period: plan,
      },
      user.id
    )

    handleRes(res, {
      onSuccess: () => res.paymentUrl && router.push(res.paymentUrl),
    })

    setIsSubmitting(false)
  }

  useEffect(() => {
    const getUserCountry = async () => {
      try {
        const res = await fetch("https://ipinfo.io?token=41a6316c39fa84")
        const data = await res.json()
        setCountryIp(data.country)
      } catch (error) {
        console.error("Error fetching IP information:", error)
      }
    }

    getUserCountry()
  }, [])

  const onDiscountApplied = async (code: string) => {
    if (appliedCoupon) {
      setTotal(selectedPlan.price)
      setAppliedCoupon(null)
      return
    }

    const coupon = await getCouponByCode(code)

    if (!coupon) {
      toast.add({
        type: "error",
        description: "Try a valid discount code",
        title: "Discount code is not valid.",
      })
      return
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      toast.add({
        type: "error",
        description: "Try a valid discount code",
        title: "This Discount code is expired.",
      })
      return
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      toast.add({
        type: "error",
        description: "Try a valid discount code",
        title: "This Discount code has reached to its usage limit.",
      })
      return
    }

    switch (coupon.discountType) {
      case "fixed":
        setTotal((pre) => Math.max(pre - coupon.discountAmount, 0))
        setAppliedCoupon({ amount: coupon.discountAmount, code: coupon.code })
        break
      case "percentage":
        setTotal((pre) => {
          const factor = 1 - coupon.discountAmount / 100
          const newTotal = Number((pre * factor).toFixed(2))
          setAppliedCoupon({
            amount: +(selectedPlan.price - newTotal).toFixed(2),
            code: coupon.code,
          })
          return newTotal
        })
        break
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
            variant="outline"
            className="flex items-center gap-2 py-3 sm:text-sm"
          >
            <LockKeyhole className="size-3.5" />
            Secure checkout
          </Badge>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Heading */}
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

        {/* Geographic alerts — kept in parent because they gate submission */}
        {isIran && (
          <Alert
            dir="rtl"
            className="mb-6 border-destructive bg-destructive/10"
          >
            <Globe className="size-4" />
            <AlertDescription className="text-right text-sm leading-6">
              <span className="font-semibold text-foreground">
                امکان خرید از این موقعیت جغرافیایی وجود ندارد.
              </span>{" "}
              با توجه به محدودیت‌های قانونی و الزامات ارائه‌دهنده خدمات پرداخت،
              در حال حاضر امکان تکمیل خرید برای کاربران واقع در ایران فراهم
              نیست. برای خرید اشتراک از ایران، می توانید با ایمیل ما در ارتباط
              باشید: parallane.com@gmail.com
            </AlertDescription>
          </Alert>
        )}

        {isUnitedStates && (
          <Alert className="mb-6 border-destructive bg-destructive/10">
            <Globe className="size-4" />
            <AlertDescription className="text-sm leading-6">
              <span className="font-semibold text-foreground">
                We can't process payments from the US.
              </span>{" "}
              This is a limitation of our payment provider, not our platform.
              Using a VPN to connect from another country will unblock checkout.
            </AlertDescription>
          </Alert>
        )}

        {/* Layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          <section>
            <BillingInformationCard
              form={form}
              user={{ email: user.email }}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
            />
          </section>

          <aside className="space-y-5 lg:sticky lg:top-8">
            <BillingSummaryCard
              appliedCoupon={appliedCoupon}
              total={total}
              plan={plan}
              planName={selectedPlan.name}
              planPrice={selectedPlan.price}
              planBilling={selectedPlan.billing}
              planDescription={selectedPlan.description}
              benefits={benefits}
              onDiscountApplied={onDiscountApplied}
            />
            <SupportCard />
          </aside>
        </div>

        {/* Footer */}
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
