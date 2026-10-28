import { useEffect, useRef } from 'react'
/** Decorative seam between two sections: a gradient line that draws itself, a glowing diamond node and a slow light pulse. */
export default function Divider() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(e => { if (e[0].isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.5 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="sep" aria-hidden="true">
      <span className="sep-line" /><span className="sep-pulse" /><span className="sep-node" />
    </div>
  )
}