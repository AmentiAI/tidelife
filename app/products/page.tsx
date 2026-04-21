import type { Metadata } from "next"
import Link from "next/link"
import { products, categories, cheapestVariantPrice, SITE } from "@/lib/peptide-data"
import ProductCard from "@/components/product-card"

export const metadata: Metadata = {
  title: "Buy Peptides Online — Shop All 95+ Research Vials | Peptides Online",
  description:
    "Browse all 95+ research-grade peptide vials — fat loss, recovery, growth hormone, skin, nootropics, longevity and more. ≥98% HPLC purity. Free US shipping over $200.",
  alternates: { canonical: `${SITE}/products` },
  openGraph: {
    title: "Buy Peptides Online — Shop All 95+ Research Vials | Peptides Online",
    description: "95+ research peptides from $12.99. ≥98% HPLC purity, lot CoA, free shipping $200+.",
    url: `${SITE}/products`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Peptides Online — 95+ Research Vials",
    description: "95+ research peptides. ≥98% HPLC purity, free US shipping $200+.",
  },
}

export default function ProductsPage() {
  const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name))
  const totalCount = sorted.length
  const lowestPrice = Math.min(...products.map(cheapestVariantPrice))

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Buy Peptides Online — Shop All {totalCount} Research Vials
        </h1>
        <div className="border-l-4 border-yellow-600 bg-yellow-50/40 p-4 rounded-r-lg mb-4">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-700 mb-1">
            Quick answer
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Peptidelife stocks <strong>{totalCount} research-grade peptide vials</strong> starting from{" "}
            <strong>${lowestPrice.toFixed(2)}</strong> across {categories.length} categories. Every vial
            is ≥98% HPLC purity with a lot certificate of analysis. Free US shipping on orders over $200,
            same-day shipping before 2pm EST.
          </p>
        </div>

        {/* Category filter links */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/peptides/${cat.slug}`}
              className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-yellow-100 hover:text-yellow-800 rounded-full text-slate-600 transition-colors"
            >
              {cat.shortName}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {sorted.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
