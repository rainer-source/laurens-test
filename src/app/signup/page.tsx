'use client'

export const runtime = 'edge'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="bg-cream min-h-[calc(100vh-100px)] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-14 h-14 rounded-full border border-linen flex items-center justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-rosewood">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <p
          className="text-espresso mb-3"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '40px' }}
        >
          Check your email
        </p>
        <p className="text-[13px] font-light text-sienna mb-10 max-w-sm">
          We&rsquo;ve sent a confirmation link to <span className="text-espresso">{email}</span>.
          Click it to activate your account.
        </p>
        <Link
          href="/login"
          className="text-[10px] font-normal tracking-[0.22em] uppercase text-espresso border-b border-linen pb-0.5 hover:text-mahogany hover:border-mahogany transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-[calc(100vh-100px)] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-6 h-px bg-sienna" />
          <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
            Join Lauren&rsquo;s Clothes
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-espresso mb-10"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 48px)' }}
        >
          Create <em>Account</em>
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
              minLength={6}
              autoComplete="new-password"
              className="w-full border border-linen bg-transparent px-4 py-3 text-[13px] font-light text-espresso placeholder:text-clay/60 outline-none focus:border-rosewood transition-colors"
              placeholder="••••••••"
            />
            <p className="text-[11px] font-light text-sienna mt-1.5">Minimum 6 characters</p>
          </div>

          {error && (
            <p className="text-[12px] font-light text-rosewood">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase py-4 hover:bg-mahogany transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-[12px] font-light text-sienna mt-8 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-espresso hover:text-mahogany transition-colors underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
