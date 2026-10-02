import { Badge } from "@/components/ui/badge"
import { Lesson } from "@/prisma/generated/prisma/client"

export function ClassroomLessonInfo({ lesson }: { lesson: Lesson }) {
  return (
    <section className="border-b py-6">
      <div className="mx-auto">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Lesson</Badge>

          <span className="text-sm text-muted-foreground">
            {lesson.duration}
          </span>
        </div>

        <h1 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
          {lesson.title}
        </h1>
      </div>
    </section>
  )
}
