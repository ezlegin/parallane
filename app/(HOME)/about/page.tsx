import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  Heart,
  Sparkles,
  Users,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About — Parallane",
  description:
    "Why Parallane exists, what we believe, and how we think about teaching web development.",
}

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Story />
      <Principles />
      <Numbers />
      <CTA />
    </div>
  )
}

// ============================================
// HERO
// ============================================

function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-125 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/6 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-8 bg-border" />
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              About Parallane
            </p>
            <span aria-hidden className="h-px w-8 bg-border" />
          </div>

          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance md:text-6xl lg:text-7xl">
            We teach the craft
            <br />
            <span className="text-muted-foreground">behind the code.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-balance text-muted-foreground md:text-lg md:leading-8">
            Parallane is an online learning platform for people who want to
            build for the web — properly, from the ground up, without shortcuts.
          </p>
        </div>
      </div>
    </section>
  )
}

// ============================================
// STORY
// ============================================

function Story() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          <div className="md:sticky md:top-24 md:self-start">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Why we exist
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
              Most tutorials teach
              <br />
              <span className="text-muted-foreground">the wrong thing.</span>
            </h2>
          </div>

          <div className="space-y-6 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            <p>
              There's no shortage of content on the internet about web
              development. YouTube has millions of hours of it. Every platform
              has another "complete course" that promises to make you a
              developer in a weekend.
            </p>

            <p>And yet most people who try to learn still don't make it.</p>

            <p>
              Not because they aren't smart enough. Because the content they
              learn from is scattered, outdated, or designed for clicks instead
              of comprehension. They jump between five different teachers, never
              finish anything, and end up with a folder of half-watched videos
              and no real skills.
            </p>

            <p>
              Parallane is our answer to that. Structured roadmaps instead of
              random videos. Depth instead of speed. Projects that actually work
              when you finish them. Instructors who care whether you understand
              what you're doing, not just whether you can copy what they typed.
            </p>

            <p className="text-foreground">
              We built Parallane because we wished it existed when we were
              learning. Now it does.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// PRINCIPLES
// ============================================

const principles = [
  {
    icon: Compass,
    title: "Direction over content",
    description:
      "The internet has enough tutorials. What it doesn't have is a clear path. Every course on Parallane belongs to a roadmap, so you always know what to learn and why.",
  },
  {
    icon: BookOpen,
    title: "Depth over speed",
    description:
      "We won't promise to make you a developer in a month. Real skill takes time, and pretending otherwise wastes yours. Our courses are thorough because they need to be.",
  },
  {
    icon: Heart,
    title: "Craft over shortcuts",
    description:
      "Anyone can copy-paste a solution. We teach the thinking behind it — the why, the trade-offs, and the taste that separates good work from functional work.",
  },
  {
    icon: Users,
    title: "Humans over algorithms",
    description:
      "You can ask a real instructor when you're stuck. No AI-generated answers, no support tickets that go nowhere. Someone who actually knows the material will reply.",
  },
]

function Principles() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-8 bg-border" />
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              What we believe
            </p>
            <span aria-hidden className="h-px w-8 bg-border" />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-balance md:text-4xl lg:text-5xl">
            Four principles behind
            <br />
            <span className="text-muted-foreground">everything we make.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {principles.map((principle, idx) => {
            const Icon = principle.icon

            return (
              <Card
                key={principle.title}
                className="group relative overflow-hidden border-border/60 p-6 transition-all duration-300 hover:border-foreground/20 md:p-8"
              >
                {/* Ghost index */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-4 right-4 text-[6rem] leading-none font-black tracking-tighter text-foreground/3 select-none md:text-[8rem]"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <div className="flex size-11 items-center justify-center rounded-xl border bg-muted/40 transition-colors group-hover:bg-muted">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold tracking-tight">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ============================================
// NUMBERS
// ============================================

const numbers = [
  { value: "10+", label: "Courses", sub: "And growing" },
  { value: "6K+", label: "Students", sub: "Monthly active" },
  { value: "4.9", label: "Rating", sub: "Across all courses" },
  { value: "3", label: "Roadmaps", sub: "Design · Front · Back" },
]

function Numbers() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-zinc-50">
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

      {/* Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-100 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase">
            By the numbers
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance text-white md:text-4xl">
            Small enough to care.
            <br />
            <span className="text-zinc-500">Big enough to matter.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-8">
          {numbers.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl leading-none font-semibold tracking-[-0.04em] text-white md:text-5xl">
                {stat.value}
              </p>

              <p className="mt-3 text-sm font-medium text-zinc-300">
                {stat.label}
              </p>

              <p className="mt-1 text-xs text-zinc-500">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// CTA
// ============================================

function CTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-100 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/6">
          <Sparkles className="size-6 text-emerald-500" strokeWidth={1.75} />
        </div>

        <h2 className="mt-8 text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance md:text-5xl lg:text-6xl">
          Ready to build
          <br />
          <span className="text-muted-foreground">something real?</span>
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-balance text-muted-foreground">
          Pick a roadmap, start with the fundamentals, and get one step closer
          to the developer you want to become.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/roadmaps" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="group h-12 w-full rounded-xl px-7 text-sm font-semibold sm:w-auto"
            >
              Explore roadmaps
              <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>

          <Link href="/pricing" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="group h-12 w-full rounded-xl px-7 text-sm font-medium sm:w-auto"
            >
              See pricing
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground/70">
          No commitment · Cancel anytime
        </p>
      </div>
    </section>
  )
}
