import Link from "next/link"
import Image from "next/image"
import {
  Product,
  cheapestVariantPrice,
  mostExpensiveVariantPrice,
  salePrice,
  DISCOUNT_PCT,
  outUrl,
} from "@/lib/peptide-data"

interface ProductCardProps {
  product: Product
  showBuyButton?: boolean
}

export default function ProductCard({ product, showBuyButton = true }: ProductCardProps) {
  const minOriginal = cheapestVariantPrice(product)
  const maxOriginal = mostExpensiveVariantPrice(product)
  const minSale = salePrice(minOriginal)
  const multiVariant = product.variants.length > 1
  const defaultVariant = product.variants[0]

  return (
    <div className="relative bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 hover:border-yellow-300 hover:shadow-sm transition-all">
      {/* Full-card link — sits below the buy button */}
      <Link
        href={`/products/${product.slug}`}
        className="absolute inset-0 rounded-xl z-10"
        aria-label={`View ${product.name}`}
      />

      <div className="aspect-square bg-slate-50 rounded-lg overflow-hidden relative">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Discount badge */}
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md z-20">
          {DISCOUNT_PCT}% OFF
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug">{product.name}</h3>
        {product.chemical_name && (
          <p className="text-xs text-slate-500 line-clamp-1">{product.chemical_name}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {/* Price row */}
        <div className="flex items-baseline gap-2">
          <span className="font-extrabold text-slate-900 text-base">
            {multiVariant ? `From $${minSale.toFixed(2)}` : `$${minSale.toFixed(2)}`}
          </span>
          <span className="text-xs text-slate-400 line-through">
            {multiVariant ? `$${minOriginal.toFixed(2)}` : `$${minOriginal.toFixed(2)}`}
          </span>
          {multiVariant && maxOriginal > minOriginal && (
            <span className="text-xs text-slate-400 ml-auto">{product.variants.length} sizes</span>
          )}
        </div>

        {showBuyButton && (
          <Link
            href={outUrl(defaultVariant.slug)}
            className="relative z-20 block w-full text-center bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            Buy From Store
          </Link>
        )}
      </div>
    </div>
  )
}
