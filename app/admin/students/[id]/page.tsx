import MembershipBadge from "@/components/MembershipBadge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getInitials } from "@/lib/getInitials"
import { prisma } from "@/prisma/prisma"
import { format } from "date-fns"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CreditCard,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}

export default async function StudentPage({ params }: Props) {
  const { id } = await params
  const student = await prisma.user.findFirst({
    where: { id },
    include: {
      enrollments: {
        include: {
          course: { select: { title: true } },
        },
      },
      memberships: {
        orderBy: { expiresAt: "desc" },
      },
    },
  })

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
              {student.fullName}
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
                {getInitials(student.fullName)}
              </div>

              <h2 className="mt-4 font-semibold">{student.fullName}</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {student.email}
              </p>

              <div className="mt-4">
                <MembershipBadge
                  status={student.memberships.at(-1)?.status ?? "none"}
                />
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
                  <p className="text-sm">{format(student.createdAt, "PP")}</p>
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
                Memberships
              </CardTitle>
            </CardHeader>

            <CardContent>
              {student.memberships.length < 1 ? (
                <div>
                  <p className="text-sm font-medium">No membership</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This student currently has no membership.
                  </p>
                </div>
              ) : (
                student.memberships.map((membership, idx) => (
                  <div key={idx} className="flex justify-between border-b pb-2">
                    <p className="text-sm font-medium capitalize">
                      <MembershipBadge status={membership.status} />
                    </p>

                    <Badge
                      className="capitalize"
                      variant={
                        membership.period === "monthly" ? "outline" : "default"
                      }
                    >
                      {membership.period}
                    </Badge>

                    <div className="flex items-center gap-2 text-xs">
                      <p className="text-muted-foreground">
                        {format(membership.expiresAt, "PP")}
                      </p>
                      <ArrowRight size={13} />
                      <p className="text-muted-foreground">
                        {format(membership.expiresAt, "PP")}
                      </p>
                    </div>
                  </div>
                ))
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
              {student.enrollments.length < 1 ? (
                <div>
                  <p className="text-sm font-medium">No membership</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This student currently has no membership.
                  </p>
                </div>
              ) : (
                student.enrollments.map((en, idx) => (
                  <div
                    className="flex items-center justify-between border-b pb-2"
                    key={idx}
                  >
                    <span>{en.course.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(en.enrolledAt, "PP")}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
