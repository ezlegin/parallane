"use server"

import { StudentFormTypes } from "@/lib/formSchema"
import { prisma } from "@/prisma/prisma"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"

export async function createStudent(data: StudentFormTypes) {
  const { email, fullName, password } = data

  try {
    const existingStudent = await prisma.user.findFirst({
      where: { email },
    })

    if (existingStudent) {
      throw new Error("A student with this email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    })

    return {
      success: "student created successfully.",
    }
  } catch (error) {
    console.error(error)
    return { error: (error as Error).message }
  }
}

export async function updateStudent(id: string, data: StudentFormTypes) {
  const { email, fullName, password } = data

  try {
    const student = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    if (!student) {
      throw new Error("Student not found")
    }

    const existingStudent = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (existingStudent && existingStudent.id !== id) {
      throw new Error("A student with this email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { id },
      data: {
        fullName,
        email,
        password: password ? hashedPassword : undefined,
      },
    })

    return {
      success: "student updated successfully.",
    }
  } catch (error) {
    return { error: (error as Error).message }
  }
}

export async function deleteStudent(id: string) {
  try {
    const student = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    if (!student) throw new Error("Student not found")

    await prisma.user.delete({ where: { id } })

    revalidatePath("/admin/students")

    return {
      success: "user deleted successfully.",
    }
  } catch (error) {
    return { error: (error as Error).message }
  }
}

export async function setOnboarding(userId: string, data: { country: string }) {
  const { country } = data

  try {
    const user = await prisma.user.findFirst({ where: { id: userId } })
    if (!user) return { error: "User not found. Please sign in again." }

    await prisma.user.update({
      where: { id: userId },
      data: {
        country,
      },
    })

    return { success: "Data updated successfully." }
  } catch (error) {
    console.error(error)
    return { error: (error as Error).message }
  }
}
