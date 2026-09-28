"use server"

import { prisma } from "@/prisma/prisma"
import { PaymentFormValues } from "@/components/admin/payments/payment-form"
import { incrementString } from "@/lib/incrementString"
import { revalidatePath } from "next/cache"

export async function createPayment(values: PaymentFormValues) {
  const {
    status,
    discountCode,
    discountType,
    discountAmount,
    totalAmount,
    paidAmount,
    userId,
  } = values

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      return { error: "User not found." }
    }

    const lastPayment = await prisma.payment.findFirst({
      orderBy: { createdAt: "desc" },
    })

    await prisma.payment.create({
      data: {
        userId,
        reference: incrementString(lastPayment?.reference),
        status,
        totalAmount,
        discountAmount,
        paidAmount,
        discountType: discountType ?? null,
        discountCode: discountCode?.trim() || null,
        paidAt: status === "success" ? new Date() : null,
      },
    })

    return {
      success: "Payment created successfully.",
    }
  } catch (err) {
    console.error("[createPayment]", err)
    return {
      error: "Failed to create payment. Try again.",
    }
  }
}

export async function updatePayment(
  paymentId: string,
  values: PaymentFormValues
) {
  const {
    status,
    discountCode,
    discountType,
    discountAmount,
    totalAmount,
    paidAmount,
    userId,
  } = values

  try {
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        userId,
        status,
        totalAmount,
        discountAmount,
        paidAmount,
        discountType: discountType ?? null,
        discountCode: discountCode?.trim() || null,
      },
    })

    return {
      success: "Payment created successfully.",
    }
  } catch (err) {
    console.error("[createPayment]", err)
    return {
      error: "Failed to create payment. Try again.",
    }
  }
}

export async function deletePayment(id: string) {
  try {
    await prisma.payment.delete({ where: { id } })

    revalidatePath("/admin/payments")

    return { success: "Payment deleted successfully." }
  } catch (err) {
    console.error("[deletePayment]", err)
    return { error: "Failed to delete Payment." }
  }
}
