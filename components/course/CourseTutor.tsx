import { UserRound } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface CourseTutorProps {
  name: string
  summary: string
}

export default function CourseTutor({ name, summary }: CourseTutorProps) {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Your tutor
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            Learn from someone
            <br />
            <span className="text-muted-foreground">who builds.</span>
          </h2>
        </div>

        <Card className="mx-auto mt-14 max-w-3xl rounded-3xl p-8 md:p-10">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border bg-muted font-mono text-xl">
              <UserRound className="size-7 text-muted-foreground" />
            </div>

            <div>
              <Badge variant="outline" className="rounded-full">
                Instructor
              </Badge>

              <h3 className="mt-3 text-2xl font-semibold">{name}</h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {summary}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
