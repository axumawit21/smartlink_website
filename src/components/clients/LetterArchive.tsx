import { LETTERS } from '../../config/clients'
const base = import.meta.env.BASE_URL
/** Every letter as a pinned-paper thumbnail wall. Click to read the original. */
export default function LetterArchive({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="mt-16" data-gaze>
      <h3 className="font-head text-2xl font-bold">All recommendation letters</h3>
      <p className="mt-2 max-w-xl text-sm text-white/60">{LETTERS.filter(l => l.kind === 'letter').length} letters from clients, plus the GIZ framework agreement. Select any to read the original.</p>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {LETTERS.map((l, i) => (
          <li key={l.id} className="rv">
            <button type="button" onClick={() => onOpen(i)} aria-label={`Open the ${l.kind === 'letter' ? 'letter' : 'agreement'} from ${l.org}`} className="lthumb group w-full text-left">
              <span className="block overflow-hidden rounded-[6px] bg-[#F4F1E8] shadow-[0_10px_24px_rgba(0,0,0,.35)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_34px_rgba(34,211,238,.25)]">
                <img src={`${base}letters/${l.file}`} alt="" loading="lazy" decoding="async" width={885} height={1140} className="aspect-[3/4] w-full object-cover object-top" />
              </span>
              <span className="mt-2 block text-xs font-semibold leading-snug">{l.org}</span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#22D3EE]">{l.kind === 'letter' ? 'Letter' : 'Agreement'}{l.date ? ` · ${l.date}` : ''}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
