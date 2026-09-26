import { prisma } from "@/lib/prisma"
import StudentsList from "./students-list"
import { db } from "@/prisma/db"
import type { ResultType } from "@prisma/orm-postgres/components/runtime"

export default async function StudentsPage() {
  // const users = await prisma.user.findMany({
  //   where: {
  //     role: "USER",
  //   },
  //   select: {
  //     id: true,
  //     fullName: true,
  //     email: true,
  //     createdAt: true,

  //     membership: {
  //       select: {
  //         status: true,
  //         expiresAt: true,
  //       },
  //     },

  //     _count: {
  //       select: {
  //         enrollments: true,
  //       },
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // })

  // const now = new Date()

  // const students = users.map((user) => ({
  //   id: user.id,
  //   name: user.fullName,
  //   email: user.email,
  //   joinedAt: user.createdAt.toISOString(),

  //   enrolledCourses: user._count.enrollments,

  //   membership: {
  //     status: !user.membership
  //       ? ("none" as const)
  //       : user.membership.status === "ACTIVE" && user.membership.expiresAt > now
  //         ? ("active" as const)
  //         : ("expired" as const),

  //     expiresAt: user.membership?.expiresAt.toISOString() ?? null,
  //   },
  // }))

  const users = await db.orm.public.User.include("membership", (m) =>
    m.include("enrollments")
  )
    .select("updatedAt")
    .all()

  console.log(users)

  return <StudentsList students={users} />
}
