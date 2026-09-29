"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import GlowingStroke from "@/components/GlowingStroke"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { handleRes } from "@/lib/handleRes"
import { resetPassword } from "@/actions/password-reset"

const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm: z.string().min(8, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  })

type FormValues = z.infer<typeof formSchema>

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", confirm: "" },
  })

  async function onSubmit(data: FormValues) {
    const res = await resetPassword({ token, password: data.password })
    handleRes(res, { onSuccess: () => router.push("/login") })
  }

  return (
    <div className="w-full space-y-6 sm:max-w-sm">
      <Card className="relative">
        <GlowingStroke />

        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Choose a new password for your account.
          </p>

          <form id="reset-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>New password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        className="pr-10"
                        aria-invalid={fieldState.invalid}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        tabIndex={-1}
                        className="absolute top-0 right-0 size-12"
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirm"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm password
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation="vertical">
            <Button
              size="lg"
              type="submit"
              form="reset-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Reset password
            </Button>

            <Link href="/login" className="w-full">
              <Button
                size="lg"
                type="button"
                variant="secondary"
                className="w-full"
              >
                Back to login
              </Button>
            </Link>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
