import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getAdminStudent } from "@/lib/admin-students"

import { StudentForm } from "@/components/admin/students/student-form"
import { Button } from "@/components/ui/button"

type EditStudentPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  const { id } = await params

  const student = getAdminStudent(id)

  if (!student) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href={`/admin/students/${student.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="size-4" />
            <span className="sr-only">Back to student</span>
          </Button>
        </Link>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit student
          </h1>

          <p className="text-sm text-muted-foreground">
            Update {student.name}&apos;s account information.
          </p>
        </div>
      </div>

      {/* Form */}
      <StudentForm student={student} />
    </div>
  )
}
