export const runtime = 'edge'

import Link from 'next/link'
import Image from 'next/image'
import { getNewArrivals } from '@/lib/products'
import ProductCard from '@/components/ui/ProductCard'

export default async function HomePage() {
  const newArrivals = await getNewArrivals()

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-100px)] grid grid-cols-1 lg:grid-cols-2">
        {/* Content */}
        <div className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24 bg-cream">
          <div className="flex items-center gap-3 mb-7">
            <span className="block w-6 h-px bg-sienna" />
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
              New Arrivals — Spring 2025
            </span>
          </div>
          <h1
            className="text-espresso leading-[1.08] mb-3"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(52px, 6vw, 84px)',
            }}
          >
            Dressed for<br />
            <em>every moment</em>
          </h1>
          <p
            className="text-sienna mb-8"
            style={{ fontFamily: 'var(--font-dancing)', fontSize: '22px' }}
          >
            beauty in simplicity
          </p>
          <p className="text-[14px] font-light leading-[1.85] text-rosewood max-w-[360px] mb-12">
            Timeless pieces crafted with care — designed for the modern woman who
            finds elegance in the everyday. From morning light to evening out.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <Link
              href="/catalog"
              className="bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase px-10 py-4 hover:bg-mahogany transition-colors"
            >
              Explore Collections
            </Link>
            <Link
              href="/catalog"
              className="text-[10px] font-normal tracking-[0.22em] uppercase text-espresso border-b border-linen pb-0.5 hover:text-mahogany hover:border-mahogany transition-colors"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Visual */}
        <div
          className="relative min-h-[400px] lg:min-h-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(145deg, #F0E4DC 0%, #E8D5C8 45%, #D9C9BF 100%)' }}
        >
          <div className="relative z-10 text-center p-10">
            <Image
              src="/logo.jpg"
              alt="Lauren's Clothes"
              width={340}
              height={340}
              className="w-[min(320px,80%)] mx-auto drop-shadow-md"
              priority
            />
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden lg:flex">
            <span className="text-[8px] tracking-[0.3em] uppercase text-sienna">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-sienna to-transparent" />
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────── */}
      <section className="bg-cream px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="block w-6 h-px bg-sienna" />
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
              Curated for you
            </span>
          </div>
          <h2
            className="text-espresso mb-3"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 3vw, 48px)' }}
          >
            Shop by <em>Collection</em>
          </h2>
          <p className="text-[14px] font-light text-rosewood max-w-[440px] leading-relaxed mb-12">
            Each collection tells a story — pieces that move with you through every season of life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                href: '/catalog?category=top',
                gradient: 'linear-gradient(155deg, #EDD8CB 0%, #C4A090 45%, #8B6F5E 100%)',
                season: 'Everyday',
                name: <>The <em>Tops</em></>,
                count: '4 pieces',
              },
              {
                href: '/catalog?category=dress',
                gradient: 'linear-gradient(155deg, #F0E4DC 0%, #D9C9BF 45%, #A68272 100%)',
                season: 'Occasion & Everyday',
                name: <>The <em>Dresses</em></>,
                count: '4 pieces',
              },
              {
                href: '/catalog',
                gradient: 'linear-gradient(155deg, #D9C9BF 0%, #A68272 45%, #6B4035 100%)',
                season: 'Spring 2025',
                name: <><em>New</em> Arrivals</>,
                count: '8 pieces',
              },
            ].map(({ href, gradient, season, name, count }) => (
              <Link key={href} href={href} className="group relative overflow-hidden aspect-[3/4]">
                <div
                  className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ background: gradient }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bark/85 via-bark/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-[9px] tracking-[0.28em] uppercase text-petal mb-2">{season}</p>
                  <p
                    className="text-cream leading-tight mb-1.5"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '28px' }}
                  >
                    {name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-clay">{count}</span>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-petal border-b border-sienna pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      Shop now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ────────────────────────────────── */}
      <div className="border-y border-linen bg-blush">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {[
            { icon: '✦', title: 'Free Shipping', desc: 'On orders over Rp 500.000' },
            { icon: '◇', title: 'Easy Returns', desc: '30-day hassle-free returns' },
            { icon: '○', title: 'Sustainably Made', desc: 'Ethically sourced fabrics' },
            { icon: '△', title: 'Tailored Fit', desc: 'Sizes XS to XXL' },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className={`flex flex-col items-center text-center px-6 py-10 ${i < 3 ? 'border-r border-linen' : ''}`}
            >
              <span className="text-sienna text-xl mb-4">{icon}</span>
              <p
                className="text-espresso mb-1.5"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '17px' }}
              >
                {title}
              </p>
              <p className="text-[12px] font-light text-sienna leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── NEW ARRIVALS ───────────────────────────────────── */}
      <section className="bg-cream px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="block w-6 h-px bg-sienna" />
                <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
                  Just arrived
                </span>
              </div>
              <h2
                className="text-espresso"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 3vw, 48px)' }}
              >
                New <em>Arrivals</em>
              </h2>
            </div>
            <Link
              href="/catalog"
              className="hidden sm:block text-[10px] font-normal tracking-[0.2em] uppercase text-espresso border-b border-linen pb-0.5 hover:text-mahogany hover:border-mahogany transition-colors mb-1.5"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ───────────────────────────────────── */}
      <section id="about" className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="flex items-center justify-center px-10 py-20"
          style={{ background: 'linear-gradient(135deg, #4A2E22, #6B4035, #2C1610)' }}
        >
          <div className="text-center">
            <p
              className="text-petal leading-snug"
              style={{ fontFamily: 'var(--font-dancing)', fontSize: '52px' }}
            >
              beauty in<br />simplicity
            </p>
            <div className="w-12 h-px bg-mahogany mx-auto my-6" />
            <p className="text-[9px] tracking-[0.3em] uppercase text-sienna">
              Lauren&rsquo;s Clothes
            </p>
          </div>
        </div>
        <div className="bg-espresso flex flex-col justify-center px-10 py-20 lg:px-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-6 h-px bg-sienna" />
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
              Our Story
            </span>
          </div>
          <h2
            className="text-cream mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(28px, 3vw, 44px)' }}
          >
            Made with <em>intention</em>,<br />worn with love
          </h2>
          <p className="text-[14px] font-light text-clay/80 leading-[1.9] mb-10">
            Lauren&rsquo;s Clothes was born from a belief that getting dressed should feel
            effortless and joyful. We design pieces that are beautiful in their simplicity —
            garments that move with you, last through seasons, and make you feel like yourself.
            <br /><br />
            Every fabric chosen with care. Every seam finished with intention. Because you
            deserve clothes made as thoughtfully as the life you lead.
          </p>
          <Link
            href="/catalog"
            className="inline-block self-start border border-white/20 text-cream text-[10px] font-normal tracking-[0.22em] uppercase px-9 py-3.5 hover:bg-cream hover:text-espresso transition-colors"
          >
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="bg-blush px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="block w-6 h-px bg-sienna" />
              <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
                What our customers say
              </span>
              <span className="block w-6 h-px bg-sienna" />
            </div>
            <h2
              className="text-espresso"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 3vw, 48px)' }}
            >
              Loved by <em>women</em> everywhere
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { quote: '"I bought the Kate Dress for a garden party and received so many compliments. The quality is stunning — luxurious but effortlessly casual."', name: 'Sophie M.', detail: 'Kate Dress' },
              { quote: '"Lauren\'s has changed how I think about my wardrobe. I invest in fewer, better pieces now — and every single one gets worn constantly."', name: 'Amelia R.', detail: 'Wony Blazer' },
              { quote: '"The Fortune Top is my absolute favourite. It drapes beautifully and the fit is perfect. I\'ve already ordered two more in different colours!"', name: 'Claire T.', detail: 'Fortune Top' },
            ].map(({ quote, name, detail }) => (
              <div key={name} className="bg-cream border border-linen p-9">
                <p className="text-sienna text-xs tracking-[0.3em] mb-6">★★★★★</p>
                <p
                  className="text-espresso leading-relaxed mb-7"
                  style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300, fontSize: '17px' }}
                >
                  {quote}
                </p>
                <div className="w-7 h-px bg-linen mb-4" />
                <p className="text-[10px] tracking-[0.2em] uppercase font-normal text-rosewood">{name}</p>
                <p className="text-[11px] text-sienna mt-0.5">Verified buyer · {detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <section className="bg-cream px-6 py-20 border-t border-linen text-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-6 h-px bg-sienna" />
            <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
              Stay in the loop
            </span>
            <span className="block w-6 h-px bg-sienna" />
          </div>
          <h2
            className="text-espresso mb-2"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(28px, 3vw, 42px)' }}
          >
            Join the Lauren&rsquo;s Clothes <em>world</em>
          </h2>
          <p
            className="text-sienna mb-6"
            style={{ fontFamily: 'var(--font-dancing)', fontSize: '20px' }}
          >
            new arrivals, styling notes &amp; a little beauty
          </p>
          <p className="text-[13px] font-light text-rosewood leading-relaxed mb-10">
            Be the first to know about new collections, exclusive offers, and
            thoughtful notes on style.
          </p>
          <div className="flex border border-linen">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent px-5 py-4 text-[13px] font-light text-espresso placeholder:text-clay outline-none"
            />
            <button className="bg-espresso text-cream text-[9px] font-normal tracking-[0.22em] uppercase px-6 hover:bg-mahogany transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-[11px] text-sienna mt-4">No spam, ever. Unsubscribe any time.</p>
        </div>
      </section>
    </>
  )
}
