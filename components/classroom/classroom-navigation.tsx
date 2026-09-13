"use client"

import { ArrowLeft, ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"

type ClassroomNavigationProps = {
  course: {
    curriculum: {
      lessons: {
        id: string
        title: string
      }[]
    }[]
  }
  currentLesson: {
    id: string
  }
}

export function ClassroomNavigation({
  course,
  currentLesson,
}: ClassroomNavigationProps) {
  const lessons = course.curriculum.flatMap((season) => season.lessons)

  const currentIndex = lessons.findIndex(
    (lesson) => lesson.id === currentLesson.id
  )

  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null

  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  return (
    <div className="border-b py-4">
      <div className="mx-auto flex items-center justify-between gap-3">
        <Button
          variant="outline"
          disabled={!previousLesson}
          onClick={() =>
            previousLesson && handleLessonChange(previousLesson.id)
          }
        >
          <ArrowLeft />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <Button
          variant="outline"
          onClick={() => markLessonComplete(currentLesson.id)}
        >
          <Check />
          <span className="hidden sm:inline">Mark as complete</span>
        </Button>

        <Button
          disabled={!nextLesson}
          onClick={() => nextLesson && handleLessonChange(nextLesson.id)}
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

function handleLessonChange(lessonId: string) {
  // router.push(`/classroom/...?...`)
}

function markLessonComplete(lessonId: string) {
  // Server action / API call
}
