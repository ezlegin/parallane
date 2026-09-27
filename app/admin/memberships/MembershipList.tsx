"use client"

import { BookOpen, CalendarDays, MoreHorizontal, UserRound } from "lucide-react"
import Link from "next/link"

import { deleteMembership } from "@/actions/membership"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { handleRes } from "@/lib/handleRes"
import {
  Course,
  Enrollment,
  Membership,
  Payment,
  User,
} from "@/prisma/generated/prisma/client"
import { format } from "date-fns"

export default function MembershipCard({
  membership,
}: {
  membership: Membership & {
    user: User
    payment: Payment | null
    enrollments: (Enrollment & { course: Course })[]
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
                {membership.user.fullName}
              </CardTitle>

              <p className="truncate text-sm text-muted-foreground">
                {membership.user.email}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal
                className="size-4 text-muted-foreground"
                size={20}
              />
              <span className="sr-only">Open menu</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/admin/memberships/${membership.id}`}>
                  Edit membership
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={async () => {
                  handleRes(await deleteMembership(membership.id))
                }}
              >
                Delete membership
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-5">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            {membership.period === "monthly" ? "Monthly" : "Annual"}
          </Badge>

          <span className="font-mono text-xs text-muted-foreground">
            {membership.reference}
          </span>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Payment ID</p>
            <p className="truncate font-mono text-sm">
              {membership.payment?.reference ?? "—"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Courses</p>
            <p className="text-sm font-medium">
              {membership.enrollments.length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3">
            <CalendarDays className="size-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="truncate text-sm">
                {format(membership.startsAt, "PP")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="size-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Expires at</p>
              <p className="truncate text-sm">
                {format(membership.expiresAt, "PP")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Dialog>
          <DialogTrigger
            className={"w-full"}
            disabled={membership.enrollments.length < 1}
            render={
              <Button variant="outline">
                <BookOpen />
                <span>
                  {membership.enrollments.length === 0
                    ? "No courses enrolled"
                    : `Enrolled in ${membership.enrollments.length} ${
                        membership.enrollments.length === 1
                          ? "course"
                          : "courses"
                      }`}
                </span>
              </Button>
            }
          />

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Enrolled courses</DialogTitle>

              <DialogDescription>
                Courses enrolled through this membership.
              </DialogDescription>
            </DialogHeader>

            <div className="divide-y rounded-lg border">
              {membership.enrollments.map((en) => (
                <div
                  key={en.id}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {en.course.title}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Enrolled {membership.enrollments.length}
                    </p>
                  </div>

                  <BookOpen className="size-4 shrink-0 text-muted-foreground" />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
