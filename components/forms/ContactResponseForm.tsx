"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Loader2, Save } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { respondContact } from "@/actions/contact"
import { Button } from "@/components/ui/button"
import { Field, FieldError } from "@/components/ui/field"
import {
  contactResponseFormSchema,
  ContactResponseFormType,
} from "@/lib/formSchema"
import { handleRes } from "@/lib/handleRes"
import { Contact, User } from "@/prisma/generated/prisma/client"
import { Textarea } from "../ui/textarea"

export default function ContactResponseForm({
  contact,
}: {
  contact: Contact & { user: Omit<User, "password"> | null }
}) {
  const user = contact.user ?? {
    fullName: contact.fullName,
    email: contact.email,
  }

  const form = useForm<ContactResponseFormType>({
    resolver: zodResolver(contactResponseFormSchema),
    defaultValues: {
      message: contact.responseMessage ?? `Hi dear ${user.fullName},`,
    },
  })

  async function onSubmit(data: ContactResponseFormType) {
    const res = await respondContact(contact.id, data.message)
    handleRes(res)
  }

  if (contact.responseMessage)
    return (
      <div className="flex items-center justify-center gap-1 text-center text-xs text-muted-foreground">
        <Check size={14} />
        Contact has been responded.
      </div>
    )

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="message"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Textarea
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Your response message as an admin..."
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="size-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
