import Link from "next/link"

import { Button } from "@/components/ui/button"

import { prisma } from "@/prisma/prisma"
import CoursesList from "./CoursesList"

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    include: {
      seasons: { include: { lessons: true } },
      enrollments: { select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Manage your course catalog.
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Courses
          </h1>
        </div>

        <Link href="/admin/courses/new">
          <Button>Add course</Button>
        </Link>
      </div>

      {/* Courses */}
      <CoursesList courses={courses} />
    </div>
  )
}
