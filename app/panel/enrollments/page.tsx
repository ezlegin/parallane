import { ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getSessionUser } from "@/lib/user"
import { prisma } from "@/prisma/prisma"

export default async function CoursesPage() {
  const user = await getSessionUser()

  if (!user) redirect("/login")

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    include: {
      classroom: { select: { id: true } },
      progress: {
        select: {
          percentage: true,
          stats: true,
          completedAt: true,
        },
      },
      course: {
        select: {
          title: true,
          summary: true,
        },
      },
    },
  })

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-muted-foreground">Learning</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
          My Courses
        </h1>

        <p className="mt-2 text-muted-foreground">
          Courses included in your membership.
        </p>
      </section>

      {enrollments.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-xl border bg-muted">
              <BookOpen className="size-6" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              You have no enrollments yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              You haven't enrolled in any courses yet. Explore our courses and
              start building your skills today.
            </p>

            <Link href="/courses" className="mt-6">
              <Button>
                Browse courses
                <ArrowRight />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {enrollments.map((en) => (
            <Card key={en.course.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-11 items-center justify-center rounded-lg border bg-muted">
                    <BookOpen className="size-5" />
                  </div>

                  {en.progress?.stats && (
                    <Badge variant="outline">{en.progress.stats}</Badge>
                  )}
                </div>

                <h2 className="mt-5 text-lg font-semibold">
                  {en.course.title}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {en.course.summary}
                </p>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>

                    <span>{en.progress?.percentage ?? 0}%</span>
                  </div>

                  <Progress value={en.progress?.percentage ?? 0} />
                </div>

                <Link href={`/classroom/${en.classroom?.id}`} className="block">
                  <Button
                    className="mt-6 w-full"
                    variant={en.progress?.completedAt ? "outline" : "default"}
                  >
                    {en.progress?.completedAt
                      ? "Review course"
                      : "Continue course"}

                    <ArrowRight />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
