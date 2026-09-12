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
import Link from "next/link"

const formSchema = z.object({
  email: z.email(),
})

export default function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
          <p>to reset your password, enter you email address below.</p>

          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="vertical">
            <Button size={"lg"} type="submit" form="login-form">
              Send the Link
            </Button>
            <Link href={"/login"}>
              <Button
                size={"lg"}
                type="button"
                variant={"secondary"}
                className={"w-full"}
              >
                Go Back
              </Button>
            </Link>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
