"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getStatusVariant } from "@/lib/getConversationStatusVariant"
import {
  TutorConversation,
  TutorMessage,
  User,
} from "@/prisma/generated/prisma/client"
import { format } from "date-fns"
import { MessageCircle, UserRound } from "lucide-react"
import Link from "next/link"

interface TutorConversationType extends TutorConversation {
  user: User
  messages: TutorMessage[]
  course: { title: string } | null //todo: remove this null type
}

function QAList({
  conversation,
  isLast,
}: {
  conversation: TutorConversationType
  isLast: boolean
}) {
  return (
    <div
      className={`group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40 ${
        !isLast ? "border-b" : ""
      }`}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/30">
        <UserRound className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col">
          <span className="truncate text-sm font-medium">
            {conversation.user.fullName}
          </span>

          <span className="hidden text-xs text-muted-foreground sm:inline">
            {conversation.user.email}
          </span>
        </div>
      </div>

      <div className="hidden shrink-0 items-center gap-6 md:flex">
        <Badge variant={"outline"}>
          {conversation.course?.title ?? "HTML"}
        </Badge>
        <Badge
          variant={getStatusVariant(conversation.status)}
          className="capitalize"
        >
          {conversation.status}
        </Badge>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MessageCircle className="size-3.5" />

          {conversation.messages.length}
        </div>

        <p className="w-36 text-right text-xs text-muted-foreground">
          {format(conversation.messages.at(-1)!.createdAt, "PP")}
        </p>
      </div>

      <Link href={`/admin/qa/${conversation.id}`}>
        <Button size="sm">Open chat</Button>
      </Link>
    </div>
  )
}

export default QAList
