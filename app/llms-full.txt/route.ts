import { prisma } from "@/prisma/prisma"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://parallane.com"

export async function GET() {
  const courses = await prisma.course.findMany({
    where: { status: "published" },
    include: {
      seasons: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: { title: true, duration: true, isFree: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  const sections = courses
    .map((course) => {
      const lessons = course.seasons
        .map((season) => {
          const lessonList = season.lessons
            .map(
              (l) =>
                `  - ${l.title} (${l.duration} min)${l.isFree ? " — free preview" : ""}`
            )
            .join("\n")
          return `### ${season.title}\n\n${lessonList}`
        })
        .join("\n\n")

      return `## ${course.title}

URL: ${baseUrl}/courses/${course.slug}

${course.summary}

${course.description}

**Category:** ${course.category}
**Audience:** ${course.audience.join(", ")}
**Duration:** ${course.duration} minutes

### Curriculum

${lessons}
`
    })
    .join("\n\n---\n\n")

  const content = `# Parallane — Full Content

This file contains the complete public content of Parallane for AI indexing.

${sections}
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
