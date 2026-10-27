import { useEffect, useRef } from 'react'
import { LETTERS } from '../../config/clients'
const base = import.meta.env.BASE_URL
/** Shared full-size viewer for every letter. Native dialog (Esc, focus trap) plus previous/next and arrow keys. */
export default function LetterViewer({ index, onIndex }: { index: number | null; onIndex: (i: number | null) => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const n = LETTERS.length, l = index === null ? null : LETTERS[index]
  useEffect(() => { const d = ref.current!; if (index !== null && !d.open) d.showModal(); if (index === null && d.open) d.close() }, [index])
  const go = (dir: number) => index !== null && onIndex((index + dir + n) % n)
  return (
    <dialog ref={ref} onClose={() => onIndex(null)} onClick={e => { if (e.target === ref.current) onIndex(null) }}
      onKeyDown={e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }} aria-label={l ? `${l.kind === 'letter' ? 'Recommendation letter' : 'Agreement'}: ${l.org}` : 'Letter'}
      className="m-auto max-h-[94vh] w-[min(760px,94vw)] overflow-y-auto rounded-[16px] bg-[#F4F1E8] p-3 text-[#1B2430] backdrop:bg-[rgba(5,11,22,.82)]">
      {l && (<>
        <p className="px-1 pb-2 text-sm font-semibold">{l.org} <span className="font-normal text-[#4A5568]">· {index! + 1} of {n}</span></p>
        <img src={`${base}letters/${l.file}`} alt={`Scan of the ${l.kind === 'letter' ? 'recommendation letter' : 'framework agreement'} from ${l.org}`} className="h-auto w-full" />
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button type="button" onClick={() => go(-1)} className="btn o justify-center rounded-[14px] !text-[#1B2430]">← Previous</button>
          <button type="button" onClick={() => onIndex(null)} className="btn p justify-center rounded-[14px]">Close</button>
          <button type="button" onClick={() => go(1)} className="btn o justify-center rounded-[14px] !text-[#1B2430]">Next →</button>
        </div>
      </>)}
    </dialog>
  )
}
