import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import StudentsList from "./StudentsList"
import { prisma } from "@/prisma/prisma"
import Pagination from "@/components/Pagination"
import { globalPageSize } from "@/lib/consts"

const page = async () => {
  const students = await prisma.user.findMany({
    include: {
      memberships: {
        orderBy: {
          expiresAt: "desc",
        },
        take: 1,
      },
      enrollments: { select: { id: true } },
    },
  })
  const totalStudents = await prisma.user.count()

  return (
    <div className="space-y-8">
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

      <StudentsList students={students} />

      <Pagination pageSize={globalPageSize} totalItems={totalStudents} />
    </div>
  )
}

export default page
