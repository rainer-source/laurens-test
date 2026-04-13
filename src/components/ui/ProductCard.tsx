'use client'

import Link from 'next/link'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/currency'
import WishlistButton from '@/components/ui/WishlistButton'

interface Props {
  product: Product
  badge?: string
}

export default function ProductCard({ product, badge }: Props) {
  const { currency } = useCart()

  return (
    <Link href={`/products/${product.id}`} className="group block">
      {/* Image placeholder */}
      <div className="relative aspect-[2/3] overflow-hidden mb-4">
        <div
          className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ background: product.gradient }}
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-espresso text-cream text-[8px] font-normal tracking-[0.2em] uppercase px-2.5 py-1">
            {badge}
          </span>
        )}
        <WishlistButton productId={product.id} />
        {/* Quick shop overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-bark/90 text-petal text-[9px] font-normal tracking-[0.22em] uppercase text-center py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          Quick Shop
        </div>
      </div>

      {/* Info */}
      <p
        className="text-espresso text-[18px] leading-tight mb-1"
        style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
      >
        {product.name}
      </p>
      <p className="text-[10px] tracking-[0.15em] uppercase text-sienna mb-2">
        {product.category === 'top' ? 'Top' : 'Dress'}
      </p>
      <p className="text-[14px] font-normal text-espresso">
        {formatPrice(product.priceIDR, currency)}
      </p>
    </Link>
  )
}
