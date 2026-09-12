import { ArrowUpRight, Clock3 } from "lucide-react"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { roadmapsCategory } from "@/lib/roadmaps"

export default function RoadmapsPage() {
  return (
    <main>
      {/* Roadmaps */}
      <section>
        <div className="mx-auto max-w-6xl px-6">
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
            {roadmapsCategory.map((roadmap) => (
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
    </main>
  )
}
