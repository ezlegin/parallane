"use server"

import { prisma } from "@/prisma/prisma"

export async function searchUsers(query: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: query,
        },
      },
      select: {
        id: true,
        email: true,
        fullName: true,
      },
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    })

    return { users }
  } catch (error) {
    return { error: (error as Error).message }
  }
}
