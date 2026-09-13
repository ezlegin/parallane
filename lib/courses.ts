export type LessonType = "video" | "doc"

export interface CourseLesson {
  title: string
  duration: string
  type: LessonType
}

export interface CourseSeason {
  title: string
  description: string
  duration: string
  lessons: CourseLesson[]
}

export interface CourseTutor {
  name: string
  summary: string
}

export interface Course {
  slug: string
  title: string
  category: string
  summary: string
  description: string

  rating: number
  reviews: number

  duration: string
  level: string

  tutor: CourseTutor

  seasons: CourseSeason[]

  targetAudience: string[]

  learn: string[]
}

export const courses: Record<string, Course> = {
  html: {
    slug: "html",
    title: "HTML",
    category: "Frontend Development",

    summary:
      "Build the foundation of every website and learn how the web actually works.",

    description:
      "Learn HTML from the ground up and understand how modern websites are structured. You'll learn how to create semantic, accessible, and well-organized pages that form the foundation of every web application.",

    rating: 4.9,
    reviews: 128,

    duration: "3h 20m",
    level: "Beginner",

    tutor: {
      name: "Alex Morgan",
      summary:
        "Frontend developer and educator focused on helping developers understand the fundamentals behind modern web applications.",
    },

    seasons: [
      {
        title: "The Foundations",
        description: "Understand how the web works and how HTML fits into it.",
        duration: "1h 04m",
        lessons: [
          {
            title: "How the Web Works",
            duration: "12m",
            type: "video",
          },
          {
            title: "HTML Fundamentals",
            duration: "18m",
            type: "video",
          },
          {
            title: "Document Structure",
            duration: "14m",
            type: "video",
          },
          {
            title: "Semantic HTML",
            duration: "20m",
            type: "video",
          },
        ],
      },

      {
        title: "Building with HTML",
        description:
          "Learn the elements and patterns used to build real pages.",
        duration: "1h 18m",
        lessons: [
          {
            title: "Working with Text",
            duration: "13m",
            type: "video",
          },
          {
            title: "Links & Navigation",
            duration: "17m",
            type: "video",
          },
          {
            title: "Images & Media",
            duration: "19m",
            type: "video",
          },
          {
            title: "HTML Forms",
            duration: "24m",
            type: "video",
          },
          {
            title: "Accessibility Fundamentals",
            duration: "05m",
            type: "doc",
          },
        ],
      },

      {
        title: "Putting It Together",
        description: "Bring everything together in a practical page.",
        duration: "26m",
        lessons: [
          {
            title: "Building a Real Page",
            duration: "26m",
            type: "video",
          },
        ],
      },
    ],

    targetAudience: [
      "Complete beginners who want to learn web development",
      "Designers who want to understand how their designs become websites",
      "Developers looking to strengthen their fundamentals",
      "Anyone curious about how websites are structured",
    ],

    learn: [
      "Understand how the web and HTML work",
      "Build semantic and accessible page structures",
      "Work with headings, paragraphs, links, images, and media",
      "Create forms and interactive elements",
      "Structure real-world web pages",
      "Write clean and maintainable HTML",
    ],
  },
}

export const coursesx = [
  {
    slug: "react",
    title: "React",
    summary: "Build modern interactive web applications.",

    curriculum: [
      {
        id: "season-1",
        title: "React Fundamentals",
        duration: "2h 40m",

        lessons: [
          {
            id: "react-introduction",
            title: "Introduction to React",
            duration: "12:34",
            type: "video",
            video: "/courses/react/01-introduction.mp4",
          },
          {
            id: "react-components",
            title: "Understanding Components",
            duration: "18:21",
            type: "video",
            video: "/courses/react/02-components.mp4",
          },
          {
            id: "react-props",
            title: "Props and Data",
            duration: "21:08",
            type: "video",
            video: "/courses/react/03-props.mp4",
          },
        ],
      },

      {
        id: "season-2",
        title: "State and Events",
        duration: "3h 15m",

        lessons: [
          {
            id: "react-state",
            title: "Understanding State",
            duration: "24:10",
            type: "video",
            video: "/courses/react/04-state.mp4",
          },
          {
            id: "react-events",
            title: "Handling Events",
            duration: "17:42",
            type: "video",
            video: "/courses/react/05-events.mp4",
          },
        ],
      },
    ],
  },
]
