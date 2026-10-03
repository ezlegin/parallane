import {
  CourseCategory,
  CourseProgressStatus,
} from "@/prisma/generated/prisma/enums"

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

export function mapCourseCategoryName(category: CourseCategory) {
  switch (category) {
    case "backEnd":
      return "Back-End"
    case "frontEnd":
      return "Front-End"
    case "webDesign":
      return "Web-Design"
  }
}
