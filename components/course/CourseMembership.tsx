"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const perks = ["Every course", "New releases", "Ask tutor", "Certificates"]

export default function CourseMembership() {
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
            <FloatingPriceCard />
          </div>
        </div>

        {/* Mobile CTA — shown below lg */}
        <div className="mt-12 text-center lg:hidden">
          <div className="mx-auto w-full max-w-sm">
            <div className="relative rounded-2xl p-px">
              <div
                aria-hidden
                className="absolute inset-0 animate-[shimmer_3s_linear_infinite] rounded-2xl bg-linear-to-r from-transparent via-white/30 to-transparent bg-size-[200%_100%]"
              />
              <div className="relative rounded-2xl border border-white/10 bg-zinc-900/80 p-6 backdrop-blur-md">
                <div className="flex items-end justify-center gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    €29
                  </span>
                  <span className="mb-1.5 text-sm text-zinc-500">/ month</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  Or save with annual —{" "}
                  <strong className="font-semibold text-white">
                    €19/month
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <Link href="/checkout?plan=monthly">
            <Button
              size="lg"
              className="group mt-6 h-12 w-full max-w-sm rounded-xl bg-white text-sm font-semibold text-zinc-950 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:bg-zinc-100"
            >
              Start for €29 / month
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

function FloatingPriceCard() {
  return (
    <div className="relative animate-[float_6s_ease-in-out_infinite]">
      {/* Outer glow */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-3xl bg-linear-to-br from-foreground/20 via-transparent to-foreground/20 blur-2xl"
      />

      {/* Card */}
      <div className="relative rounded-3xl p-px">
        {/* Shimmer border */}
        <div
          aria-hidden
          className="absolute inset-0 animate-[shimmer_3s_linear_infinite] rounded-3xl bg-linear-to-r from-transparent via-white/40 to-transparent bg-size-[200%_100%]"
        />

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900/95 to-zinc-950/95 p-7 backdrop-blur-xl">
          {/* Inner top glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-foreground/30 blur-3xl"
          />

          {/* Header */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                <Zap className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-400">Parallane</p>
                <p className="text-sm font-semibold text-white">Membership</p>
              </div>
            </div>

            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-emerald-300 uppercase">
              Best value
            </span>
          </div>

          {/* Price */}
          <div className="relative mt-7">
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
              Start from
            </p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-tight text-white">
                €29
              </span>
              <span className="mb-2 text-sm text-zinc-500">/ month</span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Effective{" "}
              <strong className="font-semibold text-zinc-200">€19/month</strong>{" "}
              with the annual plan.
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {/* Includes */}
          <ul className="relative space-y-2.5">
            {[
              "Unlimited access to every course",
              "New courses as they release",
              "Certificate on completion",
              "Priority Ask Tutor support",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-xs text-zinc-300"
              >
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                  <Check className="size-2.5 text-emerald-300" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link href="/pricing" className="relative mt-7 block">
            <Button
              size="lg"
              className="group h-12 w-full rounded-xl bg-white text-sm font-semibold text-zinc-950 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:bg-zinc-100 hover:shadow-indigo-500/40"
            >
              Start for €29 / month
              <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>

          {/* Trust row */}
          <div className="relative mt-4 flex items-center justify-center gap-3 text-[10px] text-zinc-500">
            <span className="flex items-center gap-1">
              <Shield className="size-3" />
              Secure
            </span>
            <span className="size-1 rounded-full bg-zinc-700" />
            <span className="flex items-center gap-1">
              <BookOpen className="size-3" />
              Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
