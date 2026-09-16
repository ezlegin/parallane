"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import type { AdminStudent } from "@/lib/admin-students"

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
import { toast } from "@/components/ui/toast"

const studentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),

  email: z.string().email("Please enter a valid email address."),

  password: z
    .string()
    .refine(
      (value) => value === "" || value.length >= 8,
      "Password must be at least 8 characters."
    ),
})

type StudentFormValues = z.infer<typeof studentSchema>

type StudentFormProps = {
  student?: AdminStudent
}

export function StudentForm({ student }: StudentFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const isEditing = Boolean(student)

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: student?.name ?? "",
      email: student?.email ?? "",
      password: "",
    },
  })

  async function onSubmit(values: StudentFormValues) {
    try {
      // TODO:
      // Connect this to your API/server action.
      //
      // Example:
      // await updateStudent(student.id, values)

      console.log({
        ...values,
        password: values.password || undefined,
      })

      toast.add({
        title: isEditing
          ? "Student updated successfully."
          : "Student created successfully.",
      })

      if (isEditing && student) {
        router.push(`/admin/students/${student.id}`)
        router.refresh()
      } else {
        router.push("/admin/students")
        router.refresh()
      }
    } catch {
      // todo
      //   toast.error(
      //     isEditing ? "Failed to update student." : "Failed to create student."
      //   )
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Account information</CardTitle>

          <CardDescription>
            {isEditing
              ? "Update the student's account details."
              : "Create a new student account."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            {/* Name */}
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">Full name</FieldLabel>

              <Input
                id="name"
                placeholder="Alex Morgan"
                autoComplete="name"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />

              {form.formState.errors.name && (
                <FieldError>{form.formState.errors.name.message}</FieldError>
              )}
            </Field>

            {/* Email */}
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="alex@example.com"
                autoComplete="email"
                disabled={isEditing}
                aria-invalid={!!form.formState.errors.email}
                {...form.register("email")}
              />

              {isEditing ? (
                <FieldDescription>
                  Email addresses cannot be changed from the admin panel.
                </FieldDescription>
              ) : (
                <FieldDescription>
                  This email will be used by the student to sign in.
                </FieldDescription>
              )}

              {form.formState.errors.email && (
                <FieldError>{form.formState.errors.email.message}</FieldError>
              )}
            </Field>

            {/* Password */}
            <Field data-invalid={!!form.formState.errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    isEditing
                      ? "Leave empty to keep current password"
                      : "Enter a password"
                  }
                  autoComplete={isEditing ? "new-password" : "new-password"}
                  className="pr-10"
                  aria-invalid={!!form.formState.errors.password}
                  {...form.register("password")}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 size-10"
                  onClick={() => setShowPassword((value) => !value)}
                  tabIndex={-1}
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
                {isEditing
                  ? "Only enter a password if you want to change it."
                  : "The password must contain at least 8 characters."}
              </FieldDescription>

              {form.formState.errors.password && (
                <FieldError>
                  {form.formState.errors.password.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={form.formState.isSubmitting}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" />
                {isEditing ? "Save changes" : "Create student"}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
