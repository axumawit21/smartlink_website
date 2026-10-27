import { SITE } from '../../config/site'
/** Illustrative street-grid map (no external map or image). Links to Google Maps for the real location. */
export default function MapCard() {
  return (
    <div className="map relative overflow-hidden rounded-[20px] border border-white/15" data-gaze>
      <svg viewBox="0 0 600 260" className="block h-auto w-full" role="img" aria-label="Illustrative map showing the SmartLink office in Bole, Addis Ababa" preserveAspectRatio="xMidYMid slice">
        <rect width="600" height="260" fill="#10223D" />
        <g stroke="#1E3A5F" strokeWidth="14" fill="none" strokeLinecap="round"><path d="M-10 70H610" /><path d="M-10 190H610" /><path d="M120-10V270" /><path d="M300-10V270" /><path d="M470-10V270" /></g>
        <g stroke="#2B4F7E" strokeWidth="4" fill="none" strokeLinecap="round"><path d="M-10 130H610" /><path d="M210-10V270" /><path d="M390-10V270" /><path d="M-10 250C150 200 260 230 400 150S560 40 610 20" strokeDasharray="2 8" stroke="#34D399" /></g>
        <g fill="#16304F"><rect x="135" y="85" width="60" height="90" rx="6" /><rect x="225" y="85" width="55" height="35" rx="6" /><rect x="315" y="85" width="60" height="90" rx="6" /><rect x="405" y="85" width="50" height="90" rx="6" /><rect x="485" y="85" width="90" height="35" rx="6" /><rect x="20" y="85" width="85" height="90" rx="6" /></g>
        <g transform="translate(345 120)"><ellipse cx="0" cy="38" rx="16" ry="5" fill="#000" opacity=".35" /><path className="pin" d="M0 36C-18 14-20-4-20-12A20 20 0 0 1 20-12C20-4 18 14 0 36Z" fill="#F97316" /><circle cy="-12" r="7" fill="#fff" /></g>
        <text x="372" y="112" fill="#fff" fontFamily="Inter,sans-serif" fontSize="13" fontWeight="600">SmartLink</text>
        <text x="372" y="128" fill="#9FB4CF" fontFamily="Inter,sans-serif" fontSize="11">Blen Building · Bole</text>
      </svg>
      <div className="flex flex-col gap-3 bg-[#0D1B33] p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/75">{SITE.landmark}<span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-white/40">Illustrative map</span></p>
        <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-semibold text-[#FB923C] hover:underline">Open in Google Maps ↗</a>
      </div>
    </div>
  )
}