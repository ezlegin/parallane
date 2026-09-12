import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function CourseMembership() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[64px_64px] opacity-10" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
        <Badge
          variant="outline"
          className="rounded-full border-background/20 text-background"
        >
          Full access
        </Badge>

        <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold tracking-tighter md:text-6xl">
          One membership.
          <br />
          Every course.
        </h2>

        <p className="mx-auto mt-6 max-w-xl leading-7 text-background/60">
          Get this course and the entire Parallane library with one membership.
          Learn at your own pace and follow the roadmap that fits your goals.
        </p>

        <div className="mt-10 flex items-end justify-center gap-3">
          <span className="text-6xl font-semibold tracking-tight">$29</span>

          <span className="mb-2 text-background/50">/ month</span>
        </div>

        <p className="mt-2 text-sm text-background/50">
          Or save with the annual plan at an effective{" "}
          <strong className="text-background">$19/month</strong>.
        </p>

        <Link href="/pricing">
          <Button size="lg" variant="secondary" className="mt-10 h-12 px-7">
            Join Parallane
            <ArrowUpRight className="ml-2 size-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
