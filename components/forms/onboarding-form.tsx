"use client"

import { countries } from "countries-list"
import { useMemo, useState, useTransition } from "react"

import { ArrowRight, Check, ChevronsUpDown, Globe2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

import { cn } from "@/lib/utils"
import { toast } from "../ui/toast"

type CountryOnboardingFormProps = {
  firstName: string
}

const formattedCountries = Object.keys(countries)
  .map((key) => ({
    label: countries[key as keyof typeof countries].name,
    value: key,
    flag: `/flags/${key.toLowerCase()}.svg`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

export function CountryOnboardingForm({
  firstName,
}: CountryOnboardingFormProps) {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition() //todo: use transition.

  const selectedCountryName = useMemo(
    () =>
      formattedCountries.find((country) => country.value === selectedCountry)
        ?.label,
    [selectedCountry]
  )

  function handleContinue() {
    console.log(selectedCountry)
    toast.add({ title: "country saved." })
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
            {/* Country selector */}
            <div className="space-y-2">
              <div className="text-sm font-semibold">
                Which country are you from?
              </div>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "h-12 w-full justify-between rounded-xl px-4 font-normal",
                        !selectedCountry && "text-muted-foreground"
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        {selectedCountryName ? (
                          <img
                            src={`/flags/${selectedCountry}.svg`}
                            width={20}
                            height={"auto"}
                          />
                        ) : (
                          <Globe2 className="size-4 shrink-0 text-muted-foreground" />
                        )}

                        <span className="truncate">
                          {selectedCountryName ?? "Select your country"}
                        </span>
                      </span>

                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  }
                />

                <PopoverContent
                  align="start"
                  className="w-(--radix-popover-trigger-width) min-w-70 p-0"
                >
                  <Command>
                    <CommandInput placeholder="Search countries..." />

                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>

                      <CommandGroup heading="Countries">
                        {formattedCountries.map((country) => (
                          <CommandItem
                            key={country.value}
                            value={`${country.label} ${country.value}`}
                            onSelect={() => {
                              setSelectedCountry(country.value)
                              setOpen(false)
                            }}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={country.flag}
                                width={19}
                                height={"auto"}
                              />
                              <span>{country.label}</span>
                            </div>

                            <Check
                              className={cn(
                                "size-4",
                                selectedCountry === country.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <p className="text-xs leading-5 text-muted-foreground">
                Your country helps us provide a more relevant experience and
                determine which services are available to you.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t bg-muted/10 px-6 sm:px-10">
            <Button
              type="button"
              onClick={handleContinue}
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

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Parallane. Learn. Build. Grow.
        </p>
      </div>
    </main>
  )
}
