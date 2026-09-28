import { notFound } from "next/navigation"

import { CourseForm } from "@/components/admin/courses/course-form"
import { prisma } from "@/prisma/prisma"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function AdminCoursePage({ params }: Props) {
  const { slug } = await params

  const course = await prisma.course.findFirst({
    where: { slug },
    include: { seasons: { include: { lessons: true } } },
  })

  if (!course) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Course management</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Edit course
        </h1>
      </div>

      <CourseForm course={course} />
    </div>
  )
}
