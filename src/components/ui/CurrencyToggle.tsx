'use client'

import { useCart } from '@/context/CartContext'

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCart()

  return (
    <div className="flex items-center border border-white/15 rounded-sm overflow-hidden text-[9px] tracking-widest uppercase">
      {(['IDR', 'USD'] as const).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-2.5 py-1 transition-colors font-normal ${
            currency === c
              ? 'bg-rosewood text-cream'
              : 'text-linen hover:text-cream'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
