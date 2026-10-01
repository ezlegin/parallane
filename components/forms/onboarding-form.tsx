"use client"

import { ArrowRight } from "lucide-react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { setOnboarding } from "@/actions/student"
import { CountryInput } from "@/components/CountryInput"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { handleRes } from "@/lib/handleRes"

type Props = {
  firstName: string
  userId: string
}

export function CountryOnboardingForm({ firstName, userId }: Props) {
  const router = useRouter()
  const [selectedCountry, setSelectedCountry] = useState("US")
  const [isPending, startTransition] = useTransition()

  function onSubmit() {
    startTransition(async () => {
      handleRes(await setOnboarding(userId, { country: selectedCountry }), {
        onSuccess: () => router.push("/panel"),
      })
    })
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="z-10 mx-auto w-full max-w-xl">
        <Card className="overflow-hidden rounded-3xl border-border/80 bg-card/95 shadow-2xl shadow-black/4 backdrop-blur-xl">
          <CardHeader className="px-6 pb-2 sm:px-10">
            <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
              {firstName ? `Welcome, ${firstName}!` : "Welcome to Parallane!"}
            </CardTitle>
            <CardDescription className="max-w-sm text-sm leading-6">
              We're glad you're here. Before you begin your learning journey,
              tell us which country you're from.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6 sm:px-10">
            <div className="space-y-2">
              <div className="text-sm font-semibold">
                Which country are you from?
              </div>

              <CountryInput
                value={selectedCountry}
                onChange={setSelectedCountry}
                className="h-12"
              />

              <p className="text-xs leading-5 text-muted-foreground">
                Your country helps us provide a more relevant experience and
                determine which services are available to you.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t bg-muted/10 px-6 sm:px-10">
            <Button
              type="button"
              onClick={onSubmit}
              disabled={!selectedCountry || isPending}
              className="h-12 w-full rounded-xl text-sm font-semibold"
            >
              {isPending ? (
                "Saving your selection..."
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Parallane. Learn. Build. Grow.
        </p>
      </div>
    </main>
  )
}
