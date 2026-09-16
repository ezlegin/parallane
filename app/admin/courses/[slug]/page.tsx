import { notFound } from "next/navigation"

import { getAdminCourse } from "@/lib/admin-courses"

import {
  CourseForm,
  type CourseFormValues,
} from "@/components/admin/courses/course-form"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function AdminCoursePage({ params }: Props) {
  const { slug } = await params

  const course = getAdminCourse(slug)

  if (!course) {
    notFound()
  }

  const defaultValues: CourseFormValues = {
    title: course.title,
    slug: course.slug,
    summary: course.summary,
    description: course.description,
    category: course.category,
    status: course.status,
    audience: course.audience.map((value) => ({
      value,
    })),
    seasons: course.seasons.map((season) => ({
      title: season.title,
      lessons: season.lessons.map((lesson) => ({
        title: lesson.title,
        url: lesson.url,
        type: lesson.type,
        isFree: lesson.isFree,
        duration: lesson.duration,
      })),
    })),
    tizerUrl: course.tizerUrl,
    duration: course.duration,
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Course management</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Edit course
        </h1>
      </div>

      <CourseForm course={defaultValues} />
    </div>
  )
}
