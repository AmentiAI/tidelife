# GEO Audit Report: Peptidelife

**Audit Date:** 2026-04-21
**URL:** https://tidelife.com
**Business Type:** E-commerce (Peptide Affiliate — Supplier: Phiogen, ref=PEPS)
**Pages Analyzed:** 350 (96 products, 9 categories, 8 static pages — analyzed from codebase; domain is pre-launch/parked)
**Auditors:** 5 specialized GEO subagents (AI Visibility, Platform, Technical, Content E-E-A-T, Schema)

---

## Executive Summary

**Overall GEO Score: 46/100 — Poor**

Peptidelife has a technically strong foundation — pure SSG, 20 AI crawlers explicitly allowed, a well-structured `llms.txt`, and clean Product + FAQPage + BreadcrumbList schema deployment. However, three structural gaps suppress the score into Poor territory: the domain is not yet live (meaning every on-page asset is currently unreachable), brand authority is near-zero (no Wikipedia, Reddit, YouTube, or LinkedIn presence, with the Organization schema `sameAs` pointing only to the site itself), and two Google policy violations exist in the product schema (displayed price and schema price diverge by 10%, and 96 products carry a fake `AggregateRating` backed by an internal HPLC review). The Technical category is the clear standout; Brand Authority is the single largest drag.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 68/100 | 25% | 17.0 |
| Brand Authority | 4/100 | 20% | 0.8 |
| Content E-E-A-T | 41/100 | 20% | 8.2 |
| Technical GEO | 79/100 | 15% | 11.85 |
| Schema & Structured Data | 44/100 | 10% | 4.4 |
| Platform Optimization | 41/100 | 10% | 4.1 |
| **Overall GEO Score** | | | **46/100** |

---

## Critical Issues (Fix Before Launch)

### C1 — Domain not live: all GEO assets are unreachable
`tidelife.com` returns a 302 redirect to a domain parking page. Every on-page GEO asset — `llms.txt`, `robots.txt`, all 350 pages of schema, Quick Answer blocks, FAQPage JSON-LD — is currently invisible to every AI crawler (GPTBot, ClaudeBot, PerplexityBot, and 17 others). Effective AI Visibility Score at time of audit: **0**.

**Fix:** Deploy to Vercel, Netlify, or equivalent. Verify HTTP 200 on `/`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt` before any outreach. Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools on launch day.

---

### C2 — `og-image.png` missing from `/public/`
All 350 pages reference `/og-image.png` in both `og:image` and `twitter:image` meta tags (set in `app/layout.tsx`). The file does not exist in `/public/`. Every social share, AI platform link preview (ChatGPT Browse, Perplexity, Gemini), and Google Discover card will render a broken image.

**Fix:** Generate a 1200×630px branded image and place it at `/public/og-image.png`. This single file unblocks rich previews across all 350 pages simultaneously.

---

### C3 — Product schema price mismatch: schema emits original price, UI shows 10% off
`app/products/[slug]/page.tsx` line 115 emits `price: v.price.toFixed(2)` (the pre-discount price) while the UI renders `salePrice(v.price)` (10% lower). `salePrice` is already imported. This divergence violates Google Merchant policy and disqualifies Product rich results across all 96 product pages.

**Fix:** Change line 115 from `price: v.price.toFixed(2)` to `price: salePrice(v.price).toFixed(2)`. Add `priceValidUntil: "2026-12-31"` to each offer.

```tsx
// app/products/[slug]/page.tsx — line 112–123
offers: product.variants.map((v) => ({
  "@type": "Offer",
  name: v.name,
  price: salePrice(v.price).toFixed(2),   // ← was v.price.toFixed(2)
  priceCurrency: "USD",
  priceValidUntil: "2026-12-31",           // ← add this
  availability: v.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
  itemCondition: "https://schema.org/NewCondition",
  url: `${SITE}/out/${v.slug}`,
  seller: { "@type": "Organization", name: SITE_NAME, url: SITE },
})),
```

---

### C4 — Fake `AggregateRating` and `Review` schema on all 96 product pages
Every product page emits an `AggregateRating` with `ratingCount: 1`, `reviewCount: 1`, backed by a single `Review` authored by `"Independent HPLC Analysis"` — an internal QC result, not a customer review. Google's structured data guidelines require ratings to reflect genuine user opinions. Deploying this at scale across 96 products is a pattern automated systems and manual reviewers are trained to detect. Risk: **site-wide manual action for fake reviews**.

**Fix:** Remove the `purityReview` object and `aggregateRating` block from `productJsonLd` in `app/products/[slug]/page.tsx` (lines 91–133). Re-add only after genuine user reviews are collected. Replace purity information with `additionalProperty`:

```tsx
additionalProperty: {
  "@type": "PropertyValue",
  name: "HPLC Purity",
  value: "≥98%",
}
```

---

### C5 — Zero external brand/entity presence
No Wikipedia article, no Wikidata entry, no LinkedIn company page, no Reddit mentions, no YouTube channel, no press coverage. `Organization.sameAs` in `app/page.tsx` is `["https://tidelife.com"]` — the site linking to itself, which is functionally equivalent to no `sameAs`. AI models cannot form an entity graph node for "Peptidelife" and will not cite the brand by name even if they rank the pages.

**Fix (immediate — code):** In `app/page.tsx`, update `sameAs` to real external URLs as you create the profiles:
```tsx
sameAs: [
  "https://www.linkedin.com/company/peptidelife",
  "https://www.trustpilot.com/review/tidelife.com",
  // add Wikidata Q-URL when created
],
```
**Fix (ongoing — external):** Create LinkedIn company page → Trustpilot profile → Wikidata Q-item. This is the single highest-ROI GEO action after launch.

---

## High Priority Issues

### H1 — Organization schema has two stale/broken properties
- `logo: "https://tidelife.com/icon.svg"` — `/icon.svg` does not exist in `/public/`. Logo 404 eliminates Knowledge Panel eligibility.
- `alternateName: "TideLife"` — the brand is Peptidelife. Stale alternate name creates entity disambiguation risk.

**Fix in `app/page.tsx`:**
```tsx
// Remove alternateName entirely
// Change logo to:
logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 },
```

---

### H2 — Product `brand` is misattributed to the affiliate retailer
`brand: { "@type": "Brand", name: SITE_NAME }` sets the brand to "Peptidelife" (the affiliate), not Phiogen (the actual manufacturer). Schema.org `Product.brand` should identify the manufacturer.

**Fix:** Change to `brand: { "@type": "Brand", name: "Phiogen" }` or remove the `brand` property if Phiogen branding is not surfaced to customers.

---

### H3 — No security headers configured
`next.config.ts` has no `headers()` export. HSTS, CSP, `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` are all absent. `Referrer-Policy` is specifically important given the affiliate outbound link architecture (every "Buy From Store" click exits to phiogen.is).

**Fix — add to `next.config.ts`:**
```ts
async headers() {
  return [{
    source: "/(.*)",
    headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "origin-when-cross-origin" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    ],
  }]
},
```

---

### H4 — Expand category content sections (currently avg. ~110 words)
All 9 category pages have content sections averaging 110 words — below the threshold where AI models treat prose as citable editorial content. The architecture is correct; the text just needs to be 2–3× longer.

**Fix:** In `data/categories.json`, expand each category `content` field to 300–400 words. Add: (1) a concrete mechanism comparison paragraph, (2) format/dosing overview specific to that category, (3) a research context paragraph with study names/DOIs inline (e.g., `(SURMOUNT-1, NEJM 2022)`).

---

### H5 — No FAQ blocks on product pages (highest-intent citability surface missing)
Product pages have Product JSON-LD but no `FAQPage` schema. Queries like "how to reconstitute BPC-157?" and "Retatrutide vs Tirzepatide?" are exactly what Perplexity and ChatGPT Browse resolve by crawling product pages. With no FAQ, these resolve to competitor content.

**Fix:** Add a `faq` array to the product data model in `data/products.json`. Add `FAQPage` JSON-LD to `app/products/[slug]/page.tsx` using the same pattern as category pages. Prioritize the 20 top products first (Retatrutide, Tirzepatide, Semaglutide, BPC-157, GHK-Cu, Epitalon, MOTS-c, SS-31, Ipamorelin, Sermorelin, TB-500, NAD+, Glutathione, Thymosin Alpha-1, Melanotan II, CJC-1295, PT-141, AICAR, BAM-15, Kisspeptin-10). Aim for 3–5 Q&As per product covering mechanism, reconstitution, storage, and comparison to nearest competitor compound.

---

### H6 — No named author or editorial identity
No individual author is identified anywhere. For health-adjacent content in a YMYL-adjacent niche, anonymous content is a significant E-E-A-T deficit. AI models weight authorship heavily for trustworthiness classification.

**Fix:** Add at minimum one named reviewer (pharmacologist, researcher, or science writer) to the About page with a bio and credential. Render a "Reviewed by [Name], [Credential]" byline on category content blocks. Add `Person` schema on the About page.

---

### H7 — CoA claims are unverifiable — no documents linked
Every trust tile and product page states "Lot CoA Included" but no Certificate of Analysis PDF or lab portal link exists anywhere. The claim is indistinguishable from unsubstantiated marketing copy.

**Fix:** Request sample CoA PDFs from Phiogen. Host at `/public/coa/` and link from the About page and product trust sections. Alternatively, link to Phiogen's CoA lookup portal if available.

---

### H8 — No mobile navigation component
Desktop nav uses `hidden md:flex`. No mobile hamburger or drawer was found in `components/navigation.tsx`. Mobile users cannot navigate to category pages without typing URLs directly.

**Fix:** Add a mobile navigation drawer to `components/navigation.tsx` visible below the `md` breakpoint, exposing all 9 category links and main static pages.

---

### H9 — No IndexNow or Bing Webmaster Tools verification
A new domain without IndexNow faces a 4–8 week Bing crawl delay. No `msvalidate.01` meta tag and no IndexNow key file were found.

**Fix:** (1) Generate a GUID. (2) Place `[guid].txt` in `/public/` containing only the GUID. (3) Add `<meta name="indexnow-key" content="[guid]">` to `app/layout.tsx`. (4) On first deployment, POST the full sitemap URL to `https://www.bing.com/indexnow`. Register in Bing Webmaster Tools and add the `msvalidate.01` meta tag.

---

### H10 — `SearchAction` in WebSite schema uses deprecated `EntryPoint` format and unimplemented endpoint
The `target` property uses an `EntryPoint` object — the pre-2018 format. Current Google spec expects a plain string. Additionally, `/products?q=` appears to have no server-side filtering; if the page returns all products regardless of `q=`, the SearchAction is inaccurate.

**Fix:** Either implement real search filtering at `/products?q=` and use `target: "https://tidelife.com/products?q={search_term_string}"` (plain string), or remove the `SearchAction` entirely.

---

## Medium Priority Issues

| # | Issue | File | Severity |
|---|---|---|---|
| M1 | `llms-full.txt` absent — 45 FAQs and category content not accessible to LLM consumers | `/public/llms-full.txt` (create) | Medium |
| M2 | No `ItemList` schema on `/products` or `/peptides/[category]` listing pages | `app/products/page.tsx`, `app/peptides/[category]/page.tsx` | Medium |
| M3 | No `speakable` schema — Quick Answer blocks are voice-ready but not marked | `app/products/[slug]/page.tsx`, `app/page.tsx` | Medium |
| M4 | FAQ question `<p>` tags should be `<h3>` for DOM/schema alignment in category pages | `app/peptides/[category]/page.tsx` | Medium |
| M5 | No visible publication/last-updated dates on content pages | All pages | Medium |
| M6 | `sitemap.ts` uses `new Date()` for all pages — legal pages show false freshness | `app/sitemap.ts` | Medium |
| M7 | Homepage title is 83 characters — will be truncated in SERPs (target: ≤65) | `app/page.tsx` | Medium |
| M8 | Zero Reddit or community forum presence — Perplexity indexes r/Peptides heavily | External | Medium |
| M9 | No LinkedIn company page — critical for Bing Copilot entity model | External | Medium |
| M10 | Zero external citations on any page — all mechanism claims reference unnamed "published data" | `data/categories.json` | Medium |
| M11 | Affiliate disclosure only on `/about` page — not proximate to Buy From Store buttons | `app/products/[slug]/page.tsx` | Medium |
| M12 | No physical address or synchronous contact method anywhere on site | Footer, About | Medium |
| M13 | Zero Google ecosystem footprint (YouTube, Google Business Profile, Google News) | External | Medium |
| M14 | No third-party review integration (Trustpilot, etc.) | All pages | Medium |

---

## Low Priority Issues

| # | Issue | File |
|---|---|---|
| L1 | 62 of 96 products missing CAS numbers in product data | `data/products.json` |
| L2 | Product image alt text is `product.name` only — expand to include form/quantity | `app/products/[slug]/page.tsx` |
| L3 | `Referrer-Policy` absence leaks user navigation to Phiogen on every affiliate click | `next.config.ts` (covered in H3) |
| L4 | Category pages have no `og:image` in `generateMetadata` | `app/peptides/[category]/page.tsx` |
| L5 | FAQPage rich results restricted by Google since Aug 2023 — keep for AI crawlers but expect no SERP feature | All FAQ pages |
| L6 | No `mainEntityOfPage` on Product schema | `app/products/[slug]/page.tsx` |
| L7 | Product `description` in schema is a single template line — too thin for AI extraction | `app/products/[slug]/page.tsx` |

---

## Category Deep Dives

### AI Citability — 68/100

The on-page citability architecture is genuinely strong. The homepage Quick Answer block ("Peptidelife stocks 96+ research-grade peptide vials starting from $X…") is verbatim-quotable and scores 79/100 on the five-dimension citability rubric (answer quality, self-containment, structural readability, statistical density, uniqueness). The Khavinson Bioregulators category introduction is the single most citable passage on the site (76/100) because Khavinson content is thin across English e-commerce — real differentiation. The `llms.txt` product pricing table (14 entries with name, URL, price, mechanism) scores 82/100 — the highest single citability asset on the site.

**What's dragging the score down:** Category content sections average 110 words — too short for AI citation at scale. Zero external citations on any page means AI models applying source-quality filters will route to PubMed rather than Peptidelife for mechanism queries. Product pages have no FAQ content at all, missing the highest-intent AI query surface.

---

### Brand Authority — 4/100

This is the audit's critical finding. AI language models cite brands they have encountered in training data and real-time crawl. Peptidelife appears in none of the high-weight sources: Wikipedia (0/30), Reddit (0/20), YouTube (0/15), LinkedIn (0/10), industry directories (4/25 — Phiogen has some industry visibility, but the affiliate structure means Peptidelife's brand is not what gets cited when Phiogen is mentioned). The brand name will not appear in ChatGPT, Perplexity, or Claude responses even when the pages rank for a query.

**Priority external actions:**
1. LinkedIn company page (fastest, most impact on Bing Copilot + entity graph)
2. Trustpilot business profile (zero reviews is still a crawlable entity mention)
3. Reddit participation in r/Peptides (10 substantive non-promotional posts before any brand mention — Perplexity's primary sourcing layer for this niche)
4. Wikipedia notability trail — build third-party coverage (niche newsletter, forum mentions) that creates the citation base for a future stub

---

### Content E-E-A-T — 41/100

| Dimension | Score | Key Gap |
|---|---|---|
| Experience | 6/25 | No original data, no case studies, no first-hand narrative |
| Expertise | 7/25 | Correct technical terminology; zero named authors or credentials |
| Authoritativeness | 6/25 | Zero external citations; `sameAs` self-referential; no institutional backing |
| Trustworthiness | 22/25 | Strong legal pages, affiliate disclosure, research-use disclaimer; weak: no CoA docs, no address, fake review schema |

The site demonstrates peptide biochemistry knowledge (correct receptor nomenclature, accurate DAC/No-DAC half-life distinctions, IGF binding protein affinity reduction) but this expertise is unattributed and uncited. The reconstitution math tables are the closest thing to genuinely practical, original content. All trustworthiness signals that exist are boilerplate; the CoA claim — the most important trust signal for this product category — is entirely unverifiable pre-purchase.

---

### Technical GEO — 79/100

The strongest category by a significant margin. Pure SSG via `generateStaticParams` means all 350 pages serve complete HTML to every AI crawler with zero JavaScript rendering dependency. 20 AI crawlers are explicitly allowed in `robots.ts` with individual named rules (the correct pattern — some crawlers check only named rules and ignore wildcard inheritance). `llms.txt` is well-structured and the only major file-level GEO asset that is complete. Canonical URLs, `lang="en"`, Googlebot extended snippet permissions (`max-snippet: -1`), correct BreadcrumbList on every product/category page, and a comprehensive sitemap all contribute.

**Three gaps holding it back:** missing `og-image.png` (breaks all rich previews), absent security headers, and the unimplemented `SearchAction` search endpoint.

---

### Schema & Structured Data — 44/100

Schema deployment is technically proficient — JSON-LD, server-rendered, correct types, no JavaScript injection risk. But four implementation errors reduce the score significantly:

1. **Price mismatch** (C3 above): schema emits original price, UI shows 10% off — Google Merchant policy violation across 96 pages
2. **Fake AggregateRating** (C4 above): ratingCount:1 from internal HPLC review — manual action risk
3. **Self-referential sameAs** (C5 above): zero entity linking value
4. **Missing schemas**: No `ItemList` on listing pages, no `speakable`, no `Person` (author), no `Article` on content pages, `HowTo` absent from reconstitution guides

**What's working:** `BreadcrumbList` is valid and deployed correctly on all product and category pages. `FAQPage` schema on 9 category pages and `/shipping` is syntactically correct and provides AI crawler semantic signal even with restricted Google SERP eligibility. `WebSite` + `SearchAction` has the right structure (minor `EntryPoint` fix needed).

---

### Platform Optimization — 41/100

| Platform | Score | Key Bottleneck |
|---|---|---|
| Google AI Overviews | 55/100 | Content structure is ready; source authority is not. Unlinked mechanism claims prevent AIO citation. |
| ChatGPT Web Search | 32/100 | Entity recognition is near-zero. No Wikipedia, no Wikidata, `sameAs` self-referential. |
| Perplexity AI | 38/100 | No Reddit presence — Perplexity's primary sourcing layer for this niche. |
| Google Gemini | 33/100 | Zero Google ecosystem footprint. No YouTube, no GBP, no News inclusion. |
| Bing Copilot | 47/100 | No IndexNow, no Bing Webmaster Tools, no LinkedIn (Microsoft's primary entity signal). |

**Best platform readiness:** Google AI Overviews — FAQPage schema, Quick Answer blocks, Product schema, BreadcrumbList, and SSG HTML all align. The gap is authority, not structure.

**Cross-platform quick wins (one action, multiple platforms):**
- `og-image.png` → unblocks rich previews on all 5 platforms
- Fix `Organization.sameAs` → improves ChatGPT, Gemini, Bing Copilot simultaneously
- Add PubMed citations to category content → improves AIO, Perplexity, ChatGPT simultaneously
- Create LinkedIn company page → improves Bing Copilot, ChatGPT, Gemini simultaneously

---

## Quick Wins (This Week)

1. **Fix product schema price** — change `v.price.toFixed(2)` to `salePrice(v.price).toFixed(2)` in `app/products/[slug]/page.tsx:115`. One line of code; removes Google Merchant policy violation across 96 pages. **[30 minutes]**

2. **Remove fake `AggregateRating`** — delete the `purityReview` object and `aggregateRating` block from `productJsonLd` in `app/products/[slug]/page.tsx`. Replace with `additionalProperty` for purity. **[15 minutes]**

3. **Create `/public/og-image.png`** — 1200×630px, Peptidelife branding. Unblocks all rich previews across all 350 pages. **[1 hour]**

4. **Fix Organization schema** in `app/page.tsx` — remove `alternateName: "TideLife"`, fix `logo` to `/og-image.png`, update `sameAs` to include LinkedIn URL (create the page first). **[20 minutes + 30 minutes for LinkedIn page]**

5. **Add security headers** to `next.config.ts` — 4 headers, 8 lines of config. Referrer-Policy is specifically important for the affiliate link architecture. **[15 minutes]**

---

## 30-Day Action Plan

### Week 1: Fix Policy Violations and Broken Assets
- [ ] Create `/public/og-image.png` (1200×630)
- [ ] Fix product schema price to `salePrice(v.price)` — `app/products/[slug]/page.tsx:115`
- [ ] Remove `AggregateRating` + `purityReview` from product schema
- [ ] Add `priceValidUntil: "2026-12-31"` to all product offers
- [ ] Fix `Organization.logo`, remove `alternateName: "TideLife"`, fix `SearchAction` target format
- [ ] Add security headers to `next.config.ts`
- [ ] Fix `Product.brand` to Phiogen (or remove)
- [ ] Deploy domain; verify HTTP 200 on `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`

### Week 2: Entity Presence and Schema Enrichment
- [ ] Create LinkedIn company page for Peptidelife; update `Organization.sameAs`
- [ ] Create Trustpilot business profile; add to `sameAs`
- [ ] Add IndexNow key and `msvalidate.01` to `app/layout.tsx`; register in Bing Webmaster Tools
- [ ] Submit sitemap to Google Search Console and Bing Webmaster Tools
- [ ] Add `ItemList` schema to `app/products/page.tsx` and all 9 category pages
- [ ] Add `speakable` specification to homepage Quick Answer block and product pages
- [ ] Change FAQ question `<p>` tags to `<h3>` in `app/peptides/[category]/page.tsx`

### Week 3: Content Depth and Trust Signals
- [ ] Expand all 9 category `content` fields to 300+ words with mechanism comparisons and inline study citations (add `(SURMOUNT-1, NEJM 2022)` style references — no live links required initially)
- [ ] Add a named reviewer/author to the About page with `Person` schema
- [ ] Add affiliate disclosure sentence proximate to "Buy From Store" buttons on product pages
- [ ] Add physical address and `support@tidelife.com` to footer and About page
- [ ] Add visible `datePublished` and `dateModified` fields to category and product pages; fix `sitemap.ts` lastmod for legal pages
- [ ] Add mobile hamburger navigation to `components/navigation.tsx`
- [ ] Host or link sample CoA document(s) from About page

### Week 4: AI Citability and Community Presence
- [ ] Add `faq` arrays to top 20 products in `data/products.json`; render `FAQPage` JSON-LD on product pages
- [ ] Create `/public/llms-full.txt` with all 45 category FAQs and full content sections
- [ ] Add `og:image` to category page `generateMetadata`
- [ ] Shorten homepage title tag to ≤65 characters
- [ ] Start Reddit participation in r/Peptides and r/PeptidesResearch (10 informational posts over 4 weeks before any brand mention)
- [ ] Add `mainEntityOfPage` and expand `description` field in Product JSON-LD
- [ ] Add PubMed outbound links to 2–3 key mechanism claims per category (convert "published data" to real links)

---

## Appendix: Pages Analyzed

| URL | Schema Present | Key GEO Issues |
|---|---|---|
| / (homepage) | Organization, WebSite | Fake sameAs, broken logo, missing og-image.png |
| /products | None | No ItemList schema |
| /products/retatrutide (representative) | Product, BreadcrumbList | Price mismatch, fake AggregateRating, no FAQ |
| /products/tirzepatide | Product, BreadcrumbList | Same as above |
| /products/bpc-157 | Product, BreadcrumbList | Same as above |
| /peptides | None | No ItemList schema |
| /peptides/glp-weight-loss (representative) | FAQPage, BreadcrumbList | FAQ questions not h3, content too short, no citations |
| /peptides/longevity | FAQPage, BreadcrumbList | Same as above |
| /peptides/khavinson | FAQPage, BreadcrumbList | Best citability content on site — needs expansion |
| /shipping | FAQPage | Good — shipping policy well structured |
| /about | None | No Person schema, no address, no CoA links |
| /stacks | None | Content opportunities for protocol-level FAQs |
| /privacy | None | Good compliance page; date present |
| /terms | None | Good compliance page; date present |
| /out/[slug] | None | Correctly disallowed in robots.txt |
| /robots.txt | — | Excellent — 20 AI crawlers explicitly allowed |
| /llms.txt | — | Good structure; llms-full.txt companion needed |
| /sitemap.xml | — | All 350 URLs; lastmod always = build time |

---

*GEO Audit conducted using the geo-audit orchestration skill. Scores reflect site state at time of audit (2026-04-21, pre-launch). Post-deployment scores are expected to improve significantly — Technical and AI Citability categories would move from 79 and 68 respectively to approximately 85+ and 72+ once the domain is live and the code-level fixes in C3/C4 are deployed. Brand Authority will require 30–90 days of external profile building to materially improve.*
