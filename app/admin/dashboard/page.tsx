import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  HelpCircle,
  Users,
  UserPlus,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  admin,
  adminStats,
  courseOverview,
  pendingQuestions,
  recentEnrollments,
  recentPayments,
} from "@/lib/admin"

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

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-muted-foreground">
          Welcome back, {admin.name.split(" ")[0]}.
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Students"
          value={adminStats.students}
          description="Total registered students"
          icon={Users}
        />

        <StatCard
          title="Memberships"
          value={adminStats.activeMemberships}
          description="Currently active"
          icon={CreditCard}
        />

        <StatCard
          title="Courses"
          value={adminStats.courses}
          description="Published courses"
          icon={BookOpen}
        />

        <StatCard
          title="Enrollments"
          value={adminStats.enrollments}
          description="Total course enrollments"
          icon={UserPlus}
        />

        <StatCard
          title="Q&A"
          value={adminStats.pendingQuestions}
          description="Questions waiting for reply"
          icon={HelpCircle}
        />

        <StatCard
          title="Revenue"
          value={`$${adminStats.monthlyRevenue.toLocaleString()}`}
          description="This month"
          icon={CreditCard}
        />
      </div>

      {/* Main content */}
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
                {pendingQuestions.map((question) => (
                  <Link
                    key={question.id}
                    href={`/admin/qa/${question.id}`}
                    className="block p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          {question.student}
                        </p>

                        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                          {question.question}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs text-muted-foreground">
                        {question.date}
                      </span>
                    </div>

                    <Badge variant="outline" className="mt-3">
                      {question.course}
                    </Badge>
                  </Link>
                ))}
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
                {courseOverview.map((course) => (
                  <Link
                    key={course.name}
                    href={`/admin/courses/${course.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                  >
                    <div>
                      <p className="text-sm font-medium">{course.name}</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {course.lessons} lessons
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">{course.students}</p>

                      <p className="text-xs text-muted-foreground">students</p>
                    </div>
                  </Link>
                ))}
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
                {recentEnrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {enrollment.student}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {enrollment.email}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium">{enrollment.course}</p>

                      <p className="text-xs text-muted-foreground">
                        {enrollment.date}
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
                {recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {payment.student}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {payment.type} · {payment.date}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <Badge variant="secondary">{payment.status}</Badge>

                      <span className="text-sm font-medium">
                        ${payment.amount}
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
