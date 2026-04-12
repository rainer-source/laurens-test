import { Suspense } from 'react'
import { products } from '@/lib/products'
import { Category } from '@/types'
import ProductCard from '@/components/ui/ProductCard'
import FilterTabs from '@/components/catalog/FilterTabs'

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function CatalogPage({ searchParams }: Props) {
  const { category } = await searchParams
  const filtered =
    category === 'top' || category === 'dress'
      ? products.filter((p) => p.category === (category as Category))
      : products

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="border-b border-linen bg-cream px-6 lg:px-10 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="block w-6 h-px bg-sienna" />
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
              {category === 'top' ? 'Tops' : category === 'dress' ? 'Dresses' : 'All pieces'}
            </span>
          </div>
          <h1
            className="text-espresso"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(36px, 4vw, 56px)' }}
          >
            {category === 'top'
              ? <>The <em>Tops</em></>
              : category === 'dress'
              ? <>The <em>Dresses</em></>
              : <>All <em>Collections</em></>}
          </h1>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Filter tabs */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <Suspense fallback={<div className="h-11 w-64 bg-blush animate-pulse" />}>
            <FilterTabs />
          </Suspense>
          <p className="text-[12px] font-light text-sienna">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p
              className="text-espresso mb-3"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '32px' }}
            >
              No pieces found
            </p>
            <p className="text-[13px] font-light text-sienna">Try a different filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                badge={p.isNewArrival ? 'New' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
