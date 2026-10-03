"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { createConversation, createMessage } from "@/actions/conversation"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { handleRes } from "@/lib/handleRes"
import { TutorMessageRole } from "@/prisma/generated/prisma/enums"
import { toast } from "../ui/toast"

const formSchema = z.object({
  message: z
    .string()
    .min(2, { message: "Message must be at least 2 characters." })
    .max(600, { message: "Message cannot exceed 600 characters." }),
})

type FormValues = z.infer<typeof formSchema>

function ConversationMessageForm({
  conversationId,
  role = "user",
  userId,
  courseId,
  classroomId,
}: {
  conversationId?: string | null
  userId: string
  courseId: string
  role?: TutorMessageRole
  classroomId?: string
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  async function onSubmit(data: FormValues) {
    let res: Awaited<ReturnType<typeof createMessage>>

    if (conversationId) {
      res = await createMessage(data.message, role, conversationId)
    } else {
      const newConversation = await createConversation(
        courseId,
        userId,
        classroomId!
      )
      if (!newConversation.conversationId) {
        toast.add({
          title: "Something Happened. Please try again.",
          type: "error",
        })
        return
      }
      res = await createMessage(
        data.message,
        role,
        newConversation.conversationId
      )
    }

    handleRes(res)
    form.reset()
  }

  // Ctrl/Cmd + Enter submits — everything else is normal typing
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      form.handleSubmit(onSubmit)()
    }
  }

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/i.test(navigator.platform)

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
                className="max-h-40 min-h-20 resize-none overflow-y-auto"
                onKeyDown={onKeyDown}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">Replying as {role}</p>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">
              {isMac ? "⌘" : "Ctrl"}
            </kbd>
            <span>+</span>
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium">
              ↵
            </kbd>
            <span>to send</span>
          </span>

          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send message"}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ConversationMessageForm
