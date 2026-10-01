import { notFound } from "next/navigation"

import { EnrollmentForm } from "@/components/admin/enrollments/enrollment-form"
import { prisma } from "@/prisma/prisma"

export default async function EnrollmentEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const enrollment = await prisma.enrollment.findFirst({
    where: { id },
    include: { course: true, user: true },
  })

  if (!enrollment) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Edit enrollment
        </h1>

        <p className="text-sm text-muted-foreground">
          Update the user, course, or enrollment date.
        </p>
      </div>

      <EnrollmentForm enrollment={enrollment} />
    </div>
  )
}
