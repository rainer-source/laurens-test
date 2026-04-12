import { Product, Size } from '@/types'

const ALL_SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const DRESS_SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL']

export const products: Product[] = [
  // ── TOPS ──────────────────────────────────────────────────
  {
    id: 'wony-blazer',
    name: 'Wony Blazer',
    category: 'top',
    priceIDR: 459000,
    sizes: ALL_SIZES,
    description:
      'A structured blazer with soft shoulders and a relaxed, modern silhouette. Crafted in a lightweight blended fabric that drapes beautifully — perfect for the office or an elevated casual look.',
    gradient: 'linear-gradient(145deg, #F0E4DC 0%, #D9C9BF 40%, #A68272 100%)',
    isNewArrival: true,
  },
  {
    id: 'rafa-top',
    name: 'Rafa Top',
    category: 'top',
    priceIDR: 299000,
    sizes: ALL_SIZES,
    description:
      'A feminine wrap top with delicate tie detailing at the waist. The flowing fabric skims the body gracefully, making it an effortless piece for both day and evening.',
    gradient: 'linear-gradient(145deg, #E8D5C8 0%, #C4A090 50%, #8B6F5E 100%)',
    isNewArrival: true,
  },
  {
    id: 'baifern-top',
    name: 'Baifern Top',
    category: 'top',
    priceIDR: 359000,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'A relaxed linen-blend top with subtle pintuck detailing along the front. Lightweight and breathable — made for warm days and effortless styling.',
    gradient: 'linear-gradient(145deg, #F9F0EB 0%, #E8D5C8 50%, #C4A090 100%)',
    isNewArrival: false,
  },
  {
    id: 'fortune-top',
    name: 'Fortune Top',
    category: 'top',
    priceIDR: 389000,
    sizes: ALL_SIZES,
    description:
      'A timeless classic-collar top in a soft, structured fabric. Clean lines and a refined fit make this piece a wardrobe staple that works across every occasion.',
    gradient: 'linear-gradient(145deg, #D9C9BF 0%, #A68272 45%, #6B4035 100%)',
    isNewArrival: false,
  },

  // ── DRESSES ───────────────────────────────────────────────
  {
    id: 'kate-dress',
    name: 'Kate Dress',
    category: 'dress',
    priceIDR: 589000,
    sizes: DRESS_SIZES,
    description:
      'An elegant midi dress with a subtle A-line silhouette. The clean lines and soft drape create an effortlessly polished look — dressed up for evening or down for a weekend brunch.',
    gradient: 'linear-gradient(145deg, #EDD8CB 0%, #C4A090 45%, #8B6F5E 100%)',
    isNewArrival: true,
  },
  {
    id: 'leonor-dress',
    name: 'Leonor Dress',
    category: 'dress',
    priceIDR: 689000,
    sizes: DRESS_SIZES,
    description:
      'A flowing maxi dress with a softly gathered waist and wide sleeves. Romantic and refined — this is the piece you reach for on your most special days.',
    gradient: 'linear-gradient(145deg, #F0E4DC 0%, #D9C9BF 40%, #6B4035 100%)',
    isNewArrival: true,
  },
  {
    id: 'rafa-dress',
    name: 'Rafa Dress',
    category: 'dress',
    priceIDR: 629000,
    sizes: DRESS_SIZES,
    description:
      'A modern wrap dress with a flattering V-neckline and graceful wrap silhouette. Versatile and feminine — worn as is or layered with a blazer for the office.',
    gradient: 'linear-gradient(145deg, #C4A090 0%, #8B6F5E 50%, #4A2E22 100%)',
    isNewArrival: false,
  },
  {
    id: 'logan-dress',
    name: 'Logan Dress',
    category: 'dress',
    priceIDR: 789000,
    sizes: DRESS_SIZES,
    description:
      'A sculptural fit-and-flare dress with structured seaming that creates a beautiful, defined waist. Our most formal piece — made for evenings you want to remember.',
    gradient: 'linear-gradient(145deg, #D9C9BF 0%, #8B6F5E 40%, #2C1610 100%)',
    isNewArrival: false,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: 'top' | 'dress'): Product[] {
  return products.filter((p) => p.category === category)
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNewArrival)
}
