import type { Project } from '../../config/projects'
const base = import.meta.env.BASE_URL
const dot: Record<string, string> = { security: 'var(--c-security)', safety: 'var(--c-safety)', communication: 'var(--c-communication)' }
export const Chip = ({ label, pillar }: { label: string; pillar: string }) => (
  <li className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1 text-xs">
    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-[2px]" style={{ background: dot[pillar] }} />{label}</li>
)
/** Photo card (image + hover zoom) or text card (big metric on a blueprint-style header). Opens the detail dialog. */
export default function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  const big = p.featured
  return (
    <article data-gaze className={`pcard group relative flex flex-col overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-[var(--c-security)] ${big ? 'md:col-span-2' : ''}`}>
      {p.image ? (
        <div className={`relative overflow-hidden ${big ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
          <img src={`${base}projects/${p.image}`} alt={`${p.title}, ${p.client}`} loading="lazy" decoding="async" width={1100} height={big ? 620 : 800}
            className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${p.id === 'ena' ? 'object-top' : ''}`} />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(5,11,22,.85)] via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-[rgba(5,11,22,.7)] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cyan backdrop-blur">{p.sector === 'public' ? 'Public sector' : p.sector === 'industry' ? 'Industry & NGO' : p.sector}</span>
          {p.render && <span className="absolute right-4 top-4 rounded-full bg-[rgba(5,11,22,.7)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">Design render</span>}
        </div>
      ) : (
        <div className="relative flex min-h-[150px] items-end overflow-hidden bg-[var(--surface-2)] p-5">
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 160" fill="none" stroke="var(--c-security)" strokeWidth=".8">
            <path d="M0 40h400M0 80h400M0 120h400M80 0v160M160 0v160M240 0v160M320 0v160" opacity=".35" /><path d="M20 130L100 90L180 105L260 55L340 70L390 30" /><circle cx="100" cy="90" r="4" /><circle cx="260" cy="55" r="4" /><circle cx="390" cy="30" r="4" />
          </svg>
          {p.metric && <div className="relative"><span className="font-head text-5xl font-bold text-[var(--c-security-text)]">{p.metric.value}</span><span className="ml-2 text-sm text-muted">{p.metric.label}</span></div>}
          {!p.metric && <span className="relative font-mono text-[11px] uppercase tracking-widest text-[var(--c-security-text)]">{p.sector === 'public' ? 'Public sector' : p.sector}</span>}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-xs text-muted">{p.client}</p>
        <h3 className="mt-1 font-head text-xl font-bold leading-snug">
          <button type="button" onClick={() => onOpen(p)} className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">{p.title}</button>
        </h3>
        <p className={`mt-2 text-sm text-muted ${big ? '' : 'line-clamp-3'}`}>{p.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">{p.systems.slice(0, big ? 7 : 4).map(s => <Chip key={s.label} {...s} />)}{!big && p.systems.length > 4 && <li className="px-1 py-1 text-xs text-muted">+{p.systems.length - 4}</li>}</ul>
        <p className="mt-auto pt-5 text-sm font-semibold text-[var(--c-security-text)]">View details <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">→</span></p>
      </div>
    </article>
  )
}
