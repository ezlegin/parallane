"use server"

import { sendContactEmail } from "@/lib/email"
import { ContactFormType } from "@/lib/formSchema"
import { prisma } from "@/prisma/prisma"
import { revalidatePath } from "next/cache"

export const createContact = async (data: ContactFormType, userId?: string) => {
  const { email, fullName, message, subject } = data

  try {
    const user = await prisma.user.findFirst({ where: { id: userId } })

    await prisma.contact.create({
      data: {
        message,
        subject,
        email: user?.email ?? email,
        fullName: user?.fullName ?? fullName,
        userId: user?.id,
      },
    })

    return {
      success: "Your message was sent successfully.",
    }
  } catch (error) {
    console.error(error)
    return { error: "Something happended. Please try again later." }
  }
}

export const respondContact = async (contactId: string, message: string) => {
  try {
    const contact = await prisma.contact.findFirst({
      where: { id: contactId },
      include: { user: true },
    })
    if (!contact) return { error: "Contact not found." }

    const user = contact.user ?? {
      email: contact.email,
    }

    await sendContactEmail(user.email, contact.subject, message)

    await prisma.contact.update({
      where: { id: contactId },
      data: {
        responseMessage: message,
        respondedAt: new Date(),
        status: "replied",
      },
    })

    revalidatePath(`/amdin/contact/${contactId}`)

    return {
      success: "Email response was sent successfully.",
    }
  } catch (error) {
    console.error(error)
    return { error: "Something happended. Please try again later." }
  }
}
