"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export interface SearchItem {
  name: string
  slug: string
}

export default function SearchBar({
  items,
  className = "",
  placeholder = "Search peptides…",
}: {
  items: SearchItem[]
  className?: string
  placeholder?: string
}) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return items
      .filter((p) => p.name.toLowerCase().includes(q) || p.slug.includes(q))
      .slice(0, 8)
  }, [items, query])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  useEffect(() => {
    setActiveIdx(0)
  }, [query])

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false)
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setOpen(true)
      setActiveIdx((i) => Math.min(i + 1, Math.max(matches.length - 1, 0)))
      return
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === "Enter") {
      e.preventDefault()
      const target = matches[activeIdx]
      if (target) {
        router.push(`/products/${target.slug}`)
        setOpen(false)
        setQuery("")
      } else if (query.trim()) {
        router.push("/products")
        setOpen(false)
      }
    }
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div className="relative">
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search peptides"
          className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 placeholder:text-slate-400"
        />
      </div>

      {open && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50">
          <ul className="max-h-80 overflow-y-auto py-1">
            {matches.map((m, i) => (
              <li key={m.slug}>
                <Link
                  href={`/products/${m.slug}`}
                  onClick={() => {
                    setOpen(false)
                    setQuery("")
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={`block px-3 py-2 text-sm ${
                    i === activeIdx
                      ? "bg-yellow-50 text-slate-900"
                      : "text-slate-700"
                  }`}
                >
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {open && query.trim() && matches.length === 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 px-3 py-2 text-sm text-slate-500">
          No matches for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
