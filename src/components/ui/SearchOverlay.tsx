'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { formatIDR } from '@/lib/currency'

interface SearchResult {
  id: string
  name: string
  category: 'top' | 'dress'
  price_idr: number
}

interface Props {
  open: boolean
  onClose: () => void
}

// Category-based gradient placeholder — matches the ProductCard fallback
const CATEGORY_GRADIENT: Record<string, string> = {
  top:   'linear-gradient(145deg, #F0E4DC 0%, #D9C9BF 40%, #A68272 100%)',
  dress: 'linear-gradient(145deg, #EDD8CB 0%, #C4A090 45%, #8B6F5E 100%)',
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus on open; reset on close
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    } else {
      setQuery('')
      setResults([])
      setLoading(false)
    }
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Debounced Supabase search
  useEffect(() => {
    const q = query.trim()
    if (!q) { setResults([]); setLoading(false); return }

    setLoading(true)
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name, category, price_idr')
        .ilike('name', `%${q}%`)
        .order('name')
        .limit(12)
      setResults((data as SearchResult[]) ?? [])
      setLoading(false)
    }, 280)

    return () => clearTimeout(timer)
  }, [query])

  if (!open) return null

  // ── Suggestions ────────────────────────────────────────────────────────────
  // Derived from query + result categories when searching, browse links otherwise
  const hasTops    = results.some((r) => r.category === 'top')
  const hasDresses = results.some((r) => r.category === 'dress')
  const topCount    = results.filter((r) => r.category === 'top').length
  const dressCount  = results.filter((r) => r.category === 'dress').length

  const suggestions = query.trim()
    ? [
        ...(hasTops    ? [{ label: `Tops (${topCount})`,    href: '/catalog?category=top'   }] : []),
        ...(hasDresses ? [{ label: `Dresses (${dressCount})`, href: '/catalog?category=dress' }] : []),
        { label: 'Browse all pieces', href: '/catalog' },
      ]
    : [
        { label: 'All pieces',  href: '/catalog' },
        { label: 'Tops',        href: '/catalog?category=top' },
        { label: 'Dresses',     href: '/catalog?category=dress' },
      ]

  return (
    <div className="fixed inset-0 z-[60] bg-cream flex flex-col">

      {/* ── Search header ─────────────────────────────────────────────────── */}
      <div className="border-b border-linen px-6 lg:px-10 flex items-center gap-4 h-20 shrink-0">
        {/* Search icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={1.4} stroke="currentColor" className="w-6 h-6 text-sienna shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 15.803a7.5 7.5 0 0 0 10.607 0Z" />
        </svg>

        {/* Large input */}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for pieces…"
          className="flex-1 bg-transparent text-espresso placeholder:text-linen outline-none"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(22px, 3vw, 32px)' }}
        />

        {/* Clear query */}
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            className="text-sienna hover:text-espresso transition-colors"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Cancel */}
        <button
          onClick={onClose}
          className="text-[10px] font-normal tracking-[0.22em] uppercase text-sienna hover:text-espresso transition-colors ml-1"
        >
          Cancel
        </button>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left — Suggestions ─────────────────────────────────────────────── */}
        <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-linen px-6 py-8">
          <p className="text-[8px] font-normal tracking-[0.35em] uppercase text-sienna mb-5">
            {query.trim() ? 'Refine by' : 'Browse'}
          </p>
          <nav className="flex flex-col gap-1">
            {suggestions.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={onClose}
                className="text-[13px] font-light text-rosewood hover:text-espresso transition-colors py-1.5"
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Right — Results ─────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8">

          {/* Empty / idle state */}
          {!query.trim() && (
            <div className="h-full flex flex-col items-center justify-center text-center pb-20">
              <p
                className="text-espresso mb-2"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(28px, 3vw, 40px)' }}
              >
                What are you looking for?
              </p>
              <p className="text-[13px] font-light text-sienna">
                Start typing to search our collection.
              </p>
            </div>
          )}

          {/* Loading */}
          {query.trim() && loading && (
            <div className="flex items-center gap-3 py-8">
              <span className="text-[12px] font-light text-sienna">Searching…</span>
            </div>
          )}

          {/* No results */}
          {query.trim() && !loading && results.length === 0 && (
            <div className="py-8">
              <p
                className="text-espresso mb-2"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '28px' }}
              >
                No pieces found
              </p>
              <p className="text-[13px] font-light text-sienna">
                Try a different search term.
              </p>
            </div>
          )}

          {/* Results count */}
          {!loading && results.length > 0 && (
            <p className="text-[11px] font-light text-sienna mb-6">
              {results.length} {results.length === 1 ? 'piece' : 'pieces'} found
            </p>
          )}

          {/* Product grid */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {results.map((r) => (
                <Link
                  key={r.id}
                  href={`/products/${r.id}`}
                  onClick={onClose}
                  className="group block"
                >
                  {/* Gradient placeholder */}
                  <div className="relative aspect-[2/3] overflow-hidden mb-3">
                    <div
                      className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ background: CATEGORY_GRADIENT[r.category] }}
                    />
                    {/* Quick-view label on hover */}
                    <div className="absolute bottom-0 inset-x-0 bg-espresso/90 text-cream text-[8px] font-normal tracking-[0.2em] uppercase text-center py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      View Product
                    </div>
                  </div>

                  {/* Info */}
                  <p
                    className="text-espresso text-[16px] leading-tight mb-0.5 group-hover:text-mahogany transition-colors"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
                  >
                    {r.name}
                  </p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-sienna mb-1">
                    {r.category === 'top' ? 'Top' : 'Dress'}
                  </p>
                  <p className="text-[13px] font-normal text-espresso">
                    {formatIDR(r.price_idr)}
                  </p>
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
