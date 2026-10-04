import type { MetadataRoute } from "next"

const baseUrl = "https://parallane.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engines
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/panel",
          "/panel/*",
          "/onboarding",
          "/checkout",
          "/api",
          "/api/*",
          "/login",
          "/login/*",
          "/auth",
          "/auth/*",
        ],
      },

      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
          "Bytespider",
        ],
        allow: [
          "/",
          "/courses",
          "/courses/*",
          "/roadmaps",
          "/roadmaps/*",
          "/pricing",
          "/contact",
          "/llms.txt",
          "/llms-full.txt",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/panel",
          "/panel/*",
          "/onboarding",
          "/checkout",
          "/api",
          "/api/*",
          "/login",
          "/login/*",
          "/auth",
          "/auth/*",
        ],
      },

      {
        userAgent: ["CCBot", "Scrapy", "HTTrack"],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
