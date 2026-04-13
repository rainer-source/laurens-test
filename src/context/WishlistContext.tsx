'use client'

// Requires a `wishlist` table in Supabase:
//
//   create table wishlist (
//     id         uuid default gen_random_uuid() primary key,
//     user_id    uuid references auth.users not null,
//     product_id text not null,
//     created_at timestamptz default now(),
//     unique(user_id, product_id)
//   );
//   alter table wishlist enable row level security;
//   create policy "Users manage own wishlist"
//     on wishlist for all using (auth.uid() = user_id);

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthContext'

interface WishlistContextValue {
  ids: Set<string>
  toggle: (productId: string) => Promise<void>
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [ids, setIds] = useState<Set<string>>(new Set())

  // Sync from Supabase whenever the user changes
  useEffect(() => {
    if (!user) { setIds(new Set()); return }

    supabase
      .from('wishlist')
      .select('product_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setIds(new Set((data ?? []).map((r: { product_id: string }) => r.product_id)))
      })
  }, [user])

  const toggle = useCallback(async (productId: string) => {
    if (!user) return

    if (ids.has(productId)) {
      setIds((prev) => { const next = new Set(prev); next.delete(productId); return next })
      await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)
    } else {
      setIds((prev) => new Set([...prev, productId]))
      await supabase
        .from('wishlist')
        .insert({ user_id: user.id, product_id: productId })
    }
  }, [user, ids])

  return (
    <WishlistContext.Provider value={{ ids, toggle }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
