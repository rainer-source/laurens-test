export const runtime = 'edge'

import { dummyOrders } from '@/lib/orders'
import { formatIDR } from '@/lib/currency'
import { OrderStatus } from '@/types'
import Link from 'next/link'

// TODO: Replace with Supabase auth check + real orders query

const statusConfig: Record<OrderStatus, { label: string; classes: string }> = {
  processing: { label: 'Processing', classes: 'bg-petal text-espresso' },
  shipped:    { label: 'Shipped',    classes: 'bg-rosewood/15 text-rosewood' },
  delivered:  { label: 'Delivered',  classes: 'bg-espresso/10 text-espresso' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function OrdersPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="border-b border-linen px-6 lg:px-10 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="block w-6 h-px bg-sienna" />
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">Account</span>
          </div>
          <h1
            className="text-espresso"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Order <em>History</em>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10">
        {dummyOrders.length === 0 ? (
          <div className="text-center py-20">
            <p
              className="text-espresso mb-3"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '32px' }}
            >
              No orders yet
            </p>
            <p className="text-[13px] font-light text-sienna mb-8">
              Your order history will appear here.
            </p>
            <Link
              href="/catalog"
              className="bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase px-8 py-3.5 hover:bg-mahogany transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {dummyOrders.map((order) => {
              const { label, classes } = statusConfig[order.status]
              return (
                <div key={order.id} className="border border-linen bg-cream">
                  {/* Order header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-linen bg-blush/40 flex-wrap gap-3">
                    <div className="flex items-center gap-6 flex-wrap">
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-sienna mb-0.5">Order</p>
                        <p className="text-[13px] font-normal text-espresso">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-sienna mb-0.5">Date</p>
                        <p className="text-[13px] font-light text-espresso">{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-sienna mb-0.5">Total</p>
                        <p className="text-[13px] font-normal text-espresso">{formatIDR(order.totalIDR)}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] tracking-[0.2em] uppercase font-normal px-3 py-1.5 ${classes}`}>
                      {label}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="px-6 py-5 space-y-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[13px]">
                        <div className="flex items-center gap-3">
                          <span className="text-espresso font-light">{item.productName}</span>
                          <span className="text-[10px] tracking-[0.15em] text-sienna uppercase">
                            Size {item.size}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-sienna text-[11px]">×{item.quantity}</span>
                          )}
                        </div>
                        <span className="font-normal text-espresso">
                          {formatIDR(item.priceIDR * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping */}
                  <div className="border-t border-linen px-6 py-4 flex items-center justify-between flex-wrap gap-2">
                    <div className="text-[12px] font-light text-sienna">
                      Shipped to {order.shippingInfo.city}, {order.shippingInfo.province}
                    </div>
                    <Link
                      href="/catalog"
                      className="text-[9px] tracking-[0.2em] uppercase text-espresso border-b border-linen hover:border-espresso hover:text-mahogany transition-colors pb-0.5"
                    >
                      Buy Again →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
