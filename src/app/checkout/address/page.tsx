'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatIDR } from '@/lib/currency'
import { createOrder } from '@/app/checkout/actions'
import { ShippingInfo } from '@/types'

const PROVINCES = [
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur',
  'Banten', 'Bali', 'Sumatera Utara', 'Sumatera Selatan',
  'Kalimantan Timur', 'Sulawesi Selatan', 'Yogyakarta',
]

export default function CheckoutAddressPage() {
  const router = useRouter()
  const { items, totalIDR, clearCart } = useCart()
  const [form, setForm] = useState<ShippingInfo>({
    fullName: '', email: '', phone: '', address: '',
    city: '', province: '', postalCode: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shipping = totalIDR >= 500000 ? 0 : 25000
  const grandTotal = totalIDR + shipping

  const update = (field: keyof ShippingInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const orderItems = items.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        size: i.size,
        quantity: i.quantity,
        priceIDR: i.product.priceIDR,
      }))

      const shippingAddress = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        province: form.province,
        postalCode: form.postalCode,
      }

      // Server action — uses service role key server-side, bypasses RLS
      const order = await createOrder({
        customer_name: form.fullName,
        customer_email: form.email,
        customer_phone: form.phone,
        shipping_address: shippingAddress,
        items: orderItems,
        total_idr: grandTotal,
      })

      sessionStorage.setItem('laurens-pending-order', JSON.stringify({
        orderId: order.id,
        items: orderItems,
        shippingAddress,
        totalIDR: grandTotal,
        shippingFee: shipping,
      }))

      clearCart()
      router.push('/checkout/payment')
    } catch (err: unknown) {
      const message = (err as { message?: string })?.message ?? 'Something went wrong. Please try again.'
      setError(message)
      setLoading(false)
    }
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
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">Checkout · Step 1 of 2</span>
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

              {error && (
                <div className="border border-rosewood bg-blush p-4">
                  <p className="text-[12px] font-light text-rosewood">{error}</p>
                </div>
              )}
            </div>

            {/* Summary sidebar */}
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
                        {formatIDR(item.product.priceIDR * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-linen pt-3 space-y-2 mb-4">
                  <div className="flex justify-between text-[12px] font-light">
                    <span className="text-rosewood">Subtotal</span>
                    <span className="text-espresso">{formatIDR(totalIDR)}</span>
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
                      {formatIDR(grandTotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase py-4 hover:bg-mahogany transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving order...' : 'Continue to Payment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
