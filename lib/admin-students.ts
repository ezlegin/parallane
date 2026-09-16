export type StudentMembershipStatus = "active" | "expired" | "none"

export type AdminStudent = {
  id: string
  name: string
  email: string
  membership: {
    status: StudentMembershipStatus
    expiresAt: string | null
  }
  enrolledCourses: number
  joinedAt: string
}

export const students: AdminStudent[] = [
  {
    id: "stu_001",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    membership: {
      status: "active",
      expiresAt: "2026-10-24",
    },
    enrolledCourses: 5,
    joinedAt: "2026-04-12",
  },
  {
    id: "stu_002",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    membership: {
      status: "active",
      expiresAt: "2026-11-08",
    },
    enrolledCourses: 3,
    joinedAt: "2026-05-03",
  },
  {
    id: "stu_003",
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    membership: {
      status: "expired",
      expiresAt: "2026-08-14",
    },
    enrolledCourses: 4,
    joinedAt: "2026-01-18",
  },
  {
    id: "stu_004",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    membership: {
      status: "none",
      expiresAt: null,
    },
    enrolledCourses: 0,
    joinedAt: "2026-07-21",
  },
  {
    id: "stu_005",
    name: "James Anderson",
    email: "james.anderson@example.com",
    membership: {
      status: "active",
      expiresAt: "2026-12-02",
    },
    enrolledCourses: 7,
    joinedAt: "2026-03-09",
  },
  {
    id: "stu_006",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    membership: {
      status: "active",
      expiresAt: "2026-10-17",
    },
    enrolledCourses: 2,
    joinedAt: "2026-06-11",
  },
  {
    id: "stu_007",
    name: "Noah Thompson",
    email: "noah.thompson@example.com",
    membership: {
      status: "expired",
      expiresAt: "2026-07-30",
    },
    enrolledCourses: 1,
    joinedAt: "2026-02-27",
  },
  {
    id: "stu_008",
    name: "Sophia Brown",
    email: "sophia.brown@example.com",
    membership: {
      status: "none",
      expiresAt: null,
    },
    enrolledCourses: 0,
    joinedAt: "2026-08-05",
  },
]

export function getAdminStudent(id: string) {
  return students.find((student) => student.id === id)
}
