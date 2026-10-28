import { useRef } from 'react'
import { useReveal } from '../../lib/useReveal'
import { FACTS, WHY } from '../../config/about'
import Roles from './Roles'
import OrgChart from './OrgChart'
/** Blueprint (cyanotype) look: drafting grid, crop marks, mono annotations and amber highlights. Always blue, regardless of theme. */
export default function About() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section id="about" ref={root} className="about-aurora relative overflow-hidden px-4 py-24 text-white md:px-12" style={{ background: 'radial-gradient(900px 520px at 0% 0%, rgba(56,189,248,.14), transparent 60%), radial-gradient(800px 520px at 100% 100%, rgba(251,191,36,.08), transparent 62%), linear-gradient(165deg,#0F1D33 0%,#16304F 45%,#1B3F5C 75%,#1E4A57 100%)' }}>
      <div className="relative mx-auto max-w-6xl">
        <header className="rv grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end" data-gaze>
          <div>
            <p className="bp-label">ABOUT SMARTLINK</p>
            <h2 className="mt-3 font-head text-3xl font-bold leading-tight md:text-5xl">Your partner in IT and security solutions</h2>
            <p className="mt-5 max-w-2xl text-white/85">SmartLink ICT &amp; Security Solutions PLC is an information technology company established to help businesses fully or partially automate their operations. From our main office in Addis Ababa we deliver consistent, high-quality IT services to major cities across Ethiopia, and we stay ahead of industry trends so we can always deliver the best possible results.</p>
          </div>
          <dl className="grid grid-cols-3 gap-3">
            {FACTS.map(([v, l]) => <div key={l} className="bp-card p-3 text-center sm:p-4"><dd className="font-head text-base font-bold text-[#FBBF24] sm:text-xl md:text-2xl">{v}</dd><dt className="mt-1 text-xs text-white/80">{l}</dt></div>)}
          </dl>
        </header>

        <div className="rv mt-12 grid gap-5 md:grid-cols-2" data-gaze>
          <article className="bp-card p-6 md:p-8"><p className="bp-label">VISION</p>
            <p className="mt-3 font-head text-xl leading-snug">To be one of the leading security, safety and communication solution providers in Ethiopia, with a commitment to excellence in quality and service to achieve total customer satisfaction.</p></article>
          <article className="bp-card p-6 md:p-8"><p className="bp-label">MISSION</p>
            <p className="mt-3 font-head text-xl leading-snug">To satisfy our employees, customers and partners, and to provide measurable economic value to our country.</p></article>
        </div>

        <Roles />
        <OrgChart />

        <div className="mt-16" data-gaze>
          <h3 className="bp-label">FIG. 03 · WHY CHOOSE US</h3>
          <ol className="mt-6 grid gap-4 md:grid-cols-6">
            {WHY.map(([t, d], i) => (
              <li key={t} className={`rv bp-card relative overflow-hidden p-6 ${i < 2 ? 'md:col-span-3' : 'md:col-span-2'}`}>
                <span aria-hidden="true" className="absolute -right-2 -top-6 font-head text-[110px] font-bold leading-none text-white/10">{i + 1}</span>
                <h4 className="relative font-head text-lg font-bold">{t}</h4><p className="relative mt-2 text-sm text-white/80">{d}</p>
              </li>
            ))}
          </ol>
        </div>

        <figure className="rv mt-16 border-l-4 border-[#FBBF24] pl-6 md:pl-10" data-gaze>
          <blockquote className="font-head text-2xl font-bold leading-snug md:text-4xl">We believe that successful IT projects are a team effort.</blockquote>
          <figcaption className="mt-3 font-mono text-xs tracking-widest text-white/75">SMARTLINK COMPANY PROFILE</figcaption>
        </figure>
      </div>
    </section>
  )
}