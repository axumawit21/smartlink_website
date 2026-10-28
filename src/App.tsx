import { useEffect, useState } from 'react'
import Hero from './components/hero/Hero'
import Services from './components/services/Services'
import Projects from './components/projects/Projects'
import Clients from './components/clients/Clients'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import Divider from './components/Divider'
import { SITE } from './config/site'

const links = ['Services', 'Projects', 'Clients', 'About', 'Contact']
export default function App() {
  const [active, setActive] = useState('')
  const [menu, setMenu] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'))
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next; setTheme(next)
    try { localStorage.setItem('sl-theme', next) } catch { /* storage blocked: theme still switches for this visit */ }
  }
  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }), { rootMargin: '-45% 0px -50% 0px' })
    links.forEach(l => { const el = document.getElementById(l.toLowerCase()); if (el) io.observe(el) })
    const top = () => { if (scrollY < 200) setActive('') }
    addEventListener('scroll', top, { passive: true })
    return () => { io.disconnect(); removeEventListener('scroll', top) }
  }, [])
  // Close the phone menu on Escape or when tapping outside the header
  useEffect(() => {
    if (!menu) return
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    const out = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('#hd')) setMenu(false) }
    addEventListener('keydown', key); document.addEventListener('click', out)
    return () => { removeEventListener('keydown', key); document.removeEventListener('click', out) }
  }, [menu])
  return (
    <>
      <header id="hd">
        <a className="logo" href="#top">SMART<b>LINK</b></a>
        <nav aria-label="Primary">{links.map(l => { const id = l.toLowerCase(); return <a key={l} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined}>{l}</a> })}</nav>
        <button type="button" className="theme-btn" onClick={toggleTheme} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {theme === 'light' ? <path d="M20 14.500A8 8 0 0 1 9.500 4a8 8 0 1 0 10.500 10.500z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.600 5.600L7 7M17 17l1.400 1.400M5.600 18.400L7 17M17 7l1.400-1.400" /></>}
          </svg>
        </button>
        <button type="button" className="menu-btn" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="mnav" onClick={() => setMenu(v => !v)}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">{menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
        </button>
        <div id="mnav" hidden={!menu}>
          {links.map(l => { const id = l.toLowerCase(); return <a key={l} href={`#${id}`} onClick={() => setMenu(false)} className={`${active === id ? 'active' : ''} ${id === 'contact' ? 'cta' : ''}`}>{l}</a> })}
        </div>
      </header>
      <main id="top"><Hero /><Divider /><Services /><Divider /><Projects /><Divider /><Clients /><Divider /><About /><Divider /><Contact /></main>
      <footer className="border-t border-cyan/10 px-4 py-8 text-center text-xs text-muted">© {new Date().getFullYear()} {SITE.name}. Addis Ababa, Ethiopia.</footer>
    </>
  )
}