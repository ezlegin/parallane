import { prisma } from "@/prisma/prisma"
import QAList from "./QaList"

export default async function page() {
  const conversations = await prisma.tutorConversation.findMany({
    include: {
      messages: true,
      user: true,
      course: { select: { title: true } },
    },
    orderBy: { updatedAt: "desc" },
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
          <QAList
            key={conversation.id}
            conversation={conversation}
            isLast={index === conversations.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
