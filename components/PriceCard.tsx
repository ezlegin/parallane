import { ArrowUpRight, BookOpen, Check, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { toast } from "./ui/toast"
import { membershipPrice } from "@/lib/membership"

type FloatingPriceCardProps = {
  period: "monthly" | "annual"
  onPeriodChange: (period: "monthly" | "annual") => void
  isAnnual: boolean
  displayPrice: number
}

export function PriceCard({
  period,
  onPeriodChange,
  isAnnual,
  displayPrice,
}: FloatingPriceCardProps) {
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
              {isAnnual ? "Save 35%" : "Best value"}
            </span>
          </div>

          {/* Billing toggle */}
          <div className="relative mt-6">
            <ToggleGroup
              value={[period]}
              onValueChange={(value) => {
                if (value.length > 0) {
                  if (value.includes("annual")) {
                    toast.add({
                      title: "Temporarily unavailable.",
                      type: "warning",
                    })
                    return
                  }
                  onPeriodChange(value[0] as "monthly" | "annual")
                }
              }}
              className="grid w-full grid-cols-2 rounded-xl border border-white/10 bg-white/5 p-1"
            >
              <ToggleGroupItem
                value="monthly"
                className="rounded-lg py-1.5 text-xs font-medium text-zinc-400 data-[state=on]:bg-white data-[state=on]:text-zinc-950"
              >
                Monthly
              </ToggleGroupItem>

              <ToggleGroupItem
                value="annual"
                className="rounded-lg py-1.5 text-xs font-medium text-zinc-400 data-[state=on]:bg-white data-[state=on]:text-zinc-950"
              >
                Annual
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Price */}
          <div className="relative mt-6">
            <p className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
              Start from
            </p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-tight text-white">
                €{displayPrice}
              </span>
              <span className="mb-2 text-sm text-zinc-500">/ month</span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              {isAnnual ? (
                <>
                  Billed annually at{" "}
                  <strong className="font-semibold text-zinc-200">
                    €{membershipPrice.annual}
                  </strong>
                </>
              ) : (
                <>
                  Effective{" "}
                  <strong className="font-semibold text-zinc-200">
                    €{Math.round(membershipPrice.annual / 12)}/month
                  </strong>{" "}
                  with the annual plan.
                </>
              )}
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {/* Includes */}
          <ul className="relative space-y-2.5">
            {[
              "Unlimited access to every course",
              "Career-focused roadmaps",
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
          <Link
            href={`/checkout?plan=${period}`}
            className="relative mt-7 block"
          >
            <Button
              size="lg"
              className="group h-12 w-full rounded-xl bg-white text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition-all hover:scale-[1.02] hover:bg-zinc-100 hover:shadow-white/20"
            >
              Join Parallane
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
