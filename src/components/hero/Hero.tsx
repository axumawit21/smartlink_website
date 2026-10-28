import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import CameraScene from './CameraScene'
import IntroOverlay from './IntroOverlay'
import { pose, live, introClassOn, setIntroClass, markSeen, placeFinal, isLowPower, isTouch, prefersReducedMotion } from '../../lib/introState'

gsap.registerPlugin(useGSAP)

const Icon = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const aspect = () => root.current!.clientWidth / Math.max(1, root.current!.clientHeight)

  const skip = () => { if (tl.current && introClassOn()) tl.current.progress(1) }

  useGSAP(() => {
    const el = root.current!, q = (s: string) => el.querySelector<HTMLElement>(s)!
    // Cursor tracking for idle mode (touch devices use auto-sway instead)
    const onMove = (e: PointerEvent) => { if (isTouch()) return; live.mx = (e.clientX / innerWidth - 0.5) * 2; live.my = (e.clientY / innerHeight - 0.5) * 2 }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') skip() }
    addEventListener('pointermove', onMove); addEventListener('keydown', onKey)

    const play = introClassOn() && !prefersReducedMotion()
    if (!play) { setIntroClass(false); live.idle = true; placeFinal(aspect(), root.current!.clientHeight); return () => { removeEventListener('pointermove', onMove); removeEventListener('keydown', onKey) } }

    live.idle = false
    const finish = () => {
      gsap.from('.copy > *, .proof', { opacity: 0, y: 14, stagger: 0.08, duration: 0.6 })
      setIntroClass(false); live.idle = true; placeFinal(aspect(), root.current!.clientHeight); markSeen()
    }
    const failsafe = setTimeout(() => { if (introClassOn()) finish() }, 12000)

    // Typewriter helper for HUD text
    const type = (node: HTMLElement, txt: string, d: number) => {
      const o = { n: 0 }
      return gsap.to(o, { n: txt.length, duration: d, ease: 'none', onUpdate() { node.textContent = txt.slice(0, Math.round(o.n)) } })
    }
    const inside = q('#inside'), ring = q('#ring'), ht = q('#ht'), hs = q('#hs'), cv = q('#cv')
    // Iris: a growing circular clip-path on the "inside the camera" layer, with a cyan ring on its edge
    const ir = { r: 0 }
    const setIris = () => {
      const R = Math.hypot(inside.clientWidth, inside.clientHeight) / Math.SQRT2
      inside.style.clipPath = `circle(${ir.r}% at 50% 50%)`
      ring.style.width = ring.style.height = `${(ir.r / 100) * R * 2}px`
    }
    gsap.set(cv, { opacity: 0 })
    Object.assign(pose, { s: 0.6, glow: 0, ry: -Math.PI * 2, rx: 0, x: 0, y: 0, z: 0 })

    // ONE timeline. Camera movement is tweened on `pose`; CameraScene applies it every frame.
    const t = gsap.timeline({ onComplete: finish })
    t.to('#rec', { opacity: 1, duration: 0.2 }, 0).to('.grid-bg', { opacity: 1, duration: 0.6 }, 0.2)       // 0-0.8 REC + grid
      .to('#rec', { opacity: 0, duration: 0.3 }, 0.9)
      .to(cv, { opacity: 1, duration: 0.8 }, 0.8)                                                           // 0.8-2.6 emerge + 360 spin
      .to(pose, { ry: 0, s: aspect() < 1 ? 0.72 : 1, duration: 1.8, ease: 'power3.out' }, 0.8)   // smaller on portrait phones so the dome fits
      .to(pose, { glow: 1, duration: 1.4, ease: 'steps(10)' }, 1.0)                                         // stepped ease = boot flicker
      .to(ht, { opacity: 1, duration: 0.1 }, 1.0).add(type(ht, 'SMARTLINK // SYSTEM BOOT', 1.2), 1.0)
      .to(['#brk', '#hs'], { opacity: 1, duration: 0.3 }, 2.6).add(type(hs, 'SCANNING...', 0.5), 2.6)       // 2.6-3.8 scan
      .to(pose, { ry: -0.5, rx: -0.06, duration: 0.4, ease: 'power1.inOut' }, 2.6)
      .to(pose, { ry: 0.5, rx: 0.07, duration: 0.8, ease: 'sine.inOut' }, 3.0)
      .fromTo('#scan', { left: '-5%', opacity: 1 }, { left: '105%', duration: 1.2, ease: 'none' }, 2.6).set('#scan', { opacity: 0 }, 3.8)
      .to(pose, { ry: 0, rx: 0, duration: 0.4, ease: 'power2.out' }, 3.8)                                   // 3.8-4.4 lock-on
      .to('#brk', { scale: 0.42, duration: 0.6, ease: 'power3.inOut' }, 3.8).call(() => { hs.textContent = 'TARGET LOCKED' }, undefined, 3.8)
      .to(pose, { glow: 1.8, duration: 0.2, yoyo: true, repeat: 1 }, 4.0)
      .to(['#brk', '#hs', '#ht'], { opacity: 0, duration: 0.3 }, 4.4)                                       // 4.4-5.6 fly into lens + iris
      .to(pose, { z: 6, s: 2.4, duration: 1.2, ease: 'power3.in' }, 4.4)
      .to(ir, { r: 75, duration: 0.9, ease: 'power2.in', onUpdate: setIris }, 4.7).to(ring, { opacity: 1, duration: 0.1 }, 4.7).to(ring, { opacity: 0, duration: 0.3 }, 5.5)
      .to(cv, { opacity: 0, duration: 0.3 }, 5.3)
      .to('.w', { strokeDashoffset: 0, duration: 0.8, stagger: 0.06, ease: 'none' }, 5.2)                   // 5.6-6.5 wireframe + node pan
      .fromTo('#pan', { x: 60 }, { x: -60, duration: 0.9, ease: 'sine.inOut' }, 5.6)
      .to('.nd', { opacity: 1, stagger: 0.2, duration: 0.15 }, 5.65).to('.ro', { opacity: 1, stagger: 0.1, duration: 0.3 }, 5.6)
      .to('.ro', { opacity: 0, duration: 0.5 }, 6.5).to(inside, { opacity: 0.14, duration: 0.7 }, 6.5)      // HUD fades to background
      .add(() => { placeFinal(aspect(), root.current!.clientHeight) }, 6.5).to(cv, { opacity: 1, duration: 0.7 }, 6.5)                  // camera returns small, right side
    if (isLowPower()) t.timeScale(7.2 / 3.5)                                                                // low-power: ~3.5s
    tl.current = t

    return () => { clearTimeout(failsafe); removeEventListener('pointermove', onMove); removeEventListener('keydown', onKey) }
  }, { scope: root })

  return (
    <section id="hero" ref={root} aria-label="SmartLink hero">
      <IntroOverlay />
      <CameraScene />
      <div className="copy">
        <p className="eb">ICT &amp; SECURITY SOLUTIONS · ADDIS ABABA · SINCE 2008</p>
        <h1>Security, Safety &amp; Communication</h1>
        <p className="sub">Integrated security, safety and network systems for banks, government, NGOs and enterprises across Ethiopia.</p>
        <div className="cta"><a className="btn p" href="#services">Explore Solutions</a></div>
        <div className="chips">
          <a className="chip" href="#services?cat=security"><Icon d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" />Security</a>
          <a className="chip" href="#services?cat=safety"><Icon d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 3-7 1 1 1 2 2 3 1-2 1-5 1-8z" />Safety</a>
          <a className="chip" href="#services?cat=communication"><Icon d="M2 9a15 15 0 0 1 20 0M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M12 20h.01" />Communication</a>
        </div>
      </div>
      <div className="proof"><span>180+ branches networked ·</span><span>113 weredas secured ·</span><span>270 access points deployed ·</span><span>Premier Cisco Partner</span></div>
      <button id="skip" type="button" onClick={skip}>Skip intro (Esc)</button>
    </section>
  )
}