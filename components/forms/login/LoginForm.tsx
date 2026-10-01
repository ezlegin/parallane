"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { createStudent } from "@/actions/student"
import GlowingStroke from "@/components/GlowingStroke"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { handleRes } from "@/lib/handleRes"
import { googleLogo } from "@/public"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/toast"
import { GoogleOAuthSignIn } from "@/actions/OAuth"

const formSchema = z.object({
  fullName: z.string().optional(),
  email: z.email(),
  password: z.string().min(8, "at least 8 characters."),
})

type FormType = z.infer<typeof formSchema>

export default function LoginForm() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: FormType) {
    if (isSignUp) {
      const res = await createStudent(data as Required<FormType>)
      handleRes(res, { onSuccess: () => router.push("/login/onboarding") })
    } else {
      const res = await signIn("user-login", {
        ...data,
        redirect: false,
      })

      if (res.error) {
        toast.add({
          title: "Invalid Credentials.",
          description: "Please check your email and password.",
          type: "error",
        })
      } else {
        toast.add({
          title: "Logged In Successfull.",
          description: "Welcome to parallane user panel.",
          type: "success",
        })
        router.push("/panel")
      }
    }
  }

  const onGoogleLogin = () => {
    startTransition(async () => {
      await GoogleOAuthSignIn()
    })
  }

  return (
    <div className="w-full space-y-6 sm:max-w-sm">
      <Card className="relative">
        <GlowingStroke />

        <CardContent className="space-y-6">
          <Button
            disabled={isPending}
            variant={"outline"}
            className={"h-12 w-full"}
            size={"lg"}
            onClick={onGoogleLogin}
          >
            <Image alt="logo" src={googleLogo} width={20} height={20} />
            Continue with Google
          </Button>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <Separator />
            <span>or</span>
            <Separator />
          </div>

          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {isSignUp && (
                <Controller
                  name="fullName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        id="login-form-fullName"
                        aria-invalid={fieldState.invalid}
                        label="Full Name"
                      />
                    </Field>
                  )}
                />
              )}

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      label="Email Address"
                    />
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      label="Password"
                    />
                  </Field>
                )}
              />

              {!isSignUp && (
                <Link
                  href={"/login/forgot-password"}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Forgot password?
                </Link>
              )}
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              size={"lg"}
              type="submit"
              form="login-form"
              className={"w-full"}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </Field>
        </CardFooter>
      </Card>

      <div className="space-y-6 text-center">
        <p className="text-xs text-muted-foreground">
          Don't have an account?{" "}
          <button
            className="font-semibold text-primary"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link href={"/terms"} className="text-primary underline">
            Terms and Privacy
          </Link>{" "}
          Policy.
        </p>
      </div>
    </div>
  )
}
