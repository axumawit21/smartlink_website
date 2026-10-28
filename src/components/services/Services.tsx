import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import gsap from 'gsap'
import { SERVICES, type Pillar } from '../../config/services'
import HowWeWork from './HowWeWork'

const rm = () => matchMedia('(prefers-reduced-motion: reduce)').matches
/** CSS variables for one pillar; tokens are defined in styles/index.css for dark and light themes. */
const vars = (p: Pillar) => ({ '--pc': `var(--c-${p})`, '--pc-ink': `var(--ink-${p})` }) as CSSProperties
const Check = () => <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>

export default function Services() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [mobile, setMobile] = useState(() => matchMedia('(max-width:767px)').matches)
  const root = useRef<HTMLElement>(null), wrap = useRef<HTMLDivElement>(null), tabs = useRef<(HTMLButtonElement | null)[]>([])
  const prevH = useRef(0), first = useRef(true)
  const cat = SERVICES[active]
  const collapsed = mobile && !expanded && cat.items.length > 6
  const shown = collapsed ? cat.items.slice(0, 6) : cat.items

  useEffect(() => { const m = matchMedia('(max-width:767px)'), f = () => setMobile(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])

  // Select a tab from the URL hash (#services?cat=safety), from hero pillar chips, and handle "?service=" quote links.
  useEffect(() => {
    const select = (id: string | null) => { const i = SERVICES.findIndex(s => s.id === id); if (i >= 0) { setActive(i); setExpanded(false) } }
    const go = (sel: string) => document.querySelector(sel)?.scrollIntoView({ behavior: rm() ? 'auto' : 'smooth' })
    const fromHash = () => {
      const m = location.hash.match(/^#(services|contact)\?(?:cat|service)=([\w-]+)/)
      if (!m) return
      if (m[1] === 'services') select(m[2])
      if (m[1] === 'contact') dispatchEvent(new CustomEvent('smartlink:service', { detail: m[2] }))
      go('#' + m[1])
    }
    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#services?"],a[href^="#contact?"]') as HTMLAnchorElement | null
      if (!a) return
      e.preventDefault(); history.pushState(null, '', a.getAttribute('href')); fromHash()
    }
    fromHash(); addEventListener('hashchange', fromHash); document.addEventListener('click', click)
    return () => { removeEventListener('hashchange', fromHash); document.removeEventListener('click', click) }
  }, [])

  // Panel transition: smooth height change + staggered items (skipped for reduced motion)
  useLayoutEffect(() => {
    const el = wrap.current!, from = prevH.current
    el.style.height = 'auto'; const to = el.offsetHeight; prevH.current = to
    if (rm() || first.current) { first.current = false; return }
    if (from && from !== to) { el.style.overflow = 'hidden'; gsap.fromTo(el, { height: from }, { height: to, duration: 0.35, ease: 'power2.out', clearProps: 'height,overflow' }) }
    gsap.fromTo(el.querySelectorAll('[data-item]'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out', clearProps: 'opacity,transform' })
  }, [active])
  useLayoutEffect(() => { if (wrap.current) { wrap.current.style.height = 'auto'; prevH.current = wrap.current.offsetHeight } }, [expanded])

  // Scroll reveal (fade up once)
  useEffect(() => {
    const els = root.current!.querySelectorAll('.rv')
    if (rm() || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12 })
    els.forEach(e => io.observe(e)); return () => io.disconnect()
  }, [])

  const onKey = (e: KeyboardEvent) => {
    const n = SERVICES.length; let i = active
    if (e.key === 'ArrowRight') i = (active + 1) % n; else if (e.key === 'ArrowLeft') i = (active - 1 + n) % n
    else if (e.key === 'Home') i = 0; else if (e.key === 'End') i = n - 1; else return
    e.preventDefault(); setActive(i); setExpanded(false); tabs.current[i]?.focus()
  }

  return (
    <section id="services" ref={root} className="svc border-t border-[var(--line)] px-4 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="rv max-w-[720px]" data-gaze>
          <p className="font-mono text-xs tracking-[.16em] text-[var(--c-security-text)]">WHAT WE DO</p>
          <h2 className="mt-2 font-head text-3xl font-bold leading-tight md:text-4xl">Everything your site needs to stay secure, safe and connected</h2>
          <p className="mt-3 text-muted">We help you integrate computer networks, infrastructure, data and security systems so your organization runs as efficiently as possible.</p>
        </header>

        <div role="tablist" aria-label="Service categories" onKeyDown={onKey} data-gaze
          className="rv no-scrollbar -mx-4 mt-10 flex snap-x gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {SERVICES.map((s, i) => (
            <button key={s.id} ref={el => { tabs.current[i] = el }} role="tab" id={`tab-${s.id}`} type="button"
              aria-selected={i === active} aria-controls="svc-panel" tabIndex={i === active ? 0 : -1}
              onClick={() => { setActive(i); setExpanded(false) }} style={vars(s.pillar)}
              className={`tab snap-start ${i === active ? 'is-on' : ''}`}>
              <span aria-hidden="true" className="tab-sq" />{s.title}
            </button>
          ))}
        </div>

        <div className="rv relative mt-6" style={vars(cat.pillar)}>
          <div aria-hidden="true" className="blob" />
          <div id="svc-panel" role="tabpanel" aria-labelledby={`tab-${cat.id}`} tabIndex={0} data-gaze
            className="relative rounded-[20px] border border-[var(--line)] svc-card p-6 md:p-10">
            <div ref={wrap} className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
              <div>
                <h3 className="font-head text-2xl font-bold">{cat.title}</h3>
                <p className="mt-3 text-muted">{cat.summary}</p>
                <p className="mt-5 inline-flex items-start gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1.5 text-sm"><span className="mt-0.5 text-[var(--pc-text)]"><Check /></span>{cat.proof}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={`#contact?service=${cat.id}`} className="svc-btn svc-solid">Request a quote</a>
                  <a href="#projects" className="svc-btn svc-outline">See related projects</a>
                </div>
              </div>
              <div>
                <ul className="grid gap-x-8 md:grid-cols-2">
                  {shown.map(it => (
                    <li key={it} data-item className="flex items-start gap-3 border-b border-[var(--line)] py-3 text-sm">
                      <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-[var(--pc)]" />{it}
                    </li>
                  ))}
                </ul>
                {mobile && cat.items.length > 6 && (
                  <button type="button" aria-expanded={expanded} onClick={() => setExpanded(v => !v)} className="svc-btn svc-outline mt-4 w-full">
                    {expanded ? 'Show fewer' : `Show all ${cat.items.length} services`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <HowWeWork />
      </div>
    </section>
  )
}