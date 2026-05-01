'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  { src: '/new1.png', name: 'Leonor Dress', href: '/products/dc9b3c0c-44d1-445d-a964-740bee5a61be' },
  { src: '/new2.png', name: 'Logan Dress',  href: '/products/454caaab-a692-48fa-9b6d-c7acc078fc0b' },
]

export default function NewArrivalsBanner() {
  const [current, setCurrent] = useState(0)

  // Restart 4s timer on every slide change (auto or manual dot click)
  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % slides.length), 4000)
    return () => clearInterval(t)
  }, [current])

  return (
    <div className="mb-10">
      <div className="relative overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            // Slide 0: relative (in-flow, height setter). Slide 1: absolute (out of flow).
            className={i === 0 ? 'relative w-full' : 'absolute top-0 left-0 w-full'}
            style={{ transform: `translateY(${(i - current) * 100}%)`, transition: 'transform 0.8s ease' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.name}
              style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
            />
            {/* Text overlay — right side of image */}
            <div className="absolute inset-0 flex items-center justify-end">
              <div className="pr-8 lg:pr-16 flex flex-col gap-4 items-end text-right">
                <p
                  className="text-espresso leading-tight"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(28px, 4vw, 58px)' }}
                >
                  {slide.name}
                </p>
                <Link
                  href={slide.href}
                  className="self-start text-[10px] font-normal tracking-[0.22em] uppercase text-espresso border-b border-espresso/50 pb-0.5 hover:text-mahogany hover:border-mahogany transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Dot indicators — absolute bottom-right corner of the image */}
        <div className="absolute bottom-4 right-5 flex flex-col items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{ width: 8, height: 8 }}
              className={`rounded-full transition-opacity duration-300 ${
                i === current ? 'bg-white opacity-100' : 'bg-white opacity-40 hover:opacity-70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
