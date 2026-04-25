import Link from "next/link"
import { getAllCategories } from "@/lib/peptide-data"

export default function Footer() {
  const cats = getAllCategories()

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="font-bold text-slate-900 mb-2">PeptidesClav</p>
          <p className="text-sm text-slate-500">
            ≥98% HPLC purity · Lot CoA with every order · Free US shipping on orders $200+
          </p>
          <div className="mt-4 flex gap-3 text-xs font-semibold text-yellow-700">
            <span>✓ Same-Day Shipping</span>
            <span>✓ 3–5 Day Delivery</span>
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-800 mb-3 text-sm">Categories</p>
          <ul className="space-y-1.5">
            {cats.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/peptides/${c.slug}`} className="text-sm text-slate-500 hover:text-slate-800">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/peptides" className="text-sm text-slate-500 hover:text-slate-800">
                All Categories →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-800 mb-3 text-sm">Shop</p>
          <ul className="space-y-1.5">
            <li><Link href="/products" className="text-sm text-slate-500 hover:text-slate-800">All Peptides</Link></li>
            <li><Link href="/stacks" className="text-sm text-slate-500 hover:text-slate-800">Stacks</Link></li>
            <li><Link href="/peptides/glp-weight-loss" className="text-sm text-slate-500 hover:text-slate-800">Fat Loss</Link></li>
            <li><Link href="/peptides/recovery-healing" className="text-sm text-slate-500 hover:text-slate-800">Recovery</Link></li>
            <li><Link href="/peptides/longevity" className="text-sm text-slate-500 hover:text-slate-800">Longevity</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-slate-800 mb-3 text-sm">Info</p>
          <ul className="space-y-1.5">
            <li><Link href="/shipping" className="text-sm text-slate-500 hover:text-slate-800">Shipping & Returns</Link></li>
            <li><Link href="/about" className="text-sm text-slate-500 hover:text-slate-800">About</Link></li>
            <li><Link href="/privacy" className="text-sm text-slate-500 hover:text-slate-800">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-sm text-slate-500 hover:text-slate-800">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} PeptidesClav. All rights reserved.
        </p>
        <p className="text-xs text-slate-400 text-center max-w-xl">
          All products are sold for in-vitro laboratory research use only. Not for human consumption, veterinary use, or household use. Must be 18+ to purchase.
        </p>
      </div>
    </footer>
  )
}
