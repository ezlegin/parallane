interface CourseAudienceProps {
  items: string[]
}

export default function CourseAudience({ items }: CourseAudienceProps) {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-24">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Who is this for?
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              Built for people
              <br />
              <span className="text-muted-foreground">who want to build.</span>
            </h2>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item}
                className="flex gap-5 border-b py-3 last:border-b-0"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
