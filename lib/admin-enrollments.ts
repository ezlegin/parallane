export type AdminEnrollment = {
  id: string
  user: {
    id: string
    name: string
    email: string
  }
  course: {
    id: string
    title: string
    slug: string
  }
  enrolledAt: string
}

export const adminEnrollments: AdminEnrollment[] = [
  {
    id: "enr_001",
    user: {
      id: "user_001",
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    course: {
      id: "course_html",
      title: "HTML",
      slug: "html",
    },
    enrolledAt: "September 16, 2026",
  },
  {
    id: "enr_002",
    user: {
      id: "user_001",
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    course: {
      id: "course_css",
      title: "CSS",
      slug: "css",
    },
    enrolledAt: "September 16, 2026",
  },
  {
    id: "enr_003",
    user: {
      id: "user_002",
      name: "Michael Chen",
      email: "michael@example.com",
    },
    course: {
      id: "course_react",
      title: "React",
      slug: "react",
    },
    enrolledAt: "September 16, 2026",
  },
  {
    id: "enr_004",
    user: {
      id: "user_002",
      name: "Michael Chen",
      email: "michael@example.com",
    },
    course: {
      id: "course_typescript",
      title: "TypeScript",
      slug: "typescript",
    },
    enrolledAt: "September 16, 2026",
  },
  {
    id: "enr_005",
    user: {
      id: "user_002",
      name: "Michael Chen",
      email: "michael@example.com",
    },
    course: {
      id: "course_nextjs",
      title: "Next.js",
      slug: "nextjs",
    },
    enrolledAt: "September 17, 2026",
  },
  {
    id: "enr_006",
    user: {
      id: "user_003",
      name: "Emma Williams",
      email: "emma@example.com",
    },
    course: {
      id: "course_figma",
      title: "Figma",
      slug: "figma",
    },
    enrolledAt: "September 15, 2026",
  },
  {
    id: "enr_007",
    user: {
      id: "user_005",
      name: "Olivia Brown",
      email: "olivia@example.com",
    },
    course: {
      id: "course_html",
      title: "HTML",
      slug: "html",
    },
    enrolledAt: "September 14, 2026",
  },
  {
    id: "enr_008",
    user: {
      id: "user_005",
      name: "Olivia Brown",
      email: "olivia@example.com",
    },
    course: {
      id: "course_javascript",
      title: "JavaScript",
      slug: "javascript",
    },
    enrolledAt: "September 14, 2026",
  },
]

export function getAdminEnrollment(id: string) {
  return adminEnrollments.find((enrollment) => enrollment.id === id)
}
