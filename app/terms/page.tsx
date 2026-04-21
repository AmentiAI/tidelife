import type { Metadata } from "next"
import { SITE, SITE_NAME } from "@/lib/peptide-data"

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: "Peptidelife terms of service — research-use-only products, purchase conditions, and legal terms.",
  alternates: { canonical: `${SITE}/terms` },
  openGraph: {
    title: `Terms of Service | ${SITE_NAME}`,
    description: "Peptidelife terms of service.",
    url: `${SITE}/terms`,
    siteName: SITE_NAME,
  },
  twitter: { card: "summary", title: `Terms of Service | ${SITE_NAME}` },
}

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: January 1, 2026</p>

      {[
        {
          h: "Research Use Only",
          body: "All products sold through Peptidelife are strictly for in-vitro laboratory research purposes only. They are not intended for human consumption, veterinary use, household use, or any other purpose. You must be 18 years of age or older to purchase. By completing a purchase you confirm that you are a qualified researcher using these compounds solely for legitimate laboratory research.",
        },
        {
          h: "No Medical Advice",
          body: "Nothing on this site constitutes medical advice, diagnosis, or treatment recommendations. Information is provided for educational and research context only. Always consult a licensed healthcare professional for medical questions.",
        },
        {
          h: "Accuracy of Information",
          body: "We make reasonable efforts to ensure product descriptions, prices, and purity data are accurate. Prices and availability are subject to change. Purity data reflects the most recent third-party certificate of analysis at time of listing.",
        },
        {
          h: "Purchases and Payments",
          body: "All purchases are processed through our partner supplier's secure checkout. Peptidelife earns an affiliate commission on completed purchases. Pricing displayed on this site reflects the supplier's listed price at time of page generation and may differ from the checkout price if the supplier has updated pricing.",
        },
        {
          h: "Jurisdiction",
          body: "It is your responsibility to determine whether purchase, possession, or use of these compounds is legal in your jurisdiction. Some research compounds may be restricted or regulated in certain countries, states, or territories. We do not ship to jurisdictions where these products are prohibited.",
        },
        {
          h: "Limitation of Liability",
          body: "Peptidelife is not liable for any damages, losses, or claims arising from purchase, use, or misuse of products listed on this site. Our affiliate relationship is limited to referral; product quality, fulfillment, and handling liability rests with the supplier.",
        },
        {
          h: "Changes to Terms",
          body: "We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.",
        },
      ].map((s) => (
        <div key={s.h} className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-2">{s.h}</h2>
          <p className="text-slate-700 leading-relaxed text-sm">{s.body}</p>
        </div>
      ))}
    </div>
  )
}
