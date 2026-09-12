export const roadmaps = {
  "web-design": {
    title: "Web Design",
    eyebrow: "Design roadmap",
    description:
      "Learn how to create beautiful, intuitive, and purposeful digital experiences from idea to interface.",
    outcome:
      "By the end of this roadmap, you'll be able to design complete digital experiences with confidence.",
    duration: "3 months",
    courses: [
      {
        title: "Web Design Principles",
        slug: "web-design-principles",
        duration: "4h 20m",
        description:
          "Learn the principles behind hierarchy, composition, typography, spacing, and visual communication.",
      },
      {
        title: "Figma",
        slug: "figma",
        duration: "6h 40m",
        description:
          "Learn how to turn ideas into polished interfaces, wireframes, prototypes, and reusable design systems.",
      },
      {
        title: "UI Design",
        slug: "ui-design",
        duration: "7h 30m",
        description:
          "Bring everything together and learn how to design modern interfaces that are clear, usable, and visually strong.",
      },
    ],
  },

  "front-end": {
    title: "Front-End",
    eyebrow: "Development roadmap",
    description:
      "Master the technologies behind modern websites and build responsive, interactive, production-ready applications.",
    outcome:
      "By the end of this roadmap, you'll have the skills to build complete modern web applications.",
    duration: "6 months",
    courses: [
      {
        title: "HTML",
        slug: "html",
        duration: "3h 20m",
        description:
          "Learn how the web is structured and build accessible, semantic pages from the ground up.",
      },
      {
        title: "CSS",
        slug: "css",
        duration: "5h 40m",
        description:
          "Master layouts, responsive design, animations, positioning, and modern CSS techniques.",
      },
      {
        title: "JavaScript",
        slug: "javascript",
        duration: "12h 30m",
        description:
          "Learn the language that powers the modern web and turn static pages into interactive applications.",
      },
      {
        title: "TypeScript",
        slug: "typescript",
        duration: "7h 10m",
        description:
          "Add type safety to your applications and write more predictable, maintainable code.",
      },
      {
        title: "React",
        slug: "react",
        duration: "9h 40m",
        description:
          "Learn component-based development and build dynamic interfaces using React.",
      },
      {
        title: "Next.js",
        slug: "next-js",
        duration: "11h 20m",
        description:
          "Build full-featured web applications with routing, data fetching, server components, and more.",
      },
    ],
  },

  "back-end": {
    title: "Back-End",
    eyebrow: "Development roadmap",
    description:
      "Understand what happens behind the interface and learn to build APIs, databases, and reliable server-side systems.",
    outcome:
      "By the end of this roadmap, you'll understand how to build and deploy the systems that power modern applications.",
    duration: "5 months",
    courses: [
      {
        title: "JavaScript",
        slug: "javascript",
        duration: "12h 30m",
        description:
          "Build a strong programming foundation before moving into server-side development.",
      },
      {
        title: "Node.js",
        slug: "node-js",
        duration: "9h 20m",
        description:
          "Learn server-side JavaScript and build APIs and backend applications with Node.js.",
      },
      {
        title: "MySQL",
        slug: "mysql",
        duration: "6h 30m",
        description:
          "Learn how to design, query, and manage relational databases for real-world applications.",
      },
      {
        title: "Git",
        slug: "git",
        duration: "3h 10m",
        description:
          "Learn version control and the workflows developers use to collaborate and ship code.",
      },
      {
        title: "Docker",
        slug: "docker",
        duration: "5h 20m",
        description:
          "Containerize your applications and learn how to create consistent development and deployment environments.",
      },
    ],
  },
} as const

export const roadmapsCategory = [
  {
    number: "01",
    slug: "web-design",
    title: "Web Design",
    description:
      "Learn how to turn ideas into beautiful, intuitive, and purposeful digital experiences.",
    duration: "3 months",
    courses: 3,
    skills: ["Design Principles", "Figma", "UI Design"],
  },
  {
    number: "02",
    slug: "front-end",
    title: "Front-End",
    description:
      "Master the technologies behind modern interfaces and learn how to build real-world web applications.",
    duration: "6 months",
    courses: 6,
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Next.js"],
  },
  {
    number: "03",
    slug: "back-end",
    title: "Back-End",
    description:
      "Learn how applications work behind the scenes and build reliable APIs, databases, and server-side systems.",
    duration: "5 months",
    courses: 5,
    skills: ["JavaScript", "Node.js", "MySQL", "Git", "Docker"],
  },
]
