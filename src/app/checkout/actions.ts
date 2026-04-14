'use server'

interface OrderItem {
  productId: string
  productName: string
  size: string
  quantity: number
  priceIDR: number
}

interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
}

export interface CreateOrderPayload {
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: ShippingAddress
  items: OrderItem[]
  total_idr: number
}

/**
 * Inserts a pending order using the service role key — bypasses RLS so guest
 * checkout works without requiring the user to be logged in.
 * The service role key stays server-side and is never exposed to the browser.
 *
 * Flow:
 *   1. INSERT into orders → get back the new order id
 *   2. INSERT each cart item into order_items with that order_id
 */
export async function createOrder(payload: CreateOrderPayload): Promise<{ id: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    throw new Error('Supabase environment variables are not configured.')
  }

  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  }

  // 1. Insert the order row (no items column)
  const orderRes = await fetch(`${supabaseUrl}/rest/v1/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      status: 'pending',
      customer_name: payload.customer_name,
      customer_email: payload.customer_email,
      customer_phone: payload.customer_phone,
      shipping_address: payload.shipping_address,
      total_idr: payload.total_idr,
    }),
  })

  if (!orderRes.ok) {
    const detail = await orderRes.text()
    throw new Error(`Failed to save order: ${detail}`)
  }

  const orderRows = (await orderRes.json()) as { id: string }[]
  if (!orderRows.length) throw new Error('Order was not returned by database.')
  const orderId = orderRows[0].id

  // 2. Insert each cart item into order_items
  const orderItems = payload.items.map(item => ({
    order_id: orderId,
    product_id: item.productId,
    size: item.size,
    quantity: item.quantity,
    price_idr: item.priceIDR,
  }))

  const itemsRes = await fetch(`${supabaseUrl}/rest/v1/order_items`, {
    method: 'POST',
    headers,
    body: JSON.stringify(orderItems),
  })

  if (!itemsRes.ok) {
    const detail = await itemsRes.text()
    throw new Error(`Failed to save order items: ${detail}`)
  }

  return { id: orderId }
}
