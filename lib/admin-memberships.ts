export type MembershipPeriod = "monthly" | "annual"

export type MembershipCourse = {
  id: string
  title: string
  enrolledAt: string
}

export type AdminMembership = {
  id: string
  user: {
    name: string
    email: string
  }
  paymentId: string | null
  from: string
  expiresAt: string
  period: MembershipPeriod
  courses: MembershipCourse[]
}

export const adminMemberships: AdminMembership[] = [
  {
    id: "mem_001",
    user: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    paymentId: "pay_001",
    from: "September 16, 2026",
    expiresAt: "October 16, 2026",
    period: "monthly",
    courses: [
      {
        id: "course_html",
        title: "HTML",
        enrolledAt: "September 16, 2026",
      },
      {
        id: "course_css",
        title: "CSS",
        enrolledAt: "September 16, 2026",
      },
    ],
  },
  {
    id: "mem_002",
    user: {
      name: "Michael Chen",
      email: "michael@example.com",
    },
    paymentId: "pay_002",
    from: "September 16, 2026",
    expiresAt: "September 16, 2027",
    period: "annual",
    courses: [
      {
        id: "course_react",
        title: "React",
        enrolledAt: "September 16, 2026",
      },
      {
        id: "course_typescript",
        title: "TypeScript",
        enrolledAt: "September 16, 2026",
      },
      {
        id: "course_nextjs",
        title: "Next.js",
        enrolledAt: "September 17, 2026",
      },
    ],
  },
  {
    id: "mem_003",
    user: {
      name: "Emma Williams",
      email: "emma@example.com",
    },
    paymentId: "pay_003",
    from: "September 15, 2026",
    expiresAt: "October 15, 2026",
    period: "monthly",
    courses: [
      {
        id: "course_figma",
        title: "Figma",
        enrolledAt: "September 15, 2026",
      },
    ],
  },
  {
    id: "mem_004",
    user: {
      name: "David Miller",
      email: "david@example.com",
    },
    paymentId: "pay_004",
    from: "September 15, 2026",
    expiresAt: "October 15, 2026",
    period: "monthly",
    courses: [],
  },
  {
    id: "mem_005",
    user: {
      name: "Olivia Brown",
      email: "olivia@example.com",
    },
    paymentId: null,
    from: "September 14, 2026",
    expiresAt: "October 14, 2026",
    period: "monthly",
    courses: [
      {
        id: "course_html",
        title: "HTML",
        enrolledAt: "September 14, 2026",
      },
      {
        id: "course_javascript",
        title: "JavaScript",
        enrolledAt: "September 14, 2026",
      },
    ],
  },
]

export function getAdminMembership(id: string) {
  return adminMemberships.find((membership) => membership.id === id)
}
