import { TIMELINE } from '../../config/about'
/** Horizontal on desktop (line draws in on reveal), vertical on mobile. */
export default function Timeline() {
  return (
    <div className="mt-14" data-gaze>
      <h3 className="bp-label">FIG. 01 · OUR STORY</h3>
      <ol className="tl rv relative mt-6 grid gap-8 md:grid-cols-5 md:gap-5">
        <span aria-hidden="true" className="tl-line" />
        {TIMELINE.map(t => (
          <li key={t.year} className="relative pl-8 md:pl-0 md:pt-8">
            <span aria-hidden="true" className="tl-dot" />
            <p className="font-head text-3xl font-bold text-[#FBBF24]">{t.year}</p>
            <h4 className="mt-1 font-semibold">{t.title}</h4><p className="mt-1 text-sm text-white/75">{t.text}</p>
          </li>
        ))}
      </ol>
      <div className="rv mt-10 flex flex-col items-start gap-3 rounded-[16px] border border-dashed border-white/40 p-5 md:flex-row md:items-center md:gap-6">
        <span className="font-mono text-xs tracking-widest text-[#FBBF24]">NAME CHANGE NOTICE</span>
        <p className="font-head text-lg"><span className="text-white/70 line-through decoration-white/40">Linkcom Information Systems Plc</span> <span aria-hidden="true" className="mx-2 text-[#22D3EE]">→</span><span className="sr-only"> became </span><strong>SmartLink ICT &amp; Security Solutions Plc</strong></p>
      </div>
    </div>
  )
}
