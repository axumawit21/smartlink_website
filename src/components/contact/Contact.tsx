import { useRef } from 'react'
import { useReveal } from '../../lib/useReveal'
import ContactCards from './ContactCards'
import ContactForm from './ContactForm'
import MapCard from './MapCard'
const NEXT = [['1', 'You tell us what you need', 'Share your site, your systems and your goals.'], ['2', 'We analyze and plan', 'Requirement analysis and planning for your project.'], ['3', 'You get a design and bill of quantities', 'Network and system design, then supply, installation and support.']]
/** Night-city look: deep navy with warm and cool glows, fine diagonal lines and grain; white form card on top. */
export default function Contact() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section id="contact" ref={root} className="contact-bg relative overflow-hidden px-4 py-24 text-white md:px-12"
      style={{ background: 'radial-gradient(900px 520px at 100% 0%, rgba(249,115,22,.20), transparent 60%), radial-gradient(900px 600px at 0% 100%, rgba(0,112,192,.30), transparent 62%), radial-gradient(600px 400px at 55% 50%, rgba(52,211,153,.07), transparent 70%), linear-gradient(180deg,#0A1322,#0E1B33)' }}>
      <div className="relative mx-auto max-w-6xl">
        <header className="rv max-w-[760px]" data-gaze>
          <p className="font-mono text-xs tracking-[.16em] text-[#FB923C]">CONTACT</p>
          <h2 className="mt-3 font-head text-3xl font-bold leading-tight md:text-5xl">Let&rsquo;s secure and connect your site</h2>
          <p className="mt-4 text-white/75">Tell us about your project and our team in Addis Ababa will get back to you. You can also call, write or visit us in Bole.</p>
        </header>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.25fr]">
          <div className="rv space-y-5"><ContactCards /><MapCard /></div>
          <div className="rv"><ContactForm /></div>
        </div>

        <ol className="rv mt-14 grid gap-4 md:grid-cols-3" data-gaze>
          {NEXT.map(([n, t, d]) => (
            <li key={n} className="flex gap-4 rounded-[18px] border border-white/15 bg-white/5 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-head text-lg font-bold text-[#0A1322]" style={{ background: 'linear-gradient(135deg,#34D399,#38A8F5)' }}>{n}</span>
              <div><h3 className="font-head font-bold">{t}</h3><p className="mt-1 text-sm text-white/70">{d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}