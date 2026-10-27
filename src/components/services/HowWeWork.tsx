import { STEPS } from '../../config/services'
/** 4 numbered steps with a thin connecting line (horizontal on desktop, vertical on mobile). */
export default function HowWeWork() {
  return (
    <div className="rv mt-14" data-gaze>
      <h3 className="font-head text-xl font-bold">How we work</h3>
      <ol className="relative mt-6 grid gap-8 md:grid-cols-4 md:gap-6">
        <span aria-hidden="true" className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-[var(--line)] md:left-[10%] md:top-5 md:h-px md:w-[80%]" />
        {STEPS.map(s => (
          <li key={s.n} className="relative flex gap-4 md:block md:text-center">
            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] font-mono text-sm text-[var(--c-security-text)] md:mx-auto">{s.n}</span>
            <div className="md:mt-3"><h4 className="font-head font-bold">{s.title}</h4><p className="mt-1 text-sm text-muted">{s.text}</p></div>
          </li>
        ))}
      </ol>
    </div>
  )
}
