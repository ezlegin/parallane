import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, Clock3 } from "lucide-react"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const roadmaps = {
  "web-design": {
    title: "Web Design",
    eyebrow: "Design roadmap",
    description:
      "Learn how to create beautiful, intuitive, and purposeful digital experiences from idea to interface.",
    outcome:
      "By the end of this roadmap, you'll be able to design complete digital experiences with confidence.",
    duration: "3 months",
    courses: [
      {
        title: "Web Design Principles",
        slug: "web-design-principles",
        duration: "4h 20m",
        description:
          "Learn the principles behind hierarchy, composition, typography, spacing, and visual communication.",
      },
      {
        title: "Figma",
        slug: "figma",
        duration: "6h 40m",
        description:
          "Learn how to turn ideas into polished interfaces, wireframes, prototypes, and reusable design systems.",
      },
      {
        title: "UI Design",
        slug: "ui-design",
        duration: "7h 30m",
        description:
          "Bring everything together and learn how to design modern interfaces that are clear, usable, and visually strong.",
      },
    ],
  },

  "front-end": {
    title: "Front-End",
    eyebrow: "Development roadmap",
    description:
      "Master the technologies behind modern websites and build responsive, interactive, production-ready applications.",
    outcome:
      "By the end of this roadmap, you'll have the skills to build complete modern web applications.",
    duration: "6 months",
    courses: [
      {
        title: "HTML",
        slug: "html",
        duration: "3h 20m",
        description:
          "Learn how the web is structured and build accessible, semantic pages from the ground up.",
      },
      {
        title: "CSS",
        slug: "css",
        duration: "5h 40m",
        description:
          "Master layouts, responsive design, animations, positioning, and modern CSS techniques.",
      },
      {
        title: "JavaScript",
        slug: "javascript",
        duration: "12h 30m",
        description:
          "Learn the language that powers the modern web and turn static pages into interactive applications.",
      },
      {
        title: "TypeScript",
        slug: "typescript",
        duration: "7h 10m",
        description:
          "Add type safety to your applications and write more predictable, maintainable code.",
      },
      {
        title: "React",
        slug: "react",
        duration: "9h 40m",
        description:
          "Learn component-based development and build dynamic interfaces using React.",
      },
      {
        title: "Next.js",
        slug: "next-js",
        duration: "11h 20m",
        description:
          "Build full-featured web applications with routing, data fetching, server components, and more.",
      },
    ],
  },

  "back-end": {
    title: "Back-End",
    eyebrow: "Development roadmap",
    description:
      "Understand what happens behind the interface and learn to build APIs, databases, and reliable server-side systems.",
    outcome:
      "By the end of this roadmap, you'll understand how to build and deploy the systems that power modern applications.",
    duration: "5 months",
    courses: [
      {
        title: "JavaScript",
        slug: "javascript",
        duration: "12h 30m",
        description:
          "Build a strong programming foundation before moving into server-side development.",
      },
      {
        title: "Node.js",
        slug: "node-js",
        duration: "9h 20m",
        description:
          "Learn server-side JavaScript and build APIs and backend applications with Node.js.",
      },
      {
        title: "MySQL",
        slug: "mysql",
        duration: "6h 30m",
        description:
          "Learn how to design, query, and manage relational databases for real-world applications.",
      },
      {
        title: "Git",
        slug: "git",
        duration: "3h 10m",
        description:
          "Learn version control and the workflows developers use to collaborate and ship code.",
      },
      {
        title: "Docker",
        slug: "docker",
        duration: "5h 20m",
        description:
          "Containerize your applications and learn how to create consistent development and deployment environments.",
      },
    ],
  },
} as const

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
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
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
