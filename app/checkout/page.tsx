import { CheckoutForm } from "@/components/forms/checkout-form"
import { redirect } from "next/navigation"

type CheckoutPageProps = {
  searchParams: Promise<{
    plan?: string
  }>
}

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const params = await searchParams

  const plan = params.plan === "annual" ? "annual" : "monthly"

  const user = {
    id: "0",
    fullName: "alireza ezlegini",
    country: "IR",
    email: "ezlegini.ir@gmail.com",
  } // todo: fetch from prisma.

  if (!user) {
    redirect("/login")
  }

  const ipCountry = "UK"

  const nameParts = user.fullName?.trim().split(/\s+/) ?? []
  const firstName = nameParts.shift() ?? ""
  const lastName = nameParts.join(" ")

  return (
    <CheckoutForm
      plan={plan}
      user={{
        firstName,
        lastName,
        country: user.country ?? "",
        email: user.email ?? "",
      }}
      ipCountry={ipCountry}
    />
  )
}
