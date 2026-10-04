"use client"

import { BookOpen, CalendarDays, MoreHorizontal, UserRound } from "lucide-react"
import Link from "next/link"

import { deleteEnrollment } from "@/actions/enrollment"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { handleRes } from "@/lib/handleRes"
import {
  CourseProgress,
  Enrollment,
  User,
} from "@/prisma/generated/prisma/client"
import { format } from "date-fns"
import { mapEnrollmentStatus } from "@/lib/map"

function EnrollmentCard({
  enrollment,
}: {
  enrollment: Enrollment & {
    user: Omit<User, "password">
    course: { title: string }
    progress: CourseProgress | null
  }
}) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/30">
              <UserRound className="size-4" />
            </div>

            <div className="min-w-0">
              <CardTitle className="truncate text-base">
                {enrollment.user.name}
              </CardTitle>

              <p className="truncate text-sm text-muted-foreground">
                {enrollment.user.email}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreHorizontal />
                  <span className="sr-only">Open menu</span>
                </Button>
              }
            />

            <DropdownMenuContent align="end">
              <Link href={`/admin/enrollments/${enrollment.id}`}>
                <DropdownMenuItem>Edit enrollment</DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={async () =>
                  handleRes(await deleteEnrollment(enrollment.id))
                }
              >
                Delete enrollment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <Separator />
      <CardContent className="grid grid-cols-2">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Course</p>

            <p className="truncate text-sm font-medium">
              {enrollment.course.title}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

          <div>
            <p className="text-xs text-muted-foreground">Enrolled at</p>

            <p className="text-sm">{format(enrollment.enrolledAt, "PP")}</p>
          </div>
        </div>
      </CardContent>

      <CardContent>
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>%{enrollment.progress?.percentage.toFixed()}</span>
          <p className="text-xs text-muted-foreground">
            {enrollment.progress?.completedLessons} /{" "}
            {enrollment.progress?.totalLessons} lessons
          </p>
        </div>
        <Progress
          value={enrollment.progress?.percentage ?? 0}
          trackClassName="h-1"
        />
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-center justify-between gap-3">
          <Badge
            variant={
              enrollment.progress?.stats === "completed"
                ? "success"
                : "secondary"
            }
          >
            {mapEnrollmentStatus(enrollment.progress?.stats ?? "notStarted")}
          </Badge>

          <span className="font-mono text-xs text-muted-foreground">
            {enrollment.reference}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default EnrollmentCard
