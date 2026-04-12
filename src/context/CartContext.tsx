'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { CartState, CartAction, CartItem, Product, Size, Currency } from '@/types'

// ── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.size === size
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === product.id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { product, size, quantity: 1 }] }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.payload.productId && i.size === action.payload.size)
        ),
      }

    case 'UPDATE_QTY': {
      const { productId, size, quantity } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.size === size)
          ),
        }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === productId && i.size === size ? { ...i, quantity } : i
        ),
      }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    case 'SET_CURRENCY':
      return { ...state, currency: action.payload }

    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

interface CartContextValue extends CartState {
  addItem: (product: Product, size: Size) => void
  removeItem: (productId: string, size: Size) => void
  updateQty: (productId: string, size: Size, quantity: number) => void
  clearCart: () => void
  setCurrency: (currency: Currency) => void
  totalIDR: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'laurens-cart'

const initialState: CartState = { items: [], currency: 'IDR' }

// ── Provider ──────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    if (typeof window === 'undefined') return init
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as CartState) : init
    } catch {
      return init
    }
  })

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const totalIDR = state.items.reduce(
    (sum, i) => sum + i.product.priceIDR * i.quantity,
    0
  )

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  const value: CartContextValue = {
    ...state,
    addItem: (product, size) => dispatch({ type: 'ADD_ITEM', payload: { product, size } }),
    removeItem: (productId, size) => dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } }),
    updateQty: (productId, size, quantity) =>
      dispatch({ type: 'UPDATE_QTY', payload: { productId, size, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    setCurrency: (currency) => dispatch({ type: 'SET_CURRENCY', payload: currency }),
    totalIDR,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
