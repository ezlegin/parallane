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

    // Mark the lesson complete (idempotent)
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: classroom.userId,
          lessonId,
        },
      },
      create: {
        userId: classroom.userId,
        lessonId,
        classroomId,
        completedAt: new Date(),
      },
      update: {
        completedAt: new Date(),
      },
    })

    // Recompute course progress
    const [total, completed] = await Promise.all([
      prisma.lesson.count({
        where: { season: { courseId: classroom.courseId } },
      }),
      prisma.lessonProgress.count({
        where: {
          userId: classroom.userId,
          completedAt: { not: null },
          lesson: { season: { courseId: classroom.courseId } },
        },
      }),
    ])

    const percentage = total === 0 ? 0 : (completed / total) * 100
    const isFinished = total > 0 && completed === total

    await prisma.courseProgress.upsert({
      where: { enrollmentId: classroom.enrollmentId },
      create: {
        enrollmentId: classroom.enrollmentId,
        userId: classroom.userId,
        courseId: classroom.courseId,
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
      update: {
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

    return { success: "Lesson marked as complete." }
  } catch (err) {
    console.error("[markLessonComplete]", err)
    return { error: "Failed to mark lesson as complete." }
  }
}
