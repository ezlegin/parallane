"use server"

import { prisma } from "@/prisma/prisma"
import { revalidatePath } from "next/cache"

export const createMessage = async (
  conversationId: string,
  message: string
) => {
  try {
    await prisma.tutorMessage.create({
      data: {
        content: message,
        role: "tutor",
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
