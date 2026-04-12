export default function AnnouncementBar() {
  const items = [
    'Free shipping on orders over Rp 500.000',
    'New arrivals every Friday',
    'Sustainably sourced fabrics',
    'Easy 30-day returns',
    'Complimentary gift wrapping',
  ]

  // Duplicate for seamless loop
  const all = [...items, ...items]

  return (
    <div className="bg-espresso overflow-hidden border-b border-mahogany/30">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'ticker 30s linear infinite' }}
      >
        {all.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-10 py-2.5 text-[9px] font-normal tracking-[0.3em] uppercase text-petal shrink-0"
          >
            {item}
            <span className="text-mahogany">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
