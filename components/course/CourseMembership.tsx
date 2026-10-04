"use client"

import { ArrowUpRight, Check, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { membershipPrice } from "@/lib/membership"
import { PriceCard } from "../PriceCard"

const perks = ["Every course", "New releases", "Ask tutor", "Certificates"]

export default function CourseMembership() {
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly")
  const isAnnual = period === "annual"

  const displayPrice = isAnnual
    ? Math.round(membershipPrice.annual / 12)
    : membershipPrice.monthly

  return (
    <section
      id="membership-section"
      className="relative overflow-hidden bg-zinc-950 text-zinc-50"
    >
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-150 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur-[120px]"
      />

      {/* Bottom-right warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-125 w-175 translate-x-1/4 translate-y-1/4 rounded-full bg-foreground/10 blur-[100px]"
      />

      {/* Animated halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/4 h-70 w-70 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-white/10 blur-[80px]"
      />

      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_380px]">
          {/* LEFT — Content */}
          <div className="text-center lg:text-left">
            <Badge
              variant="outline"
              className="group rounded-full border-white/15 bg-white/5 px-3 py-3 text-zinc-200 backdrop-blur-sm"
            >
              <Sparkles className="mr-1.5 size-3.5 transition-transform group-hover:rotate-12" />
              Full access · Cancel anytime
            </Badge>

            <h2 className="mx-auto mt-8 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tighter text-balance text-white md:text-6xl lg:mx-0 lg:text-7xl">
              One membership.
              <br />
              <span className="relative inline-block">
                <span className="bg-linear-to-br from-white via-foreground to-zinc-400 bg-clip-text text-transparent">
                  Every course.
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 300 12"
                  className="absolute -bottom-2 left-0 h-3 w-full text-green-200/60"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 150 2 298 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-xl leading-7 text-balance text-zinc-400 lg:mx-0">
              Get this course and the entire Parallane library with one
              membership. Learn at your own pace and follow the roadmap that
              fits your goals.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
              {perks.map((perk) => (
                <span
                  key={perk}
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-400"
                >
                  <Check className="size-3.5 text-emerald-400" />
                  {perk}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Floating card (desktop only) */}
          <div className="hidden lg:block">
            <PriceCard
              period={period}
              onPeriodChange={setPeriod}
              isAnnual={isAnnual}
              displayPrice={displayPrice}
            />
          </div>
        </div>

        {/* Mobile CTA — shown below lg */}
        <div className="mt-12 text-center lg:hidden">
          {/* Billing toggle */}
          <div className="mb-6 flex justify-center">
            <ToggleGroup
              value={[period]}
              onValueChange={(value) => {
                if (value.length > 0) {
                  setPeriod(value[0] as "monthly" | "annual")
                }
              }}
              className="rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm"
            >
              <ToggleGroupItem
                value="monthly"
                className="rounded-full px-4 text-sm text-zinc-300 data-[state=on]:bg-white data-[state=on]:text-zinc-950"
              >
                Monthly
              </ToggleGroupItem>

              <ToggleGroupItem
                value="annual"
                className="rounded-full px-4 text-sm text-zinc-300 data-[state=on]:bg-white data-[state=on]:text-zinc-950"
              >
                Annual
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="relative rounded-2xl p-px">
              <div
                aria-hidden
                className="absolute inset-0 animate-[shimmer_3s_linear_infinite] rounded-2xl bg-linear-to-r from-transparent via-white/30 to-transparent bg-size-[200%_100%]"
              />
              <div className="relative rounded-2xl border border-white/10 bg-zinc-900/80 p-6 backdrop-blur-md">
                <div className="flex items-end justify-center gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    €{displayPrice}
                  </span>
                  <span className="mb-1.5 text-sm text-zinc-500">/ month</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  {isAnnual ? (
                    <>
                      Billed annually at{" "}
                      <strong className="font-semibold text-white">
                        €{membershipPrice.annual}
                      </strong>
                    </>
                  ) : (
                    <>
                      Or save with annual —{" "}
                      <strong className="font-semibold text-white">
                        €{Math.round(membershipPrice.annual / 12)}/month
                      </strong>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          <Link href={`/checkout?plan=${period}`}>
            <Button
              size="lg"
              className="group mt-6 h-12 w-full max-w-sm rounded-xl bg-white text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition-all hover:scale-[1.02] hover:bg-zinc-100"
            >
              Start for €{displayPrice} / month
              <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>

          <p className="mt-4 text-[11px] text-zinc-600">
            No commitment. Cancel in one click.
          </p>
        </div>
      </div>
    </section>
  )
}
