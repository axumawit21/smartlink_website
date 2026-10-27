import { CERTS, PURSUING, ROLES } from '../../config/about'
/** Four discipline cards plus a "stamp" wall of certifications. */
export default function Roles() {
  return (
    <div className="mt-16" data-gaze>
      <h3 className="bp-label">FIG. 01 · THE PEOPLE BEHIND EVERY PROJECT</h3>
      <p className="mt-3 max-w-2xl text-white/80">Successful IT projects are a team effort. We bring together certified professionals from different disciplines and tailor each team to the demands of the task.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ROLES.map(r => (
          <li key={r.title} className="rv bp-card p-5">
            <svg viewBox="0 0 24 24" className="h-9 w-9 text-[#22D3EE]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={r.icon} /></svg>
            <h4 className="mt-4 font-head text-lg font-bold">{r.title}</h4>
            <p className="mt-2 text-sm text-white/80">{r.text}</p>
            {r.tags.length > 0 && <p className="mt-3 flex flex-wrap gap-1.5">{r.tags.map(t => <span key={t} className="rounded border border-[#FBBF24]/60 px-2 py-0.5 font-mono text-[11px] text-[#FBBF24]">{t}</span>)}</p>}
          </li>
        ))}
      </ul>
      <div className="rv mt-8 flex flex-col gap-5 rounded-[20px] border border-white/25 bg-white/10 p-6 md:flex-row md:items-center md:justify-between">
        <div><p className="font-head text-lg font-bold">Certifications we hold</p>
          <ul className="mt-3 flex flex-wrap gap-2">{CERTS.map(c => <li key={c} className="stamp">{c}</li>)}</ul></div>
        <p className="max-w-xs text-sm text-white/80">Our engineers keep pursuing high-end certifications from {PURSUING.slice(0, -1).join(', ')} and {PURSUING[PURSUING.length - 1]}.</p>
      </div>
    </div>
  )
}