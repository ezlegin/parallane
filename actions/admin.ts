"use server"

import { AdminProfileFormType } from "@/lib/formSchema"
import { prisma } from "@/prisma/prisma"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"

// ---------- Create ----------
export async function createAdmin(values: AdminProfileFormType) {
  const { name, email, password } = values

  try {
    const existing = await prisma.admin.findUnique({
      where: { email },
    })
    if (existing) {
      return { error: "An admin with this email already exists." }
    }

    if (!password) {
      return { error: "Password is required when creating an admin." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.admin.create({
      data: {
        fullName: name,
        email,
        password: hashedPassword,
      },
    })

    revalidatePath("/admin/profile")

    return { success: "Admin created successfully." }
  } catch (err) {
    console.error("[createAdmin]", err)
    return { error: "Failed to create admin. Try again." }
  }
}

// ---------- Update ----------
export async function updateAdmin(id: string, values: AdminProfileFormType) {
  const { name, email, password } = values

  try {
    const admin = await prisma.admin.findUnique({
      where: { id },
    })
    if (!admin) {
      return { error: "Admin not found." }
    }

    const conflict = await prisma.admin.findFirst({
      where: {
        email,
        NOT: { id },
      },
    })
    if (conflict) {
      return { error: "Another admin already uses this email." }
    }

    const data: {
      fullName: string
      email: string
      password?: string
    } = {
      fullName: name,
      email,
    }

    if (password && password.length > 0) {
      data.password = await bcrypt.hash(password, 10)
    }

    await prisma.admin.update({
      where: { id },
      data,
    })

    revalidatePath("/admin/profile")

    return { success: "Profile updated successfully." }
  } catch (err) {
    console.error("[updateAdmin]", err)
    return { error: "Failed to update profile. Try again." }
  }
}
