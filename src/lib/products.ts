import { supabase } from './supabase'
import { Product, Size, Category } from '@/types'

// ─── UI metadata not stored in the DB ────────────────────────────────────────
// gradient: CSS value used as the product image placeholder
// isNewArrival: controls the "New" badge on cards and the New Arrivals section

const GRADIENT_MAP: Record<string, string> = {
  'wony-blazer':  'linear-gradient(145deg, #F0E4DC 0%, #D9C9BF 40%, #A68272 100%)',
  'rafa-top':     'linear-gradient(145deg, #E8D5C8 0%, #C4A090 50%, #8B6F5E 100%)',
  'baifern-top':  'linear-gradient(145deg, #F9F0EB 0%, #E8D5C8 50%, #C4A090 100%)',
  'fortune-top':  'linear-gradient(145deg, #D9C9BF 0%, #A68272 45%, #6B4035 100%)',
  'kate-dress':   'linear-gradient(145deg, #EDD8CB 0%, #C4A090 45%, #8B6F5E 100%)',
  'leonor-dress': 'linear-gradient(145deg, #F0E4DC 0%, #D9C9BF 40%, #6B4035 100%)',
  'rafa-dress':   'linear-gradient(145deg, #C4A090 0%, #8B6F5E 50%, #4A2E22 100%)',
  'logan-dress':  'linear-gradient(145deg, #D9C9BF 0%, #8B6F5E 40%, #2C1610 100%)',
}

const DEFAULT_GRADIENT: Record<Category, string> = {
  top:   'linear-gradient(145deg, #F0E4DC 0%, #D9C9BF 40%, #A68272 100%)',
  dress: 'linear-gradient(145deg, #EDD8CB 0%, #C4A090 45%, #8B6F5E 100%)',
}

const NEW_ARRIVALS = new Set(['wony-blazer', 'rafa-top', 'kate-dress', 'leonor-dress'])

// ─── DB row shape ─────────────────────────────────────────────────────────────

interface ProductRow {
  id: string
  name: string
  category: 'top' | 'dress'
  price_idr: number
  description: string
  sizes: string[]
  stock: number
}

function fromRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Category,
    priceIDR: row.price_idr,
    description: row.description,
    sizes: (row.sizes ?? []) as Size[],
    gradient: GRADIENT_MAP[row.id] ?? DEFAULT_GRADIENT[row.category as Category],
    isNewArrival: NEW_ARRIVALS.has(row.id),
  }
}

const SELECT = 'id, name, category, price_idr, description, sizes, stock'

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(SELECT)
    .order('name')

  if (error) throw new Error(error.message)
  return (data as ProductRow[]).map(fromRow)
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(SELECT)
    .eq('category', category)
    .order('name')

  if (error) throw new Error(error.message)
  return (data as ProductRow[]).map(fromRow)
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(SELECT)
    .eq('id', id)
    .single()

  if (error) return null
  return fromRow(data as ProductRow)
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return []
  const { data, error } = await supabase
    .from('products')
    .select(SELECT)
    .in('id', ids)
    .order('name')

  if (error) throw new Error(error.message)
  return (data as ProductRow[]).map(fromRow)
}

export async function getNewArrivals(): Promise<Product[]> {
  const all = await getProducts()
  return all.filter((p) => p.isNewArrival)
}
