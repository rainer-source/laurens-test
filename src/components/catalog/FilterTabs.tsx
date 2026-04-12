'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const tabs = [
  { label: 'All', value: '' },
  { label: 'Tops', value: 'top' },
  { label: 'Dresses', value: 'dress' },
]

export default function FilterTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('category') ?? ''

  const setCategory = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }
    router.push(`/catalog?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-0 border border-linen">
      {tabs.map(({ label, value }) => (
        <button
          key={label}
          onClick={() => setCategory(value)}
          className={`px-8 py-3 text-[10px] font-normal tracking-[0.22em] uppercase transition-colors border-r border-linen last:border-r-0 ${
            current === value
              ? 'bg-espresso text-cream'
              : 'bg-cream text-rosewood hover:bg-blush'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
