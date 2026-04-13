'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useWishlist } from '@/context/WishlistContext'

interface Props {
  productId: string
}

export default function WishlistButton({ productId }: Props) {
  const router = useRouter()
  const { user } = useAuth()
  const { ids, toggle } = useWishlist()
  const wishlisted = ids.has(productId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) { router.push('/login'); return }
    toggle(productId)
  }

  return (
    <button
      onClick={handleClick}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
      className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center bg-cream/80 hover:bg-cream transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={wishlisted ? '#8B6F5E' : '#A68272'}
        fill={wishlisted ? '#8B6F5E' : 'none'}
        className="w-4 h-4 transition-colors duration-200"
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </button>
  )
}
