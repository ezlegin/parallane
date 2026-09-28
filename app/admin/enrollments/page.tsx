import Link from "next/link"

import { Button } from "@/components/ui/button"
import { prisma } from "@/prisma/prisma"
import EnrollmentCard from "./EnrollmentsList"

export default async function page() {
  const enrollments = await prisma.enrollment.findMany({
    include: {
      user: { omit: { password: true } },
      course: { select: { title: true } },
      progress: true,
    },
    orderBy: { enrolledAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Enrollments</h1>

          <p className="text-sm text-muted-foreground">
            See which courses each user is enrolled in.
          </p>
        </div>

        <Link href="/admin/enrollments/new">
          <Button>Add enrollment</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {enrollments.map((enrollment) => (
          <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
        ))}
      </div>
    </div>
  )
}
