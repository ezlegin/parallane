export type LessonType = "video" | "doc"

export type CourseCategory = "development" | "design" | "ai"

export type CourseStatus = "published" | "draft"

export type CourseLesson = {
  id: string
  title: string
  url: string
  type: LessonType
  isFree: boolean
  duration: number
}

export type CourseSeason = {
  id: string
  title: string
  lessons: CourseLesson[]
}

export type AdminCourse = {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  category: CourseCategory
  status: CourseStatus
  audience: string[]
  seasons: CourseSeason[]
  tizerUrl: string
  duration: number
  students: number
}

export const adminCourses: AdminCourse[] = [
  {
    id: "course_html",
    title: "HTML",
    slug: "html",
    summary: "Learn the foundation of the modern web.",
    description:
      "A complete introduction to HTML and semantic markup for building accessible and well-structured websites.",
    category: "development",
    status: "published",
    audience: [
      "Complete beginners",
      "Aspiring web developers",
      "Designers who want to understand HTML",
    ],
    seasons: [
      {
        id: "html_01",
        title: "Getting Started",
        lessons: [
          {
            id: "html_01_01",
            title: "Introduction to HTML",
            url: "https://example.com/videos/html-1",
            type: "video",
            isFree: true,
            duration: 12,
          },
          {
            id: "html_01_02",
            title: "HTML Document Structure",
            url: "https://example.com/videos/html-2",
            type: "video",
            isFree: false,
            duration: 18,
          },
        ],
      },
      {
        id: "html_02",
        title: "Working With Elements",
        lessons: [
          {
            id: "html_02_01",
            title: "Text and Headings",
            url: "https://example.com/videos/html-3",
            type: "video",
            isFree: false,
            duration: 16,
          },
        ],
      },
    ],
    tizerUrl: "/tizer.mp4",
    duration: 46,
    students: 82,
  },

  {
    id: "course_css",
    title: "CSS",
    slug: "css",
    summary: "Learn how to create beautiful and responsive interfaces.",
    description:
      "Master CSS fundamentals, layouts, responsive design, animations, and modern styling techniques.",
    category: "development",
    status: "published",
    audience: [
      "HTML beginners",
      "Aspiring frontend developers",
      "Web designers",
    ],
    seasons: [
      {
        id: "css_01",
        title: "CSS Fundamentals",
        lessons: [
          {
            id: "css_01_01",
            title: "Introduction to CSS",
            url: "https://example.com/videos/css-1",
            type: "video",
            isFree: true,
            duration: 15,
          },
        ],
      },
    ],
    tizerUrl: "/tizer.mp4",
    duration: 15,
    students: 76,
  },

  {
    id: "course_react",
    title: "React",
    slug: "react",
    summary: "Build modern interactive applications with React.",
    description:
      "Learn React from the fundamentals through components, state, effects, forms, and application architecture.",
    category: "development",
    status: "published",
    audience: [
      "Frontend developers",
      "JavaScript developers",
      "Developers building modern web applications",
    ],
    seasons: [
      {
        id: "react_01",
        title: "React Fundamentals",
        lessons: [
          {
            id: "react_01_01",
            title: "What is React?",
            url: "https://example.com/videos/react-1",
            type: "video",
            isFree: true,
            duration: 14,
          },
          {
            id: "react_01_02",
            title: "Your First Component",
            url: "https://example.com/videos/react-2",
            type: "video",
            isFree: false,
            duration: 22,
          },
        ],
      },
    ],
    tizerUrl: "/tizer.mp4",
    duration: 36,
    students: 116,
  },

  {
    id: "course_figma",
    title: "Figma",
    slug: "figma",
    summary: "Learn Figma and create modern interface designs.",
    description:
      "Learn the fundamentals of Figma, from basic tools to creating polished interface designs.",
    category: "design",
    status: "draft",
    audience: ["UI designers", "Web designers", "Complete beginners"],
    seasons: [],
    tizerUrl: "",
    duration: 0,
    students: 0,
  },
]

export function getAdminCourse(slug: string) {
  return adminCourses.find((course) => course.slug === slug)
}
