import { ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getStatusVariant } from "@/lib/getConversationStatusVariant"
import { prisma } from "@/prisma/prisma"
import ContactResponseForm from "@/components/forms/ContactResponseForm"
import { format } from "date-fns"

export default async function QAChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const contact = await prisma.contact.findFirst({
    where: { id },
    include: {
      user: true,
    },
  })

  if (!contact) {
    notFound()
  }

  const user = contact.user ?? {
    fullName: contact.fullName,
    email: contact.email,
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/qa">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="truncate text-xl font-semibold">{user.fullName}</h1>

            <Badge
              variant={getStatusVariant(contact.status)}
              className="capitalize"
            >
              {contact.status}
            </Badge>
          </div>

          <p className="truncate text-sm text-muted-foreground">
            {user.email}
            {" - "}
            {!contact.user ? (
              <span className="text-xs text-destructive">
                Not a Parallane Student
              </span>
            ) : (
              <span className="text-xs text-green-500">Parallane Student</span>
            )}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full border bg-background">
              <MessageCircle className="size-4" />
            </div>

            <p className="text-sm font-medium">Contact Messages</p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-3 rounded-md border p-4">
            <span className="text-xs text-muted-foreground">
              {user.fullName} | {format(contact.createdAt, "Pp")}
            </span>
            <p>{contact.message}</p>
          </div>
          {contact.responseMessage && (
            <div className="rounded-md border bg-foreground p-4 text-background">
              <span className="text-xs text-muted-foreground">
                Admin |{" "}
                {contact.respondedAt && format(contact.respondedAt, "Pp")}
              </span>
              <p>{contact.responseMessage}</p>
            </div>
          )}
        </CardContent>

        <Separator />

        <CardFooter className="block">
          <ContactResponseForm contact={contact} />
        </CardFooter>
      </Card>
    </div>
  )
}
