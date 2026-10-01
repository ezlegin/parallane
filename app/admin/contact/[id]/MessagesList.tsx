"use client"

import { CardContent } from "@/components/ui/card"
import { TutorMessage } from "@/prisma/generated/prisma/client"
import { format } from "date-fns"
import { useEffect, useRef } from "react"

const MessagesList = ({
  messages,
  userFullName,
}: {
  messages: TutorMessage[]
  userFullName: string
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages.length])

  return (
    <CardContent
      ref={scrollRef}
      className="max-h-125 min-h-100 space-y-2 overflow-y-auto p-6"
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex text-wrap ${
            message.role === "tutor" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] space-y-1 ${
              message.role === "tutor" ? "items-end" : "items-start"
            }`}
          >
            <pre
              className={`rounded-2xl px-4 py-3 text-sm text-wrap ${
                message.role === "tutor"
                  ? "rounded-br-none bg-foreground text-background"
                  : "rounded-bl-none border bg-muted/30"
              }`}
            >
              {message.content}
            </pre>

            <p className="px-1 text-[11px] text-muted-foreground">
              {message.role === "tutor" ? "You" : userFullName} ·{" "}
              {format(message.createdAt, "Pp")}
            </p>
          </div>
        </div>
      ))}
    </CardContent>
  )
}

export default MessagesList
