import Link from "next/link"
import { ArrowRight, BookOpen, CheckCircle2, Crown, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    label: "Enrolled Courses",
    value: "4",
    icon: BookOpen,
  },
  {
    label: "Completed",
    value: "1",
    icon: CheckCircle2,
  },
  {
    label: "Overall Progress",
    value: "68%",
    icon: Play,
  },
  {
    label: "Membership",
    value: "Active",
    icon: Crown,
  },
]

const courses = [
  {
    title: "React",
    progress: 74,
    lessonsCompleted: 18,
    totalLessons: 24,
  },
  {
    title: "TypeScript",
    progress: 52,
    lessonsCompleted: 13,
    totalLessons: 25,
  },
  {
    title: "Next.js",
    progress: 31,
    lessonsCompleted: 8,
    totalLessons: 26,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-muted-foreground">Dashboard</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
          Good afternoon, Alex
        </h1>

        <p className="mt-2 text-muted-foreground">
          Continue learning and keep building your skills.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>

                  <Icon className="size-4 text-muted-foreground" />
                </div>

                <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Continue learning</h2>

            <p className="text-sm text-muted-foreground">
              Pick up where you left off.
            </p>
          </div>

          <Link href="/panel/courses">
            <Button variant="ghost">
              View all
              <ArrowRight />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.title}>
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border bg-muted">
                    <BookOpen className="size-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {course.lessonsCompleted} of {course.totalLessons}{" "}
                          lessons
                        </p>
                      </div>

                      <span className="text-sm font-medium">
                        {course.progress}%
                      </span>
                    </div>

                    <Progress value={course.progress} className="mt-3" />
                  </div>

                  <Link href={`/classroom/${course.title.toLowerCase()}`}>
                    <Button>
                      Continue
                      <ArrowRight />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Membership</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Badge>Active</Badge>

                <p className="mt-3 text-2xl font-semibold">
                  $19
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    / month
                  </span>
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your membership renews on October 12, 2026.
                </p>
              </div>

              <Link href="/panel/membership">
                <Button variant="outline">Manage</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keep going</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              You're making progress. Complete your current course before moving
              on to the next one in your roadmap.
            </p>

            <Link href="/roadmaps">
              <Button className="mt-4">
                View roadmaps
                <ArrowRight />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
