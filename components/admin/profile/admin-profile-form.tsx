"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import type { admin } from "@/lib/admin"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const adminProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name is too long."),

  email: z.string().email("Please enter a valid email address."),

  password: z
    .string()
    .refine(
      (value) => value === "" || value.length >= 8,
      "Password must be at least 8 characters."
    ),
})

type AdminProfileFormValues = z.infer<typeof adminProfileSchema>

type AdminProfileFormProps = {
  admin: typeof admin
}

export function AdminProfileForm({ admin }: AdminProfileFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<AdminProfileFormValues>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      name: admin.name,
      email: admin.email,
      password: "",
    },
  })

  async function onSubmit(values: AdminProfileFormValues) {
    try {
      // TODO:
      // Connect this to your server action/API.
      //
      // Password must be hashed on the server before
      // being stored in the database.

      console.log({
        name: values.name,
        email: values.email,
        password: values.password || undefined,
      })

      // todo:
      //   toast.success("Profile updated successfully.")

      router.refresh()
    } catch {
      // todo:
      //   toast.error("Failed to update profile.")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Account information</CardTitle>

          <CardDescription>
            Update your administrator account details.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            {/* Full name */}
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">Full name</FieldLabel>

              <Input
                id="name"
                placeholder="Alireza Ezlegini"
                autoComplete="name"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />

              {form.formState.errors.name && (
                <FieldError>{form.formState.errors.name.message}</FieldError>
              )}
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input id="email" type="email" value={admin.email} />

              <FieldDescription>
                By changing your email address, you won't be able to log in with
                this email again.
              </FieldDescription>
            </Field>

            {/* Password */}
            <Field data-invalid={!!form.formState.errors.password}>
              <FieldLabel htmlFor="password">New password</FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Leave empty to keep current password"
                  autoComplete="new-password"
                  className="pr-10"
                  aria-invalid={!!form.formState.errors.password}
                  {...form.register("password")}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 size-10"
                  tabIndex={-1}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}

                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>

              <FieldDescription>
                Leave this empty if you do not want to change your password.
              </FieldDescription>

              {form.formState.errors.password && (
                <FieldError>
                  {form.formState.errors.password.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save changes
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
