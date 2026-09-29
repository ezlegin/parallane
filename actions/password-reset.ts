"use server"

import { sendPasswordResetEmail } from "@/lib/email"
import { generateResetToken, hashToken } from "@/lib/token"
import { prisma } from "@/prisma/prisma"
import bcrypt from "bcrypt"

export async function requestPasswordReset(values: { email: string }) {
  const { email } = values

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return { error: "No user with this email exists." }
    }

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, usedAt: null },
    })

    const { raw, tokenHash, expiresAt } = generateResetToken()

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    })

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_APP_URL
    const resetUrl = `${baseUrl}/login/reset-password/${raw}`

    await sendPasswordResetEmail(user.email, resetUrl)

    return { success: "A reset password link has been sent successfully." }
  } catch (err) {
    console.error("[requestPasswordReset]", err)
    return { error: "Something went wrong. Try again." }
  }
}

export async function resetPassword(values: {
  token: string
  password: string
}) {
  const { token, password } = values

  try {
    const tokenHash = hashToken(token)

    const record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    })

    if (!record) {
      return { error: "This reset link is invalid." }
    }
    if (record.usedAt) {
      return { error: "This reset link has already been used." }
    }
    if (record.expiresAt < new Date()) {
      return { error: "This reset link has expired." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
      // Invalidate any other outstanding tokens for this user
      prisma.passwordResetToken.deleteMany({
        where: { userId: record.userId, usedAt: null, NOT: { id: record.id } },
      }),
    ])

    return { success: "Password reset successfully. You can now log in." }
  } catch (err) {
    console.error("[resetPassword]", err)
    return { error: "Something went wrong. Try again." }
  }
}

// ---------- Validate a token (used by the reset page) ----------
export async function validateResetToken(token: string) {
  try {
    const tokenHash = hashToken(token)
    const record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      select: { expiresAt: true, usedAt: true },
    })

    if (!record || record.usedAt || record.expiresAt < new Date()) {
      return { valid: false as const }
    }
    return { valid: true as const }
  } catch (err) {
    console.error("[validateResetToken]", err)
    return { valid: false as const }
  }
}
