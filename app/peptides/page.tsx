import type { Metadata } from "next"
import Link from "next/link"
import { categories, products, SITE, SITE_NAME } from "@/lib/peptide-data"

export const metadata: Metadata = {
  title: "Shop Peptide Categories — Fat Loss, Recovery, Growth Hormone & More | Peptidelife",
  description:
    "Browse all 9 peptide categories — fat loss, recovery, growth hormone, skin, nootropics, longevity, immune, energy and Khavinson bioregulators. ≥98% HPLC purity.",
  alternates: { canonical: `${SITE}/peptides` },
  openGraph: {
    title: "Shop Peptide Categories | Peptidelife",
    description: "9 categories, 95+ research-grade peptide vials. Free US shipping $200+.",
    url: `${SITE}/peptides`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Peptide Categories | Peptidelife",
    description: "9 categories, 95+ research peptides. Free US shipping $200+.",
  },
}

export default function PeptidesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Shop All Peptide Categories</h1>
      <p className="text-slate-600 mb-8 max-w-xl">
        Browse our full catalog by category. Every vial is ≥98% HPLC purity with its original lot
        certificate of analysis. Free US shipping on orders over $200.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const count = products.filter((p) =>
            p.categories.some((c) => cat.productCategoryNames.includes(c))
          ).length
          const featured = cat.featuredProductSlugs
            .map((s) => products.find((p) => p.slug === s))
            .filter(Boolean)
            .slice(0, 3)

          return (
            <Link
              key={cat.slug}
              href={`/peptides/${cat.slug}`}
              className="border border-slate-200 hover:border-yellow-300 hover:shadow-sm rounded-xl p-5 transition-all block"
            >
              <h2 className="text-lg font-bold text-slate-900 mb-1">{cat.name}</h2>
              <p className="text-xs text-slate-500 mb-3">{count} products</p>
              {featured.length > 0 && (
                <p className="text-xs text-slate-600">
                  {featured.map((p) => p!.name).join(" · ")}
                  {count > 3 ? " & more" : ""}
                </p>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
