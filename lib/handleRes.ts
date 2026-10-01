"use client"

import { toast } from "@/components/ui/toast"

export function handleRes(
  res:
    | {
        success: string
        error?: undefined
      }
    | {
        error: string
        success?: undefined
      },
  options?: {
    onError?: () => void
    onSuccess?: () => void
    successDescription?: string
    errorDescription?: string
  }
) {
  if (res.error) {
    toast.add({
      title: res.error,
      type: "error",
      description: options?.errorDescription,
    })
    options && options.onError && options.onError()
    return
  }

  if (res.success) {
    options && options.onSuccess && options.onSuccess()
    toast.add({
      title: res.success,
      type: "success",
      description: options?.successDescription,
    })
  }
}
