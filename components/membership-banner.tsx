"use client"

import { ArrowUpRight, Crown, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { membershipPrice } from "@/lib/membership"
import { Card } from "./ui/card"

const STORAGE_KEY = "membership-banner-dismissed-until"
const ONE_DAY_MS = 24 * 60 * 60 * 1000

export function MembershipBanner({
  showCloseButton = false,
}: {
  showCloseButton?: boolean
}) {
  const [mounted, setMounted] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setMounted(true)

    const until = localStorage.getItem(STORAGE_KEY)
    if (until && Number(until) > Date.now()) {
      setDismissed(true)
    }
  }, [])

  const onDismiss = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + ONE_DAY_MS))
    setDismissed(true)
  }

  if (!mounted || dismissed) return null

  return (
    <div className="fixed right-4 bottom-4 z-40 hidden animate-in duration-500 fade-in slide-in-from-right-4 lg:block">
      {/* Outer glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-2xl bg-linear-to-br from-emerald-500/10 via-transparent to-emerald-500/10 blur-2xl"
      />

      {/* Banner */}
      <Card className="relative flex-row items-center gap-4 rounded-2xl border border-border/60 bg-background/80 py-4 pr-9 pl-3 shadow-2xl backdrop-blur-xl">
        {/* Icon */}
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/8">
          <Crown className="size-4 text-emerald-500" strokeWidth={1.75} />
        </div>

        {/* Copy */}
        <div className="min-w-0 pr-1">
          <p className="text-sm leading-tight font-medium">
            Unlock every course
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            From €{membershipPrice.monthly}/month
          </p>
        </div>

        {/* CTA */}
        <Link href="/pricing">
          <Button size="sm" className="group shrink-0">
            Get started
            <ArrowUpRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </Link>

        {/* Dismiss */}
        {showCloseButton && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss for 24 hours"
            className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
      </Card>
    </div>
  )
}
