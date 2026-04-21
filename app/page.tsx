import type { Metadata } from "next"
import Link from "next/link"
import {
  products,
  categories,
  getBestsellerProducts,
  cheapestVariantPrice,
  outUrl,
  SITE,
  SITE_NAME,
} from "@/lib/peptide-data"
import ProductCard from "@/components/product-card"

const SITE_URL = SITE

export const metadata: Metadata = {
  title: `Buy Research Peptides Online — ≥98% Purity, Free US Shipping $200+ | Peptidelife`,
  description:
    "Peptidelife carries 95+ research-grade peptide vials — every vial ≥98% HPLC purity with original lot CoA. Free US shipping on orders over $200. Same-day shipping before 2pm EST.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Buy Research Peptides Online — ≥98% Purity, Free US Shipping $200+ | Peptidelife",
    description:
      "95+ research-grade peptide vials. ≥98% HPLC purity, sealed vial with lot CoA, tracked US shipping 3–5 business days. Free shipping over $200.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Research Peptides Online — Peptidelife",
    description: "95+ peptide vials. ≥98% HPLC purity. Free US shipping over $200.",
    images: ["/og-image.png"],
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Peptidelife",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  description: "Research-grade peptide vials with ≥98% HPLC purity and lot CoA. 96 compounds across 9 categories. Free US shipping on orders over $200.",
  slogan: "Research-grade peptides — purity verified, shipping guaranteed.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@tidelife.com",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/peptidelife",
    "https://www.trustpilot.com/review/tidelife.com",
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Peptidelife",
  url: SITE_URL,
}

export default function HomePage() {
  const bestsellers = getBestsellerProducts(8)
  const totalProducts = products.length
  const lowestPrice = Math.min(...products.map(cheapestVariantPrice))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-yellow-50 to-white border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-700 mb-3">
              Research-Grade Peptides
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
              Buy Research Peptides Online — {totalProducts}+ Vials In Stock
            </h1>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Every vial ships sealed with its original lot certificate of analysis. ≥98% HPLC purity
              on all compounds. Free US shipping on orders over $200.
            </p>

            {/* Quick answer block — quotable by AI */}
            <div className="border-l-4 border-yellow-600 bg-yellow-50/60 p-5 rounded-r-lg mb-8">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-700 mb-2">
                Quick answer
              </p>
              <p className="text-base leading-relaxed text-slate-700">
                Peptidelife stocks <strong>{totalProducts}+ research-grade peptide vials</strong> starting
                from <strong>${lowestPrice.toFixed(2)}</strong>. Top sellers include{" "}
                <strong>Retatrutide</strong>, <strong>Tirzepatide</strong>, and{" "}
                <strong>BPC-157</strong>. Every vial is sealed under nitrogen at ≥98% HPLC purity
                with its original lot CoA. Tracked US shipping in 3–5 business days; free shipping
                over $200.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Shop All Peptides
              </Link>
              <Link
                href="/peptides"
                className="border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust tiles */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "✓", label: "≥98% HPLC Purity", sub: "Third-party tested" },
            { icon: "✓", label: "Same-Day Shipping", sub: "Orders before 2pm EST" },
            { icon: "✓", label: "Free Shipping $200+", sub: "US tracked courier" },
            { icon: "✓", label: "Lot CoA Included", sub: "With every order" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-3">
              <span className="text-yellow-600 font-bold text-lg">{t.icon}</span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{t.label}</p>
                <p className="text-xs text-slate-500">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Best Sellers</h2>
          <Link href="/products" className="text-sm font-semibold text-yellow-700 hover:underline">
            View all {totalProducts} products →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Category tiles */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const count = products.filter((p) =>
              p.categories.some(
                (c) => cat.productCategoryNames.includes(c)
              )
            ).length
            return (
              <Link
                key={cat.slug}
                href={`/peptides/${cat.slug}`}
                className="border border-slate-200 hover:border-yellow-300 hover:bg-yellow-50/40 rounded-xl p-4 transition-all"
              >
                <p className="font-semibold text-slate-900 text-sm">{cat.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{count} products</p>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
