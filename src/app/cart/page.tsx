'use client'

export const runtime = 'edge'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice, formatIDR } from '@/lib/currency'

export default function CartPage() {
  const { items, removeItem, updateQty, totalIDR, currency, itemCount } = useCart()

  if (itemCount === 0) {
    return (
      <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <p
          className="text-espresso mb-3"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '40px' }}
        >
          Your bag is empty
        </p>
        <p className="text-[13px] font-light text-sienna mb-10">
          Add some beautiful pieces to get started.
        </p>
        <Link
          href="/catalog"
          className="bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase px-10 py-4 hover:bg-mahogany transition-colors"
        >
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="border-b border-linen px-6 lg:px-10 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="block w-6 h-px bg-sienna" />
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <h1
            className="text-espresso"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Your <em>Bag</em>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">

          {/* Line items */}
          <div className="space-y-0">
            {items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className={`flex gap-5 py-6 ${idx < items.length - 1 ? 'border-b border-linen' : ''}`}
              >
                {/* Product image placeholder */}
                <div
                  className="w-24 h-32 shrink-0"
                  style={{ background: item.product.gradient }}
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-light text-espresso hover:text-mahogany transition-colors"
                          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '20px' }}
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-sienna mt-0.5">
                          {item.product.category === 'top' ? 'Top' : 'Dress'} · Size {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-sienna hover:text-espresso transition-colors ml-4 mt-1"
                        aria-label="Remove"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Qty stepper */}
                    <div className="flex items-center border border-linen">
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-rosewood hover:bg-blush transition-colors text-lg leading-none"
                      >
                        −
                      </button>
                      <span className="w-9 h-9 flex items-center justify-center text-[13px] text-espresso border-x border-linen">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-rosewood hover:bg-blush transition-colors text-lg leading-none"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="text-[14px] font-normal text-espresso">
                      {formatPrice(item.product.priceIDR * item.quantity, currency)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border border-linen p-6">
              <h2
                className="text-espresso mb-6"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '22px' }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-[13px]">
                  <span className="font-light text-rosewood">Subtotal ({itemCount} items)</span>
                  <span className="font-normal text-espresso">{formatPrice(totalIDR, currency)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="font-light text-rosewood">Shipping</span>
                  <span className="font-normal text-espresso">
                    {totalIDR >= 500000 ? 'Free' : formatIDR(25000)}
                  </span>
                </div>
              </div>

              <div className="border-t border-linen pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-[13px] font-normal text-espresso">Total</span>
                  <span
                    className="text-espresso"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '20px' }}
                  >
                    {formatPrice(totalIDR >= 500000 ? totalIDR : totalIDR + 25000, currency)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase text-center py-4 hover:bg-mahogany transition-colors"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/catalog"
                className="block w-full mt-3 border border-linen text-espresso text-[10px] font-normal tracking-[0.22em] uppercase text-center py-4 hover:border-espresso transition-colors"
              >
                Continue Shopping
              </Link>

              <p className="text-[11px] font-light text-sienna text-center mt-5 leading-relaxed">
                Free shipping on orders over Rp 500.000 · 30-day returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
