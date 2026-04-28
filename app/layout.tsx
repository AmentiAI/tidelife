import type { Metadata } from "next"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const SITE_URL = "https://www.peptidesclav.com"
const DEFAULT_TITLE = "Buy Research Peptides Online — ≥98% Purity, Free US Shipping $200+"
const DEFAULT_DESC =
  "PeptidesClav carries 95+ research-grade peptide vials — every vial ≥98% HPLC purity with original lot CoA. Free US shipping on orders over $200. Same-day shipping before 2pm EST."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s",
  },
  description: DEFAULT_DESC,
  applicationName: "PeptidesClav",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "PeptidesClav",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PeptidesClav" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: ["/og-image.png"],
  },
  category: "Health & Beauty",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="a1b2c3d4e5f67890abcdef1234567890" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
