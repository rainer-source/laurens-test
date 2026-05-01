/**
 * Zero-dependency Supabase REST client for the edge worker / server side.
 * Uses native fetch + PostgREST HTTP API — no @supabase/supabase-js import.
 * This keeps the heavy GoTrueClient/realtime-js/storage-js out of the edge bundle.
 */

const BASE = () => `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1`

const HEADERS = () => {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
}

type FilterOp = 'eq' | 'in' | 'ilike'

interface Filter {
  col: string
  op: FilterOp
  val: string | string[]
}

interface SelectOpts {
  select?: string
  filters?: Filter[]
  order?: string
  limit?: number
}

function buildQuery(opts: SelectOpts): string {
  const params = new URLSearchParams()

  if (opts.select) params.set('select', opts.select)

  for (const f of opts.filters ?? []) {
    if (f.op === 'in') {
      params.set(f.col, `in.(${(f.val as string[]).join(',')})`)
    } else if (f.op === 'ilike') {
      params.set(f.col, `ilike.${f.val}`)
    } else {
      params.set(f.col, `eq.${f.val}`)
    }
  }

  if (opts.order) params.set('order', opts.order)
  if (opts.limit != null) params.set('limit', String(opts.limit))

  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export async function pgSelect<T>(table: string, opts: SelectOpts = {}): Promise<T[]> {
  const res = await fetch(`${BASE()}/${table}${buildQuery(opts)}`, {
    headers: HEADERS(),
    // Next.js edge cache: no-store keeps data fresh (products can change)
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`pgSelect ${table}: ${res.status} ${await res.text()}`)
  return res.json() as Promise<T[]>
}

export async function pgSelectOne<T>(table: string, opts: SelectOpts = {}): Promise<T | null> {
  const res = await fetch(`${BASE()}/${table}${buildQuery(opts)}`, {
    headers: {
      ...HEADERS(),
      // PostgREST returns a single object (not array) with this header
      Accept: 'application/vnd.pgrst.object+json',
    },
    cache: 'no-store',
  })
  if (res.status === 406 || res.status === 404) return null
  if (!res.ok) throw new Error(`pgSelectOne ${table}: ${res.status} ${await res.text()}`)
  return res.json() as Promise<T>
}
