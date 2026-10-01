"use client"

import { createContact } from "@/actions/contact"
import GlowingStroke from "@/components/GlowingStroke"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ContactFormType, contactFormSchema } from "@/lib/formSchema"
import { handleRes } from "@/lib/handleRes"
import { User } from "@/prisma/generated/prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowUpRight } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

export default function ContactForm({
  user,
}: {
  user?: Omit<User, "password"> | null
}) {
  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: user?.name ?? "",
      email: user?.email ?? "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(data: ContactFormType) {
    const res = await createContact(data, user?.id)

    handleRes(res, {
      successDescription: "We usually get back within 1–2 business days.",
    })

    form.reset()
  }

  return (
    <div className="grid w-full gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      {/* Intro */}
      <div className="lg:pt-8">
        <Badge variant="outline" className="rounded-full px-3 py-1.5">
          Contact Us
        </Badge>

        <h1 className="mt-6 text-5xl font-semibold tracking-tighter md:text-6xl">
          Let's start
          <br />
          <span className="text-muted-foreground">a conversation.</span>
        </h1>

        <p className="mt-6 max-w-md leading-7 text-muted-foreground">
          Have a question about Parallane, need help with your membership, or
          just want to say hello? We'd love to hear from you.
        </p>

        <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex size-8 items-center justify-center rounded-full border">
            →
          </span>

          <span>We usually get back within 1–2 business days.</span>
        </div>
      </div>

      {/* Form */}
      <Card className="relative overflow-hidden">
        <GlowingStroke />

        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="p-6 md:p-8">
            <FieldGroup className="gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Controller
                  name="fullName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        id="contact-form-fullName"
                        aria-invalid={fieldState.invalid}
                        label="Full Name"
                      />
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        id="contact-form-email"
                        aria-invalid={fieldState.invalid}
                        label="Email Address"
                        type="email"
                      />
                    </Field>
                  )}
                />
              </div>

              {/* Subject */}
              <Controller
                name="subject"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="contact-form-subject"
                      aria-invalid={fieldState.invalid}
                      label="Subject"
                    />
                  </Field>
                )}
              />

              {/* Message */}
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Textarea
                      {...field}
                      id="contact-form-message"
                      aria-invalid={fieldState.invalid}
                      placeholder="Tell us how we can help..."
                      className="min-h-40 resize-none"
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex-col items-stretch gap-4 border-t p-6 md:p-8">
            <Button size="lg" type="submit" className="h-12 w-full">
              Send Message
              <ArrowUpRight className="ml-2 size-4" />
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By contacting us, you agree to our{" "}
              <a
                href="/privacy"
                className="text-foreground underline underline-offset-4"
              >
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
