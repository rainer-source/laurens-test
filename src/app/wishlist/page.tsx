'use client'

export const runtime = 'edge'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/context/WishlistContext'
import { getProductsByIds } from '@/lib/products'
import { Product } from '@/types'
import ProductCard from '@/components/ui/ProductCard'

export default function WishlistPage() {
  const { user, ready } = useAuth()
  const { ids } = useWishlist()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ready) return
    if (!user) { setLoading(false); return }

    setLoading(true)
    getProductsByIds([...ids])
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [ids, user, ready])

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (ready && !user) {
    return (
      <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <p
          className="text-espresso mb-3"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '40px' }}
        >
          Sign in to view your wishlist
        </p>
        <p className="text-[13px] font-light text-sienna mb-10">
          Save pieces you love and come back to them anytime.
        </p>
        <Link
          href="/login"
          className="bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase px-10 py-4 hover:bg-mahogany transition-colors"
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="border-b border-linen bg-cream px-6 lg:px-10 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="block w-6 h-px bg-sienna" />
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
              Your collection
            </span>
          </div>
          <h1
            className="text-espresso"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(36px, 4vw, 56px)' }}
          >
            My <em>Wishlist</em>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="aspect-[2/3] bg-blush animate-pulse mb-4" />
                <div className="h-4 bg-blush animate-pulse mb-2 w-3/4" />
                <div className="h-3 bg-blush animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && products.length === 0 && (
          <div className="text-center py-24">
            <p
              className="text-espresso mb-3"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '32px' }}
            >
              Your wishlist is empty
            </p>
            <p className="text-[13px] font-light text-sienna mb-10">
              Browse our collection and save the pieces you love.
            </p>
            <Link
              href="/catalog"
              className="bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase px-10 py-4 hover:bg-mahogany transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        )}

        {/* Grid */}
        {!loading && products.length > 0 && (
          <>
            <p className="text-[12px] font-light text-sienna mb-10">
              {products.length} {products.length === 1 ? 'piece' : 'pieces'} saved
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  badge={p.isNewArrival ? 'New' : undefined}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
