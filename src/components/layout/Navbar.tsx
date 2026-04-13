'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import CurrencyToggle from '@/components/ui/CurrencyToggle'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const SearchOverlay = dynamic(() => import('@/components/ui/SearchOverlay'), { ssr: false })

const navLinks = [
  { label: 'Collections', href: '/catalog' },
  { label: 'Tops', href: '/catalog?category=top' },
  { label: 'Dresses', href: '/catalog?category=dress' },
  { label: 'About', href: '/#about' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount } = useCart()
  const { user, ready, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <>
    {searchOpen && <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />}
    <header className="sticky top-0 z-50 bg-bark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className="text-cream text-[19px] tracking-[0.04em]"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
          >
            Lauren&rsquo;s Clothes
          </span>
          <span
            className="text-sienna text-[11px]"
            style={{ fontFamily: 'var(--font-dancing)' }}
          >
            beauty in simplicity
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[10px] font-normal tracking-[0.22em] uppercase text-linen hover:text-cream transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <CurrencyToggle />

          {/* Auth — desktop */}
          {ready && (
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-[10px] font-normal tracking-[0.1em] text-linen/70 max-w-[140px] truncate">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-[10px] font-normal tracking-[0.22em] uppercase text-linen hover:text-cream transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-[10px] font-normal tracking-[0.22em] uppercase text-linen hover:text-cream transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="text-[10px] font-normal tracking-[0.22em] uppercase text-cream border border-white/20 px-4 py-1.5 hover:bg-white/10 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="text-linen hover:text-cream transition-colors"
            aria-label="Wishlist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.4} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </Link>

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="text-linen hover:text-cream transition-colors"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.4} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 15.803a7.5 7.5 0 0 0 10.607 0Z" />
            </svg>
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative text-linen hover:text-cream transition-colors"
            aria-label={`Cart — ${mounted ? itemCount : 0} items`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              strokeWidth={1.4} stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
            </svg>
            {mounted && itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rosewood text-cream text-[8px] font-normal w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-linen hover:text-cream transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-bark border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[10px] font-normal tracking-[0.22em] uppercase text-linen hover:text-cream transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}

          {/* Auth — mobile */}
          {ready && (
            <>
              <div className="h-px bg-white/5 -mx-6" />
              {user ? (
                <>
                  <span className="text-[10px] font-normal tracking-[0.1em] text-linen/50 truncate">
                    {user.email}
                  </span>
                  <button
                    onClick={() => { setMobileOpen(false); handleSignOut() }}
                    className="text-left text-[10px] font-normal tracking-[0.22em] uppercase text-linen hover:text-cream transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-[10px] font-normal tracking-[0.22em] uppercase text-linen hover:text-cream transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="text-[10px] font-normal tracking-[0.22em] uppercase text-linen hover:text-cream transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      )}
    </header>
    </>
  )
}
