"use client"

import { Check } from "lucide-react"
import GlowingStroke from "./GlowingStroke"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { useState } from "react"
import Link from "next/link"

const MembershipCard = () => {
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly")

  const isAnnual = period === "annual"

  return (
    <section className="relative flex h-screen flex-col items-center justify-center gap-12 overflow-hidden bg-muted/20 py-20">
      <div className="absolute top-1/2 right-0 size-45 translate-x-30 -translate-y-1/2 scale-y-300 bg-foreground opacity-20 blur-3xl" />
      <div className="absolute top-1/2 left-0 size-45 -translate-x-30 -translate-y-1/2 scale-y-300 bg-foreground opacity-20 blur-3xl" />

      <GlowingStroke />
      <GlowingStroke side="bottom" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border">
          <div className="grid md:grid-cols-2">
            {/* Left */}
            <Card className="rounded-r-none p-8 md:p-14">
              <Badge variant="outline" className="p-3">
                Membership
              </Badge>

              <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
                One membership.
                <br />
                All the skills.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-muted-foreground">
                Get access to the entire Parallane library and learn at your own
                pace.
              </p>

              <Link href={`/checkout?plan=${period}`} className="w-full">
                <Button size="lg" className="w-full">
                  Join Parallane →
                </Button>
              </Link>
            </Card>

            {/* Right */}
            <div className="flex flex-col justify-center p-8 md:p-14">
              {/* Billing toggle */}
              <div className="mb-8 flex items-center justify-between gap-4">
                <ToggleGroup
                  value={[period]}
                  onValueChange={(value) => {
                    if (value.length > 0) {
                      setPeriod(value[0] as "monthly" | "annual")
                    }
                  }}
                  className="rounded-full border p-1"
                >
                  <ToggleGroupItem
                    value="monthly"
                    className="rounded-full px-4 text-sm data-[state=on]:bg-foreground data-[state=on]:text-background"
                  >
                    Monthly
                  </ToggleGroupItem>

                  <ToggleGroupItem
                    value="annual"
                    className="rounded-full px-4 text-sm data-[state=on]:bg-foreground data-[state=on]:text-background"
                  >
                    Annual{" "}
                    <span className="text-xs text-muted-foreground">
                      (-%35)
                    </span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3">
                <span className="text-6xl font-semibold tracking-tight">
                  ${isAnnual ? "19" : "29"}
                </span>

                <span className="mb-2 text-muted-foreground">/ month</span>
              </div>

              {isAnnual ? (
                <div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Billed annually at{" "}
                    <strong className="text-lg text-foreground">
                      $228/year
                    </strong>
                    .
                  </p>
                  <Badge variant={"success"}>Save $120.</Badge>
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Billed monthly at{" "}
                  <strong className="text-foreground">$19/month</strong>.
                </p>
              )}

              <div className="my-8 h-px bg-border" />

              {/* Features */}
              <ul className="space-y-3 text-sm">
                {[
                  "Access to all courses",
                  "Career-focused roadmaps",
                  "Learn at your own pace",
                  "Course completion certificates",
                  "Ask Tutor",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full border bg-muted text-xs text-foreground">
                      <Check size={12} />
                    </span>

                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MembershipCard
