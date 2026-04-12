'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { Product, Size } from '@/types'
import { formatPrice } from '@/lib/currency'

interface Props {
  product: Product
}

export default function AddToCart({ product }: Props) {
  const { addItem, currency } = useCart()
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState(false)

  const handleAdd = () => {
    if (!selectedSize) {
      setError(true)
      setTimeout(() => setError(false), 2000)
      return
    }
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {/* Price */}
      <p
        className="text-espresso mb-6"
        style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '28px' }}
      >
        {formatPrice(product.priceIDR, currency)}
      </p>

      {/* Size picker */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] tracking-[0.22em] uppercase text-espresso font-normal">Size</p>
          {error && (
            <p className="text-[10px] text-mahogany tracking-wider">Please select a size</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => { setSelectedSize(size); setError(false) }}
              className={`w-12 h-12 text-[11px] font-normal tracking-wider border transition-colors ${
                selectedSize === size
                  ? 'bg-espresso text-cream border-espresso'
                  : 'bg-cream text-espresso border-linen hover:border-espresso'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to bag */}
      <button
        onClick={handleAdd}
        className={`w-full py-4 text-[10px] font-normal tracking-[0.22em] uppercase transition-all ${
          added
            ? 'bg-rosewood text-cream'
            : 'bg-espresso text-cream hover:bg-mahogany'
        }`}
      >
        {added ? '✓ Added to Bag' : 'Add to Bag'}
      </button>

      {/* Size guide */}
      <button className="w-full mt-3 py-3.5 text-[10px] font-normal tracking-[0.22em] uppercase border border-linen text-rosewood hover:border-espresso hover:text-espresso transition-colors">
        Size Guide
      </button>
    </div>
  )
}
