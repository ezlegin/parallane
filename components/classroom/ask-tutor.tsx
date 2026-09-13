"use client"

import { FormEvent, useState } from "react"
import { Bot, Send, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "tutor"
  content: string
}

type AskTutorProps = {
  courseTitle: string
  lessonTitle: string
}

export function AskTutor({ courseTitle, lessonTitle }: AskTutorProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      return
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    }

    setMessages((current) => [...current, userMessage])

    setMessage("")

    /*
     * Later:
     *
     * const response = await fetch("/api/tutor", {
     *   method: "POST",
     *   body: JSON.stringify({
     *     courseTitle,
     *     lessonTitle,
     *     message: trimmedMessage,
     *   }),
     * })
     *
     * const tutorMessage = await response.json()
     *
     * setMessages(...)
     */
  }

  return (
    <section className="py-8 md:py-10">
      <div>
        <div className="mb-5">
          <p className="text-sm font-medium">Ask Tutor</p>

          <h2 className="mt-1 text-xl font-semibold">Need help?</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Ask questions about this lesson or anything you're learning on
            Parallane.
          </p>
        </div>

        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full border bg-muted">
                <Bot className="size-4" />
              </div>

              <div>
                <CardTitle className="text-sm">Parallane Tutor</CardTitle>

                <p className="text-xs text-muted-foreground">
                  {courseTitle} · {lessonTitle}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="min-h-65 space-y-6 p-5">
              {messages.length === 0 ? (
                <EmptyTutorState />
              ) : (
                messages.map((message) => (
                  <TutorMessage key={message.id} message={message} />
                ))
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t p-4">
              <div className="relative">
                <Textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Ask your tutor anything..."
                  className="min-h-25 resize-none pr-14"
                />

                <Button
                  type="submit"
                  size="icon"
                  disabled={!message.trim()}
                  className="absolute right-3 bottom-3"
                >
                  <Send />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function EmptyTutorState() {
  return (
    <div className="flex min-h-55 flex-col items-center justify-center text-center">
      <div className="flex size-12 items-center justify-center rounded-full border bg-muted">
        <Bot className="size-5" />
      </div>

      <p className="mt-4 font-medium">How can I help?</p>

      <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
        Ask about something you don't understand, get help with code, or discuss
        what you're learning.
      </p>
    </div>
  )
}

function TutorMessage({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-muted">
        {isUser ? <UserRound className="size-4" /> : <Bot className="size-4" />}
      </div>

      <div
        className={cn(
          "max-w-[80%] rounded-xl border px-4 py-3 text-sm leading-6",
          isUser && "bg-foreground text-background"
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
