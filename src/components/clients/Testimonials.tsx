import { useEffect, useState } from 'react'
import { LETTERS, TESTIMONIALS } from '../../config/clients'
const base = import.meta.env.BASE_URL
/** Cream "paper" panel: quotes from real recommendation letters, each paired with its scanned letter (tap to enlarge). */
export default function Testimonials({ onOpen, viewing }: { onOpen: (i: number) => void; viewing: boolean }) {
  const [i, setI] = useState(0), [hover, setHover] = useState(false)
  const zoom = viewing
  const t = TESTIMONIALS[i], n = TESTIMONIALS.length
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => { if (rm || hover || zoom) return; const id = setInterval(() => setI(v => (v + 1) % n), 8000); return () => clearInterval(id) }, [rm, hover, zoom, n])
  return (
    <div data-gaze className="rv paper relative mt-16 overflow-hidden rounded-[24px] p-6 text-[#1B2430] md:p-12" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
      <span aria-hidden="true" className="pointer-events-none absolute -left-2 -top-10 select-none font-head text-[220px] leading-none text-[#0070C0]/10">&ldquo;</span>
      <p className="relative font-mono text-xs tracking-[.16em] text-[#0A5C99]">IN THEIR OWN WORDS</p>
      <div className="relative mt-4 grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
        <figure key={i} className="tq">
          <blockquote className="font-head text-2xl font-bold leading-snug md:text-3xl">&ldquo;{t.quote}&rdquo;</blockquote>
          <figcaption className="mt-5"><strong>{t.org}</strong><span className="block text-sm text-[#4A5568]">{t.who ?? ''}{t.date ? ` · ${t.date}` : ''}</span></figcaption>
          <p className="mt-3 max-w-lg text-sm text-[#4A5568]">{t.about}</p>
        </figure>
        <div className="flex justify-center">
          {t.file ? (
            <button type="button" onClick={() => onOpen(LETTERS.findIndex(x => x.id === t.id))} aria-label={`Open the recommendation letter from ${t.org}`} className="letter group">
              <img key={t.file} src={`${base}letters/${t.file}`} alt={`Scan of the recommendation letter from ${t.org}`} loading="lazy" width={770} height={1015} className="h-auto w-[min(260px,60vw)] rounded-[4px] shadow-[0_18px_40px_rgba(10,30,60,.35)] transition duration-500 group-hover:scale-105" />
              <span className="mt-3 block text-center text-xs font-semibold text-[#0A5C99]">View the original letter →</span>
            </button>
          ) : <p className="rounded-[14px] border border-dashed border-[#9AA7B8] p-6 text-center text-sm text-[#4A5568]">Letter on file (original scan available on request).</p>}
        </div>
      </div>
      <div className="relative mt-8 flex items-center justify-between gap-4">
        <div role="group" aria-label="Choose a testimonial" className="flex gap-2">
          {TESTIMONIALS.map((x, k) => <button key={x.org} type="button" aria-label={x.org} aria-current={k === i} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === i ? 'w-8 bg-[#0070C0]' : 'w-2.5 bg-[#9AA7B8]'}`} />)}
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous testimonial" onClick={() => setI((i - 1 + n) % n)} className="tq-nav">←</button>
          <button type="button" aria-label="Next testimonial" onClick={() => setI((i + 1) % n)} className="tq-nav">→</button>
        </div>
      </div>
    </div>
  )
}
