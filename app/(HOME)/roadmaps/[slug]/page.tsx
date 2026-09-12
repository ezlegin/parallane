import { ArrowLeft, ArrowUpRight, Check, Clock3 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { roadmaps } from "@/lib/roadmaps"

type RoadmapSlug = keyof typeof roadmaps

interface RoadmapPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { slug } = await params

  if (!(slug in roadmaps)) {
    notFound()
  }

  const roadmap = roadmaps[slug as RoadmapSlug]

  const totalMinutes = roadmap.courses.reduce((total, course) => {
    const [hours, minutes] = course.duration
      .replace("h", "")
      .replace("m", "")
      .split(" ")
      .map(Number)

    return total + hours * 60 + minutes
  }, 0)

  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  return (
    <main>
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
          <Link
            href="/roadmaps"
            className="group mb-16 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            All roadmaps
          </Link>

          <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-4xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-foreground" />

                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {roadmap.eyebrow}
                </p>
              </div>

              <h1 className="text-6xl font-semibold tracking-[-0.06em] md:text-8xl">
                {roadmap.title}
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                {roadmap.description}
              </p>
            </div>

            <div className="flex gap-8 md:pb-2">
              <div>
                <p className="font-mono text-2xl font-medium">
                  {roadmap.courses.length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Courses</p>
              </div>

              <div>
                <p className="font-mono text-2xl font-medium">
                  {roadmap.duration}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Suggested pace
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
          <div className="mb-14">
            <Badge variant="outline" className="rounded-full px-3 py-1.5">
              Your journey
            </Badge>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              Learn in the right order.
            </h2>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Each course builds on the previous one. Follow the path from
              beginning to end and build your skills step by step.
            </p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute top-6 bottom-6 left-5 w-px bg-border md:left-6" />

            <div className="space-y-5">
              {roadmap.courses.map((course, index) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group relative block"
                >
                  <div className="flex gap-5 md:gap-8">
                    {/* Number */}
                    <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs transition-colors group-hover:bg-foreground group-hover:text-background md:size-12">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Course */}
                    <Card className="flex flex-1 flex-col gap-6 rounded-2xl p-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-foreground/30 md:p-8">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                              {course.title}
                            </h3>

                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock3 className="size-3.5" />
                              {course.duration}
                            </span>
                          </div>

                          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                            {course.description}
                          </p>
                        </div>

                        <div className="hidden size-9 shrink-0 items-center justify-center rounded-full border transition-all group-hover:-rotate-45 sm:flex">
                          <ArrowUpRight className="size-4" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-xs font-medium text-muted-foreground">
                          Step {index + 1} of {roadmap.courses.length}
                        </span>

                        <span className="text-xs font-medium">
                          Start course →
                        </span>
                      </div>
                    </Card>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
          <div className="rounded-3xl border bg-background p-8 md:p-12">
            <div className="flex size-11 items-center justify-center rounded-full bg-foreground text-background">
              <Check className="size-5" />
            </div>

            <h2 className="mt-7 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              You're not just finishing courses.
              <br />
              <span className="text-muted-foreground">
                You're becoming a {roadmap.title.toLowerCase()}.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              {roadmap.outcome}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{roadmap.courses.length} courses</span>
              <span>·</span>
              <span>
                {totalHours}h {remainingMinutes > 0 && `${remainingMinutes}m`}{" "}
                of learning
              </span>
            </div>

            <Link href={`/courses/${roadmap.courses[0].slug}`}>
              <Button size="lg" className="mt-8 h-12">
                Start the roadmap
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
