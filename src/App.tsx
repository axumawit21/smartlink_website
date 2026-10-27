import Hero from './components/hero/Hero'
import Services from './components/services/Services'
import Projects from './components/projects/Projects'
import Clients from './components/clients/Clients'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import { SITE } from './config/site'

const links = ['Services', 'Projects', 'Clients', 'About', 'Contact']
export default function App() {
  return (
    <>
      <header id="hd">
        <a className="logo" href="#top">SMART<b>LINK</b></a>
        <nav aria-label="Primary">{links.map(l => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}</nav>
        <a className="btn p" href="#contact">Get a Quote</a>
      </header>
      <main id="top"><Hero /><Services /><Projects /><Clients /><About /><Contact /></main>
      <footer className="border-t border-cyan/10 px-4 py-8 text-center text-xs text-muted">© {new Date().getFullYear()} {SITE.name}. Addis Ababa, Ethiopia.</footer>
    </>
  )
}