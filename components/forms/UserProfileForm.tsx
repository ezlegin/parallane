"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { Separator } from "@/components/ui/separator"
import { handleRes } from "@/lib/handleRes"
import { updateUserProfile, updateUserPassword } from "@/actions/student"

// ---------- Schemas ----------
const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
})

const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
})

type ProfileValues = z.infer<typeof profileSchema>
type PasswordValues = z.infer<typeof passwordSchema>

type Props = {
  user: {
    fullName: string
    email: string
  }
}

export function UserProfileForm({ user }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  // ----- Profile form -----
  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user.fullName,
    },
  })

  async function onProfileSubmit(data: ProfileValues) {
    const res = await updateUserProfile(data)
    handleRes(res)

    if ("success" in res) {
      profileForm.reset(data) // clears dirty state
    }
  }

  // ----- Password form -----
  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  })

  async function onPasswordSubmit(data: PasswordValues) {
    const res = await updateUserPassword(data)
    handleRes(res)

    if ("success" in res) {
      passwordForm.reset({ password: "" })
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      {/* Personal information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>
            Update the information associated with your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
            <FieldGroup>
              <Controller
                name="fullName"
                control={profileForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      autoComplete="name"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  readOnly
                />
                <FieldDescription>
                  Your email address cannot be changed.
                </FieldDescription>
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              className="mt-6"
              disabled={
                profileForm.formState.isSubmitting ||
                !profileForm.formState.isDirty
              }
            >
              {profileForm.formState.isSubmitting && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Save changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Choose a new password for your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
            <FieldGroup>
              <Controller
                name="password"
                control={passwordForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>New password</FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Enter a new password"
                        className="pr-10"
                        aria-invalid={fieldState.invalid}
                      />

                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Separator className="my-6" />

            <Button
              type="submit"
              disabled={
                passwordForm.formState.isSubmitting ||
                !passwordForm.formState.isDirty
              }
            >
              {passwordForm.formState.isSubmitting && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Update password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
