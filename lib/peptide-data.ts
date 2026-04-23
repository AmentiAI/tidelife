import productsRaw from "@/data/products.json"
import categoriesRaw from "@/data/categories.json"

export const SITE = "https://tidelife.com"
export const SITE_NAME = "Peptidelife"
export const SUPPLIER_BASE = "https://phiogen.is/products"
export const REF_CODE = "PEPS"

const FORMAT_CATEGORIES = new Set([
  "Lyophilized Powder",
  "Capsules & Tablets",
  "Liquid Solutions",
  "Reconstitution Solutions",
  "Specialty Compounds",
  "Peptide Blends",
])

export interface ProductVariant {
  name: string
  slug: string
  price: number
  price_formatted: string
  in_stock: boolean
}

export interface Product {
  name: string
  slug: string
  sku: string
  chemical_name?: string
  cas_number?: string
  categories: string[]
  image_url: string
  in_stock: boolean
  variants: ProductVariant[]
}

export interface Category {
  slug: string
  name: string
  shortName: string
  h1: string
  seoTitle: string
  seoDescription: string
  productCategoryNames: string[]
  featuredProductSlugs: string[]
  content: string
}

export const products: Product[] = productsRaw as Product[]
export const categories: Category[] = categoriesRaw as Category[]

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByExactCategories(catNames: string[]): Product[] {
  return products.filter((p) =>
    p.categories.some((c) => catNames.includes(c) && !FORMAT_CATEGORIES.has(c))
  )
}

export function getAllCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export const DISCOUNT_PCT = 10

export function salePrice(original: number): number {
  return Math.round(original * (1 - DISCOUNT_PCT / 100) * 100) / 100
}

export function salePriceFormatted(original: number): string {
  return `$${salePrice(original).toFixed(2)}`
}

export function cheapestVariantPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price))
}

export function mostExpensiveVariantPrice(product: Product): number {
  return Math.max(...product.variants.map((v) => v.price))
}

export function priceLabel(product: Product): string {
  const prices = product.variants.map((v) => v.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  if (min === max) return `$${min.toFixed(2)}`
  return `${product.variants[0].price_formatted} – $${max.toFixed(2)}`
}

export function supplierUrl(variantSlug: string): string {
  return `${SUPPLIER_BASE}/${variantSlug}?ref=${REF_CODE}`
}

export function outUrl(slug: string): string {
  return `/out/${slug}`
}

export interface VariantAnalysis {
  variant: ProductVariant
  totalMg: number | null
  pricePerMg: number | null
  isBestValue: boolean
}

function parseMg(name: string): number | null {
  const m = name.match(/(\d+(?:\.\d+)?)\s*mg/i)
  return m ? parseFloat(m[1]) : null
}

export function analyzeVariants(product: Product): VariantAnalysis[] {
  const rows = product.variants.map((v) => ({
    variant: v,
    totalMg: parseMg(v.name),
    pricePerMg: null as number | null,
    isBestValue: false,
  }))
  rows.forEach((r) => {
    if (r.totalMg) r.pricePerMg = r.variant.price / r.totalMg
  })
  const mgRows = rows.filter((r) => r.pricePerMg !== null)
  if (mgRows.length > 1) {
    const best = mgRows.reduce((a, b) =>
      (a.pricePerMg as number) <= (b.pricePerMg as number) ? a : b
    )
    best.isBestValue = true
  }
  return rows
}

export function savingsPct(rows: VariantAnalysis[]): number | null {
  const mgRows = rows.filter((r) => r.pricePerMg !== null)
  if (mgRows.length < 2) return null
  const best = Math.min(...mgRows.map((r) => r.pricePerMg as number))
  const worst = Math.max(...mgRows.map((r) => r.pricePerMg as number))
  return Math.round(((worst - best) / worst) * 100)
}

export function reconVolume(vialMg: number, targetMgPerMl: number): string {
  const ml = vialMg / targetMgPerMl
  return `${ml % 1 === 0 ? ml.toFixed(0) : ml.toFixed(1)} mL`
}

function hashSlug(s: string): number {
  let h = 1779033703 ^ s.length
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return (h ^ (h >>> 16)) >>> 0
}

function deterministicShuffle<T>(arr: T[], seed: number): T[] {
  const out = arr.slice()
  let state = seed || 1
  for (let i = out.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    const j = state % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function therapeuticPool(product: Product): Product[] {
  const therapeutic = product.categories.filter(
    (c) => !FORMAT_CATEGORIES.has(c)
  )
  return products.filter(
    (p) =>
      p.slug !== product.slug &&
      p.in_stock &&
      p.categories.some(
        (c) => therapeutic.includes(c) && !FORMAT_CATEGORIES.has(c)
      )
  )
}

export function pickPairs(product: Product, count = 3): Product[] {
  const pool = therapeuticPool(product)
  return deterministicShuffle(pool, hashSlug(product.slug + "pairs")).slice(
    0,
    count
  )
}

export function pickRelated(product: Product, count = 4): Product[] {
  const pool = therapeuticPool(product)
  const pairSet = new Set(pickPairs(product, 3).map((p) => p.slug))
  const seeded = deterministicShuffle(
    pool,
    hashSlug(product.slug + "related")
  )
  const nonPair = seeded.filter((p) => !pairSet.has(p.slug))
  return (nonPair.length >= count ? nonPair : seeded).slice(0, count)
}

export type PageShape =
  | "value-shop"
  | "recon-first"
  | "capsule"
  | "liquid"
  | "blend"
  | "solvent"
  | "specialty"

export function pageShape(product: Product): PageShape {
  const cats = product.categories
  const isSolvent = cats.includes("Reconstitution Solutions")
  const isBlend = cats.includes("Peptide Blends")
  const hasCapsule = cats.includes("Capsules & Tablets")
  const hasLiquid = cats.includes("Liquid Solutions")
  const vCount = product.variants.length
  const hasMg =
    product.variants.some((v) => /\d+\s*mg/i.test(v.name)) &&
    !cats.includes("Liquid Solutions")

  if (isSolvent) return "solvent"
  if (isBlend) return "blend"
  if (hasCapsule) return "capsule"
  if (hasLiquid) return "liquid"
  if (vCount >= 3) return "value-shop"
  if (vCount <= 2 && hasMg) return "recon-first"
  return "specialty"
}

export function composeH1(product: Product, shape: PageShape): string {
  const v = product.variants
  const minPrice = cheapestVariantPrice(product)
  switch (shape) {
    case "value-shop": {
      const sizes = v.length
      return `Buy ${product.name} — ${sizes} Sizes from $${minPrice.toFixed(2)}`
    }
    case "recon-first": {
      const sizePart = v[0]?.name.match(/\d+(?:\.\d+)?\s*mg/i)?.[0] ?? ""
      return `Buy ${product.name}${sizePart ? ` — ${sizePart} Lyophilized Vial` : ""}`
    }
    case "capsule": {
      const capInfo =
        v[0]?.name
          .replace(product.name, "")
          .trim()
          .replace(/^[–-]\s*/, "") ?? ""
      return `Order ${product.name}${capInfo ? ` — ${capInfo}` : ""}`
    }
    case "liquid": {
      return `Buy ${product.name} — Pre-Dissolved Liquid Solution`
    }
    case "blend": {
      return `Order ${product.name} — Pre-Mixed Peptide Blend`
    }
    case "solvent": {
      return `Buy ${product.name} — Reconstitution Solvent for Research Peptides`
    }
    default:
      return `Buy ${product.name} — $${minPrice.toFixed(2)}`
  }
}

export function composeTitle(product: Product, shape: PageShape): string {
  const v = product.variants
  switch (shape) {
    case "value-shop": {
      const range =
        v.length > 1
          ? `${v[0].name.match(/\d+(?:\.\d+)?\s*mg/i)?.[0] ?? ""} – ${v[v.length - 1].name.match(/\d+(?:\.\d+)?\s*mg/i)?.[0] ?? ""}`
          : ""
      return `Buy ${product.name}${range ? ` ${range}` : ""} Vials | Peptides Online`
    }
    case "recon-first": {
      const size =
        v.length > 1
          ? `${v[0].name.match(/\d+(?:\.\d+)?\s*mg/i)?.[0] ?? ""} & ${v[1].name.match(/\d+(?:\.\d+)?\s*mg/i)?.[0] ?? ""}`
          : (v[0]?.name.match(/\d+(?:\.\d+)?\s*mg/i)?.[0] ?? "")
      return `Buy ${product.name}${size ? ` ${size}` : ""} Vials | Peptides Online`
    }
    case "capsule":
      return `Order ${product.name} Capsules | Peptides Online`
    case "liquid":
      return `Buy ${product.name} Solution | Peptides Online`
    case "blend":
      return `Order ${product.name} Pre-Mixed Blend | Peptides Online`
    case "solvent":
      return `Buy ${product.name} — BAC Water for Peptide Reconstitution | Peptides Online`
    default:
      return `Buy ${product.name} | Peptides Online`
  }
}

export function getBestsellerProducts(count = 8): Product[] {
  const featured = [
    "retatrutide",
    "tirzepatide",
    "semaglutide",
    "bpc-157",
    "ghk-cu",
    "mots-c",
    "epitalon",
    "ipamorelin",
  ]
  return featured
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => !!p)
    .slice(0, count)
}
