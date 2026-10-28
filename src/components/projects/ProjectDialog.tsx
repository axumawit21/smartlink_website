import { useEffect, useRef } from 'react'
import type { Project } from '../../config/projects'
import { Chip } from './ProjectCard'
const base = import.meta.env.BASE_URL
/** Native <dialog>: focus trap, Esc to close and inert background come from the browser. Click the backdrop to close too. */
export default function ProjectDialog({ p, onClose }: { p: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { const d = ref.current!; if (p && !d.open) d.showModal(); if (!p && d.open) d.close() }, [p])
  return (
    <dialog ref={ref} onClose={onClose} onClick={e => { if (e.target === ref.current) onClose() }} aria-labelledby="pd-title"
      className="m-auto w-[min(920px,94vw)] max-h-[92vh] overflow-y-auto rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-0 text-[var(--fg)] backdrop:bg-[rgba(5,11,22,.75)] backdrop:backdrop-blur-sm">
      {p && (
        <div>
          {p.image && (
            <div className="bg-[#050B16]"><img src={`${base}projects/${p.image}`} alt={`${p.title}, ${p.client}`} className="mx-auto block max-h-[62vh] w-full object-contain" /></div>
          )}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-sm text-muted">{p.client}</p><h3 id="pd-title" className="mt-1 font-head text-2xl font-bold">{p.title}</h3></div>
              <button type="button" onClick={onClose} aria-label="Close project details" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line)] hover:border-[var(--c-security)]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
            </div>
            <p className="mt-4 text-muted">{p.summary}</p>
            {p.note && <p className="mt-3 inline-block rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1 text-sm">{p.note}</p>}
            {p.render && <p className="mt-3 text-xs text-muted">Image is a design render supplied in the company profile.</p>}
            <h4 className="mt-6 font-mono text-xs tracking-[.16em] text-[var(--c-security-text)]">SYSTEMS DELIVERED</h4>
            <ul className="mt-3 flex flex-wrap gap-2">{p.systems.map(s => <Chip key={s.label} {...s} />)}</ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={onClose} className="btn o rounded-[14px] justify-center">Back to projects</button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}