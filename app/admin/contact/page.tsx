import { prisma } from "@/prisma/prisma"
import ContactList from "./ContactList"

export default async function page() {
  const conversations = await prisma.contact.findMany({
    include: {
      user: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Q&A</h1>

        <p className="text-sm text-muted-foreground">
          Manage conversations and answer student questions.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        {conversations.map((conversation, index) => (
          <ContactList
            key={conversation.id}
            contact={conversation}
            isLast={index === conversations.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
