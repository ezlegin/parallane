interface CourseDescriptionProps {
  description: string
}

export default function CourseDescription({
  description,
}: CourseDescriptionProps) {
  const paragraphs = description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          {/* Left — sticky heading */}
          <div className="md:sticky md:top-24 md:self-start">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              About this course
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              What this course
              <br />
              <span className="text-muted-foreground">is really about.</span>
            </h2>
          </div>

          {/* Right — long-form description */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base leading-7 text-muted-foreground md:text-lg md:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
