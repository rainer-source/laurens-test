'use client'

export const runtime = 'edge'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatIDR } from '@/lib/currency'

interface OrderItem {
  productId: string
  productName: string
  size: string
  quantity: number
  priceIDR: number
}

interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
}

interface PendingOrder {
  orderId: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  totalIDR: number
  shippingFee: number
}

export default function CheckoutPaymentPage() {
  const [order, setOrder] = useState<PendingOrder | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('laurens-pending-order')
    if (raw) {
      try {
        setOrder(JSON.parse(raw))
      } catch {
        // malformed data — will show empty state
      }
    }
    setReady(true)
  }, [])

  if (!ready) return null

  if (!order) {
    return (
      <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-espresso mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '36px' }}>
          No order found
        </p>
        <Link href="/cart" className="bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase px-8 py-4 hover:bg-mahogany transition-colors">
          Back to Cart
        </Link>
      </div>
    )
  }

  const subtotal = order.totalIDR - order.shippingFee
  const { shippingAddress: addr } = order

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="border-b border-linen px-6 lg:px-10 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="block w-6 h-px bg-sienna" />
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">Checkout · Step 2 of 2</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)' }}
            className="text-espresso">
            <em>Review</em> &amp; Pay
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">

          {/* Left: items + shipping address */}
          <div className="space-y-10">

            {/* Items */}
            <div>
              <h2 className="text-espresso mb-5"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '22px' }}>
                Order Items
              </h2>
              <div className="border border-linen divide-y divide-linen">
                {order.items.map((item) => (
                  <div key={`${item.productId}-${item.size}`}
                    className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-[13px] font-light text-espresso">{item.productName}</p>
                      <p className="text-[11px] font-light text-sienna mt-0.5">
                        Size {item.size} &nbsp;·&nbsp; Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-[13px] font-normal text-espresso">
                      {formatIDR(item.priceIDR * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping address summary */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-espresso"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '22px' }}>
                  Shipping Address
                </h2>
                <Link
                  href="/checkout/address"
                  className="text-[9px] tracking-[0.22em] uppercase text-sienna hover:text-rosewood transition-colors"
                >
                  Edit
                </Link>
              </div>
              <div className="border border-linen p-5 space-y-1">
                <p className="text-[13px] font-normal text-espresso">{addr.fullName}</p>
                <p className="text-[12px] font-light text-sienna">{addr.address}</p>
                <p className="text-[12px] font-light text-sienna">
                  {addr.city}, {addr.province} {addr.postalCode}
                </p>
                <p className="text-[12px] font-light text-sienna pt-1">{addr.phone}</p>
                <p className="text-[12px] font-light text-sienna">{addr.email}</p>
              </div>
            </div>
          </div>

          {/* Right: price summary + pay button */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="border border-linen p-6">
              <h2 className="text-espresso mb-5"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '20px' }}>
                Total
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-[12px] font-light">
                  <span className="text-rosewood">Subtotal</span>
                  <span className="text-espresso">{formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[12px] font-light">
                  <span className="text-rosewood">Shipping</span>
                  <span className="text-espresso">{order.shippingFee === 0 ? 'Free' : formatIDR(order.shippingFee)}</span>
                </div>
              </div>

              <div className="border-t border-linen pt-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-[13px] font-normal text-espresso">Total (IDR)</span>
                  <span className="text-espresso"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '22px' }}>
                    {formatIDR(order.totalIDR)}
                  </span>
                </div>
              </div>

              {/* Pay Now — placeholder for Xendit */}
              <button
                type="button"
                className="w-full bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase py-4 hover:bg-mahogany transition-colors"
                onClick={() => {
                  // TODO: initiate Xendit payment with order.orderId
                  alert('Payment integration coming soon.')
                }}
              >
                Pay Now
              </button>
              <p className="text-[10px] font-light text-sienna text-center mt-3">
                Payment via Xendit · SSL secured
              </p>

              <div className="mt-4 border-t border-linen pt-4">
                <p className="text-[10px] font-light text-clay text-center">
                  Order #{order.orderId.slice(0, 8).toUpperCase()}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
