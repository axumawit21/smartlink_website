import { useRef, useState } from 'react'
import { useReveal } from '../../lib/useReveal'
import ClientGroups from './ClientGroups'
import Marquee from './Marquee'
import Testimonials from './Testimonials'
import PartnerWall from './PartnerWall'
import LetterViewer from './LetterViewer'
/** Deliberately a different "world" from Services/Projects: deep blue gradient, dot texture, tinted glass columns, cream paper quotes. */
export default function Clients() {
  const root = useRef<HTMLElement>(null)
  const [view, setView] = useState<number | null>(null)
  useReveal(root)
  return (
    <section id="clients" ref={root} className="clients-bg relative overflow-hidden px-4 py-24 text-white md:px-12">
      <div className="relative mx-auto max-w-6xl">
        <header className="rv max-w-[760px]" data-gaze>
          <p className="font-mono text-xs tracking-[.16em] text-[#22D3EE]">CLIENTS</p>
          <h2 className="mt-2 font-head text-3xl font-bold leading-tight md:text-5xl">Trusted by the institutions Ethiopia relies on</h2>
          <p className="mt-4 text-white/70">Banks, NGOs, ministries, contractors and universities choose SmartLink to connect, secure and protect their sites.</p>
        </header>
        <Marquee />
        <ClientGroups />
        <Testimonials onOpen={setView} viewing={view !== null} />
        <PartnerWall />
      </div>
      <LetterViewer index={view} onIndex={setView} />
    </section>
  )
}