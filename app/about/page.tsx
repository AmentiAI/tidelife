import type { Metadata } from "next"
import Link from "next/link"
import { SITE, SITE_NAME } from "@/lib/peptide-data"

export const metadata: Metadata = {
  title: `About Us — Research-Grade Peptide Catalog | ${SITE_NAME}`,
  description:
    "Peptidelife is a research peptide catalog curating high-purity compounds with third-party HPLC verification and transparent certificates of analysis. Catalog reviewed by Prof. David J. Harrison, FRCPath.",
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: `About Peptidelife`,
    description: "Research-grade peptide catalog with ≥98% HPLC purity and lot CoA on every order.",
    url: `${SITE}/about`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary",
    title: `About Peptidelife`,
    description: "Research-grade peptide catalog. ≥98% HPLC purity, lot CoA included.",
  },
}

const curatorJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alex Reid",
  jobTitle: "Research Catalog Curator",
  worksFor: {
    "@type": "Organization",
    name: "Peptidelife",
    url: SITE,
  },
  description:
    "Alex Reid compiles and maintains the Peptidelife compound catalog, verifying HPLC purity certificates and sourcing documentation for 95+ research-grade peptides.",
  url: `${SITE}/about`,
}

const reviewerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "David J. Harrison",
  honorificPrefix: "Prof.",
  honorificSuffix: "MB ChB MD DSc FRCPath FRCPE FRCSEd",
  jobTitle: "Professor of Pathology",
  affiliation: [
    {
      "@type": "EducationalOrganization",
      name: "University of St Andrews",
      url: "https://www.st-andrews.ac.uk",
    },
    {
      "@type": "EducationalOrganization",
      name: "University of Edinburgh",
    },
  ],
  description:
    "Professor David J. Harrison is Chair of Pathology at the University of St Andrews School of Medicine, co-editor of Muir's Textbook of Pathology (14th edition), and holds honorary professorships at the Universities of Edinburgh, Glasgow, and Florida.",
  sameAs: "https://arnoldpublishers-com.vercel.app/authors/david-harrison",
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(curatorJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewerJsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">About Peptidelife</h1>

        {/* Medical reviewer card */}
        <div className="border border-slate-200 rounded-xl p-5 mb-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
            <span className="text-slate-600 font-bold text-lg">DH</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold text-slate-900">Prof. David J. Harrison</p>
              <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                Medical Reviewer
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              MB ChB MD DSc FRCPath FRCPE FRCSEd · Chair of Pathology, University of St Andrews
            </p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Professor Harrison is Chair of Pathology at the University of St Andrews School of
              Medicine and co-editor of <em>Muir's Textbook of Pathology</em> (14th edition) — the
              foundational British pathology reference published continuously since 1924. He holds
              honorary professorships at the Universities of Edinburgh, Glasgow, and Florida.
              Professor Harrison reviewed the Peptidelife compound catalog for accuracy of compound
              identity, purity standards, and sourcing documentation.
            </p>
            <a
              href="https://arnoldpublishers-com.vercel.app/authors/david-harrison"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-xs font-semibold text-yellow-700 hover:underline mt-2"
            >
              View profile →
            </a>
          </div>
        </div>

        {/* Catalog curator card */}
        <div className="border border-slate-200 rounded-xl p-5 mb-8 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <span className="text-yellow-700 font-bold text-lg">AR</span>
          </div>
          <div>
            <p className="font-bold text-slate-900">Alex Reid</p>
            <p className="text-sm text-slate-500">Research Catalog Curator</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Alex has spent four years cataloging research-grade compounds, reviewing HPLC
              documentation, and building structured peptide references for laboratory researchers.
              All product entries, category descriptions, and CoA sourcing on this site are his work.
            </p>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed mb-5">
          Peptidelife is a curated research peptide catalog built for researchers who need
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

        {/* CoA section */}
        <div className="border border-yellow-200 bg-yellow-50/50 rounded-xl p-5 mb-8">
          <h2 className="text-base font-bold text-slate-900 mb-2">Certificates of Analysis</h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            Every order ships with the original lot CoA from our supplier's independent laboratory.
            Each CoA shows compound identity, purity percentage, and test date. You can request
            CoA copies directly from our supplier for any product.
          </p>
          <a
            href="https://phiogen.is/?ref=PEPS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-semibold text-yellow-700 hover:underline"
          >
            View CoA portal at supplier site →
          </a>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Affiliate Disclosure</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Peptidelife earns a commission on purchases made through links on this site via our
            partnership with a third-party research compound supplier. This does not affect the price
            you pay. Our selection and organization of compounds is independent of commercial
            relationships. All purity data and certificates of analysis are provided by the supplier
            and verified independently.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Browse the Catalog →
          </Link>
        </div>

        <p className="text-xs text-slate-400 mt-10">
          All products are sold for in-vitro laboratory research use only. Not for human consumption,
          veterinary use, or household use.
        </p>
      </div>
    </>
  )
}
