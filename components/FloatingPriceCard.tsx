"use client"

import { ArrowUpRight, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { membershipPrice } from "@/lib/membership"

type Props = {
  hideWhenSelector?: string
}

export function FloatingPricingCard({
  hideWhenSelector = "#membership-section",
}: Props) {
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const target = document.querySelector(hideWhenSelector)

    const onScroll = () => {
      setVisible(window.scrollY > 200)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    if (target) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => setHidden(entry.isIntersecting),
        { threshold: 0.15 }
      )
      observerRef.current.observe(target)
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      observerRef.current?.disconnect()
    }
  }, [hideWhenSelector])

  const show = visible && !hidden

  return (
    <div
      aria-hidden={!show}
      className={`fixed right-5 bottom-5 z-40 hidden transition-all duration-500 lg:block ${
        show
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-8 opacity-0"
      }`}
    >
      {/* Outer glow */}
      <div
        aria-hidden
        className="absolute -inset-4 rounded-3xl bg-linear-to-br from-foreground/10 via-transparent to-foreground/10 blur-2xl"
      />

      {/* Card */}
      <div className="relative w-75 rounded-3xl p-px">
        {/* Shimmer border */}
        <div
          aria-hidden
          className="absolute inset-0 animate-[shimmer_3s_linear_infinite] rounded-3xl bg-linear-to-r from-transparent via-white/40 to-transparent bg-size-[200%_100%]"
        />

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900/95 to-zinc-950/95 p-6 backdrop-blur-xl">
          {/* Inner glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 left-1/2 h-32 w-52 -translate-x-1/2 rounded-full bg-foreground/30 blur-3xl"
          />

          {/* Header */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <Zap className="size-3.5" />
              </div>
              <p className="text-xs font-semibold text-white">Membership</p>
            </div>

            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-emerald-300 uppercase">
              Start Now
            </span>
          </div>

          {/* Price */}
          <div className="relative mt-3">
            <div className="mt-2 flex items-end gap-2">
              <span className="text-4xl font-semibold tracking-tight text-white">
                €{membershipPrice.monthly}
              </span>
              <span className="mb-2 text-sm text-zinc-500">/ month</span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Effective{" "}
              <strong className="font-semibold text-zinc-200">
                €{membershipPrice.annual / 12}/month
              </strong>{" "}
              with the annual plan.
            </p>
          </div>

          {/* CTA */}
          <Link href="/pricing" className="relative mt-5 block">
            <Button
              size="sm"
              className="group h-10 w-full rounded-xl bg-white text-xs font-semibold text-zinc-950 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:bg-zinc-100 hover:shadow-indigo-500/40"
            >
              Get started
              <ArrowUpRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
