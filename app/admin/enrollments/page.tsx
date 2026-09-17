"use client"

import Link from "next/link"
import { BookOpen, CalendarDays, MoreHorizontal, UserRound } from "lucide-react"

import { adminEnrollments } from "@/lib/admin-enrollments"

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
import { Separator } from "@/components/ui/separator"

export default function EnrollmentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Enrollments</h1>

          <p className="text-sm text-muted-foreground">
            See which courses each user is enrolled in.
          </p>
        </div>

        <Link href="/admin/enrollments/new">
          <Button>Add enrollment</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminEnrollments.map((enrollment) => (
          <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
        ))}
      </div>
    </div>
  )
}

function EnrollmentCard({
  enrollment,
}: {
  enrollment: (typeof adminEnrollments)[number]
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
                onClick={() => {
                  // TODO: delete enrollment
                }}
              >
                Delete enrollment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-5">
        <Separator />

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

            <p className="text-sm">{enrollment.enrolledAt}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3">
        <Badge variant="secondary">Enrolled</Badge>

        <span className="font-mono text-xs text-muted-foreground">
          {enrollment.id}
        </span>
      </CardFooter>
    </Card>
  )
}
