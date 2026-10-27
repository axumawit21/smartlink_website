import { useEffect, useState, type FormEvent } from 'react'
import { SERVICES } from '../../config/services'
import { SITE } from '../../config/site'
const SECTORS = ['Bank', 'NGO', 'Government body', 'Construction firm', 'Hospital', 'University', 'Other']
const empty = { name: '', org: '', email: '', phone: '', sector: '', service: '', msg: '' }
/** White quote form. No backend yet: it opens the visitor's email app with everything filled in. */
export default function ContactForm() {
  const [f, setF] = useState(empty)
  const [sent, setSent] = useState(false)
  // Preselect the service from "#contact?service=safety" links (Services section fires 'smartlink:service')
  useEffect(() => {
    const pick = (id?: string | null) => { if (id && SERVICES.some(s => s.id === id)) setF(v => ({ ...v, service: id })) }
    const fromHash = () => pick(location.hash.match(/^#contact\?service=([\w-]+)/)?.[1])
    const onEvt = (e: Event) => pick((e as CustomEvent<string>).detail)
    fromHash(); addEventListener('hashchange', fromHash); addEventListener('smartlink:service', onEvt)
    return () => { removeEventListener('hashchange', fromHash); removeEventListener('smartlink:service', onEvt) }
  }, [])
  const on = (k: keyof typeof empty) => (e: { target: { value: string } }) => setF(v => ({ ...v, [k]: e.target.value }))
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const svc = SERVICES.find(s => s.id === f.service)?.title ?? 'Not sure yet'
    const body = [`Name: ${f.name}`, `Organization: ${f.org}`, `Sector: ${f.sector || '-'}`, `Email: ${f.email}`, `Phone: ${f.phone || '-'}`, `Service: ${svc}`, '', f.msg].join('\n')
    setSent(true)
    location.href = `mailto:${SITE.emails[0]}?subject=${encodeURIComponent('Quote request: ' + svc)}&body=${encodeURIComponent(body)}`
  }
  return (
    <form onSubmit={submit} data-gaze className="cform relative overflow-hidden rounded-[24px] bg-white p-6 text-[#0B1F3A] shadow-[0_30px_70px_rgba(0,0,0,.4)] md:p-9">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: 'linear-gradient(90deg,#0070C0,#34D399,#F97316)' }} />
      <h3 className="font-head text-2xl font-bold">Request a quote</h3>
      <p className="mt-1 text-sm text-[#4A5E78]">Tell us about your site. We start with requirement analysis and planning.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="fl">Your name *<input required autoComplete="name" value={f.name} onChange={on('name')} /></label>
        <label className="fl">Organization<input autoComplete="organization" value={f.org} onChange={on('org')} /></label>
        <label className="fl">Email *<input required type="email" autoComplete="email" value={f.email} onChange={on('email')} /></label>
        <label className="fl">Phone<input type="tel" autoComplete="tel" value={f.phone} onChange={on('phone')} /></label>
        <label className="fl">Sector<select value={f.sector} onChange={on('sector')}><option value="">Select…</option>{SECTORS.map(s => <option key={s}>{s}</option>)}</select></label>
        <label className="fl">What do you need?<select value={f.service} onChange={on('service')}><option value="">Not sure yet</option>{SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}</select></label>
        <label className="fl sm:col-span-2">Tell us about your project *<textarea required rows={4} value={f.msg} onChange={on('msg')} placeholder="Site type, number of branches or floors, what you want to secure or connect…" /></label>
      </div>
      <button type="submit" className="cbtn mt-6 w-full sm:w-auto">Send request <span aria-hidden="true">→</span></button>
      <p role="status" className="mt-4 text-sm text-[#4A5E78]">{sent ? <>Your email app should open with the request filled in. If it doesn&rsquo;t, write to <a className="font-semibold text-[#0070C0] underline" href={`mailto:${SITE.emails[0]}`}>{SITE.emails[0]}</a>.</> : 'This form opens your email app; nothing is stored on this site.'}</p>
    </form>
  )
}