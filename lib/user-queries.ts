import { prisma } from "@/prisma/prisma"

export async function getDashboardStats(userId: string) {
  const [enrolledCourses, completedCourses, progressAgg, membership] =
    await Promise.all([
      prisma.enrollment.count({ where: { userId } }),

      prisma.enrollment.count({
        where: { userId, completedAt: { not: null } },
      }),

      // Average progress across all lessons in the user's enrolled courses
      prisma.courseProgress.aggregate({
        where: { userId },
        _avg: { percentage: true }, // adjust field name to your schema
      }),

      prisma.membership.findFirst({
        where: { userId, expiresAt: { gt: new Date() } },
        orderBy: { expiresAt: "desc" },
      }),
    ])

  const overallProgress = Math.round(progressAgg._avg.percentage ?? 0)

  return {
    enrolledCourses,
    completedCourses,
    overallProgress,
    membership,
  }
}

export async function getContinueLearning(userId: string, limit = 3) {
  // Enrollments ordered by most recently touched course
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    orderBy: { enrolledAt: "desc" }, // or enrolledAt
    take: limit,
    include: {
      classroom: { select: { id: true } },
      course: {
        select: {
          classrooms: { select: { id: true } },
          id: true,
          slug: true,
          title: true,
          seasons: {
            select: {
              _count: { select: { lessons: true } },
            },
          },
        },
      },
    },
  })

  // --- Simplify: fetch everything per course in one pass
  const results = await Promise.all(
    enrollments.map(async (enrollment) => {
      const course = enrollment.course

      const [totalLessons, completed] = await Promise.all([
        prisma.lesson.count({
          where: { season: { courseId: course.id } },
        }),
        prisma.lessonProgress.count({
          where: {
            userId,
            completedAt: { not: null },
            lesson: { season: { courseId: course.id } },
          },
        }),
      ])

      const progress =
        totalLessons === 0 ? 0 : Math.round((completed / totalLessons) * 100)

      return {
        id: course.id,
        slug: course.slug,
        title: course.title,
        progress,
        lessonsCompleted: completed,
        totalLessons,
        classroom: enrollment.classroom,
      }
    })
  )

  return results
}

export async function getMembershipDetails(userId: string) {
  const membership = await prisma.membership.findFirst({
    where: { userId },
    orderBy: { expiresAt: "desc" },
    include: {
      payment: {
        select: { totalAmount: true, paidAmount: true },
      },
    },
  })

  if (!membership) return null

  const isActive = membership.expiresAt > new Date()

  return {
    isActive,
    expiresAt: membership.expiresAt,
    price: membership.payment?.paidAmount ?? null,
    period: membership.period, // "monthly" | "annual"
  }
}
