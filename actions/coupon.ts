"use server"

import { CouponFormValues } from "@/lib/formSchema"
import { prisma } from "@/prisma/prisma"
import { revalidatePath } from "next/cache"

export const createCoupon = async (values: CouponFormValues) => {
  const { amount, code, expiresAt, summary, type, usageLimit } = values

  try {
    const existing = await prisma.coupon.findUnique({
      where: { code },
    })
    if (existing) {
      return {
        error: "A coupon with this code already exists",
      }
    }

    await prisma.coupon.create({
      data: {
        code,
        discountType: type,
        discountAmount: Number(amount),
        expiresAt,
        usageLimit: +usageLimit,
        summary: summary,
      },
    })

    return { success: "Coupon created successfully." }
  } catch (err) {
    console.error("[createCoupon]", err)
    return { error: "Failed to create coupon. Try again." }
  }
}

export async function updateCoupon(id: string, values: CouponFormValues) {
  const { amount, code, expiresAt, summary, type, usageLimit } = values

  try {
    const conflict = await prisma.coupon.findFirst({
      where: {
        code,
        NOT: { id },
      },
    })
    if (conflict) {
      return {
        error: "Another coupon already uses this code",
      }
    }

    await prisma.coupon.update({
      where: { id },
      data: {
        code,
        discountType: type,
        discountAmount: Number(amount),
        expiresAt,
        usageLimit: +usageLimit,
        summary,
      },
    })

    revalidatePath("/coupons")

    return { success: "Coupon updated successfully." }
  } catch (err) {
    console.error("[updateCoupon]", err)
    return { error: "Failed to update coupon. Try again." }
  }
}

// ---------- Delete ----------
export async function deleteCoupon(id: string) {
  try {
    await prisma.coupon.delete({ where: { id } })
    revalidatePath("/admin/coupons")
    return { success: "Coupon deleted successfully." }
  } catch (err) {
    console.error("[deleteCoupon]", err)
    return { error: "Failed to delete coupon." }
  }
}
