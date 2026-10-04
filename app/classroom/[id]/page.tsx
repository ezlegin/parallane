import { AskTutor } from "@/components/classroom/ask-tutor"
import { ClassroomCurriculum } from "@/components/classroom/classroom-curriculum"
import { ClassroomHeader } from "@/components/classroom/classroom-header"
import { ClassroomLessonInfo } from "@/components/classroom/classroom-lesson-info"
import { ClassroomNavigation } from "@/components/classroom/classroom-navigation"
import { ClassroomVideo } from "@/components/classroom/classroom-video"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { findLesson, findResumeLesson } from "@/lib/classroom"
import { getActiveMembership, getSessionUser } from "@/lib/user"
import { prisma } from "@/prisma/prisma"
import { BookOpen, Crown, LockKeyhole, MessageCircle } from "lucide-react"
import Link from "next/link"
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

  const [classroom, activeMembership] = await Promise.all([
    prisma.classroom.findFirst({
      where: { id, userId: user.id },
      include: {
        enrollment: { include: { progress: true } },
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
    }),
    getActiveMembership(user.id),
  ])

  if (!classroom) notFound()

  const course = classroom.course
  const hasAccess = !!activeMembership

  // Resolve the current lesson
  const resolved = lessonId
    ? findLesson(course.seasons, lessonId)
    : findResumeLesson(course.seasons)

  if (!resolved) return null

  const { season: currentSeason, lesson: currentLesson } = resolved

  return (
    <>
      {/* Classroom — blurred when no membership */}
      <div
        aria-hidden={!hasAccess}
        className={
          hasAccess
            ? "min-h-[calc(100vh-3.5rem)]"
            : "pointer-events-none min-h-[calc(100vh-3.5rem)] blur-lg saturate-50 select-none"
        }
      >
        <ClassroomHeader
          title={course.title}
          progress={classroom.enrollment.progress?.percentage ?? 0}
        />

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
                  isCompleted={currentLesson.progress.some(
                    (p) => p.completedAt
                  )}
                  userName={user.name.split(" ")[0]}
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

      {/* Full-viewport lock overlay */}
      {!hasAccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 px-6 backdrop-blur-md">
          <Card className="relative w-full max-w-md overflow-hidden border-border/60 shadow-2xl">
            {/* Emerald glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl"
            />

            <CardContent className="relative flex flex-col items-center px-8 py-10 text-center">
              {/* Locked icon */}
              <div className="relative">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/8">
                  <LockKeyhole
                    className="size-7 text-red-500"
                    strokeWidth={1.75}
                  />
                </div>

                <div className="absolute -right-1.5 -bottom-1.5 flex size-7 items-center justify-center rounded-full border border-border bg-background">
                  <Crown className="size-3.5 text-red-500" strokeWidth={2} />
                </div>
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-2xl font-semibold tracking-tight">
                Membership Expired...
              </h2>

              {/* Body */}
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Your membership isn't active right now. Everything is saved —
                come back anytime.
              </p>

              {/* What they're missing — 3 quick points */}
              <div className="mt-6 grid w-full grid-cols-3 gap-3">
                <Feature
                  icon={<BookOpen className="size-4" strokeWidth={1.75} />}
                  label="Lessons"
                />
                <Feature
                  icon={<MessageCircle className="size-4" strokeWidth={1.75} />}
                  label="Ask Tutor"
                />
                <Feature
                  icon={<Crown className="size-4" strokeWidth={1.75} />}
                  label="Progress"
                />
              </div>

              {/* Actions */}
              <div className="mt-8 flex w-full flex-col gap-3">
                <Link href="/pricing" className="w-full">
                  <Button size="lg" className="w-full rounded-xl">
                    <Crown className="mr-2 size-4" />
                    Reactivate membership
                  </Button>
                </Link>

                <Link href="/panel/enrollments" className="w-full">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-xl text-muted-foreground"
                  >
                    Back to my courses
                  </Button>
                </Link>
              </div>

              {/* Reassurance */}
              <p className="mt-6 text-[11px] text-muted-foreground/70">
                Your progress is safe. Nothing has been lost.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-2 py-3">
      <span className="text-emerald-500">{icon}</span>
      <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}

export const metadata = {
  title: "Classroom",
}
