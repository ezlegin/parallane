"use client"

import { ArrowLeft, Bell, Clock, Hammer, Sparkles } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export const metadata: Metadata = {
  title: "Coming Soon — Parallane",
  description:
    "This course is being built. We're making something worth the wait.",
}

export default function ComingSoonPage() {
  const router = useRouter()

  return (
    <main className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden px-6 py-20">
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/6 blur-[140px]"
      />

      {/* Animated halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-60 w-60 -translate-x-1/2 animate-pulse rounded-full bg-emerald-500/10 blur-[80px]"
      />

      <div className="relative z-10 w-full max-w-xl">
        <Card className="relative overflow-hidden border-border/60 bg-card/80 shadow-2xl backdrop-blur-xl">
          {/* Top highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-foreground/20 to-transparent"
          />

          <CardContent className="relative flex flex-col items-center px-8 py-12 text-center md:px-10 md:py-14">
            {/* Icon stack */}
            <div className="relative">
              {/* Dashed outer ring */}
              <div
                aria-hidden
                className="absolute inset-0 -m-3 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-emerald-500/30"
              />

              <div className="flex size-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/6">
                <Hammer
                  className="size-7 text-emerald-500"
                  strokeWidth={1.75}
                />
              </div>

              {/* Tiny sparkle badge */}
              <div className="absolute -right-1.5 -bottom-1.5 flex size-7 items-center justify-center rounded-full border border-border bg-background">
                <Sparkles
                  className="size-3.5 text-emerald-500"
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Eyebrow */}
            <div className="mt-8 flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
                In development
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-5 text-3xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance md:text-4xl">
              This course is being built.
            </h1>

            {/* Body */}
            <p className="mt-4 max-w-md text-sm leading-6 text-balance text-muted-foreground">
              We're crafting it with the same care as everything else on
              Parallane. It'll be ready soon — and it'll be worth the wait.
            </p>

            {/* Divider */}
            <div
              aria-hidden
              className="my-7 h-px w-full bg-linear-to-r from-transparent via-border to-transparent"
            />

            {/* Meta row */}
            <div className="flex w-full items-center justify-center gap-6 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3" />
                Coming soon
              </span>

              <span aria-hidden className="size-1 rounded-full bg-border" />

              <span className="flex items-center gap-1.5">
                <Bell className="size-3" />
                Follow for updates
              </span>
            </div>

            {/* Actions */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => router.back()}
                size="lg"
                className="group h-11 w-full rounded-xl text-sm font-semibold"
              >
                <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-0.5" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer whisper */}
        <p className="mt-6 text-center text-[11px] text-muted-foreground/70">
          Know this course should exist?{" "}
          <Link
            href="/contact"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Tell us.
          </Link>
        </p>
      </div>
    </main>
  )
}
