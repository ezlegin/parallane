"use client"

import { toast } from "@/components/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import GlowingStroke from "@/components/GlowingStroke"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { googleLogo } from "@/public"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const formSchema = z.object({
  fullName: z.string().min(2, "at least 2 characters.").optional(),
  email: z.email(),
  password: z.string().min(8, "at least 8 characters."),
})

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    toast.add({ title: "Form Was Submitted." })
  }

  return (
    <div className="w-full space-y-6 sm:max-w-sm">
      <Card className="relative">
        <GlowingStroke />

        <CardContent className="space-y-6">
          <Button variant={"outline"} className={"h-12 w-full"} size={"lg"}>
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
                      {/* {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )} */}
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
                    {/* {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )} */}
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
                    {/* {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )} */}
                  </Field>
                )}
              />

              {!isSignUp && (
                <Link
                  href={"/login/forgotpassword"}
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
