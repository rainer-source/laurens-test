import Link from 'next/link'

const shopLinks = [
  { label: 'New Arrivals', href: '/catalog' },
  { label: 'Tops', href: '/catalog?category=top' },
  { label: 'Dresses', href: '/catalog?category=dress' },
  { label: 'Sale', href: '/catalog' },
]

const infoLinks = [
  { label: 'Our Story', href: '/#about' },
  { label: 'Sustainability', href: '/' },
  { label: 'Size Guide', href: '/' },
  { label: 'Press', href: '/' },
]

const helpLinks = [
  { label: 'Shipping & Returns', href: '/' },
  { label: 'FAQs', href: '/' },
  { label: 'Contact Us', href: '/' },
  { label: 'Care Guide', href: '/' },
]

export default function Footer() {
  return (
    <footer className="bg-bark text-clay">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <p
              className="text-cream text-2xl tracking-[0.03em] mb-1"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
            >
              Lauren&rsquo;s Clothes
            </p>
            <p
              className="text-sienna text-[14px] mb-5"
              style={{ fontFamily: 'var(--font-dancing)' }}
            >
              beauty in simplicity
            </p>
            <p className="text-[13px] font-light leading-relaxed text-clay/80 max-w-[240px]">
              Timeless pieces designed for the modern woman — crafted with care, worn with love.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-linen mb-5">Shop</p>
            <ul className="space-y-3">
              {shopLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] font-light text-clay/80 hover:text-cream transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-linen mb-5">About</p>
            <ul className="space-y-3">
              {infoLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] font-light text-clay/80 hover:text-cream transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-linen mb-5">Help</p>
            <ul className="space-y-3">
              {helpLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] font-light text-clay/80 hover:text-cream transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-sienna/60">
            &copy; {new Date().getFullYear()} Lauren&rsquo;s Clothes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Instagram', 'Pinterest', 'TikTok'].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[10px] tracking-[0.15em] uppercase text-clay/60 hover:text-cream transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
