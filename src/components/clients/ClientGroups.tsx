import { GROUPS, type Tone } from '../../config/clients'
const tone: Record<Tone, string> = { bank: 'var(--c-security)', biz: '#FBBF24', build: 'var(--c-safety)', gov: 'var(--c-communication)', edu: '#A78BFA' }
const init = (n: string) => n.replace(/[^A-Za-z ]/g, '').split(' ').filter(w => w.length > 1 || w === 'A').slice(0, 2).map(w => w[0]).join('').toUpperCase()
/** Three tinted "glass" columns; each client gets a monogram badge in the column color. */
export default function ClientGroups() {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-6">
      {GROUPS.map(g => (
        <section key={g.id} data-gaze aria-labelledby={`cg-${g.id}`} className={`rv cg relative overflow-hidden ${g.id === 'gov' || g.id === 'edu' ? 'lg:col-span-3' : 'lg:col-span-2'} rounded-[20px] border border-white/10 p-6`} style={{ '--tc': tone[g.id] } as React.CSSProperties}>
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: 'var(--tc)' }} />
          <h3 id={`cg-${g.id}`} className="font-head text-xl font-bold">{g.title}</h3>
          <p className="mt-1 text-sm text-white/60">{g.blurb}</p>
          <ul className="mt-5 space-y-2.5">
            {g.names.map(n => (
              <li key={n} className="flex items-center gap-3 text-sm">
                <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] font-mono text-[11px] font-semibold" style={{ background: 'color-mix(in srgb, var(--tc) 22%, transparent)', color: 'var(--tc)' }}>{init(n)}</span>{n}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
