import { ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import ConversationMessageForm from "@/components/forms/ConversationMessageForm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getStatusVariant } from "@/lib/getConversationStatusVariant"
import { prisma } from "@/prisma/prisma"
import MessagesList from "./MessagesList"

export default async function QAChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const conversation = await prisma.tutorConversation.findFirst({
    where: { id },
    include: {
      user: true,
      messages: true,
      lesson: true,
      course: { select: { title: true } },
    },
  })

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
              {conversation.user.fullName}
            </h1>

            <Badge
              variant={getStatusVariant(conversation.status)}
              className="capitalize"
            >
              {conversation.status}
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

        <MessagesList
          messages={conversation.messages}
          userFullName={conversation.user.fullName}
        />

        <Separator />

        <CardFooter className="block p-4">
          <ConversationMessageForm
            conversationId={conversation.id}
            studentName={conversation.user.fullName}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
