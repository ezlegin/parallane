import { TutorConversationStatus } from "@/prisma/generated/prisma/enums"

export function getStatusVariant(status: TutorConversationStatus) {
  switch (status) {
    case "replied":
      return "success" as const

    case "waiting":
      return "warning" as const

    case "closed":
      return "outline" as const
  }
}
