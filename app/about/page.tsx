import type { Metadata } from "next"
import Link from "next/link"
import { SITE, SITE_NAME } from "@/lib/peptide-data"

export const metadata: Metadata = {
  title: `About Us — Research-Grade Peptide Catalog | ${SITE_NAME}`,
  description:
    "Tide Life is a research peptide catalog curating high-purity compounds with third-party HPLC verification and transparent certificates of analysis.",
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: `About Tide Life`,
    description: "Research-grade peptide catalog with ≥98% HPLC purity and lot CoA on every order.",
    url: `${SITE}/about`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary",
    title: `About Tide Life`,
    description: "Research-grade peptide catalog. ≥98% HPLC purity, lot CoA included.",
  },
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">About Tide Life</h1>

      <p className="text-slate-700 leading-relaxed mb-5">
        Tide Life is a curated research peptide catalog built for researchers who need
        verified compounds with transparent sourcing documentation.
      </p>

      <p className="text-slate-700 leading-relaxed mb-5">
        Every compound in the catalog is tested by an independent third-party laboratory using
        high-performance liquid chromatography (HPLC), and ships with its original lot certificate
        of analysis. We do not list compounds that do not meet the ≥98% purity standard.
      </p>

      <p className="text-slate-700 leading-relaxed mb-5">
        The catalog covers 95+ compounds across nine research categories — fat loss, recovery,
        growth hormone, skin and beauty, nootropics, longevity, immune and hormonal, energy and
        metabolic, and Khavinson bioregulators. Compounds are organized by mechanism and target,
        not just by name.
      </p>

      <p className="text-slate-700 leading-relaxed mb-8">
        Orders ship same day (before 2pm EST) via tracked US courier. Free shipping on all orders
        over $200.
      </p>

      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Affiliate Disclosure</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Tide Life earns a commission on purchases made through links on this site via our
          partnership with a third-party research compound supplier. This does not affect the price
          you pay. Our selection and organization of compounds is independent of commercial
          relationships. All purity data and certificates of analysis are provided by the supplier
          and verified independently.
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/products"
          className="inline-flex bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Browse the Catalog →
        </Link>
      </div>

      <p className="text-xs text-slate-400 mt-10">
        All products are sold for in-vitro laboratory research use only. Not for human consumption,
        veterinary use, or household use.
      </p>
    </div>
  )
}
