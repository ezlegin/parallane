"use server"

import { adminSignIn } from "@/admin-auth"

export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await adminSignIn("admin-login", {
      ...data,
      redirect: false,
    })

    if (res && (res as any).error) {
      return { error: (res as any).error as string }
    }

    return { success: "Signin Successfull, Welcome!" }
  } catch (err: unknown) {
    const maybeCause = (err as any)?.cause
    const maybeInnerErrMessage =
      maybeCause?.err?.message ?? maybeCause?.message ?? (err as any)?.message

    const message =
      typeof maybeInnerErrMessage === "string"
        ? maybeInnerErrMessage
        : "Something went wrong. Please try again later."

    return { error: message }
  }
}
