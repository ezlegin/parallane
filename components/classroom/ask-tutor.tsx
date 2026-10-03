"use client"

import { UserStar } from "lucide-react"

import MessagesList from "@/app/admin/qa/[id]/MessagesList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ConversationMessageForm from "../forms/ConversationMessageForm"
import { TutorMessage } from "@/prisma/generated/prisma/client"

type AskTutorProps = {
  course: { id: string; title: string }
  lessonTitle: string
  user: { id: string; name: string }
  messages: TutorMessage[]
  classroomId: string
  conversationId: string | null
}

export function AskTutor({
  lessonTitle,
  course,
  user,
  messages,
  classroomId,
  conversationId,
}: AskTutorProps) {
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
                <UserStar className="size-4" />
              </div>

              <div>
                <CardTitle className="text-sm">Alireza Ezlegini</CardTitle>

                <p className="text-xs text-muted-foreground">
                  {course.title} · {lessonTitle}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-3">
            <div className="min-h-65 space-y-6 p-5">
              {messages.length === 0 ? (
                <EmptyTutorState />
              ) : (
                <MessagesList messages={messages} userFullName={user.name} />
              )}
            </div>

            <ConversationMessageForm
              classroomId={classroomId}
              conversationId={conversationId}
              role="user"
              courseId={course.id}
              userId={user.id}
            />
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
        <UserStar className="size-5" />
      </div>

      <p className="mt-4 font-medium">How can I help?</p>

      <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
        Ask about something you don't understand, get help with code, or discuss
        what you're learning.
      </p>
    </div>
  )
}
