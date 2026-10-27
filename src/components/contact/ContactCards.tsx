import { useState } from 'react'
import { SITE } from '../../config/site'
type Tone = 'blue' | 'orange' | 'mint' | 'violet'
const tones: Record<Tone, string> = { blue: '#38A8F5', orange: '#FB923C', mint: '#34D399', violet: '#A78BFA' }
const paths: Record<string, string> = {
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21zM12 12a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5z',
  phone: 'M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M3 6h18v12H3zM3 7l9 6.500L21 7',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
}
function Copy({ text, label }: { text: string; label: string }) {
  const [ok, setOk] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1800) } catch { /* clipboard blocked */ } }
  return <button type="button" onClick={copy} aria-label={`Copy ${label}`} className="rounded-md border border-white/20 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70 transition hover:border-white/60 hover:text-white">{ok ? 'Copied' : 'Copy'}</button>
}
const Card = ({ tone, icon, title, children }: { tone: Tone; icon: string; title: string; children: React.ReactNode }) => (
  <li className="cc flex gap-4 rounded-[18px] border border-white/15 p-5" style={{ '--tc': tones[tone] } as React.CSSProperties}>
    <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px]" style={{ background: 'color-mix(in srgb, var(--tc) 20%, transparent)', color: 'var(--tc)' }}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[icon]} /></svg></span>
    <div className="min-w-0 flex-1"><h3 className="font-mono text-[11px] uppercase tracking-[.16em]" style={{ color: 'var(--tc)' }}>{title}</h3><div className="mt-1.5 space-y-1.5 text-[15px]">{children}</div></div>
  </li>
)
const Row = ({ children, copy, label }: { children: React.ReactNode; copy: string; label: string }) => <div className="flex items-center justify-between gap-3">{children}<Copy text={copy} label={label} /></div>
export default function ContactCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" data-gaze>
      <Card tone="mint" icon="pin" title="Head office"><p>{SITE.building}</p><p className="text-white/70">{SITE.landmark}</p></Card>
      <Card tone="blue" icon="phone" title="Phone">{SITE.phones.map(p => <Row key={p} copy={p} label="phone number"><a className="hover:underline" href={`tel:${p.replace(/\s/g, '')}`}>{p}</a></Row>)}
        <p className="text-sm text-white/60">Fax {SITE.fax}</p></Card>
      <Card tone="orange" icon="mail" title="Email">{SITE.emails.map(m => <Row key={m} copy={m} label="email address"><a className="break-all hover:underline" href={`mailto:${m}`}>{m}</a></Row>)}</Card>
      <Card tone="violet" icon="globe" title="Website"><p>{SITE.website}</p><p className="text-sm text-white/60">Managing Director: {SITE.managingDirector}</p></Card>
    </ul>
  )
}