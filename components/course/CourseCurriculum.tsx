import { Clock3, FileText, Play } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import type { CourseSeason } from "@/lib/courses"

interface CourseCurriculumProps {
  seasons: CourseSeason[]
  duration: string
}

export default function CourseCurriculum({
  seasons,
  duration,
}: CourseCurriculumProps) {
  const lessonCount = seasons.reduce(
    (total, season) => total + season.lessons.length,
    0
  )

  return (
    <section id="curriculum" className="border-b">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Curriculum
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              What's inside.
            </h2>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{seasons.length} seasons</span>
            <span className="text-border">/</span>
            <span>{lessonCount} lessons</span>
            <span className="text-border">/</span>
            <span>{duration}</span>
          </div>
        </div>

        <Accordion
          defaultValue={["season-0"]}
          className="overflow-hidden rounded-3xl border"
        >
          {seasons.map((season, seasonIndex) => (
            <AccordionItem
              key={season.title}
              value={`season-${seasonIndex}`}
              className="border-b px-3 last:border-b-0 md:px-5"
            >
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex w-full items-center gap-5 pr-4 text-left">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(seasonIndex + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold md:text-lg">
                      {season.title}
                    </h3>

                    <p className="mt-1 max-w-xl text-sm leading-6 font-normal text-muted-foreground">
                      {season.description}
                    </p>
                  </div>

                  <div className="hidden shrink-0 items-center gap-2 text-xs text-muted-foreground sm:flex">
                    <Clock3 className="size-3.5" />
                    {season.duration}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-6">
                <div className="overflow-hidden rounded-2xl">
                  {season.lessons.map((lesson, lessonIndex) => {
                    const isVideo = lesson.type === "video"

                    return (
                      <div
                        key={lesson.title}
                        className="flex items-center gap-4 border-b py-2 last:border-b-0"
                      >
                        <span className="w-7 shrink-0 text-center font-mono text-[11px] text-muted-foreground">
                          {String(lessonIndex + 1).padStart(2, "0")}
                        </span>

                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/60">
                          {isVideo ? (
                            <Play className="size-3.5" />
                          ) : (
                            <FileText className="size-3.5" />
                          )}
                        </div>

                        <p className="min-w-0 flex-1 truncate text-sm font-medium">
                          {lesson.title}
                        </p>

                        <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock3 className="size-3" />
                          {lesson.duration}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
