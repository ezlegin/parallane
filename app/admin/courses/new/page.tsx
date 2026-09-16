import { CourseForm } from "@/components/admin/courses/course-form"

export default async function AdminCoursePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Course management</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          New course
        </h1>
      </div>

      <CourseForm />
    </div>
  )
}
