import { Check } from "lucide-react"

interface CourseOverviewProps {
  learn: string[]
}

export default function CourseOverview({ learn }: CourseOverviewProps) {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          {/* Left — sticky heading */}
          <div className="md:sticky md:top-24 md:self-start">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              What you'll learn
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              Skills you'll
              <br />
              <span className="text-muted-foreground">walk away with.</span>
            </h2>
          </div>

          {/* Right — learn grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {learn.map((item, idx) => (
              <div key={idx} className="flex gap-3 rounded-xl border p-4">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="size-3" />
                </span>

                <span className="text-sm leading-6">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
