"use server"

import { TutorMessageRole } from "@/prisma/generated/prisma/enums"
import { prisma } from "@/prisma/prisma"
import { revalidatePath } from "next/cache"

export const createMessage = async (
  message: string,
  role: TutorMessageRole,
  conversationId: string
) => {
  try {
    await prisma.tutorMessage.create({
      data: {
        content: message,
        role,
        conversationId,
      },
    })

    await prisma.tutorConversation.update({
      where: { id: conversationId },
      data: { status: "replied" },
    })

    revalidatePath(`/admin/qa/${conversationId}`)

    return { success: "New message sent successfully." }
  } catch (error) {
    return { error: (error as Error).message }
  }
}

export const createConversation = async (
  courseId: string,
  userId: string,
  classroomId: string
) => {
  try {
    const newCons = await prisma.tutorConversation.create({
      data: {
        status: "waiting",
        courseId,
        userId,
        classrooms: {
          connect: { id: classroomId },
        },
      },
      select: { id: true },
    })

    return {
      success: "New message sent successfully.",
      conversationId: newCons.id,
    }
  } catch (error) {
    console.error(error)
    return { error: (error as Error).message }
  }
}
