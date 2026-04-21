import type { NextConfig } from "next"

// Legacy per-size slugs → consolidated parent slug
// /out/ routes are intentionally NOT listed here — those stay per-variant
const SLUG_REDIRECTS: Record<string, string> = {
  "retatrutide-10mg": "retatrutide",
  "retatrutide-15mg": "retatrutide",
  "retatrutide-20mg": "retatrutide",
  "retatrutide-30mg": "retatrutide",
  "tirzepatide-15mg": "tirzepatide",
  "tirzepatide-30mg": "tirzepatide",
  "tirzepatide-60mg": "tirzepatide",
  "semaglutide-3mg": "semaglutide",
  "semaglutide-6mg": "semaglutide",
  "semaglutide-12mg": "semaglutide",
  "semaglutide-20mg": "semaglutide",
  "semaglutide-30mg": "semaglutide",
  "cagrilintide-5mg": "cagrilintide",
  "cagrilintide-10mg": "cagrilintide",
  "aod9604-2mg": "aod9604",
  "aod9604-5mg": "aod9604",
  "aod9604-10mg": "aod9604",
  "ghk-cu-50mg": "ghk-cu",
  "ghk-cu-100mg": "ghk-cu",
  "cjc-1295-no-dac-5mg": "cjc-1295-no-dac",
  "cjc-1295-no-dac-10mg": "cjc-1295-no-dac",
  "sermorelin-2mg": "sermorelin",
  "sermorelin-5mg": "sermorelin",
  "sermorelin-10mg": "sermorelin",
  "tesamorelin-10mg": "tesamorelin",
  "tesamorelin-20mg": "tesamorelin",
  "epitalon-10mg": "epitalon",
  "epitalon-50mg": "epitalon",
  "mots-c-10mg": "mots-c",
  "mots-c-20mg": "mots-c",
  "mots-c-40mg": "mots-c",
  "ss-31-10mg": "ss-31",
  "ss-31-25mg": "ss-31",
  "ss-31-50mg": "ss-31",
  "glutathione-200mg": "glutathione",
  "glutathione-600mg": "glutathione",
  "glutathione-1500mg": "glutathione",
  "dsip-5mg": "dsip",
  "dsip-10mg": "dsip",
  "dsip-15mg": "dsip",
  "pinealon-10mg": "pinealon",
  "pinealon-20mg": "pinealon",
  "thymosin-alpha-1-5mg": "thymosin-alpha-1",
  "thymosin-alpha-1-10mg": "thymosin-alpha-1",
  "kisspeptin-10-5mg": "kisspeptin-10",
  "kisspeptin-10-10mg": "kisspeptin-10",
  "oxytocin-8mg": "oxytocin",
  "oxytocin-10mg": "oxytocin",
  "kpv-5mg": "kpv",
  "kpv-10mg": "kpv",
  "vip-5mg": "vip",
  "vip-10mg": "vip",
  "na-selank-amidate-10mg": "na-selank-amidate",
  "na-selank-amidate-30mg": "na-selank-amidate",
  "adipotide-fttp-5mg": "adipotide-fttp",
  "adipotide-fttp-10mg": "adipotide-fttp",
  "cagri-reta-5mg": "cagri-reta",
  "cagri-reta-10mg": "cagri-reta",
  "glow-blend-50mg": "glow-blend",
  "glow-blend-70mg": "glow-blend",
  "nad-500mg": "nad",
  "nad-1000mg": "nad",
  "5-amino-1mq-5mg": "5-amino-1mq",
  "5-amino-1mq-50mg": "5-amino-1mq",
  "ru-58841-30ml": "ru-58841",
  "ru-58841-60ml": "ru-58841",
  "slu-pp-332-100mg-30-capsules": "slu-pp-332-capsules",
  "slu-pp-332-100mg-120-capsules": "slu-pp-332-capsules",
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
]

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }]
  },
  async redirects() {
    return Object.entries(SLUG_REDIRECTS).map(([oldSlug, newSlug]) => ({
      source: `/products/${oldSlug}`,
      destination: `/products/${newSlug}`,
      permanent: true,
    }))
  },
}

export default nextConfig
