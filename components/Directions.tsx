import { homePagePadding } from "@/app/(HOME)/page"
import { cn } from "cn"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export const Directions = () => {
  const directions = [
    {
      number: "01",
      title: "Web Designer",
      description:
        "Learn visual design, UI design, Figma, and the principles behind great websites.",
    },
    {
      number: "02",
      title: "Front-End Developer",
      description:
        "Go from HTML and CSS to JavaScript, React, TypeScript, and Next.js.",
    },
    {
      number: "03",
      title: "Back-End Developer",
      description:
        "Learn databases, APIs, Node.js, Docker, and everything behind the interface.",
    },
  ]

  return (
    <section className={cn(homePagePadding)}>
      <div className="mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
              Roadmaps
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Learn with direction.
            </h2>

            <p className="max-w-xl leading-7 text-muted-foreground">
              Don't know what to learn next? Choose your goal and we'll show you
              the courses you need, in the right order.
            </p>

            <Button>See Full Roadmaps</Button>
          </div>

          <div className="space-y-4">
            {directions.map((roadmap) => (
              <Card key={roadmap.number} className="p-0">
                <Link
                  href="/roadmaps"
                  className="group grid grid-cols-[30px_1fr_auto] items-start gap-6 px-4 py-3 transition-colors hover:bg-muted/30"
                >
                  <span className="font-mono text-sm text-muted-foreground">
                    {roadmap.number}
                  </span>

                  <div>
                    <h3 className="text-2xl font-medium">{roadmap.title}</h3>

                    <p className="max-w-xl leading-7 text-muted-foreground">
                      {roadmap.description}
                    </p>
                  </div>

                  <span className="pr-2 text-muted-foreground transition-transform group-hover:translate-x-2">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
