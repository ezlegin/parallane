"use server"

import { adminAuth } from "@/admin-auth"
import { prisma } from "@/prisma/prisma"

export const getSessionAdmin = async () => {
  const session = await adminAuth()

  if (!session || !session.user) return null

  return await prisma.admin.findFirst({
    where: { id: session.user.id },
    omit: { password: true },
  })
}
