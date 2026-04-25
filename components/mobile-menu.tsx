"use client"

import { useState } from "react"
import Link from "next/link"
import type { Category } from "@/lib/peptide-data"
import SearchBar, { type SearchItem } from "@/components/search-bar"

export default function MobileMenu({
  cats,
  searchItems,
}: {
  cats: Category[]
  searchItems: SearchItem[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 text-slate-700 hover:text-slate-900"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open menu"
      >
        <span className={`block w-5 h-0.5 bg-current transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-5 h-0.5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-current transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-14 left-0 right-0 bg-white border-b border-slate-200 shadow-lg px-4 py-4 flex flex-col gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pb-3">
              <SearchBar items={searchItems} />
            </div>
            <Link href="/products" className="py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100" onClick={() => setOpen(false)}>
              Shop All
            </Link>
            <div className="py-2 border-b border-slate-100">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-1">
                {cats.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/peptides/${c.slug}`}
                    className="text-sm text-slate-700 py-1.5 hover:text-slate-900"
                    onClick={() => setOpen(false)}
                  >
                    {c.shortName || c.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/stacks" className="py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100" onClick={() => setOpen(false)}>
              Stacks
            </Link>
            <Link href="/shipping" className="py-2.5 text-sm font-semibold text-slate-800 border-b border-slate-100" onClick={() => setOpen(false)}>
              Shipping
            </Link>
            <Link
              href="/products"
              className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-bold px-4 py-3 rounded-lg text-center transition-colors"
              onClick={() => setOpen(false)}
            >
              Shop Peptides
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
