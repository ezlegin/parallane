"use client"

import { ArrowDown, ArrowUp, CircleCheckBig, Loader2 } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

import { markLessonComplete } from "@/actions/classroom"
import { Button } from "@/components/ui/button"
import type { SeasonWithLessons } from "@/lib/classroom"
import { flattenLessons } from "@/lib/classroom"
import { handleRes } from "@/lib/handleRes"
import { cn } from "cn"

type Props = {
  seasons: SeasonWithLessons[]
  currentLessonId: string
  classroomId: string
  isCompleted: boolean
}

export function ClassroomNavigation({
  seasons,
  currentLessonId,
  classroomId,
  isCompleted,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const lessons = flattenLessons(seasons)
  const currentIndex = lessons.findIndex((l) => l.id === currentLessonId)

  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  function goToLesson(lessonId: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("lesson", lessonId)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function onMarkComplete() {
    startTransition(async () => {
      const res = await markLessonComplete({
        classroomId,
        lessonId: currentLessonId,
      })
      handleRes(res)

      if ("success" in res && nextLesson) {
        goToLesson(nextLesson.id)
      }
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size={"icon"}
        disabled={!previousLesson}
        onClick={() => previousLesson && goToLesson(previousLesson.id)}
      >
        <ArrowUp />
      </Button>

      <Button
        variant={"outline"}
        disabled={isPending || isCompleted}
        onClick={onMarkComplete}
        className={cn(
          isCompleted && "border-green-500/60 bg-green-500/10 text-emerald-400"
        )}
      >
        {isPending ? <Loader2 className="animate-spin" /> : <CircleCheckBig />}
        <span className="hidden sm:inline">
          {isCompleted ? "Completed" : "Mark as complete"}
        </span>
      </Button>

      <Button
        size={"icon"}
        disabled={!nextLesson}
        onClick={() => nextLesson && goToLesson(nextLesson.id)}
      >
        <ArrowDown />
      </Button>
    </div>
  )
}
