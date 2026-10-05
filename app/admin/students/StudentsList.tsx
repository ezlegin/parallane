"use client"

import { MoreHorizontal, UserRound } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

import { deleteStudent } from "@/actions/student"
import MembershipBadge from "@/components/MembershipBadge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getInitials } from "@/lib/getInitials"
import { handleRes } from "@/lib/handleRes"
import { Membership, User } from "@/prisma/generated/prisma/client"

interface UserType extends User {
  memberships: Membership[]
  enrollments: { id: string }[]
}

export default function StudentsList({ students }: { students: UserType[] }) {
  const onDeleteUser = async (id: string) => {
    handleRes(await deleteStudent(id))
  }

  if (students.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border px-6 text-center">
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
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="pl-5">Student</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Membership</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-12 pr-5" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => {
            const membership = student.memberships[0]

            return (
              <TableRow key={student.id} className="group">
                {/* Student */}
                <TableCell className="pl-5">
                  <Link
                    href={`/admin/students/${student.id}`}
                    className="flex min-w-0 items-center gap-3"
                  >
                    <Avatar className="size-9">
                      {student.image && (
                        <AvatarImage src={student.image} alt="" />
                      )}
                      <AvatarFallback className="text-xs">
                        {getInitials(student.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {student.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {student.email}
                      </p>
                    </div>
                  </Link>
                </TableCell>

                {/* Country */}
                <TableCell>
                  <CountryCell code={student.country} />
                </TableCell>

                {/* Membership */}
                <TableCell>
                  <MembershipBadge status={membership?.status ?? "none"} />

                  {membership?.expiresAt && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {membership.status === "active"
                        ? `Until ${format(membership.expiresAt, "P")}`
                        : `Ended ${format(membership.expiresAt, "P")}`}
                    </p>
                  )}
                </TableCell>

                {/* Courses */}
                <TableCell>
                  <p className="text-sm font-medium">
                    {student.enrollments.length}
                  </p>
                  <p className="text-xs text-muted-foreground">enrolled</p>
                </TableCell>

                {/* Joined */}
                <TableCell>
                  <p className="text-sm">{format(student.createdAt, "PP")}</p>
                </TableCell>

                {/* Actions */}
                <TableCell className="pr-5 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Actions</span>
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
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

function CountryCell({ code }: { code: string | null }) {
  if (!code) {
    return <span className="text-xs text-muted-foreground">—</span>
  }
  const lowered = code.toLowerCase()

  return (
    <div className="flex items-center gap-2">
      <img
        src={`/flags/${lowered}.svg`}
        alt=""
        width={22}
        height={15}
        className="rounded-sm object-cover ring-1 ring-border/50"
        loading="lazy"
      />

      <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
        {code}
      </span>
    </div>
  )
}
