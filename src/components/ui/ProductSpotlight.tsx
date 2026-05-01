'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  { src: '/sample2.png', name: 'Baifern Top',  side: 'right' as const, href: '/products/47ab678c-5132-4fbd-a40d-955dca6c24a5' },
  { src: '/sample3.png', name: 'Fortune Top',  side: 'left'  as const, href: '/products/85f5dd7f-9781-4226-9673-dd92b00a547f' },
  { src: '/sample4.png', name: 'Wony Blazer',  side: 'right' as const, href: '/products/7dc944bc-1213-403b-82c9-5dcc018b8fbd' },
  { src: '/sample5.png', name: 'Rafa Top',     side: 'left'  as const, href: '/products/610f8977-a1a0-4d8c-82c6-41c0ff360424' },
  { src: '/sample6.png', name: 'Rafa Dress',   side: 'right' as const, href: '/products/868fab79-b5d8-4edc-8859-49696c10bd88' },
]

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ProductSpotlight() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length)
  const next = () => setCurrent(i => (i + 1) % slides.length)

  // Restart 4s timer after every slide change (auto or manual)
  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % slides.length), 4000)
    return () => clearInterval(t)
  }, [current])

  const Dots = ({ className }: { className?: string }) => (
    <div className={`flex items-center justify-center gap-2 ${className ?? ''}`}>
      {slides.map((_, i) =>
        i === current ? (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="h-1.5 w-10 rounded-full bg-cream/20 overflow-hidden"
          >
            <div
              className="h-full bg-cream rounded-full"
              style={{ animation: 'spotlight-fill 4s linear forwards' }}
            />
          </button>
        ) : (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="w-1.5 h-1.5 rounded-full bg-cream/40 hover:bg-cream/70 transition-colors"
          />
        )
      )}
    </div>
  )

  return (
    <section className="bg-espresso">
      <style>{`
        @keyframes spotlight-fill {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
      {/* Section label */}
      <div className="px-6 lg:px-10 pt-16 pb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="block w-6 h-px bg-sienna" />
          <span className="text-[9px] font-normal tracking-[0.4em] uppercase text-sienna">
            The Spotlight
          </span>
        </div>
        <h2
          className="text-cream"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 3vw, 48px)' }}
        >
          Featured <em>Pieces</em>
        </h2>
      </div>

      {/* ── MOBILE (below md) ── */}
      <div className="md:hidden relative overflow-hidden">
        {/* Sliding track — all slides in a flex row, translated to show current */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map(slide => (
            <div key={slide.src} className="flex-none w-full flex flex-col">
              {/* Portrait image — full figure, no cropping */}
              <div className="w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Name and CTA below the image */}
              <div className="py-7 text-center flex flex-col items-center gap-4">
                <p
                  className="text-cream text-3xl"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
                >
                  {slide.name}
                </p>
                <Link
                  href={slide.href}
                  className="text-[10px] font-normal tracking-[0.22em] uppercase text-cream border-b border-cream/40 pb-0.5 hover:text-petal hover:border-petal transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows — large touch targets, overlaid on the image area */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 top-[35%] -translate-y-1/2 w-14 h-14 flex items-center justify-center text-[#3D1F0F] hover:text-mahogany transition-colors"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 top-[35%] -translate-y-1/2 w-14 h-14 flex items-center justify-center text-[#3D1F0F] hover:text-mahogany transition-colors"
        >
          <ChevronRight />
        </button>

        <Dots className="pb-8 pt-2" />
      </div>

      {/* ── DESKTOP (md and above) ── */}
      <div className="hidden md:block relative overflow-hidden" style={{ minHeight: '90vh' }}>
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(${(i - current) * 100}%)` }}
          >
            {/* Left column — 60% image */}
            <div className="relative h-full" style={{ width: '60%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
              />
              {/* Left arrow — far left edge of image */}
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[#3D1F0F] hover:text-mahogany transition-colors"
              >
                <ChevronLeft />
              </button>
            </div>

            {/* Right arrow — far right edge of the entire slide */}
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[#3D1F0F] hover:text-mahogany transition-colors z-10"
            >
              <ChevronRight />
            </button>

            {/* Right column — 40% content card */}
            <div
              className="h-full flex flex-col items-center justify-center gap-8 px-12"
              style={{ width: '40%', background: '#F5EFE8' }}
            >
              {/* Logo thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.jpg"
                alt="Lauren's Clothes"
                style={{ width: 180, height: 180, objectFit: 'contain' }}
              />

              {/* Product name */}
              <p
                className="text-espresso text-center leading-tight"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(32px, 3vw, 52px)' }}
              >
                {slide.name}
              </p>

              {/* Shop Now */}
              <Link
                href={slide.href}
                className="bg-espresso text-cream text-[10px] font-normal tracking-[0.22em] uppercase px-10 py-4 hover:bg-mahogany transition-colors"
              >
                Shop Now
              </Link>

              {/* Dot indicators */}
              <div className="flex items-center gap-2 mt-4">
                {slides.map((_, j) =>
                  j === current ? (
                    <button
                      key={j}
                      onClick={() => setCurrent(j)}
                      aria-label={`Slide ${j + 1}`}
                      className="h-1.5 w-10 rounded-full overflow-hidden bg-espresso/15"
                    >
                      <div
                        className="h-full bg-espresso rounded-full"
                        style={{ animation: 'spotlight-fill 4s linear forwards' }}
                      />
                    </button>
                  ) : (
                    <button
                      key={j}
                      onClick={() => setCurrent(j)}
                      aria-label={`Go to slide ${j + 1}`}
                      className="w-1.5 h-1.5 rounded-full bg-espresso/25 hover:bg-espresso/50 transition-colors"
                    />
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
