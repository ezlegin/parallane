"use client"

import Link from "next/link"
import { MoreHorizontal, UserRound, CalendarDays, BookOpen } from "lucide-react"

import { adminMemberships } from "@/lib/admin-memberships"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function MembershipsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Memberships</h1>
          <p className="text-sm text-muted-foreground">
            Monitor active memberships and their enrolled courses.
          </p>
        </div>
        <Link href="/admin/memberships/new">
          <Button>Add membership</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminMemberships.map((membership) => (
          <MembershipCard key={membership.id} membership={membership} />
        ))}
      </div>
    </div>
  )
}

function MembershipCard({
  membership,
}: {
  membership: (typeof adminMemberships)[number]
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
                {membership.user.name}
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
                onClick={() => {
                  // TODO: delete membership
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
            {membership.id}
          </span>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Payment ID</p>
            <p className="truncate font-mono text-sm">
              {membership.paymentId ?? "—"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Courses</p>
            <p className="text-sm font-medium">{membership.courses.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3">
            <CalendarDays className="size-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="truncate text-sm">{membership.from}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="size-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Expires at</p>
              <p className="truncate text-sm">{membership.expiresAt}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Dialog>
          <DialogTrigger
            className={"flex items-center rounded-full border bg-card p-2 px-3"}
          >
            <BookOpen className="mr-2 size-4" />
            {membership.courses.length === 0
              ? "No courses enrolled"
              : `Enrolled in ${membership.courses.length} ${
                  membership.courses.length === 1 ? "course" : "courses"
                }`}
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Enrolled courses</DialogTitle>

              <DialogDescription>
                Courses enrolled through this membership.
              </DialogDescription>
            </DialogHeader>

            <div className="divide-y rounded-lg border">
              {membership.courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {course.title}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Enrolled {course.enrolledAt}
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
