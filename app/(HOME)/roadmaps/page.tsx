import Link from "next/link"
import { ArrowUpRight, Clock3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const roadmaps = [
  {
    number: "01",
    slug: "web-design",
    title: "Web Design",
    description:
      "Learn how to turn ideas into beautiful, intuitive, and purposeful digital experiences.",
    duration: "3 months",
    courses: 3,
    skills: ["Design Principles", "Figma", "UI Design"],
  },
  {
    number: "02",
    slug: "front-end",
    title: "Front-End",
    description:
      "Master the technologies behind modern interfaces and learn how to build real-world web applications.",
    duration: "6 months",
    courses: 6,
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Next.js"],
  },
  {
    number: "03",
    slug: "back-end",
    title: "Back-End",
    description:
      "Learn how applications work behind the scenes and build reliable APIs, databases, and server-side systems.",
    duration: "5 months",
    courses: 5,
    skills: ["JavaScript", "Node.js", "MySQL", "Git", "Docker"],
  },
]

export default function RoadmapsPage() {
  return (
    <main>
      {/* Roadmaps */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Choose your path
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Where do you want to go?
              </h2>
            </div>

            <span className="hidden font-mono text-xs text-muted-foreground md:block">
              03 PATHS
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {roadmaps.map((roadmap) => (
              <Link
                key={roadmap.slug}
                href={`/roadmaps/${roadmap.slug}`}
                className="group"
              >
                <Card className="relative flex h-full min-h-105 flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 md:p-8">
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground transition-colors">
                      {roadmap.number}
                    </span>

                    <div className="flex size-10 items-center justify-center rounded-full border transition-transform duration-300 group-hover:-rotate-45">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-auto">
                    <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground transition-colors">
                      <Clock3 className="size-3.5" />
                      {roadmap.duration}
                      <span>·</span>
                      {roadmap.courses} courses
                    </div>

                    <h3 className="text-3xl font-semibold tracking-tight">
                      {roadmap.title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-muted-foreground transition-colors">
                      {roadmap.description}
                    </p>

                    {/* Skills */}
                    <div className="mt-8 flex flex-wrap gap-2">
                      {roadmap.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border px-3 py-1.5 text-[11px] text-muted-foreground transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Badge variant="outline" className="rounded-full px-3 py-1.5">
                Start building
              </Badge>

              <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                Your next skill is
                <br />
                <span className="text-muted-foreground">one course away.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Pick a roadmap and let Parallane guide you from the fundamentals
              to building real-world applications.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
