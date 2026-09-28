"use server"

import { EnrollmentFormType } from "@/lib/formSchema"
import { incrementString } from "@/lib/incrementString"
import { prisma } from "@/prisma/prisma"
import { revalidatePath } from "next/cache"

export async function createEnrollment(values: EnrollmentFormType) {
  const { userId, courseId, enrolledAt } = values

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      return { error: "User not found." }
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { seasons: { include: { lessons: true } } },
    })
    if (!course) {
      return { error: "Course not found." }
    }

    const activeMembership = await prisma.membership.findFirst({
      where: {
        userId,
        expiresAt: { gt: new Date() },
        status: "active",
      },
    })
    if (!activeMembership) {
      return {
        error: "This user has no active membership. Cannot enroll.",
      }
    }

    const existing = await prisma.enrollment.findFirst({
      where: { userId, courseId },
    })
    if (existing) {
      return { error: "This user is already enrolled in this course." }
    }

    const lastEnrollment = await prisma.enrollment.findFirst({
      orderBy: { enrolledAt: "desc" },
    })

    await prisma.enrollment.create({
      data: {
        userId,
        reference: incrementString(lastEnrollment?.reference),
        courseId,
        enrolledAt,
        membershipId: activeMembership.id,
        progress: {
          create: {
            courseId,
            userId,
            totalLessons: course.seasons.flatMap((s) => s.lessons).length,
          },
        },
      },
    })

    return { success: "Enrollment created successfully." }
  } catch (err) {
    console.error("[createEnrollment]", err)
    return { error: "Failed to create enrollment. Try again." }
  }
}

export async function updateEnrollment(id: string, values: EnrollmentFormType) {
  const { userId, courseId, enrolledAt } = values

  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
    })
    if (!enrollment) {
      return { error: "Enrollment not found." }
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      return { error: "User not found." }
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    })
    if (!course) {
      return { error: "Course not found." }
    }

    const activeMembership = await prisma.membership.findFirst({
      where: {
        userId,
        expiresAt: { gt: new Date() },
        status: "active",
      },
    })
    if (!activeMembership) {
      return {
        error: "This user has no active membership. Cannot enroll.",
      }
    }

    const conflict = await prisma.enrollment.findFirst({
      where: {
        userId,
        courseId,
        NOT: { id },
      },
    })
    if (conflict) {
      return { error: "This user is already enrolled in this course." }
    }

    await prisma.enrollment.update({
      where: { id },
      data: {
        userId,
        courseId,
        enrolledAt,
        membershipId: activeMembership.id,
      },
    })

    return { success: "Enrollment updated successfully." }
  } catch (err) {
    console.error("[updateEnrollment]", err)
    return { error: "Failed to update enrollment. Try again." }
  }
}

export async function deleteEnrollment(id: string) {
  try {
    await prisma.enrollment.delete({ where: { id } })

    revalidatePath("/enrollments")

    return { success: "Enrollment deleted successfully." }
  } catch (err) {
    console.error("[deleteEnrollment]", err)
    return { error: "Failed to delete enrollment." }
  }
}
