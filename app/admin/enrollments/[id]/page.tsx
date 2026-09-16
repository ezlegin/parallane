import { notFound } from "next/navigation"

import { getAdminEnrollment } from "@/lib/admin-enrollments"

import { EnrollmentForm } from "@/components/admin/enrollments/enrollment-form"

const users = [
  {
    id: "user_001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
  },
  {
    id: "user_002",
    name: "Michael Chen",
    email: "michael@example.com",
  },
  {
    id: "user_003",
    name: "Emma Williams",
    email: "emma@example.com",
  },
  {
    id: "user_004",
    name: "David Miller",
    email: "david@example.com",
  },
  {
    id: "user_005",
    name: "Olivia Brown",
    email: "olivia@example.com",
  },
]

const courses = [
  {
    id: "course_html",
    title: "HTML",
    slug: "html",
  },
  {
    id: "course_css",
    title: "CSS",
    slug: "css",
  },
  {
    id: "course_javascript",
    title: "JavaScript",
    slug: "javascript",
  },
  {
    id: "course_typescript",
    title: "TypeScript",
    slug: "typescript",
  },
  {
    id: "course_react",
    title: "React",
    slug: "react",
  },
  {
    id: "course_nextjs",
    title: "Next.js",
    slug: "nextjs",
  },
  {
    id: "course_figma",
    title: "Figma",
    slug: "figma",
  },
]

export default async function EnrollmentEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const enrollment = getAdminEnrollment(id)

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

      <EnrollmentForm
        users={users}
        courses={courses}
        defaultValues={{
          userId: enrollment.user.id,
          courseId: enrollment.course.id,
          enrolledAt: toInputDate(enrollment.enrolledAt),
        }}
      />
    </div>
  )
}

function toInputDate(value: string) {
  return new Date(value).toISOString().split("T")[0]
}
