"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getStatusVariant } from "@/lib/getConversationStatusVariant"
import { Contact, User } from "@/prisma/generated/prisma/client"
import { format } from "date-fns"
import { MessageCircle, UserRound } from "lucide-react"
import Link from "next/link"

interface ContactType extends Contact {
  user: User | null
}

function ContactList({
  contact,
  isLast,
}: {
  contact: ContactType
  isLast: boolean
}) {
  const user = contact.user ?? {
    fullName: contact.fullName,
    email: contact.email,
  }

  return (
    <div
      className={`group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40 ${
        !isLast ? "border-b" : ""
      }`}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/30">
        <UserRound className="size-4" />
      </div>

      <div className="min-w-0">
        <div className="flex flex-col">
          <span className="truncate text-sm font-medium">{user.fullName}</span>

          <span className="hidden text-xs text-muted-foreground sm:inline">
            {user.email}
          </span>
        </div>
      </div>

      <div className="hidden flex-1 shrink-0 items-center gap-6 md:flex">
        <div className="flex w-full items-center gap-1.5 text-xs text-muted-foreground">
          <MessageCircle className="size-3.5" />
          {contact.message.slice(0, 65)}
        </div>

        <Badge
          variant={getStatusVariant(contact.status)}
          className="capitalize"
        >
          {contact.status}
        </Badge>

        <p className="w-36 text-right text-xs text-muted-foreground">
          {format(contact.createdAt, "PP")}
        </p>
      </div>

      <Link href={`/admin/contact/${contact.id}`}>
        <Button size="sm">Open Message</Button>
      </Link>
    </div>
  )
}

export default ContactList
