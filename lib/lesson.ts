"use server"

import { prisma } from "@/prisma/prisma"

export const getDocUrl = async (lessonId: string) => {
  return (
    await prisma.lesson.findFirst({
      where: { id: lessonId },
      select: { url: true },
    })
  )?.url
}
