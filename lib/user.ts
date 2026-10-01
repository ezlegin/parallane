"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma/prisma"

export async function searchUsers(query: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: query.toLowerCase(),
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
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

export const getSessionUser = async () => {
  const session = await auth()

  if (!session || !session.user) return null

  return await prisma.user.findFirst({
    where: { id: session.user.id },
    omit: { password: true },
  })
}

export const getActiveMembership = async (userId?: string) => {
  if (!userId) return null

  return await prisma.membership.findFirst({
    where: {
      userId,
      expiresAt: { gte: new Date() },
      status: "active",
    },
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  })
}
