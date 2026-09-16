"use client"

import Link from "next/link"
import { MessageCircle, MoreHorizontal, UserRound } from "lucide-react"

import { adminQAConversations, getLatestQAMessage } from "@/lib/admin-qa"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function page() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Q&A</h1>

        <p className="text-sm text-muted-foreground">
          Manage conversations and answer student questions.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        {adminQAConversations.map((conversation, index) => (
          <QAConversationRow
            key={conversation.id}
            conversation={conversation}
            isLast={index === adminQAConversations.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

function QAConversationRow({
  conversation,
  isLast,
}: {
  conversation: (typeof adminQAConversations)[number]
  isLast: boolean
}) {
  const latestMessage = getLatestQAMessage(conversation)

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
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">
            {conversation.user.name}
          </p>

          <span className="hidden text-xs text-muted-foreground sm:inline">
            {conversation.user.email}
          </span>
        </div>

        <p className="mt-1 truncate text-sm text-muted-foreground">
          {latestMessage.message}
        </p>
      </div>

      <div className="hidden shrink-0 items-center gap-6 md:flex">
        <Badge variant={getStatusVariant(conversation.status)}>
          {formatStatus(conversation.status)}
        </Badge>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MessageCircle className="size-3.5" />

          {conversation.messages.length}
        </div>

        <p className="w-36 text-right text-xs text-muted-foreground">
          {latestMessage.createdAt}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Link href={`/admin/qa/${conversation.id}`}>
          <Button size="sm">Open chat</Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-4" />

              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/admin/qa/${conversation.id}`}>Open chat</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                // TODO: mark as waiting
              }}
            >
              Mark as waiting
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                // TODO: close conversation
              }}
            >
              Close conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function formatStatus(status: (typeof adminQAConversations)[number]["status"]) {
  switch (status) {
    case "open":
      return "Open"

    case "waiting":
      return "Waiting"

    case "closed":
      return "Closed"
  }
}

function getStatusVariant(
  status: (typeof adminQAConversations)[number]["status"]
) {
  switch (status) {
    case "open":
      return "default" as const

    case "waiting":
      return "secondary" as const

    case "closed":
      return "outline" as const
  }
}
