import type { MetadataRoute } from "next"

import { prisma } from "@/prisma/prisma"

const baseUrl = "https://parallane.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await prisma.course.findMany({
    where: { status: "published" },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  })

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: course.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/roadmaps`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/roadmaps/web-design`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/roadmaps/front-end`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/roadmaps/back-end`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ]

  return [...staticEntries, ...courseEntries]
}
