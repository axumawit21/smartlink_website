import { PARTNERS } from '../../config/clients'
/** Technology partners as wordmark tiles (the profile's logo images are too small to reuse cleanly). */
export default function PartnerWall() {
  return (
    <div className="mt-16" data-gaze>
      <h3 className="font-head text-2xl font-bold">Technology partners</h3>
      <p className="mt-2 max-w-xl text-sm text-white/60">Strategic alliances with leading technology firms, so our solutions are not limited to a single vendor.</p>
      <ul className="rv mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {PARTNERS.map(p => (
          <li key={p} className={`ptile ${p === 'Cisco' ? 'col-span-2 lg:col-span-1 lg:row-span-1' : ''}`}>
            <span className="font-head text-xl font-bold tracking-wide">{p}</span>
            {p === 'Cisco' && <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-[#22D3EE]">Premier Cisco Partner</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
