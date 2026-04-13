'use client'

export const runtime = 'edge'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="bg-cream min-h-[calc(100vh-100px)] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-6 h-px bg-sienna" />
          <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
            Welcome back
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-espresso mb-10"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 48px)' }}
        >
          Sign <em>In</em>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-normal tracking-[0.2em] uppercase text-espresso mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-linen bg-transparent px-4 py-3 text-[13px] font-light text-espresso placeholder:text-clay/60 outline-none focus:border-rosewood transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-normal tracking-[0.2em] uppercase text-espresso mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-linen bg-transparent px-4 py-3 text-[13px] font-light text-espresso placeholder:text-clay/60 outline-none focus:border-rosewood transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[12px] font-light text-rosewood">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase py-4 hover:bg-mahogany transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-[12px] font-light text-sienna mt-8 text-center">
          Don&rsquo;t have an account?{' '}
          <Link href="/signup" className="text-espresso hover:text-mahogany transition-colors underline underline-offset-2">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
