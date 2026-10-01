import { CountryOnboardingForm } from "@/components/forms/onboarding-form"
import { getSessionUser } from "@/lib/user"
import { redirect } from "next/navigation"

export default async function OnboardingPage() {
  const user = await getSessionUser()
  if (!user) redirect("/login")
  if (user.isOnboardingCompleted) redirect("/panel")

  return (
    <CountryOnboardingForm
      firstName={user.name.split(" ")[0]}
      userId={user.id}
    />
  )
}
