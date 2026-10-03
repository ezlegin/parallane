import { AskTutor } from "@/components/classroom/ask-tutor"
import { ClassroomCurriculum } from "@/components/classroom/classroom-curriculum"
import { ClassroomHeader } from "@/components/classroom/classroom-header"
import { ClassroomLessonInfo } from "@/components/classroom/classroom-lesson-info"
import { ClassroomNavigation } from "@/components/classroom/classroom-navigation"
import { ClassroomVideo } from "@/components/classroom/classroom-video"
import { findLesson, findResumeLesson } from "@/lib/classroom"
import { getSessionUser } from "@/lib/user"
import { prisma } from "@/prisma/prisma"
import { notFound, redirect } from "next/navigation"

type ClassroomPageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ lesson?: string }>
}

export default async function ClassroomPage({
  params,
  searchParams,
}: ClassroomPageProps) {
  const user = await getSessionUser()
  if (!user) redirect("/login")

  const { id } = await params
  const { lesson: lessonId } = await searchParams

  const classroom = await prisma.classroom.findFirst({
    where: { id, userId: user.id },
    include: {
      conversation: { include: { messages: true } },
      course: {
        include: {
          seasons: {
            orderBy: { order: "asc" },
            include: {
              lessons: {
                orderBy: { order: "asc" },
                include: {
                  progress: {
                    where: { userId: user.id },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  if (!classroom) notFound()

  const course = classroom.course

  // 1. Try the lesson from the URL
  // 2. Otherwise, resume at the first unwatched lesson
  const resolved = lessonId
    ? findLesson(course.seasons, lessonId)
    : findResumeLesson(course.seasons)

  if (!resolved) return null

  const { season: currentSeason, lesson: currentLesson } = resolved

  // Overall progress
  const allLessons = course.seasons.flatMap((s) => s.lessons)
  const completed = allLessons.filter((l) =>
    l.progress.some((p) => p.completedAt)
  ).length
  const progress =
    allLessons.length === 0
      ? 0
      : Math.round((completed / allLessons.length) * 100)

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <ClassroomHeader title={course.title} progress={progress} />

      <div className="mx-auto max-w-[1600px]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_400px]">
          <main className="min-w-0 p-3">
            <ClassroomVideo lesson={currentLesson} />
            <div className="flex w-full items-center justify-between border-b">
              <ClassroomLessonInfo lesson={currentLesson} />

              <ClassroomNavigation
                seasons={course.seasons}
                currentLessonId={currentLesson.id}
                classroomId={classroom.id}
                isCompleted={currentLesson.progress.some((p) => p.completedAt)}
              />
            </div>

            <AskTutor
              classroomId={classroom.id}
              course={course}
              lessonTitle={currentLesson.title}
              user={user}
              messages={classroom.conversation?.messages ?? []}
              conversationId={classroom.conversationId}
            />
          </main>

          <aside className="border-t lg:border-t-0 lg:border-l">
            <ClassroomCurriculum
              seasons={course.seasons}
              currentLessonId={currentLesson.id}
              defaultSeasonId={currentSeason.id}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}
