import type { Metadata } from "next"
import Link from "next/link"
import { products, getProductBySlug, outUrl, SITE, SITE_NAME } from "@/lib/peptide-data"
import ProductCard from "@/components/product-card"

export const metadata: Metadata = {
  title: "Peptide Stacks — Pre-Mixed Blends & Research Protocol Combinations | Peptidelife",
  description:
    "Shop pre-mixed peptide blends and curated research stack combinations — BPC/TB, Ipamorelin/CJC, Cagri-Sema, GLOW, KLOW and more. ≥98% HPLC purity. Free US shipping $200+.",
  alternates: { canonical: `${SITE}/stacks` },
  openGraph: {
    title: "Peptide Stacks — Pre-Mixed Blends | Peptidelife",
    description: "Pre-mixed peptide blends and curated research combinations. ≥98% purity, free shipping $200+.",
    url: `${SITE}/stacks`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Stacks | Peptidelife",
    description: "Pre-mixed blends and stack combinations. Free US shipping $200+.",
  },
}

const BLEND_SLUGS = [
  "bpc-157-tb-500-blend",
  "ipamorelin-cjc-1295-blend",
  "ipamorelin-tesamorelin-blend",
  "ipa-tesa-blend",
  "cagri-sema-blend",
  "cagri-reta",
  "reta-cagri",
  "glow-blend",
  "klow-blend",
]

const PROTOCOL_STACKS = [
  {
    title: "GLP Triple Stack",
    description: "Retatrutide 10mg + Cagrilintide 5mg for combined triple-agonist and amylin-pathway signaling.",
    products: ["retatrutide", "cagrilintide", "bacteriostatic-water"],
  },
  {
    title: "Recovery Foundation",
    description: "BPC-157 10mg + TB-500 10mg — or order the pre-mixed blend vial instead.",
    products: ["bpc-157", "tb-500", "bacteriostatic-water"],
  },
  {
    title: "GH Pulse Stack",
    description: "Ipamorelin 10mg + CJC-1295 No DAC 10mg — ghrelin mimetic plus GHRH analog.",
    products: ["ipamorelin", "cjc-1295-no-dac", "bacteriostatic-water"],
  },
  {
    title: "Longevity Core",
    description: "Epitalon 10mg + NAD+ 500mg + MOTS-c 10mg — telomere, NAD, and mitochondrial targets.",
    products: ["epitalon", "nad", "mots-c"],
  },
  {
    title: "Skin Protocol",
    description: "GHK-Cu 50mg + GLOW Blend 50mg + SNAP-8 10mg — copper peptide, blend, and wrinkle peptide.",
    products: ["ghk-cu", "glow-blend", "snap-8"],
  },
]

export default function StacksPage() {
  const blends = BLEND_SLUGS
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => !!p)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        Peptide Stacks — Pre-Mixed Blends & Protocol Combinations
      </h1>
      <p className="text-slate-600 mb-8 max-w-2xl leading-relaxed">
        Order a single pre-mixed vial that ships both compounds together, or build your own stack
        from individual vials. Every product below is ≥98% HPLC purity with a lot CoA.
      </p>

      {/* Pre-mixed blends */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-5">Pre-Mixed Blend Vials</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {blends.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Protocol stacks */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-5">Individual-Vial Protocol Stacks</h2>
        <div className="space-y-6">
          {PROTOCOL_STACKS.map((stack) => {
            const stackProducts = stack.products
              .map((s) => getProductBySlug(s))
              .filter((p): p is NonNullable<typeof p> => !!p)
            return (
              <div key={stack.title} className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 mb-1">{stack.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{stack.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stackProducts.map((p) => (
                    <div key={p.slug} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                      <div>
                        <p className="font-semibold text-sm text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-500">
                          From ${Math.min(...p.variants.map((v) => v.price)).toFixed(2)}
                        </p>
                      </div>
                      <Link
                        href={outUrl(p.variants[0].slug)}
                        className="text-xs font-bold bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Buy
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <p className="text-xs text-slate-400">
        All products are sold for in-vitro laboratory research use only. Not for human consumption.
      </p>
    </div>
  )
}
