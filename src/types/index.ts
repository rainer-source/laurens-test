export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export type Category = 'top' | 'dress'

export type Currency = 'IDR' | 'USD'

export interface Product {
  id: string
  name: string
  category: Category
  priceIDR: number
  sizes: Size[]
  description: string
  gradient: string   // CSS gradient value for placeholder image
  isNewArrival: boolean
}

export interface CartItem {
  product: Product
  size: Size
  quantity: number
}

export interface CartState {
  items: CartItem[]
  currency: Currency
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: Size } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: Size } }
  | { type: 'UPDATE_QTY'; payload: { productId: string; size: Size; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CURRENCY'; payload: Currency }

export interface ShippingInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
}

export type OrderStatus = 'processing' | 'shipped' | 'delivered'

export interface OrderItem {
  productId: string
  productName: string
  size: Size
  quantity: number
  priceIDR: number
}

export interface Order {
  id: string
  createdAt: string
  items: OrderItem[]
  status: OrderStatus
  totalIDR: number
  shippingInfo: ShippingInfo
}
