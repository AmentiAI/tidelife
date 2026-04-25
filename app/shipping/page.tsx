import type { Metadata } from "next"
import { SITE, SITE_NAME } from "@/lib/peptide-data"

export const metadata: Metadata = {
  title: "Shipping, Delivery & Returns — Research Peptide Orders | Peptides Online",
  description:
    "PeptidesClav shipping policy — same-day dispatch before 2pm EST, tracked US delivery in 3–5 business days, free shipping over $200. Returns and handling information.",
  alternates: { canonical: `${SITE}/shipping` },
  openGraph: {
    title: "Shipping & Returns | PeptidesClav",
    description: "Same-day shipping before 2pm EST, 3–5 day US delivery, free shipping $200+.",
    url: `${SITE}/shipping`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary",
    title: "Shipping & Returns | PeptidesClav",
    description: "Same-day shipping, 3–5 day US delivery, free shipping $200+.",
  },
}

const shippingFaq = [
  {
    q: "How fast is shipping?",
    a: "Orders placed before 2:00pm EST on business days ship same day. US delivery typically arrives in 3–5 business days via tracked courier. You will receive a tracking number by email once your order ships.",
  },
  {
    q: "Is shipping free?",
    a: "Yes — free tracked US shipping on all orders over $200. Orders below $200 have a flat shipping fee applied at checkout.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently shipping to US addresses only. International orders are not supported at this time.",
  },
  {
    q: "How are peptides packaged for shipping?",
    a: "All lyophilized vials ship in a sealed insulated mailer with ice packs for temperature control. Liquid solutions and capsule products ship in protective packaging.",
  },
  {
    q: "What is the returns policy?",
    a: "Unopened products in original sealed packaging may be returned within 14 days of delivery for a full refund. Contact support with your order number to initiate a return. Opened vials cannot be accepted for return due to the nature of research compounds.",
  },
  {
    q: "What if my order arrives damaged?",
    a: "Photograph the damage immediately and contact us within 48 hours of delivery. We will replace damaged items or issue a refund at no additional cost.",
  },
  {
    q: "Can I track my order?",
    a: "Yes — a tracking number is emailed automatically once your order ships. Tracking updates are available via the courier's website.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: shippingFaq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

export default function ShippingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Shipping & Returns</h1>
        <p className="text-slate-600 mb-10">
          Same-day dispatch, tracked courier delivery, and a straightforward returns policy.
        </p>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            { title: "Same-Day Shipping", body: "Orders before 2pm EST ship the same business day." },
            { title: "3–5 Day Delivery", body: "Tracked courier to all US addresses." },
            { title: "Free Over $200", body: "Free shipping on all domestic orders over $200." },
          ].map((t) => (
            <div key={t.title} className="border border-slate-200 rounded-xl p-4">
              <p className="font-bold text-slate-900 mb-1">{t.title}</p>
              <p className="text-sm text-slate-600">{t.body}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-5">Shipping & Returns FAQ</h2>
        <div className="space-y-5">
          {shippingFaq.map((item, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-5">
              <p className="font-semibold text-slate-900 mb-2">{item.q}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
