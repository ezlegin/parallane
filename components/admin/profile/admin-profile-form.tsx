"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2, Save } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { createAdmin, updateAdmin } from "@/actions/admin"
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
import { adminProfileFormSchema, AdminProfileFormType } from "@/lib/formSchema"
import { handleRes } from "@/lib/handleRes"
import { Admin } from "@/prisma/generated/prisma/client"

export function AdminProfileForm({ admin }: { admin?: Admin | null }) {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<AdminProfileFormType>({
    resolver: zodResolver(adminProfileFormSchema),
    defaultValues: {
      name: admin?.fullName ?? "",
      email: admin?.email ?? "",
      password: "",
    },
  })

  async function onSubmit(data: AdminProfileFormType) {
    const res = await (admin ? updateAdmin(admin.id, data) : createAdmin(data))

    handleRes(res)
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
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full name</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Alireza Ezlegini"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                    placeholder="admin@parallane.com"
                    autoComplete="email"
                  />

                  <FieldDescription>
                    By changing your email address, you won't be able to log in
                    with this email again.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Leave empty to keep current password"
                      autoComplete="new-password"
                      className="pr-10"
                      aria-invalid={!!form.formState.errors.password}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-2 size-12"
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

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
