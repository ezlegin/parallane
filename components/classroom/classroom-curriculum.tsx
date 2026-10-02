"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Lesson, Season } from "@/prisma/generated/prisma/client"
import { Check, CirclePlay, FileText, Play } from "lucide-react"

type ClassroomCurriculumProps = {
  seasons: (Season & { lessons: Lesson[] })[]
  currentLessonId: string
}

export function ClassroomCurriculum({
  seasons,
  currentLessonId,
}: ClassroomCurriculumProps) {
  return (
    <div className="p-3 lg:sticky lg:top-0 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
      <Accordion
        defaultValue={seasons.map((season) => season.id)}
        className="w-full"
      >
        {seasons.map((season, idx) => (
          <AccordionItem key={season.id} value={idx}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                <span className="font-medium">{season.title}</span>

                <span className="mt-1 text-xs font-normal text-muted-foreground">
                  {season.lessons.length} lessons ·{" "}
                  {season.lessons.reduce((acc, curr) => acc + curr.duration, 0)}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-3">
              <div className="space-y-1">
                {season.lessons.map((lesson) => {
                  const isCurrent = lesson.id === currentLessonId

                  return (
                    <Button
                      key={lesson.id}
                      variant="ghost"
                      className={cn(
                        "h-auto w-full justify-start py-2 text-left",
                        isCurrent && "bg-muted font-medium"
                      )}
                      onClick={() => handleLessonSelect(lesson.id)}
                    >
                      <div className="flex size-7 shrink-0 items-center justify-center">
                        {false ? (
                          <Check className="size-4" />
                        ) : isCurrent ? (
                          <CirclePlay className="size-4" />
                        ) : lesson.type === "doc" ? (
                          <FileText className="size-4" />
                        ) : (
                          <Play className="size-4" />
                        )}
                      </div>

                      <div className="flex w-full items-center justify-between">
                        <span className="truncate text-sm">{lesson.title}</span>

                        <span className="text-xs text-muted-foreground">
                          {lesson.duration}
                        </span>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function handleLessonSelect(lessonId: string) {
  /*
   * This will eventually change the active lesson.
   *
   * Recommended:
   *
   * router.push(
   *   `/classroom/${courseSlug}?lesson=${lessonId}`
   * )
   *
   * or use a server-side progress system.
   */
}
