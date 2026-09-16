import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CreditCard,
  Mail,
  UserRound,
} from "lucide-react"

import { getAdminStudent } from "@/lib/admin-students"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type StudentPageProps = {
  params: Promise<{ id: string }>
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default async function StudentPage({ params }: StudentPageProps) {
  const { id } = await params
  const student = getAdminStudent(id)

  if (!student) {
    notFound()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/students">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back to students</span>
            </Button>
          </Link>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {student.name}
            </h1>
            <p className="text-sm text-muted-foreground">Student profile</p>
          </div>
        </div>

        <Link href={`/admin/students/${student.id}/edit`}>
          <Button variant="outline">Edit student</Button>
        </Link>
      </div>

      {/* Profile */}
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-20 items-center justify-center rounded-full border bg-muted text-lg font-medium">
                {getInitials(student.name)}
              </div>

              <h2 className="mt-4 font-semibold">{student.name}</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {student.email}
              </p>

              <div className="mt-4">
                {student.membership.status === "active" ? (
                  <Badge variant="secondary" className="rounded-full">
                    Active membership
                  </Badge>
                ) : student.membership.status === "expired" ? (
                  <Badge variant="outline" className="rounded-full">
                    Expired membership
                  </Badge>
                ) : (
                  <Badge variant="outline" className="rounded-full">
                    No membership
                  </Badge>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">{student.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Joined</p>
                  <p className="text-sm">{formatDate(student.joinedAt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview */}
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <CreditCard className="size-4" />
                Membership
              </CardTitle>
            </CardHeader>

            <CardContent>
              {student.membership.status === "none" ? (
                <div>
                  <p className="text-sm font-medium">No membership</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This student currently has no membership.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium">
                    {student.membership.status === "active"
                      ? "Active"
                      : "Expired"}
                  </p>

                  {student.membership.expiresAt && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {student.membership.status === "active"
                        ? `Expires ${formatDate(student.membership.expiresAt)}`
                        : `Expired ${formatDate(student.membership.expiresAt)}`}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="size-4" />
                Enrolled courses
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-semibold">
                {student.enrolledCourses}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                courses enrolled
              </p>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <UserRound className="size-4" />
                Student activity
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                Course progress, payments, Q&A conversations and other student
                activity will appear here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
