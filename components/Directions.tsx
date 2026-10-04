import { homePagePadding } from "@/app/(HOME)/page"
import { cn } from "cn"
import { ArrowRight, Layout, Palette, Server } from "lucide-react"
import Link from "next/link"

import { Button } from "./ui/button"
import { Card } from "./ui/card"

const directions = [
  {
    number: "01",
    dirKey: "web-design",
    title: "Web Designer",
    description:
      "Learn visual design, UI design, Figma, and the principles behind great websites.",
    icon: Palette,
    meta: { courses: 8, hours: 32, level: "Beginner friendly" },
  },
  {
    number: "02",
    dirKey: "front-end",
    title: "Front-End Developer",
    description:
      "Go from HTML and CSS to JavaScript, React, TypeScript, and Next.js.",
    icon: Layout,
    meta: { courses: 12, hours: 48, level: "Beginner friendly" },
  },
  {
    number: "03",
    dirKey: "back-end",
    title: "Back-End Developer",
    description:
      "Learn databases, APIs, Node.js, Docker, and everything behind the interface.",
    icon: Server,
    meta: { courses: 10, hours: 44, level: "Intermediate" },
  },
]

export const Directions = () => {
  return (
    <section className={cn(homePagePadding, "relative")}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-24">
          {/* LEFT — editorial, sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-6">
              {/* Eyebrow with a leading rule */}
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-border" />
                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  Roadmaps
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance md:text-5xl lg:text-6xl">
                Learn with
                <br />
                direction.
              </h2>

              {/* Description */}
              <p className="max-w-md leading-7 text-muted-foreground">
                Don't know what to learn next? Choose your goal and we'll show
                you the courses you need, in the right order.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/roadmaps">
                  <Button size="lg" className="group">
                    See full roadmaps
                    <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </div>

              {/* Quiet footnote */}
              <p className="pt-4 text-xs tracking-wide text-muted-foreground/70">
                3 directions · 30 courses · 124 hours
              </p>
            </div>
          </div>

          {/* RIGHT — stacked chapter cards */}
          <div className="space-y-5">
            {directions.map((direction) => (
              <RoadmapCard key={direction.dirKey} {...direction} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- RoadmapCard ----------

type RoadmapCardProps = (typeof directions)[number]

function RoadmapCard({
  number,
  dirKey,
  title,
  description,
  icon: Icon,
  meta,
}: RoadmapCardProps) {
  return (
    <Link href={`/roadmaps/${dirKey}`} className="group block">
      <Card className="relative overflow-hidden p-0 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/3">
        {/* Ghost number — grows and drifts on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 -right-2 text-[8rem] leading-none font-black tracking-tighter text-foreground/2.5 transition-all duration-500 select-none group-hover:-translate-y-2 group-hover:text-foreground/5"
        >
          {number}
        </span>

        {/* Left accent bar — grows from top on hover */}
        <span
          aria-hidden
          className="absolute top-0 left-0 h-full w-0.5 origin-top scale-y-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-y-100"
        />

        <div className="relative p-6 md:p-8 lg:p-10">
          {/* Top row — icon + number, and the arrow button */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border bg-muted/40 transition-colors duration-300 group-hover:border-foreground/20 group-hover:bg-muted/80">
                <Icon className="size-4" strokeWidth={1.75} />
              </div>

              <span className="font-mono text-xs tracking-widest text-muted-foreground tabular-nums">
                {number}
              </span>
            </div>

            <div className="flex size-11 shrink-0 items-center justify-center rounded-full border bg-background transition-all duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-8 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-3 max-w-md leading-7 text-muted-foreground">
            {description}
          </p>

          {/* Meta row */}
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>{meta.courses} courses</span>
            <span aria-hidden className="size-1 rounded-full bg-border" />
            <span>{meta.hours} hours</span>
            <span aria-hidden className="size-1 rounded-full bg-border" />
            <span>{meta.level}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
