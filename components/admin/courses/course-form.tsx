"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { BasicInformation } from "./basic-information"
import { CourseAudience } from "./course-audience"
import { CourseMedia } from "./course-media"
import { CourseSettings } from "./course-settings"
import { Curriculum } from "./curriculum"

const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required."),
  url: z.string().min(1, "Lesson URL is required."),
  type: z.enum(["video", "doc"]),
  isFree: z.boolean(),
  duration: z.coerce.number().min(0, "Duration cannot be negative."),
})

const seasonSchema = z.object({
  title: z.string().min(1, "Season title is required."),
  lessons: z.array(lessonSchema),
})

const courseSchema = z.object({
  title: z.string().min(1, "Title is required."),
  slug: z
    .string()
    .min(1, "Slug is required.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens."
    ),
  summary: z.string().min(1, "Summary is required."),
  description: z.string().min(1, "Description is required."),
  category: z.enum(["development", "design", "ai"]),
  status: z.enum(["published", "draft"]),
  audience: z.array(
    z.object({
      value: z.string().min(1, "Audience item cannot be empty."),
    })
  ),
  seasons: z.array(seasonSchema),
  tizerUrl: z.string(),
  duration: z.coerce.number().min(0),
})

export type CourseFormValues = z.infer<typeof courseSchema>

type Props = {
  course?: CourseFormValues
}

export function CourseForm({ course }: Props) {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: course ?? {
      title: "",
      slug: "",
      summary: "",
      description: "",
      category: "development",
      status: "draft",
      audience: [{ value: "" }],
      seasons: [],
      tizerUrl: "",
      duration: 0,
    },
  })

  const handleSubmit = (values: CourseFormValues) => {
    console.log(values)
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10">
      <BasicInformation form={form} />

      <CourseSettings form={form} />

      <CourseMedia form={form} />

      <CourseAudience form={form} />

      <Curriculum form={form} />

      <div className="flex justify-end border-t pt-6">
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save course"}
        </Button>
      </div>
    </form>
  )
}
