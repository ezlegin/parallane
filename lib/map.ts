import { CourseProgressStatus } from "@/prisma/generated/prisma/enums"

export function mapEnrollmentStatus(stat: CourseProgressStatus) {
  switch (stat) {
    case "completed":
      return "Completed"
    case "inProgress":
      return "In Progress..."
    case "notStarted":
      return "Not Started"
  }
}
