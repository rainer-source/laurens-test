import type { Metadata } from 'next'
import { Cormorant, Dancing_Script, Jost } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dancing',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Lauren's Clothes — beauty in simplicity",
  description:
    "Timeless pieces crafted with care, designed for the modern woman. Discover the latest collections from Lauren's Clothes.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${dancing.variable} ${jost.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
