"use server"

import { getSessionUser } from "@/lib/user"
import { prisma } from "@/prisma/prisma"
import { generateSerial } from "@/lib/certificate"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const reviewSchema = z.object({
  courseId: z.string().min(1),
  enrollmentId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
})

export async function submitReview(values: {
  courseId: string
  enrollmentId: string
  rating: number
  comment?: string
}) {
  const user = await getSessionUser()
  if (!user) return { error: "Not logged in." }

  const parsed = reviewSchema.safeParse(values)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." }
  }

  const { courseId, enrollmentId, rating, comment } = parsed.data

  try {
    const existing = await prisma.review.findUnique({
      where: { userId_courseId: { userId: user.id, courseId } },
    })
    if (existing) {
      return { error: "You've already reviewed this course." }
    }

    const certificate = await prisma.$transaction(async (tx) => {
      const newReview = await tx.review.create({
        data: {
          userId: user.id,
          courseId,
          rating,
          comment,
          enrollmentId,
        },
      })

      const serial = await generateSerial(tx)

      return tx.certificate.create({
        data: {
          serial: serial,
          courseId,
          enrollmentId,
          userId: user.id,
          reviewId: newReview.id,
        },
      })
    })

    revalidatePath("/panel/courses")

    return {
      success: "Review submitted.",
      certificate: {
        serial: certificate.serial,
        issuedAt: certificate.issuedAt,
      },
    }
  } catch (err) {
    console.error("[submitReview]", err)
    return { error: "Failed to submit review. Try again." }
  }
}

export async function getMyReview(courseId: string) {
  const user = await getSessionUser()
  if (!user) return null

  return prisma.review.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
  })
}
