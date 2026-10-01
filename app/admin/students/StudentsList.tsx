"use client"

import { MoreHorizontal, UserRound } from "lucide-react"
import Link from "next/link"

import { deleteStudent } from "@/actions/student"
import MembershipBadge from "@/components/MembershipBadge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { getInitials } from "@/lib/getInitials"
import { handleRes } from "@/lib/handleRes"
import { Membership, User } from "@/prisma/generated/prisma/client"
import { format } from "date-fns"

interface UserType extends User {
  memberships: Membership[]
  enrollments: { id: string }[]
}

export default function StudentsList({ students }: { students: UserType[] }) {
  const onDeleteUser = async (id: string) => {
    handleRes(await deleteStudent(id))
  }

  return (
    <div className="space-y-8">
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

        {students.length === 0 ? (
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
          students.map((student, index) => {
            const membership = student.memberships[0] ?? ""

            return (
              <div
                key={student.id}
                className={[
                  "group px-5 py-4 transition-colors hover:bg-muted/20",
                  index !== students.length - 1 ? "border-b" : "",
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

                  <div className="hidden md:block">
                    <MembershipBadge status={membership.status ?? "none"} />

                    {membership.expiresAt && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {membership.status === "active"
                          ? `Until ${format(membership.expiresAt, "P")}`
                          : `Ended ${format(membership.expiresAt, "P")}`}
                      </p>
                    )}
                  </div>

                  {/* Courses */}
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">
                      {student.enrollments.length}
                    </p>
                    <p className="text-xs text-muted-foreground">enrolled</p>
                  </div>

                  {/* Joined */}
                  <div className="hidden md:block">
                    <p className="text-sm">{format(student.createdAt, "PP")}</p>
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      }
                    />

                    <DropdownMenuContent align="end">
                      <Link href={`/admin/students/${student.id}`}>
                        <DropdownMenuItem>View student</DropdownMenuItem>
                      </Link>

                      <Link href={`/admin/students/${student.id}/edit`}>
                        <DropdownMenuItem>Edit student</DropdownMenuItem>
                      </Link>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onDeleteUser(student.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        Delete student
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Mobile details */}
                <div className="mt-3 flex items-center gap-3 pl-13 md:hidden">
                  <MembershipBadge status={membership.status ?? "none"} />

                  <Separator orientation="vertical" className="h-4" />

                  <span className="text-xs text-muted-foreground">
                    {student.enrollments.length} course(s)
                  </span>

                  <Separator orientation="vertical" className="h-4" />

                  <span className="text-xs text-muted-foreground">
                    Joined {format(student.createdAt, "PP")}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
