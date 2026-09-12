import { Check } from "lucide-react"

interface CourseOverviewProps {
  description: string
  learn: string[]
}

export default function CourseOverview({
  description,
  learn,
}: CourseOverviewProps) {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              About this course
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              Start with the
              <br />
              <span className="text-muted-foreground">fundamentals.</span>
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-muted-foreground">
              {description}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {learn.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border p-4">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                    <Check className="size-3" />
                  </span>

                  <span className="text-sm leading-6">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
