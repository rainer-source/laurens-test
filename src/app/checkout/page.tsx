'use client'

export const runtime = 'edge'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice, formatIDR } from '@/lib/currency'
import { ShippingInfo } from '@/types'

const PROVINCES = [
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur',
  'Banten', 'Bali', 'Sumatera Utara', 'Sumatera Selatan',
  'Kalimantan Timur', 'Sulawesi Selatan', 'Yogyakarta',
]

export default function CheckoutPage() {
  const { items, totalIDR, currency, clearCart } = useCart()
  const [form, setForm] = useState<ShippingInfo>({
    fullName: '', email: '', phone: '', address: '',
    city: '', province: '', postalCode: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const shipping = totalIDR >= 500000 ? 0 : 25000
  const grandTotal = totalIDR + shipping

  const update = (field: keyof ShippingInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: connect Xendit payment
    clearCart()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-14 h-14 rounded-full border-2 border-rosewood flex items-center justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-rosewood">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <p
          className="text-espresso mb-3"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '40px' }}
        >
          Order placed!
        </p>
        <p className="text-[13px] font-light text-sienna mb-2">
          Thank you, {form.fullName || 'lovely'}. Your order is confirmed.
        </p>
        <p className="text-[12px] font-light text-sienna mb-10">
          A confirmation will be sent to {form.email || 'your email'}.
        </p>
        <div className="flex gap-4">
          <Link
            href="/orders"
            className="bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase px-8 py-3.5 hover:bg-mahogany transition-colors"
          >
            View Orders
          </Link>
          <Link
            href="/"
            className="border border-linen text-espresso text-[10px] font-normal tracking-[0.22em] uppercase px-8 py-3.5 hover:border-espresso transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-espresso mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '36px' }}>
          Your bag is empty
        </p>
        <Link href="/catalog" className="bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase px-8 py-4 hover:bg-mahogany transition-colors">
          Shop Now
        </Link>
      </div>
    )
  }

  const inputClass = "w-full bg-transparent border border-linen px-4 py-3 text-[13px] font-light text-espresso placeholder:text-clay outline-none focus:border-rosewood transition-colors"
  const labelClass = "text-[9px] tracking-[0.22em] uppercase text-sienna font-normal block mb-1.5"

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="border-b border-linen px-6 lg:px-10 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="block w-6 h-px bg-sienna" />
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">Checkout</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)' }}
            className="text-espresso">
            <em>Shipping</em> Details
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">

            {/* Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input required className={inputClass} placeholder="Anisa Putri"
                    value={form.fullName} onChange={update('fullName')} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input required type="email" className={inputClass} placeholder="anisa@email.com"
                    value={form.email} onChange={update('email')} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input required className={inputClass} placeholder="081234567890"
                  value={form.phone} onChange={update('phone')} />
              </div>

              <div>
                <label className={labelClass}>Street Address</label>
                <textarea required rows={2}
                  className={`${inputClass} resize-none`}
                  placeholder="Jl. Kemang Raya No. 12"
                  value={form.address}
                  onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  <input required className={inputClass} placeholder="Jakarta Selatan"
                    value={form.city} onChange={update('city')} />
                </div>
                <div>
                  <label className={labelClass}>Province</label>
                  <select required className={inputClass}
                    value={form.province} onChange={update('province')}>
                    <option value="">Select province</option>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Postal Code</label>
                  <input required className={inputClass} placeholder="12730"
                    value={form.postalCode} onChange={update('postalCode')} />
                </div>
              </div>

              {/* Shipping notice */}
              <div className="bg-blush border border-linen p-4">
                <p className="text-[12px] font-light text-rosewood">
                  <span className="font-normal">Estimated delivery:</span> 2–4 business days to Jakarta, 4–7 days to other regions.
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="border border-linen p-6">
                <h2 className="text-espresso mb-5"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '20px' }}>
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`}
                      className="flex justify-between text-[12px] font-light">
                      <span className="text-rosewood">
                        {item.product.name} <span className="text-sienna">×{item.quantity}</span>
                      </span>
                      <span className="text-espresso font-normal">
                        {formatPrice(item.product.priceIDR * item.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-linen pt-3 space-y-2 mb-4">
                  <div className="flex justify-between text-[12px] font-light">
                    <span className="text-rosewood">Subtotal</span>
                    <span className="text-espresso">{formatPrice(totalIDR, currency)}</span>
                  </div>
                  <div className="flex justify-between text-[12px] font-light">
                    <span className="text-rosewood">Shipping</span>
                    <span className="text-espresso">{shipping === 0 ? 'Free' : formatIDR(shipping)}</span>
                  </div>
                </div>

                <div className="border-t border-linen pt-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[13px] font-normal text-espresso">Total</span>
                    <span className="text-espresso"
                      style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '20px' }}>
                      {formatPrice(grandTotal, currency)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase py-4 hover:bg-mahogany transition-colors"
                >
                  Place Order
                </button>
                <p className="text-[10px] font-light text-sienna text-center mt-3">
                  Payment via Xendit · SSL secured
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
