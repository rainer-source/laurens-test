export const runtime = 'edge'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductById, getProductsByCategory } from '@/lib/products'
import AddToCart from '@/components/product/AddToCart'
import ProductCard from '@/components/ui/ProductCard'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) return {}
  return { title: `${product.name} — Lauren's Clothes` }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) notFound()

  // Related: same category, exclude current
  const categoryProducts = await getProductsByCategory(product.category)
  const related = categoryProducts.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-linen px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] font-normal tracking-[0.15em] uppercase text-sienna">
          <Link href="/" className="hover:text-espresso transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-espresso transition-colors">Catalog</Link>
          <span>/</span>
          <Link
            href={`/catalog?category=${product.category}`}
            className="hover:text-espresso transition-colors"
          >
            {product.category === 'top' ? 'Tops' : 'Dresses'}
          </Link>
          <span>/</span>
          <span className="text-espresso">{product.name}</span>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <div
              className="w-full h-full"
              style={{ background: product.gradient }}
            />
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-espresso text-cream text-[8px] font-normal tracking-[0.2em] uppercase px-3 py-1.5">
                New Arrival
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center py-4">
            {/* Category */}
            <p className="text-[9px] tracking-[0.3em] uppercase text-sienna mb-3">
              {product.category === 'top' ? 'Top' : 'Dress'}
            </p>

            {/* Name */}
            <h1
              className="text-espresso mb-4 leading-none"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(36px, 4vw, 52px)' }}
            >
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-[14px] font-light text-rosewood leading-[1.85] mb-8 border-b border-linen pb-8">
              {product.description}
            </p>

            {/* Add to cart (client island) */}
            <AddToCart product={product} />

            {/* Details accordion — static */}
            <div className="mt-8 border-t border-linen pt-6 space-y-4">
              {[
                { label: 'Material', value: 'Premium blended fabric — 70% Viscose, 30% Linen' },
                { label: 'Care', value: 'Gentle cold wash, lay flat to dry, do not tumble dry' },
                { label: 'Origin', value: 'Made in Indonesia' },
                { label: 'Shipping', value: 'Free shipping on orders over Rp 500.000' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 text-[13px]">
                  <span className="font-normal text-espresso w-20 shrink-0">{label}</span>
                  <span className="font-light text-rosewood">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-linen">
            <div className="flex items-center gap-3 mb-2">
              <span className="block w-6 h-px bg-sienna" />
              <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
                You may also like
              </span>
            </div>
            <h2
              className="text-espresso mb-10"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '36px' }}
            >
              Complete the <em>Look</em>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
