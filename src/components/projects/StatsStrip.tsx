import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { STATS } from '../../config/projects'
/** Four headline numbers that count up once when scrolled into view. */
export default function StatsStrip() {
  const root = useRef<HTMLDListElement>(null)
  useEffect(() => {
    const nums = root.current!.querySelectorAll<HTMLElement>('[data-n]')
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = () => nums.forEach(el => { const to = +el.dataset.n!, o = { v: 0 }
      gsap.to(o, { v: to, duration: 1.4, ease: 'power2.out', onUpdate() { el.textContent = String(Math.round(o.v)) } }) })
    if (rm) return
    nums.forEach(el => { el.textContent = '0' })
    const io = new IntersectionObserver(e => { if (e[0].isIntersecting) { run(); io.disconnect() } }, { threshold: 0.4 })
    io.observe(root.current!); return () => io.disconnect()
  }, [])
  return (
    <dl ref={root} data-gaze className="rv mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--line)] lg:grid-cols-4">
      {STATS.map(s => (
        <div key={s.label} className="bg-[var(--surface)] p-5 md:p-6">
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-head text-4xl font-bold text-[var(--c-security-text)] md:text-5xl"><span data-n={s.value}>{s.value}</span>{s.suffix}</dd>
          <p className="mt-2 text-sm font-medium">{s.label}</p><p className="mt-0.5 text-xs text-muted">{s.sub}</p>
        </div>
      ))}
    </dl>
  )
}
