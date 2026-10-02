import { Lesson } from "@/prisma/generated/prisma/client"

export function ClassroomLessonInfo({ lesson }: { lesson: Lesson }) {
  return (
    <section className="py-3">
      <div>
        <span className="text-xs text-muted-foreground">Lesson:</span>
        <h1 className="text-lg font-semibold tracking-tight md:text-xl">
          {lesson.title}
        </h1>
      </div>
    </section>
  )
}
