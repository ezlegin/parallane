import { notFound } from "next/navigation"

import { coursesx } from "@/lib/courses"

import { ClassroomHeader } from "@/components/classroom/classroom-header"
import { ClassroomVideo } from "@/components/classroom/classroom-video"
import { ClassroomCurriculum } from "@/components/classroom/classroom-curriculum"
import { ClassroomLessonInfo } from "@/components/classroom/classroom-lesson-info"
import { ClassroomNavigation } from "@/components/classroom/classroom-navigation"
import { AskTutor } from "@/components/classroom/ask-tutor"

type ClassroomPageProps = {
  params: Promise<{
    courseSlug: string
  }>
}

export default async function ClassroomPage({ params }: ClassroomPageProps) {
  const { courseSlug } = await params

  const course = coursesx.find((course) => course.slug === courseSlug)

  if (!course) {
    notFound()
  }

  /*
   * For now we select the first lesson.
   *
   * Later this should come from the user's progress:
   *
   * const currentLesson = await getLastWatchedLesson(...)
   */
  const currentLesson = course.curriculum[0]?.lessons[0]

  if (!currentLesson) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <ClassroomHeader course={course} progress={42} />

      <div className="mx-auto max-w-[1600px]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
          <main className="min-w-0 p-3">
            <ClassroomVideo lesson={currentLesson} />

            <ClassroomLessonInfo lesson={currentLesson} />

            <ClassroomNavigation
              course={course}
              currentLesson={currentLesson}
            />

            <AskTutor
              courseTitle={course.title}
              lessonTitle={currentLesson.title}
            />
          </main>

          <aside className="border-t lg:border-t-0 lg:border-l">
            <ClassroomCurriculum
              curriculum={course.curriculum as any} // todo: fix this any leter.
              currentLessonId={currentLesson.id}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}
