import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  categories,
  products,
  getCategoryBySlug,
  getProductsByExactCategories,
  cheapestVariantPrice,
  mostExpensiveVariantPrice,
  SITE,
  SITE_NAME,
} from "@/lib/peptide-data"
import ProductCard from "@/components/product-card"

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) return {}

  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    alternates: { canonical: `${SITE}/peptides/${category}` },
    openGraph: {
      title: cat.seoTitle,
      description: cat.seoDescription,
      url: `${SITE}/peptides/${category}`,
      type: "website",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: cat.seoTitle,
      description: cat.seoDescription,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) notFound()

  const catProducts = getProductsByExactCategories(cat.productCategoryNames)
  const count = catProducts.length
  const prices = catProducts.map(cheapestVariantPrice)
  const lowestPrice = prices.length ? Math.min(...prices) : 0
  const highestPrice = prices.length ? Math.max(...catProducts.map(mostExpensiveVariantPrice)) : 0

  const topThree = cat.featuredProductSlugs
    .map((s) => catProducts.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 3)

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${SITE}/peptides` },
      { "@type": "ListItem", position: 3, name: cat.name, item: `${SITE}/peptides/${category}` },
    ],
  }

  const contentLines = cat.content.split("\n").filter(Boolean)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-5 flex items-center gap-1">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span>/</span>
          <Link href="/peptides" className="hover:text-slate-700">Categories</Link>
          <span>/</span>
          <span className="text-slate-700">{cat.name}</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{cat.h1}</h1>

        {/* Quick answer */}
        {count > 0 && (
          <div className="border-l-4 border-yellow-600 bg-yellow-50/40 p-5 rounded-r-lg mb-6">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-700 mb-2">
              Quick answer
            </p>
            <p className="text-base leading-relaxed text-slate-700">
              Peptidelife carries <strong>{count} {cat.shortName} peptide vials</strong> priced from{" "}
              <strong>${lowestPrice.toFixed(2)}</strong> to <strong>${highestPrice.toFixed(2)}</strong>.
              {topThree.length > 0 && (
                <> The top products are{" "}
                  {topThree.map((p, i) => (
                    <span key={p!.slug}>
                      <Link href={`/products/${p!.slug}`} className="font-semibold underline hover:text-yellow-700">
                        {p!.name}
                      </Link>
                      {i < topThree.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  .
                </>
              )}{" "}
              Every vial is sealed at ≥98% HPLC purity with its original lot CoA. Tracked US shipping
              in 3–5 business days; free shipping over $200.
            </p>
          </div>
        )}

        {/* Trust tiles */}
        <div className="flex flex-wrap gap-3 mb-8 text-xs font-semibold text-yellow-700">
          <span>✓ ≥98% HPLC Purity</span>
          <span>✓ Lot CoA Included</span>
          <span>✓ Same-Day Shipping</span>
          <span>✓ Free Shipping $200+</span>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {catProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Hand-written category content */}
        {cat.content && (
          <div className="prose prose-slate max-w-3xl mb-12">
            {contentLines.map((line, i) => {
              if (line.startsWith("## ")) {
                return <h2 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3">{line.replace("## ", "")}</h2>
              }
              if (line.startsWith("- ")) {
                return <p key={i} className="text-slate-700 text-sm mb-1 pl-3 border-l-2 border-slate-200">
                  {line.replace("- ", "")}
                </p>
              }
              return <p key={i} className="text-slate-700 mb-3 leading-relaxed">{line}</p>
            })}
          </div>
        )}

        {/* Other categories */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Other Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((c) => c.slug !== category)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/peptides/${c.slug}`}
                  className="text-sm font-medium px-4 py-2 bg-slate-100 hover:bg-yellow-100 hover:text-yellow-800 rounded-lg text-slate-600 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
