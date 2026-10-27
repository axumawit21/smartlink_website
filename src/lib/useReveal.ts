import { useEffect, type RefObject } from 'react'
/** Adds .in to every .rv element once it scrolls into view (all visible at once for reduced motion). */
export function useReveal(root: RefObject<HTMLElement>, deps: unknown[] = []) {
  useEffect(() => {
    const els = root.current!.querySelectorAll('.rv:not(.in)')
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.1 })
    els.forEach(e => io.observe(e)); return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
