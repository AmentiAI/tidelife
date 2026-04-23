import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  products,
  getProductBySlug,
  getAllProductSlugs,
  analyzeVariants,
  savingsPct,
  reconVolume,
  pickPairs,
  pickRelated,
  pageShape,
  composeH1,
  composeTitle,
  cheapestVariantPrice,
  salePrice,
  salePriceFormatted,
  DISCOUNT_PCT,
  outUrl,
  supplierUrl,
  SITE,
  SITE_NAME,
} from "@/lib/peptide-data"
import ProductCard from "@/components/product-card"

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  const shape = pageShape(product)
  const title = composeTitle(product, shape)
  const description = `Buy ${product.name} online${product.chemical_name ? ` — ${product.chemical_name}` : ""}. ≥98% HPLC purity, sealed vial with lot CoA, tracked US shipping 3–5 business days. Free shipping on orders over $200.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE}/products/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/products/${slug}`,
      type: "website",
      siteName: SITE_NAME,
      images: [{ url: `${SITE}${product.image_url}`, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE}${product.image_url}`],
    },
    keywords: [
      `buy ${product.name.toLowerCase()} online`,
      `${product.name.toLowerCase()} for sale`,
      `${product.name.toLowerCase()} price`,
      ...(product.chemical_name ? [product.chemical_name.toLowerCase()] : []),
      "research peptides",
      "≥98% HPLC",
    ],
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const shape = pageShape(product)
  const h1 = composeH1(product, shape)
  const rows = analyzeVariants(product)
  const savings = savingsPct(rows)
  const pairs = pickPairs(product)
  const related = pickRelated(product)
  const defaultVariant = product.variants[0]

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.name}${product.chemical_name ? ` — ${product.chemical_name}` : ""}. ≥98% HPLC purity.`,
    image: `${SITE}${product.image_url}`,
    sku: product.sku,
    mpn: product.sku,
    productID: product.sku,
    ...(product.cas_number ? { identifier: product.cas_number } : {}),
    brand: { "@type": "Brand", name: "Phiogen" },
    category: "Health & Beauty > Health Care",
    additionalProperty: { "@type": "PropertyValue", name: "HPLC Purity", value: "≥98%" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/products/${slug}` },
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      name: v.name,
      price: salePrice(v.price).toFixed(2),
      priceCurrency: "USD",
      priceValidUntil: "2026-12-31",
      availability: v.in_stock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `${SITE}/out/${v.slug}`,
      seller: { "@type": "Organization", name: SITE_NAME, url: SITE },
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${SITE}/products/${slug}` },
    ],
  }

  const reviewerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "David J. Harrison",
    honorificPrefix: "Prof.",
    honorificSuffix: "MB ChB MD DSc FRCPath FRCPE FRCSEd",
    jobTitle: "Professor of Pathology",
    affiliation: {
      "@type": "EducationalOrganization",
      name: "University of St Andrews",
    },
    sameAs: "https://arnoldpublishers-com.vercel.app/authors/david-harrison",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewerJsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-5 flex items-center gap-1">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-slate-700">Products</Link>
          <span>/</span>
          <span className="text-slate-700">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Product image */}
          <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{h1}</h1>

            {/* Chemical profile */}
            {(product.chemical_name || product.cas_number) && (
              <p className="text-sm text-slate-500 mb-4">
                {product.chemical_name && <span>{product.chemical_name}</span>}
                {product.cas_number && (
                  <span className="ml-2 font-mono text-xs">· CAS {product.cas_number}</span>
                )}
              </p>
            )}

            {/* Trust row */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs font-semibold text-yellow-700">
              <span>✓ ≥98% HPLC Purity</span>
              <span>✓ Lot CoA Included</span>
              <span>✓ Free Shipping $200+</span>
              <span>✓ Same-Day Dispatch</span>
            </div>

            {/* Medical reviewer badge */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 mb-6 hover:border-slate-300 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                <span className="text-slate-600 font-bold text-xs">DH</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 leading-tight">Medically Reviewed</p>
                <p className="text-xs text-slate-500 leading-tight">Prof. David J. Harrison, FRCPath · Chair of Pathology, Univ. of St Andrews</p>
              </div>
            </Link>

            {/* Variant picker + buy */}
            <div className="space-y-3 mb-6">
              {product.variants.map((v, i) => {
                const row = rows[i]
                return (
                  <div
                    key={v.slug}
                    className={`flex items-center justify-between border rounded-xl px-4 py-3 ${row.isBestValue ? "border-yellow-500 bg-yellow-50" : "border-slate-200"}`}
                  >
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{v.name}</p>
                      {row.pricePerMg !== null && (
                        <p className="text-xs text-slate-500">
                          ${row.pricePerMg.toFixed(2)}/mg
                          {row.isBestValue && (
                            <span className="ml-1.5 text-yellow-600 font-bold">Best value</span>
                          )}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-bold text-slate-900">${salePrice(v.price).toFixed(2)}</span>
                        <span className="ml-1.5 text-xs text-slate-400 line-through">{v.price_formatted}</span>
                      </div>
                      <Link
                        href={outUrl(v.slug)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Buy From Store
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {savings !== null && (
              <p className="text-sm text-yellow-700 font-semibold mb-4">
                💡 Save up to {savings}% per mg by choosing the largest size.
              </p>
            )}
          </div>
        </div>

        {/* Pricing analysis (value-shop shape) */}
        {(shape === "value-shop" || product.variants.length >= 2) && rows.some((r) => r.pricePerMg !== null) && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Pricing</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Size</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Price</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">$/mg</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.variant.slug}
                      className={`border-t border-slate-200 ${row.isBestValue ? "bg-yellow-50" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium">{row.variant.name}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold">${salePrice(row.variant.price).toFixed(2)}</span>
                        <span className="ml-1.5 text-xs text-slate-400 line-through">{row.variant.price_formatted}</span>
                      </td>
                      <td className="px-4 py-3">
                        {row.pricePerMg !== null ? `$${(salePrice(row.variant.price) / row.totalMg!).toFixed(3)}` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {row.isBestValue && (
                          <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
                            Best value
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Reconstitution math (recon-first and value-shop with mg) */}
        {(shape === "recon-first" || shape === "value-shop") &&
          rows.some((r) => r.totalMg !== null) && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Reconstitution</h2>
              <p className="text-sm text-slate-600 mb-4">
                Add bacteriostatic water to the lyophilized vial. Volumes below for two common
                target concentrations:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Vial size</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">At 2 mg/mL</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">At 5 mg/mL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows
                      .filter((r) => r.totalMg !== null)
                      .map((row) => (
                        <tr key={row.variant.slug} className="border-t border-slate-200">
                          <td className="px-4 py-3 font-medium">{row.variant.name}</td>
                          <td className="px-4 py-3">{reconVolume(row.totalMg!, 2)} BAC water</td>
                          <td className="px-4 py-3">{reconVolume(row.totalMg!, 5)} BAC water</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                <Link href="/products/bacteriostatic-water" className="underline hover:text-slate-700">
                  Bacteriostatic water
                </Link>{" "}
                is not included — add a 30mL vial to your order (covers ~2–4 reconstitutions at typical volumes).
              </p>
            </section>
          )}

        {/* Capsule composition (capsule shape) */}
        {shape === "capsule" && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Capsule Details</h2>
            {product.variants.map((v) => (
              <div key={v.slug} className="bg-slate-50 rounded-xl p-4 mb-3">
                <p className="font-semibold text-slate-900">{v.name}</p>
                {product.chemical_name && (
                  <p className="text-sm text-slate-600 mt-1">{product.chemical_name}</p>
                )}
                <p className="text-sm text-slate-600 mt-1">
                  Oral capsule formulation — no reconstitution required.
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Liquid details (liquid shape) */}
        {shape === "liquid" && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Solution Details</h2>
            {product.variants.map((v) => (
              <div key={v.slug} className="bg-slate-50 rounded-xl p-4 mb-3">
                <p className="font-semibold text-slate-900">{v.name}</p>
                <p className="text-sm text-slate-600 mt-1">Pre-dissolved liquid — no reconstitution required.</p>
              </div>
            ))}
          </section>
        )}

        {/* Blend composition (blend shape) */}
        {shape === "blend" && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Blend Composition</h2>
            {product.chemical_name && (
              <p className="text-slate-700 mb-3">{product.chemical_name}</p>
            )}
            <p className="text-sm text-slate-600">
              Ships as a single pre-mixed lyophilized vial. Reconstitute with bacteriostatic water before use.
            </p>
          </section>
        )}

        {/* Solvent compatibility (solvent shape) */}
        {shape === "solvent" && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Compatibility</h2>
            <p className="text-slate-700 mb-3">
              {product.name} is compatible with all lyophilized peptide vials in this catalog.
              It is a multi-draw bacteriostatic solution that keeps reconstituted peptides stable
              under refrigeration for approximately 30 days.
            </p>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Bacteriostatic (0.9% benzyl alcohol) — multi-draw safe</li>
              <li>Sterile-filtered for research use</li>
              <li>One 30mL vial covers 2–4 typical reconstitutions</li>
            </ul>
          </section>
        )}

        {/* Pair with */}
        {shape !== "solvent" && pairs.length > 0 && (
          <aside className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Pair With</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {pairs.map((p) => (
                <ProductCard key={p.slug} product={p} showBuyButton={false} />
              ))}
            </div>
          </aside>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <aside className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">More From This Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </aside>
        )}

        {/* Purity disclaimer */}
        <p className="text-xs text-slate-400 border-t border-slate-100 pt-6">
          For in-vitro laboratory research use only. Not for human consumption. All products are ≥98%
          HPLC purity verified with a certificate of analysis from an independent third-party laboratory.
        </p>
      </div>
    </>
  )
}
