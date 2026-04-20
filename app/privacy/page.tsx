import type { Metadata } from "next"
import { SITE, SITE_NAME } from "@/lib/peptide-data"

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: "Tide Life privacy policy — how we collect, use, and protect your information.",
  alternates: { canonical: `${SITE}/privacy` },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: "Tide Life privacy policy.",
    url: `${SITE}/privacy`,
    siteName: SITE_NAME,
  },
  twitter: { card: "summary", title: `Privacy Policy | ${SITE_NAME}` },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>

      <p className="text-sm text-slate-500 mb-8">Last updated: January 1, 2026</p>

      {[
        {
          h: "Information We Collect",
          body: "We collect information you provide when placing an order, including name, email address, and shipping address. We also collect standard web analytics data (pages visited, referral source) through anonymized tracking.",
        },
        {
          h: "How We Use Information",
          body: "Order information is used solely to fulfill your purchase and communicate about your order. We do not sell personal data to third parties. Analytics data is used to improve site content and user experience.",
        },
        {
          h: "Cookies",
          body: "This site uses essential cookies for shopping cart functionality and optional analytics cookies. You can disable cookies in your browser settings at any time.",
        },
        {
          h: "Third-Party Services",
          body: "Payments are processed by our partner supplier's checkout system. We do not store credit card information. Our affiliate tracking uses a referral link with no personal data passed beyond a session identifier.",
        },
        {
          h: "Data Retention",
          body: "Order records are retained for up to 7 years for accounting and legal compliance. You may request deletion of your personal data by emailing us.",
        },
        {
          h: "Your Rights",
          body: "You have the right to access, correct, or delete your personal data. Residents of the European Economic Area, California, and other jurisdictions with applicable privacy laws may exercise additional rights by contacting us.",
        },
        {
          h: "Contact",
          body: "For privacy inquiries, email privacy@tidelife.com.",
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
