"use server"

import { StudentFormTypes } from "@/lib/formSchema"
import { db } from "@/prisma/db"
import bcrypt from "bcrypt"

export async function createStudent(data: StudentFormTypes) {
  const { email, fullName, password } = data

  try {
    const existingStudent = await db.orm.public.User.first({
      email,
    })

    if (existingStudent) {
      throw new Error("A student with this email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.orm.public.User.create({
      fullName,
      email,
      password: hashedPassword,
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
    const student = await db.orm.public.User.first({
      id,
    })

    if (!student) {
      throw new Error("Student not found")
    }

    const existingStudent = await db.orm.public.User.first({
      email,
    })

    if (existingStudent && existingStudent.id !== id) {
      throw new Error("A student with this email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.orm.public.User.where({ id }).update({
      fullName,
      email,
      password: password ? hashedPassword : undefined,
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
    const student = await db.orm.public.User.first({
      id,
    })

    if (!student) throw new Error("Student not found")

    await db.orm.public.User.where({ id }).delete()

    return {
      success: "user deleted successfully.",
    }
  } catch (error) {
    return { error: (error as Error).message }
  }
}
