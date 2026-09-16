"use client"

import {
  ChevronDown,
  MoreHorizontal,
  Plus,
  Search,
  UserRound,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

import { students } from "@/lib/admin-students"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

type MembershipFilter = "all" | "active" | "expired" | "none"

const membershipFilters: {
  value: MembershipFilter
  label: string
}[] = [
  { value: "all", label: "All memberships" },
  { value: "active", label: "Active" },
  { value: "expired", label: "Expired" },
  { value: "none", label: "No membership" },
]

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

function MembershipBadge({ status }: { status: MembershipFilter }) {
  if (status === "active") {
    return (
      <Badge variant="secondary" className="rounded-full">
        Active
      </Badge>
    )
  }

  if (status === "expired") {
    return (
      <Badge variant="outline" className="rounded-full">
        Expired
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="rounded-full text-muted-foreground">
      No membership
    </Badge>
  )
}

export default function StudentsPage() {
  const [search, setSearch] = useState("")
  const [membershipFilter, setMembershipFilter] =
    useState<MembershipFilter>("all")

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase()

    return students.filter((student) => {
      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)

      const matchesMembership =
        membershipFilter === "all" ||
        student.membership.status === membershipFilter

      return matchesSearch && matchesMembership
    })
  }, [search, membershipFilter])

  const currentFilter = membershipFilters.find(
    (filter) => filter.value === membershipFilter
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Students</h1>
          <p className="text-sm text-muted-foreground">
            Manage registered students and their learning activity.
          </p>
        </div>

        <Link href="/admin/students/new">
          <Button>
            <Plus className="size-4" />
            Add student
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email..."
            className="pl-9"
          />
        </div>

        <Popover>
          <PopoverTrigger>
            <Button variant="outline" className="justify-between sm:w-48">
              {currentFilter?.label}
              <ChevronDown className="size-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-48 p-1">
            {membershipFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setMembershipFilter(filter.value)}
                className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
              >
                <span
                  className={
                    membershipFilter === filter.value
                      ? "font-medium"
                      : "text-muted-foreground"
                  }
                >
                  {filter.label}
                </span>
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Results */}
      <div className="overflow-hidden rounded-xl border">
        {/* Desktop header */}
        <div className="hidden border-b bg-muted/30 px-5 py-3 text-xs font-medium text-muted-foreground md:grid md:grid-cols-[minmax(240px,1.7fr)_140px_120px_140px_44px] md:items-center md:gap-4">
          <span>Student</span>
          <span>Membership</span>
          <span>Courses</span>
          <span>Joined</span>
          <span />
        </div>

        {filteredStudents.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex size-10 items-center justify-center rounded-full border bg-muted/30">
              <UserRound className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm font-medium">No students found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or membership filter.
              </p>
            </div>
          </div>
        ) : (
          filteredStudents.map((student, index) => (
            <div
              key={student.id}
              className={[
                "group px-5 py-4 transition-colors hover:bg-muted/20",
                index !== filteredStudents.length - 1 ? "border-b" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-4 md:grid md:grid-cols-[minmax(240px,1.7fr)_140px_120px_140px_44px] md:gap-4">
                {/* Student */}
                <Link
                  href={`/admin/students/${student.id}`}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-medium">
                    {getInitials(student.name)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {student.name}
                    </p>

                    <p className="truncate text-sm text-muted-foreground">
                      {student.email}
                    </p>
                  </div>
                </Link>

                {/* Membership */}
                <div className="hidden md:block">
                  <MembershipBadge status={student.membership.status} />

                  {student.membership.expiresAt && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {student.membership.status === "active"
                        ? `Until ${formatDate(student.membership.expiresAt)}`
                        : `Ended ${formatDate(student.membership.expiresAt)}`}
                    </p>
                  )}
                </div>

                {/* Courses */}
                <div className="hidden md:block">
                  <p className="text-sm font-medium">
                    {student.enrolledCourses}
                  </p>
                  <p className="text-xs text-muted-foreground">enrolled</p>
                </div>

                {/* Joined */}
                <div className="hidden md:block">
                  <p className="text-sm">{formatDate(student.joinedAt)}</p>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">Student actions</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <Link href={`/admin/students/${student.id}`}>
                      <DropdownMenuItem>View student</DropdownMenuItem>
                    </Link>

                    <Link href={`/admin/students/${student.id}/edit`}>
                      <DropdownMenuItem>Edit student</DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      Delete student
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile details */}
              <div className="mt-3 flex items-center gap-3 pl-13 md:hidden">
                <MembershipBadge status={student.membership.status} />

                <Separator orientation="vertical" className="h-4" />

                <span className="text-xs text-muted-foreground">
                  {student.enrolledCourses}{" "}
                  {student.enrolledCourses === 1 ? "course" : "courses"}
                </span>

                <Separator orientation="vertical" className="h-4" />

                <span className="text-xs text-muted-foreground">
                  Joined {formatDate(student.joinedAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Result count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredStudents.length} of {students.length} students
      </div>
    </div>
  )
}
