import Link from "next/link"
import { getAllCategories, products } from "@/lib/peptide-data"
import MobileMenu from "@/components/mobile-menu"
import SearchBar from "@/components/search-bar"

export default function Navigation() {
  const cats = getAllCategories()
  const searchItems = products.map((p) => ({ name: p.name, slug: p.slug }))

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 h-14">
        <Link href="/" className="font-bold text-lg tracking-tight text-slate-900 shrink-0">
          Peptidelife
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 shrink-0">
          <Link href="/products" className="hover:text-slate-900">Shop All</Link>
          <div className="relative group">
            <Link href="/peptides" className="hover:text-slate-900">Categories</Link>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
              <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 w-56 grid gap-1">
                {cats.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/peptides/${c.slug}`}
                    className="block px-3 py-1.5 rounded hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/stacks" className="hover:text-slate-900">Stacks</Link>
          <Link href="/shipping" className="hover:text-slate-900">Shipping</Link>
        </nav>

        <div className="hidden md:block flex-1 max-w-sm ml-auto">
          <SearchBar items={searchItems} />
        </div>

        <div className="flex items-center gap-3 ml-auto md:ml-0 shrink-0">
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Shop Peptides
          </Link>
          <MobileMenu cats={cats} searchItems={searchItems} />
        </div>
      </div>
    </header>
  )
}
