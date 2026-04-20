import { redirect } from "next/navigation"
import { products, supplierUrl, SITE } from "@/lib/peptide-data"

export function generateStaticParams() {
  const parentSlugs = products.map((p) => ({ slug: p.slug }))
  const variantSlugs = products.flatMap((p) =>
    (p.variants ?? []).map((v) => ({ slug: v.slug }))
  )
  const all = [...parentSlugs, ...variantSlugs]
  const seen = new Set<string>()
  return all.filter(({ slug }) => {
    if (seen.has(slug)) return false
    seen.add(slug)
    return true
  })
}

function resolveDestination(slug: string): string {
  for (const p of products) {
    const v = p.variants?.find((v) => v.slug === slug)
    if (v) return supplierUrl(v.slug)
  }
  const p = products.find((p) => p.slug === slug)
  if (p && p.variants[0]) return supplierUrl(p.variants[0].slug)
  return `${SITE}/products`
}

export default async function OutPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const destination = resolveDestination(slug)
  redirect(destination)
}
