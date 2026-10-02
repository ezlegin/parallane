"use server"

import { CourseFormType } from "@/lib/formSchema"
import { prisma } from "@/prisma/prisma"
import { revalidatePath } from "next/cache"

export async function createCourse(values: CourseFormType) {
  const {
    title,
    slug,
    summary,
    description,
    category,
    status,
    audience,
    seasons,
    tizerUrl,
    duration,
  } = values

  try {
    const existing = await prisma.course.findUnique({
      where: { slug },
    })
    if (existing) {
      return { error: "A course with this slug already exists." }
    }

    await prisma.course.create({
      data: {
        title,
        slug,
        summary,
        description,
        category,
        status,
        audience: audience.map((a) => a.value),
        teaserUrl: tizerUrl || null,
        duration: +duration,
        seasons: {
          create: seasons.map((s, idx) => ({
            order: idx,
            title: s.title,
            lessons: {
              create: s.lessons.map((l, idx) => ({
                order: idx,
                title: l.title,
                url: l.url,
                type: l.type,
                isFree: l.isFree,
                duration: +l.duration,
              })),
            },
          })),
        },
      },
    })

    return { success: "Course created successfully." }
  } catch (err) {
    console.error("[createCourse]", err)
    return { error: "Failed to create course. Try again." }
  }
}

export async function updateCourse(id: string, values: CourseFormType) {
  const {
    title,
    slug,
    summary,
    description,
    category,
    status,
    audience,
    seasons,
    tizerUrl,
    duration,
  } = values

  try {
    const course = await prisma.course.findUnique({
      where: { id },
    })
    if (!course) {
      return { error: "Course not found." }
    }

    const conflict = await prisma.course.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    })
    if (conflict) {
      return { error: "Another course already uses this slug." }
    }

    await prisma.$transaction(async (tx) => {
      await tx.course.update({
        where: { id },
        data: {
          title,
          slug,
          summary,
          description,
          category,
          status,
          audience: audience.map((a) => a.value),
          teaserUrl: tizerUrl || null,
          duration: +duration,
        },
      })

      await tx.season.deleteMany({ where: { courseId: id } })

      for (const [seasonIndex, season] of seasons.entries()) {
        await tx.season.create({
          data: {
            order: seasonIndex,
            title: season.title,
            courseId: id,
            lessons: {
              create: season.lessons.map((l, idx) => ({
                order: idx,
                title: l.title,
                url: l.url,
                type: l.type,
                isFree: l.isFree,
                duration: +l.duration,
              })),
            },
          },
        })
      }
    })

    revalidatePath(`/admin/courses/${slug}`)

    return { success: "Course updated successfully." }
  } catch (err) {
    console.error("[updateCourse]", err)
    return { error: "Failed to update course. Try again." }
  }
}

// ---------- Delete ----------
export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({ where: { id } })

    revalidatePath("/admin/courses")

    return { success: "Course deleted successfully." }
  } catch (err) {
    console.error("[deleteCourse]", err)
    return { error: "Failed to delete course." }
  }
}
