"use server"

import { MembershipFormValues } from "@/lib/formSchema"
import { Payment } from "@/prisma/generated/prisma/client"
import { prisma } from "@/prisma/prisma"
import { revalidatePath } from "next/cache"

export async function createMembership(values: MembershipFormValues) {
  const { userId, paymentId, from, expiresAt, period } = values

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      return { error: "User not found." }
    }

    let payment: Payment | null = null
    if (paymentId) {
      payment = await prisma.payment.findUnique({
        where: { id: paymentId },
      })
      if (!payment) {
        return { error: "Payment not found." }
      }
    }

    const existing = await prisma.membership.findFirst({
      where: {
        userId,
        status: "active",
        expiresAt: { gt: new Date() },
      },
    })
    if (existing) {
      return { error: "This user already has an active membership." }
    }

    await prisma.membership.create({
      data: {
        userId,
        reference: "par-004",
        price: payment ? payment.totalAmount : 0,
        payment: payment
          ? {
              connect: { id: paymentId },
            }
          : undefined,
        startsAt: from,
        expiresAt,
        period,
      },
    })

    return { success: "Membership created successfully." }
  } catch (err) {
    console.error("[createMembership]", err)
    return { error: "Failed to create membership. Try again." }
  }
}

export async function updateMembership(
  id: string,
  values: MembershipFormValues
) {
  const { userId, paymentId, from, expiresAt, period } = values

  try {
    const membership = await prisma.membership.findUnique({
      where: { id },
    })
    if (!membership) {
      return { error: "Membership not found." }
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      return { error: "User not found." }
    }

    let payment: Payment | null = null
    if (paymentId) {
      payment = await prisma.payment.findUnique({
        where: { id: paymentId },
      })
      if (!payment) {
        return { error: "Payment not found." }
      }
    }

    await prisma.membership.update({
      where: { id },
      data: {
        userId,
        payment: payment
          ? {
              connect: { id: paymentId },
            }
          : undefined,
        startsAt: from,
        expiresAt,
        period,
        price: payment ? payment.totalAmount : 0,
      },
    })

    return { success: "Membership updated successfully." }
  } catch (err) {
    console.error("[updateMembership]", err)
    return { error: "Failed to update membership. Try again." }
  }
}

export async function deleteMembership(id: string) {
  try {
    await prisma.membership.delete({ where: { id } })

    revalidatePath("/admin/memberships")

    return { success: "Membership deleted successfully." }
  } catch (err) {
    console.error("[deleteMembership]", err)
    return { error: "Failed to delete membership." }
  }
}
