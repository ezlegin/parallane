"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { courseFormSchema, CourseFormType } from "@/lib/formSchema"
import { Course, Lesson, Season } from "@/prisma/generated/prisma/client"
import { BasicInformation } from "./basic-information"
import { CourseAudience } from "./course-audience"
import { CourseMedia } from "./course-media"
import { CourseSettings } from "./course-settings"
import { Curriculum } from "./curriculum"
import { createCourse, updateCourse } from "@/actions/course"
import { handleRes } from "@/lib/handleRes"
import { useRouter } from "next/navigation"
import { Courselearn } from "./course-learn"
import { useEffect } from "react"

interface CourseType extends Course {
  seasons: (Season & { lessons: Lesson[] })[]
}

type Props = {
  course?: CourseType
}

export function CourseForm({ course }: Props) {
  const router = useRouter()
  const form = useForm<CourseFormType>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: course?.title ?? "",
      slug: course?.slug ?? "",
      summary: course?.summary ?? "",
      description: course?.description ?? "",
      category: course?.category ?? "frontEnd",
      status: course?.status ?? "draft",
      audience: course
        ? course.audience.map((a) => ({ value: a }))
        : [{ value: "" }],
      learn: course ? course.learn.map((a) => ({ value: a })) : [{ value: "" }],
      seasons: course
        ? course.seasons.map((s) => ({
            title: s.title,
            lessons: s.lessons.map((l) => ({
              title: l.title,
              url: l.url,
              type: l.type,
              duration: l.duration.toString(),
              isFree: l.isFree,
            })),
          }))
        : [],
      tizerUrl: course?.teaserUrl ?? "",
      duration: course?.duration.toString() ?? "0",
    },
  })

  const handleSubmit = async (data: CourseFormType) => {
    console.log("s")
    const res = await (course
      ? updateCourse(course.id, data)
      : createCourse(data))

    handleRes(res, {
      onSuccess: () => !course && router.push("/admin/courses"),
    })
  }

  const curriclum = form.watch("seasons")
  const lessons = curriclum.flatMap((c) => c.lessons)

  useEffect(() => {
    const totalDuration = lessons.reduce((acc, curr) => acc + +curr.duration, 0)
    form.setValue("duration", totalDuration.toString())
  }, [lessons])

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10">
      <BasicInformation form={form} />

      <CourseSettings form={form} />

      <CourseMedia form={form} />

      <CourseAudience form={form} />

      <Courselearn form={form} />

      <Curriculum form={form} />

      <div className="flex justify-end border-t pt-6">
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save course"}
        </Button>
      </div>
    </form>
  )
}
