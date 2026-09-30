"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { login } from "./login"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your password."),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function page() {
  const router = useRouter()
  const [isPending, startTransintion] = useTransition()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    startTransintion(async () => {
      const res = await login(data)

      if (res.error) {
        toast.add({ title: res.error })
      } else {
        toast.add({ title: res.success })
        router.push("/admin/dashboard")
      }
    })
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Sign in to access the administration panel.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <Input
                  id="email"
                  type="email"
                  label="Email Address"
                  autoComplete="email"
                  {...form.register("email")}
                />

                {form.formState.errors.email && (
                  <FieldError>{form.formState.errors.email.message}</FieldError>
                )}
              </Field>

              <Field>
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  autoComplete="current-password"
                  {...form.register("password")}
                />

                {form.formState.errors.password && (
                  <FieldError>
                    {form.formState.errors.password.message}
                  </FieldError>
                )}
              </Field>

              <Field className="pt-2">
                <Button
                  size={"lg"}
                  type="submit"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? "Signing in..." : "Sign in"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
