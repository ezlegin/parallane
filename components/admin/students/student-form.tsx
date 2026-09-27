"use client"

import { createStudent, updateStudent } from "@/actions/student"
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { StudentFormTypes, studentFormSchema } from "@/lib/formSchema"
import { User } from "@/prisma/generated/prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

export function StudentForm({ student }: { student?: Omit<User, "password"> }) {
  const router = useRouter()

  const isEditing = !!student

  const form = useForm<StudentFormTypes>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      fullName: student?.fullName ?? "",
      email: student?.email ?? "",
      password: "",
    },
  })

  async function onSubmit(data: StudentFormTypes) {
    const res = isEditing
      ? await updateStudent(student?.id, data)
      : await createStudent(data)

    if (res.error) {
      toast.add({ title: res.error })
      return
    }

    if (res.success) {
      toast.add({ title: res.success })
    }

    if (!isEditing) {
      router.push("/admin/students")
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
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Full Name"
                  />
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Email Address"
                  />
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
