"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { handleRes } from "@/lib/handleRes"
import { createMessage } from "@/actions/conversation"

const formSchema = z.object({
  message: z
    .string()
    .min(2, { message: "Message must be at least 2 characters." })
    .max(600, { message: "Message cannot exceed 600 characters." }),
})

type FormValues = z.infer<typeof formSchema>

function ConversationMessageForm({
  conversationId,
  studentName,
}: {
  conversationId: string
  studentName: string
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: `Hi ${studentName},`,
    },
  })

  async function onSubmit(data: FormValues) {
    handleRes(await createMessage(conversationId, data.message))
    form.reset()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <FieldGroup>
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="sr-only">
                Message
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="Write a message..."
                rows={3}
                aria-invalid={fieldState.invalid}
                className="max-h-40 resize-none overflow-y-auto"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">Replying as admin</p>

        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  )
}

export default ConversationMessageForm
