import { Order } from '@/types'

export const dummyOrders: Order[] = [
  {
    id: 'LC-240401-001',
    createdAt: '2024-04-01T10:30:00Z',
    status: 'delivered',
    totalIDR: 1078000,
    shippingInfo: {
      fullName: 'Anisa Putri',
      email: 'anisa@email.com',
      phone: '081234567890',
      address: 'Jl. Kemang Raya No. 12',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12730',
    },
    items: [
      { productId: 'kate-dress', productName: 'Kate Dress', size: 'S', quantity: 1, priceIDR: 589000 },
      { productId: 'rafa-top', productName: 'Rafa Top', size: 'S', quantity: 1, priceIDR: 299000 },
      { productId: 'baifern-top', productName: 'Baifern Top', size: 'M', quantity: 1, priceIDR: 359000 },
    ],
  },
  {
    id: 'LC-240310-002',
    createdAt: '2024-03-10T14:15:00Z',
    status: 'delivered',
    totalIDR: 689000,
    shippingInfo: {
      fullName: 'Anisa Putri',
      email: 'anisa@email.com',
      phone: '081234567890',
      address: 'Jl. Kemang Raya No. 12',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12730',
    },
    items: [
      { productId: 'leonor-dress', productName: 'Leonor Dress', size: 'M', quantity: 1, priceIDR: 689000 },
    ],
  },
  {
    id: 'LC-240408-003',
    createdAt: '2024-04-08T09:00:00Z',
    status: 'shipped',
    totalIDR: 848000,
    shippingInfo: {
      fullName: 'Anisa Putri',
      email: 'anisa@email.com',
      phone: '081234567890',
      address: 'Jl. Kemang Raya No. 12',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12730',
    },
    items: [
      { productId: 'wony-blazer', productName: 'Wony Blazer', size: 'M', quantity: 1, priceIDR: 459000 },
      { productId: 'fortune-top', productName: 'Fortune Top', size: 'M', quantity: 1, priceIDR: 389000 },
    ],
  },
  {
    id: 'LC-240411-004',
    createdAt: '2024-04-11T16:45:00Z',
    status: 'processing',
    totalIDR: 789000,
    shippingInfo: {
      fullName: 'Anisa Putri',
      email: 'anisa@email.com',
      phone: '081234567890',
      address: 'Jl. Kemang Raya No. 12',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12730',
    },
    items: [
      { productId: 'logan-dress', productName: 'Logan Dress', size: 'S', quantity: 1, priceIDR: 789000 },
    ],
  },
]
