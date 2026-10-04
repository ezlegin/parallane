"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/prisma/prisma"

export async function markLessonComplete({
  classroomId,
  lessonId,
}: {
  classroomId: string
  lessonId: string
}) {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: { id: classroomId },
      select: { id: true, userId: true, courseId: true, enrollmentId: true },
    })

    if (!classroom) {
      return { error: "Classroom not found." }
    }

    const { userId, courseId, enrollmentId } = classroom

    const existingProgress = await prisma.lessonProgress.findFirst({
      where: { lessonId, classroomId },
    })
    if (existingProgress) return { error: "Already Maked as Completed." }

    await prisma.lessonProgress.create({
      data: {
        userId,
        lessonId,
        classroomId,
        completedAt: new Date(),
      },
    })

    const [total, completed] = await Promise.all([
      prisma.lesson.count({
        where: { season: { courseId }, type: "video" },
      }),
      prisma.lessonProgress.count({
        where: {
          userId,
          completedAt: { not: null },
          lesson: { season: { courseId }, type: "video" },
        },
      }),
    ])

    const percentage = total === 0 ? 0 : (completed / total) * 100
    const isFinished = total > 0 && completed === total

    await prisma.courseProgress.update({
      where: { enrollmentId },
      data: {
        completedLessons: completed,
        totalLessons: total,
        percentage,
        stats: isFinished
          ? "completed"
          : completed > 0
            ? "inProgress"
            : "notStarted",
        lastLessonId: lessonId,
        completedAt: isFinished ? new Date() : null,
      },
    })

    revalidatePath(`/classroom/${classroomId}`)

    return { success: "Lesson marked as complete.", isFinished }
  } catch (err) {
    console.error("[markLessonComplete]", err)
    return { error: "Failed to mark lesson as complete." }
  }
}
