import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  HelpCircle,
  Users,
  UserPlus,
} from "lucide-react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getAdminStats,
  getPendingQuestions,
  getCourseOverview,
  getRecentEnrollments,
  getRecentPayments,
} from "@/lib/admin-queries"

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function SectionHeader({
  title,
  href,
  label = "View all",
}: {
  title: string
  href: string
  label?: string
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <Link href={href}>
        <Button variant="ghost" size="sm">
          {label}
          <ArrowRight className="ml-1 size-4" />
        </Button>
      </Link>
    </div>
  )
}

export default async function AdminDashboardPage() {
  const [
    stats,
    pendingQuestions,
    courseOverview,
    recentEnrollments,
    recentPayments,
  ] = await Promise.all([
    getAdminStats(),
    getPendingQuestions(5),
    getCourseOverview(5),
    getRecentEnrollments(5),
    getRecentPayments(5),
  ])

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Welcome back, admin.</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Students"
          value={stats.students}
          description="Total registered students"
          icon={Users}
        />
        <StatCard
          title="Memberships"
          value={stats.activeMemberships}
          description="Currently active"
          icon={CreditCard}
        />
        <StatCard
          title="Courses"
          value={stats.courses}
          description="Published courses"
          icon={BookOpen}
        />
        <StatCard
          title="Enrollments"
          value={stats.enrollments}
          description="Total course enrollments"
          icon={UserPlus}
        />
        <StatCard
          title="Q&A"
          value={stats.pendingQuestions}
          description="Questions waiting for reply"
          icon={HelpCircle}
        />
        <StatCard
          title="Revenue"
          value={`€${stats.monthlyRevenue.toFixed(2)}`}
          description="This month"
          icon={CreditCard}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Questions */}
        <section>
          <SectionHeader
            title="Questions waiting for reply"
            href="/admin/qa"
            label="View Q&A"
          />
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {pendingQuestions.length === 0 && (
                  <p className="p-4 text-sm text-muted-foreground">
                    No pending questions.
                  </p>
                )}

                {pendingQuestions.map((q) => {
                  const lastMessage = q.messages[0]
                  return (
                    <Link
                      key={q.id}
                      href={`/admin/qa/${q.id}`}
                      className="block p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{q.user.name}</p>
                          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                            {lastMessage?.content ?? "No messages yet"}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {format(q.updatedAt, "PP")}
                        </span>
                      </div>
                      <Badge variant="outline" className="mt-3">
                        {q.course?.title ?? "General"}
                      </Badge>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Courses */}
        <section>
          <SectionHeader title="Courses" href="/admin/courses" />
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {courseOverview.map((course) => {
                  const lessons = course.seasons.reduce(
                    (sum, s) => sum + s._count.lessons,
                    0
                  )
                  return (
                    <Link
                      key={course.id}
                      href={`/admin/courses/${course.slug}`}
                      className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                    >
                      <div>
                        <p className="text-sm font-medium">{course.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {lessons} lessons
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {course._count.enrollments}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          students
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent enrollments */}
        <section>
          <SectionHeader title="Recent enrollments" href="/admin/enrollments" />
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentEnrollments.map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {e.user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {e.user.email}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium">{e.course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(e.enrolledAt, "PP")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent payments */}
        <section>
          <SectionHeader title="Recent payments" href="/admin/payments" />
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentPayments.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {p.user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {p.discountType ?? "No discount"} ·{" "}
                        {format(p.createdAt, "PP")}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <Badge variant="secondary">{p.status}</Badge>
                      <span className="text-sm font-medium">
                        €{p.paidAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
