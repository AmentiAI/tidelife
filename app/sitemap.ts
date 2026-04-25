import type { MetadataRoute } from "next"
import { products, categories } from "@/lib/peptide-data"

const SITE = "https://peptidesclav.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/peptides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/stacks`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/shipping`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE}/peptides/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
