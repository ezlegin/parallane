import { CheckoutForm } from "@/components/forms/checkout-form"
import { getSessionUser } from "@/lib/user"
import { redirect } from "next/navigation"

type CheckoutPageProps = {
  searchParams: Promise<{
    plan?: string
  }>
}

export default async function page({ searchParams }: CheckoutPageProps) {
  const params = await searchParams

  const plan = params.plan === "annual" ? "annual" : "monthly"

  const user = await getSessionUser()

  if (!user) {
    redirect("/login")
  }

  return <CheckoutForm plan={plan} user={user} />
}

export const metadata = {
  title: "Checkout",
}
