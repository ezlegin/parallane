export type QAStatus = "open" | "waiting" | "closed"

export type QAMessage = {
  id: string
  sender: "user" | "admin"
  message: string
  createdAt: string
}

export type AdminQAConversation = {
  id: string
  user: {
    id: string
    name: string
    email: string
  }
  status: QAStatus
  messages: QAMessage[]
}

export const adminQAConversations: AdminQAConversation[] = [
  {
    id: "qa_001",
    user: {
      id: "user_001",
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    status: "open",
    messages: [
      {
        id: "msg_001",
        sender: "user",
        message:
          "I'm having trouble understanding the difference between margin and padding.",
        createdAt: "September 16, 2026 at 10:24 AM",
      },
      {
        id: "msg_002",
        sender: "admin",
        message:
          "The easiest way to remember it is that padding is inside the element, while margin is outside the element.",
        createdAt: "September 16, 2026 at 10:41 AM",
      },
      {
        id: "msg_003",
        sender: "user",
        message:
          "That makes sense. Can you explain how this works with flexbox?",
        createdAt: "September 16, 2026 at 11:02 AM",
      },
    ],
  },
  {
    id: "qa_002",
    user: {
      id: "user_002",
      name: "Michael Chen",
      email: "michael@example.com",
    },
    status: "waiting",
    messages: [
      {
        id: "msg_004",
        sender: "user",
        message: "Should I learn JavaScript before starting React?",
        createdAt: "September 16, 2026 at 9:15 AM",
      },
      {
        id: "msg_005",
        sender: "admin",
        message:
          "Yes. I recommend being comfortable with JavaScript fundamentals before moving into React.",
        createdAt: "September 16, 2026 at 9:32 AM",
      },
    ],
  },
  {
    id: "qa_003",
    user: {
      id: "user_003",
      name: "Emma Williams",
      email: "emma@example.com",
    },
    status: "closed",
    messages: [
      {
        id: "msg_006",
        sender: "user",
        message: "Where can I find the Figma course?",
        createdAt: "September 15, 2026 at 3:12 PM",
      },
      {
        id: "msg_007",
        sender: "admin",
        message: "You can find it in your dashboard under Enrolled Courses.",
        createdAt: "September 15, 2026 at 3:18 PM",
      },
    ],
  },
  {
    id: "qa_004",
    user: {
      id: "user_005",
      name: "Olivia Brown",
      email: "olivia@example.com",
    },
    status: "open",
    messages: [
      {
        id: "msg_008",
        sender: "user",
        message:
          "I'm not sure which roadmap I should follow if I want to become a frontend developer.",
        createdAt: "September 14, 2026 at 8:45 PM",
      },
    ],
  },
]

export function getAdminQAConversation(id: string) {
  return adminQAConversations.find((conversation) => conversation.id === id)
}

export function getLatestQAMessage(conversation: AdminQAConversation) {
  return conversation.messages[conversation.messages.length - 1]
}
