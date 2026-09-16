import { ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getAdminQAConversation } from "@/lib/admin-qa"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default async function QAChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const conversation = getAdminQAConversation(id)

  if (!conversation) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/qa">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="size-4" />

            <span className="sr-only">Back to Q&A</span>
          </Button>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="truncate text-xl font-semibold">
              {conversation.user.name}
            </h1>

            <Badge
              variant={
                conversation.status === "open"
                  ? "default"
                  : conversation.status === "waiting"
                    ? "secondary"
                    : "outline"
              }
            >
              {formatStatus(conversation.status)}
            </Badge>
          </div>

          <p className="truncate text-sm text-muted-foreground">
            {conversation.user.email}
          </p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full border bg-background">
              <MessageCircle className="size-4" />
            </div>

            <div>
              <p className="text-sm font-medium">Student conversation</p>

              <p className="text-xs text-muted-foreground">
                {conversation.messages.length}{" "}
                {conversation.messages.length === 1 ? "message" : "messages"}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="min-h-125 space-y-6 p-6">
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] space-y-1 ${
                  message.sender === "admin" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    message.sender === "admin"
                      ? "rounded-br-md bg-foreground text-background"
                      : "rounded-bl-none border bg-muted/30"
                  }`}
                >
                  {message.message}
                </div>

                <p className="px-1 text-[11px] text-muted-foreground">
                  {message.sender === "admin" ? "You" : conversation.user.name}{" "}
                  · {message.createdAt}
                </p>
              </div>
            </div>
          ))}
        </CardContent>

        <Separator />

        <CardFooter className="block p-4">
          <AdminMessageForm />
        </CardFooter>
      </Card>
    </div>
  )
}

function AdminMessageForm() {
  return (
    <form className="space-y-3">
      <textarea
        placeholder="Write a message..."
        rows={3}
        className="flex min-h-20 w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
      />

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">Replying as admin</p>

        <Button type="submit">Send message</Button>
      </div>
    </form>
  )
}

function formatStatus(status: "open" | "waiting" | "closed") {
  switch (status) {
    case "open":
      return "Open"

    case "waiting":
      return "Waiting"

    case "closed":
      return "Closed"
  }
}
