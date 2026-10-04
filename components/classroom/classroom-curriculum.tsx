"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import type { SeasonWithLessons } from "@/lib/classroom"
import { formatDuration } from "@/lib/formatDuration"
import { getDocUrl } from "@/lib/lesson"
import { cn } from "@/lib/utils"
import { LessonType } from "@/prisma/generated/prisma/enums"
import { CircleCheckBig, Download, FileText, Play } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "../ui/toast"

type Props = {
  seasons: SeasonWithLessons[]
  currentLessonId: string
  defaultSeasonId: string
}

export function ClassroomCurriculum({
  seasons,
  currentLessonId,
  defaultSeasonId,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  async function goToLesson(lessonId: string, lessonType: LessonType) {
    if (lessonType === "doc") {
      const url = await getDocUrl(lessonId)

      if (!url) {
        toast.add({
          title: "Document not found.",
          type: "error",
        })
        return
      }

      const link = document.createElement("a")
      link.href = url
      link.download = ""
      link.rel = "noopener"
      document.body.appendChild(link)
      link.click()
      link.remove()

      return
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set("lesson", lessonId)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const [openSeasons, setOpenSeasons] = useState<string[]>([defaultSeasonId])

  useEffect(() => {
    setOpenSeasons([defaultSeasonId])
  }, [defaultSeasonId])

  return (
    <div className="p-3 lg:sticky lg:top-0 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
      <Accordion
        value={openSeasons}
        onValueChange={setOpenSeasons}
        className="w-full"
      >
        {seasons.map((season) => {
          const total = season.lessons.reduce(
            (acc, curr) => acc + curr.duration,
            0
          )

          return (
            <AccordionItem key={season.id} value={season.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                  <span className="font-medium">{season.title}</span>
                  <span className="mt-1 text-xs font-normal text-muted-foreground">
                    {season.lessons.length} lessons · {formatDuration(total)}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-3">
                <div className="space-y-1">
                  {season.lessons.map((lesson) => {
                    const isCurrent = lesson.id === currentLessonId
                    const isDone = lesson.progress.some((p) => p.completedAt)

                    return (
                      <Button
                        key={lesson.id}
                        variant="ghost"
                        className={cn(
                          "h-auto w-full justify-start px-2 py-2 text-left",
                          isCurrent && "bg-muted font-medium"
                        )}
                        onClick={() => goToLesson(lesson.id, lesson.type)}
                      >
                        <div
                          className={cn(
                            isDone &&
                              lesson.type === "video" &&
                              "text-emerald-400",
                            "flex size-7 shrink-0 items-center justify-center"
                          )}
                        >
                          {isDone ? (
                            <CircleCheckBig className="size-4" />
                          ) : lesson.type === "doc" ? (
                            <FileText className="size-4" />
                          ) : (
                            <Play className="size-4" />
                          )}
                        </div>

                        <div className="flex w-full items-center justify-between">
                          <div className="truncate text-sm">{lesson.title}</div>
                          <span className="text-xs text-muted-foreground">
                            {lesson.type === "doc" ? (
                              <Download />
                            ) : (
                              formatDuration(lesson.duration)
                            )}
                          </span>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
