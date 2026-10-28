import type { Project } from '../../config/projects'
const base = import.meta.env.BASE_URL
const dot: Record<string, string> = { security: 'var(--c-security)', safety: 'var(--c-safety)', communication: 'var(--c-communication)' }
export const sectorLabel = (s: string) => (s === 'public' ? 'Public sector' : s === 'industry' ? 'Industry & NGO' : s)
export const Chip = ({ label, pillar }: { label: string; pillar: string }) => (
  <li className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1 text-xs">
    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-[2px]" style={{ background: dot[pillar] }} />{label}</li>
)
const More = () => <p className="mt-auto pt-5 text-sm font-semibold text-[var(--c-security-text)]">View details <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">→</span></p>
const Title = ({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) => (
  <h3 className="mt-1 font-head text-xl font-bold leading-snug">
    <button type="button" onClick={() => onOpen(p)} className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">{p.title}</button>
  </h3>
)
/** span: how many grid columns the photo card takes on large screens (featured and "fill the row" cards). */
export default function ProjectCard({ p, onOpen, span = 1 }: { p: Project; onOpen: (p: Project) => void; span?: 1 | 2 | 3 }) {
  const cols = span === 3 ? 'md:col-span-2 lg:col-span-3' : span === 2 ? 'md:col-span-2' : ''
  const base_ = 'pcard group relative flex flex-col overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--c-security)]'
  if (p.image) {
    const wide = span > 1
    return (
      <article data-gaze className={`${base_} ${cols}`}>
        <div className={`relative overflow-hidden ${wide ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
          <img src={`${base}projects/${p.image}`} alt={`${p.title}, ${p.client}`} loading="lazy" decoding="async" width={1100} height={wide ? 620 : 800}
            className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${p.id === 'ena' ? 'object-top' : ''}`} />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(5,11,22,.85)] via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-[rgba(5,11,22,.7)] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cyan backdrop-blur">{sectorLabel(p.sector)}</span>
          {p.render && <span className="absolute right-4 top-4 rounded-full bg-[rgba(5,11,22,.7)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">Design render</span>}
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="text-xs text-muted">{p.client}</p><Title p={p} onOpen={onOpen} />
          <p className={`mt-2 text-sm text-muted ${wide ? '' : 'line-clamp-3'}`}>{p.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">{p.systems.slice(0, wide ? 7 : 4).map(s => <Chip key={s.label} {...s} />)}{!wide && p.systems.length > 4 && <li className="px-1 py-1 text-xs text-muted">+{p.systems.length - 4}</li>}</ul>
          <More />
        </div>
      </article>
    )
  }
  // Text card: no empty image area; the key number (if any) sits at the top right
  return (
    <article data-gaze className={`${base_} p-6`}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: 'linear-gradient(90deg,var(--c-security),var(--c-communication))' }} />
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--c-security-text)]">{sectorLabel(p.sector)}</span>
        {p.metric && <div className="text-right leading-tight"><span className="font-head text-4xl font-bold text-[var(--c-security-text)]">{p.metric.value}</span><span className="block text-xs text-muted">{p.metric.label}</span></div>}
      </div>
      <p className="mt-3 text-xs text-muted">{p.client}</p><Title p={p} onOpen={onOpen} />
      <p className="mt-2 text-sm text-muted">{p.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">{p.systems.slice(0, 4).map(s => <Chip key={s.label} {...s} />)}{p.systems.length > 4 && <li className="px-1 py-1 text-xs text-muted">+{p.systems.length - 4}</li>}</ul>
      <More />
    </article>
  )
}