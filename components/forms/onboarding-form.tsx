"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { setOnboarding } from "@/actions/student"
import { CountryInput } from "@/components/CountryInput"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { handleRes } from "@/lib/handleRes"

type Props = {
  userId: string
}

export function CountryOnboardingForm({ userId }: Props) {
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
    <Card className="overflow-hidden rounded-3xl rounded-t-none border-t-0 border-border/80 bg-card/95 shadow-2xl shadow-black/4 backdrop-blur-xl">
      <CardContent className="px-6 sm:px-10">
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
  )
}
