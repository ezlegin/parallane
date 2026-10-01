import Link from "next/link"
import { redirect } from "next/navigation"
import { format } from "date-fns"
import { ArrowRight, BookOpen, CheckCircle2, Crown, Play } from "lucide-react"

import { Greeting } from "@/components/Geetings"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { getSessionUser } from "@/lib/user"
import {
  getDashboardStats,
  getContinueLearning,
  getMembershipDetails,
} from "@/lib/user-queries"

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price)
}

export default async function DashboardPage() {
  const user = await getSessionUser()
  if (!user) redirect("/login")

  const [statsData, courses, membership] = await Promise.all([
    getDashboardStats(user.id),
    getContinueLearning(user.id, 3),
    getMembershipDetails(user.id),
  ])

  const stats = [
    {
      label: "Enrolled Courses",
      value: statsData.enrolledCourses,
      icon: BookOpen,
    },
    {
      label: "Completed",
      value: statsData.completedCourses,
      icon: CheckCircle2,
    },
    {
      label: "Overall Progress",
      value: `${statsData.overallProgress}%`,
      icon: Play,
    },
    {
      label: "Membership",
      value: membership?.isActive ? "Active" : "Inactive",
      icon: Crown,
    },
  ]

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm text-muted-foreground">Dashboard</p>
        <Greeting name={user.fullName} />
        <p className="mt-2 text-muted-foreground">
          Continue learning and keep building your skills.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      {/* Continue learning */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
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
          {courses.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  You're not enrolled in any courses yet.
                </p>
                <Link href="/panel/courses">
                  <Button className="mt-4">
                    Browse courses
                    <ArrowRight />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {courses.map((course) => (
            <Card key={course.id}>
              <CardContent>
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

                  <Link href={`/classroom/${course.slug}`}>
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

      <Separator />

      {/* Membership + roadmap */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Membership</CardTitle>
          </CardHeader>
          <CardContent>
            {!membership ? (
              <div>
                <Badge variant="secondary">No membership</Badge>
                <p className="mt-3 text-sm text-muted-foreground">
                  Get a membership to unlock all courses.
                </p>
                <Link href="/pricing" target="_blank">
                  <Button className="mt-4">Get membership</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <Badge
                    variant={membership.isActive ? "success" : "secondary"}
                  >
                    {membership.isActive ? "Active" : "Expired"}
                  </Badge>

                  {membership.price !== null && (
                    <p className="mt-3 text-2xl font-semibold">
                      {formatPrice(membership.price)}
                      <span className="text-sm font-normal text-muted-foreground">
                        {" "}
                        / {membership.period === "annual" ? "year" : "month"}
                      </span>
                    </p>
                  )}

                  <p className="mt-1 text-sm text-muted-foreground">
                    {membership.isActive
                      ? `Your membership renews on ${format(membership.expiresAt, "MMMM d, yyyy")}.`
                      : `Expired on ${format(membership.expiresAt, "MMMM d, yyyy")}.`}
                  </p>
                </div>

                <Link href="/panel/membership">
                  <Button variant="outline">Manage</Button>
                </Link>
              </div>
            )}
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
