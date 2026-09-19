import { CountryOnboardingForm } from "@/components/forms/onboarding-form"

export default async function OnboardingPage() {
  const firstName = "Alireza"

  return <CountryOnboardingForm firstName={firstName} />
}
