"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
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
import { requestPasswordReset } from "@/actions/password-reset"

const formSchema = z.object({
  email: z.email("Enter a valid email address."),
})

type FormValues = z.infer<typeof formSchema>

export default function ForgotPasswordForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(data: FormValues) {
    const res = await requestPasswordReset(data)
    handleRes(res, { onSuccess: () => form.reset() })
  }

  return (
    <div className="w-full space-y-6 sm:max-w-sm">
      <Card className="relative">
        <GlowingStroke />

        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            To reset your password, enter your email address below. We'll send
            you a link.
          </p>

          <form id="forgot-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
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
              form="forgot-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Send the link
            </Button>

            <Link href="/login" className="w-full">
              <Button
                size="lg"
                type="button"
                variant="secondary"
                className="w-full"
              >
                Go back
              </Button>
            </Link>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
