"use server"

import { prisma } from "@/prisma/prisma"

export async function searchCourse(query: string) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      select: {
        id: true,
        title: true,
      },
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    })

    return { courses }
  } catch (error) {
    return { error: (error as Error).message }
  }
}
