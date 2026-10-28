import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { PROJECTS, SECTORS, type Project, type Sector } from '../../config/projects'
import { useReveal } from '../../lib/useReveal'
import StatsStrip from './StatsStrip'
import ProjectCard from './ProjectCard'
import ProjectDialog from './ProjectDialog'

const FIRST = 5   // projects shown before "Show N more"

export default function Projects() {
  const root = useRef<HTMLElement>(null), cards = useRef<HTMLDivElement>(null)
  const [f, setF] = useState<Sector | 'all'>('all')
  const [open, setOpen] = useState<Project | null>(null)
  const [more, setMore] = useState(false)
  useReveal(root)

  // Photo projects first, text-only projects after, so the two kinds never share a row
  const filtered = PROJECTS.filter(p => f === 'all' || p.sector === f)
  const list = [...filtered.filter(p => p.image), ...filtered.filter(p => !p.image)]
  const visible = more ? list : list.slice(0, FIRST)
  const hidden = list.length - visible.length
  const photos = visible.filter(p => p.image), texts = visible.filter(p => !p.image)

  // On large screens, let the last photo card stretch so the final photo row has no hole
  const slots = photos.reduce((n, p) => n + (p.featured ? 2 : 1), 0), rem = slots % 3
  const spanOf = (p: Project, i: number): 1 | 2 | 3 => p.featured ? 2 : i === photos.length - 1 && rem === 2 ? 2 : i === photos.length - 1 && rem === 1 && photos.length > 1 ? 3 : 1

  const first = useRef(true)
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(cards.current!.querySelectorAll('article'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out', clearProps: 'opacity,transform' })
  }, [f])

  const counts = (id: string) => id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.sector === id).length
  return (
    <section id="projects" ref={root} className="border-t border-[var(--line)] px-4 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="rv max-w-[720px]" data-gaze>
          <p className="font-mono text-xs tracking-[.16em] text-[var(--c-security-text)]">PROJECTS</p>
          <h2 className="mt-2 font-head text-3xl font-bold leading-tight md:text-4xl">Delivered across Ethiopia, from bank branches to referral hospitals</h2>
          <p className="mt-3 text-muted">A selection of completed work for banks, government bodies, universities, hospitals and NGOs. Select a project to see the systems we delivered.</p>
        </header>

        <StatsStrip />

        <div role="group" aria-label="Filter projects by sector" data-gaze className="rv no-scrollbar -mx-4 mt-10 flex snap-x gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {SECTORS.map(s => (
            <button key={s.id} type="button" aria-pressed={f === s.id} onClick={() => { setF(s.id); setMore(false) }}
              className={`pfilter snap-start ${f === s.id ? 'is-on' : ''}`}>{s.label} <span className="opacity-60">{counts(s.id)}</span></button>
          ))}
        </div>

        <div ref={cards} className="mt-6 space-y-5">
          {photos.length > 0 && <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{photos.map((p, i) => <ProjectCard key={p.id} p={p} onOpen={setOpen} span={spanOf(p, i)} />)}</div>}
          {texts.length > 0 && <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{texts.map(p => <ProjectCard key={p.id} p={p} onOpen={setOpen} />)}</div>}
        </div>
        <p className="sr-only" role="status">{visible.length} of {list.length} projects shown</p>

        {list.length > FIRST && (
          <button type="button" aria-expanded={more} onClick={() => setMore(v => !v)} className="btn o mx-auto mt-8 flex justify-center rounded-[14px]">
            {more ? 'Show fewer projects' : `Show ${hidden} more projects`}
          </button>
        )}
        <p className="mt-10 text-sm text-muted">Recommendation letters are available on request from clients including Wegagen Bank, Steely RMI, Asmen and Tilahun Abebe General Contractor.</p>
      </div>
      <ProjectDialog p={open} onClose={() => setOpen(null)} />
    </section>
  )
}