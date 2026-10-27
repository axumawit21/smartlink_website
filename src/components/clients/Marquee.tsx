import { GROUPS } from '../../config/clients'
const all = GROUPS.flatMap(g => g.names)
const row = (items: string[], rev: boolean) => (
  <div className="mq overflow-hidden" aria-hidden="true">
    <div className={`mq-track ${rev ? 'rev' : ''}`}>
      {[...items, ...items].map((n, i) => <span key={i} className="mq-item">{n}<i /></span>)}
    </div>
  </div>
)
/** Two opposite-direction tickers of client names. Decorative (the full list is in the groups below). Static for reduced motion. */
export default function Marquee() {
  const half = Math.ceil(all.length / 2)
  return <div className="-mx-4 mt-10 space-y-3 md:-mx-12" data-gaze>{row(all.slice(0, half), false)}{row(all.slice(half), true)}</div>
}
