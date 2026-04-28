import type { MetadataRoute } from "next"

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "cohere-ai",
  "DuckAssistBot",
  "Timpibot",
  "Diffbot",
  "Amazonbot",
  "YouBot",
  "Applebot-Extended",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/out/", "/api/"] },
      ...AI_CRAWLERS.map((agent) => ({
        userAgent: agent,
        allow: "/",
        disallow: ["/out/", "/api/"],
      })),
    ],
    sitemap: "https://www.peptidesclav.com/sitemap.xml",
    host: "https://www.peptidesclav.com",
  }
}
