import { prisma } from "@/prisma/prisma"
import { startOfMonth } from "date-fns"

export async function getAdminStats() {
  const [
    students,
    activeMemberships,
    courses,
    enrollments,
    pendingQuestions,
    monthlyRevenue,
  ] = await Promise.all([
    prisma.user.count(), // adjust role name to match schema
    prisma.membership.count({ where: { expiresAt: { gt: new Date() } } }),
    prisma.course.count({ where: { status: "published" } }),
    prisma.enrollment.count(),
    prisma.tutorConversation.count({
      // adjust to how you detect "unanswered" — e.g. last message is from student
      where: { messages: { some: {} }, status: "waiting" }, // <-- see note below
    }),
    prisma.payment.aggregate({
      where: {
        paidAt: { gte: startOfMonth(new Date()) },
        status: "success", // adjust enum value
      },
      _sum: { paidAmount: true },
    }),
  ])

  return {
    students,
    activeMemberships,
    courses,
    enrollments,
    pendingQuestions,
    monthlyRevenue: monthlyRevenue._sum.paidAmount ?? 0,
  }
}

export async function getPendingQuestions(limit = 5) {
  return prisma.tutorConversation.findMany({
    where: { status: "waiting" }, // <-- adjust
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      user: { select: { fullName: true } },
      course: { select: { title: true } },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { content: true, createdAt: true },
      },
    },
  })
}

export async function getCourseOverview(limit = 5) {
  return prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      slug: true,
      title: true,
      _count: {
        select: {
          enrollments: true,
          seasons: true,
        },
      },
      seasons: {
        select: { _count: { select: { lessons: true } } },
      },
    },
  })
}

export async function getRecentEnrollments(limit = 5) {
  return prisma.enrollment.findMany({
    orderBy: { enrolledAt: "desc" },
    take: limit,
    include: {
      user: { select: { fullName: true, email: true } },
      course: { select: { title: true } },
    },
  })
}

export async function getRecentPayments(limit = 5) {
  return prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      user: { select: { fullName: true } },
    },
  })
}
