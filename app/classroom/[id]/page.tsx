import { AskTutor } from "@/components/classroom/ask-tutor"
import { ClassroomCurriculum } from "@/components/classroom/classroom-curriculum"
import { ClassroomHeader } from "@/components/classroom/classroom-header"
import { ClassroomLessonInfo } from "@/components/classroom/classroom-lesson-info"
import { ClassroomNavigation } from "@/components/classroom/classroom-navigation"
import { ClassroomVideo } from "@/components/classroom/classroom-video"
import { prisma } from "@/prisma/prisma"
import { notFound } from "next/navigation"

type ClassroomPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ClassroomPage({ params }: ClassroomPageProps) {
  const { id } = await params

  console.log(id)

  const classroom = await prisma.classroom.findFirst({
    where: { id },
    include: {
      course: {
        include: {
          courseProgresses: true,
          seasons: { include: { lessons: true } },
        },
      },
    },
  })

  console.log(classroom)

  if (!classroom) {
    notFound()
  }

  const course = classroom.course
  const currentLesson = course.seasons[0].lessons[0]

  if (!currentLesson) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <ClassroomHeader title={course.title} progress={42} />

      <div className="mx-auto max-w-[1600px]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
          <main className="min-w-0 p-3">
            <ClassroomVideo lesson={currentLesson} />

            <ClassroomLessonInfo lesson={currentLesson} />

            <ClassroomNavigation
              seasons={course.seasons}
              currentLesson={currentLesson}
            />

            <AskTutor
              courseTitle={course.title}
              lessonTitle={currentLesson.title}
            />
          </main>

          <aside className="border-t lg:border-t-0 lg:border-l">
            <ClassroomCurriculum
              seasons={course.seasons}
              currentLessonId={currentLesson.id}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}
