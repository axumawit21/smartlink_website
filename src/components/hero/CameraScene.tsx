import { useEffect, useRef } from 'react'
import { pose, live, isLowPower, isTouch, prefersReducedMotion, placeFinal } from '../../lib/introState'

/**
 * Procedural dome camera. Three.js is imported dynamically so the headline/CTAs never wait for it.
 * Reads `pose` (tweened by GSAP in Hero) every frame; adds cursor-follow / sway / breathing once `live.idle`.
 */
export default function CameraScene() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!, hero = canvas.parentElement!
    const low = isLowPower(), touch = isTouch(), rm = prefersReducedMotion()
    let disposed = false, raf = 0, cleanup = () => {}

    ;(async () => {
      let THREE: typeof import('three')
      try { THREE = await import('three') } catch { canvas.style.display = 'none'; return }
      if (disposed) return
      let r: InstanceType<typeof THREE.WebGLRenderer>
      try { r = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !low && !touch, powerPreference: 'low-power' }) }
      catch { canvas.style.display = 'none'; return }   // no WebGL: the 2D intro still runs

      const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(35, 1, 0.1, 50); cam.position.z = 8
      const g = new THREE.Group()
      const metal = new THREE.MeshStandardMaterial({ color: 0x151c28, metalness: 0.8, roughness: 0.35 })
      // Low-power: simple transparent material. Otherwise glossy clearcoat glass (no transmission, to stay cheap).
      const dome = low
        ? new THREE.MeshStandardMaterial({ color: 0x0a1220, transparent: true, opacity: 0.4, roughness: 0.1, metalness: 0.3, side: THREE.DoubleSide })
        : new THREE.MeshPhysicalMaterial({ color: 0x0a1220, transparent: true, opacity: 0.38, roughness: 0.05, metalness: 0.1, clearcoat: 1, side: THREE.DoubleSide })
      const add = (geo: import('three').BufferGeometry, mat: import('three').Material, z: number, rot = false) => {
        const m = new THREE.Mesh(geo, mat); m.position.z = z; if (rot) m.rotation.x = Math.PI / 2; g.add(m)
      }
      add(new THREE.CylinderGeometry(1.05, 1.15, 0.35, 48), metal, -0.25, true)   // mounting base
      add(new THREE.CylinderGeometry(0.42, 0.5, 0.3, 32), metal, -0.5, true)      // neck / gimbal
      add(new THREE.TorusGeometry(1, 0.05, 12, 64), metal, 0)                      // dome rim
      add(new THREE.SphereGeometry(0.98, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), dome, 0, true) // dome bulges toward +z
      const lens = new THREE.Group(); lens.position.z = 0.4; g.add(lens)
      const part = (geo: import('three').BufferGeometry, mat: import('three').Material, z: number) => {
        const m = new THREE.Mesh(geo, mat); m.position.z = z; lens.add(m)
      }
      const disc = new THREE.MeshBasicMaterial({ color: 0x0070c0 }), core = new THREE.MeshBasicMaterial({ color: 0x22d3ee })
      part(new THREE.CircleGeometry(0.33, 40), new THREE.MeshBasicMaterial({ color: 0x02060c }), 0)
      part(new THREE.TorusGeometry(0.3, 0.04, 12, 48), new THREE.MeshStandardMaterial({ color: 0x0070c0, emissive: 0x0070c0, emissiveIntensity: 0.8, metalness: 0.6, roughness: 0.3 }), 0.01)
      part(new THREE.CircleGeometry(0.22, 40), disc, 0.02)   // glowing inner disc (#0070C0)
      part(new THREE.CircleGeometry(0.09, 32), core, 0.03)   // cyan core (#22D3EE)
      const led = new THREE.MeshBasicMaterial({ color: 0xff2a2a }), ledGeo = new THREE.SphereGeometry(0.018, 8, 8)
      for (let i = 0; i < 10; i++) {                           // ring of red IR LEDs
        const a = (i / 10) * Math.PI * 2, m = new THREE.Mesh(ledGeo, led); m.position.set(Math.cos(a) * 0.4, Math.sin(a) * 0.4, 0.03); lens.add(m)
      }
      const key = new THREE.PointLight(0x0070c0, 40, 0, 2); key.position.set(3, 2, 4)
      const rim = new THREE.PointLight(0x22d3ee, 40, 0, 2); rim.position.set(-3, 1.5, -1)
      scene.add(g, new THREE.AmbientLight(0x6688aa, 0.5), key, rim)
      const bc = disc.color.clone(), cc = core.color.clone()

      const size = () => {
        const hd = document.getElementById('hd')
        canvas.style.top = `${hd ? hd.offsetHeight : 62}px`           // fixed canvas == hero box at scroll 0
        canvas.style.height = `${hero.clientHeight}px`; canvas.style.width = `${hero.clientWidth}px`
        const w = hero.clientWidth, h = hero.clientHeight
        r.setPixelRatio(Math.min(devicePixelRatio, touch || low ? 1.25 : 1.5)) // pixel-ratio caps
        r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix()
        if (live.idle) placeFinal(w / h)
      }
      size()
      const ro = new ResizeObserver(size); ro.observe(hero)

      let ox = 0, oy = 0
      // "Observing" mode: after the hero, the camera parks in the right margin, glides to follow the page
      // and turns its head toward random [data-gaze] elements (cards, tabs, steps) as if watching them.
      const K = 2.5226 // world half-height at z=0 (fov 35, camera z 8)
      const roam = { w: 0, x: 0, y: 0, s: 0.3, ry: 0, rx: 0, el: null as HTMLElement | null, next: 0, init: false }
      const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
      const updateRoam = (t: number) => {
        const cr = canvas.getBoundingClientRect(), W = cr.width, H = cr.height, asp = W / H
        const toX = (px: number) => (px / W - 0.5) * 2 * K * asp, toY = (py: number) => -(py / H - 0.5) * 2 * K
        if (t > roam.next) {
          roam.next = t + 3 + Math.random() * 2.5
          const c = [...document.querySelectorAll<HTMLElement>('[data-gaze]')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.bottom > cr.top + 60 && b.top < innerHeight - 60 })
          roam.el = c.length ? c[Math.floor(Math.random() * c.length)] : null
        }
        let tx = W * 0.5, ty = Math.min(H, innerHeight - cr.top) * 0.5
        if (roam.el) { const b = roam.el.getBoundingClientRect(); tx = b.left + b.width / 2 - cr.left; ty = b.top + b.height / 2 - cr.top }
        const maxY = Math.min(H, innerHeight - cr.top) - 56
        const py = clamp(ty, 56, Math.max(60, maxY)), px = W - Math.max(46, W * 0.05)   // park in right margin, level with target
        const gx = toX(px), gy = toY(py), small = W < 768 ? 0.26 : 0.34
        if (!roam.init) { roam.x = P0.x; roam.y = P0.y; roam.s = P0.s; roam.init = true }
        roam.x += (gx - roam.x) * 0.03; roam.y += (gy - roam.y) * 0.03; roam.s += (small - roam.s) * 0.04
        const dx = toX(tx) - gx, dy = toY(ty) - gy                                     // look direction toward the target
        roam.ry += (clamp(Math.atan(dx / 2.5), -1, 1) + Math.sin(t * 1.7) * 0.05 - roam.ry) * 0.05
        roam.rx += (clamp(Math.atan(-dy / 2.5), -0.5, 0.5) - roam.rx) * 0.05
      }
      const P0 = { x: 0, y: 0, s: 1 }
      const frame = () => {
        raf = requestAnimationFrame(frame)
        const t = performance.now() / 1000, on = live.idle && !rm
        if (live.idle && rm) canvas.style.transform = `translateY(${-scrollY}px)`   // reduced motion: camera stays in the hero
        let wt = 0
        if (on) { const hh = hero.clientHeight; wt = clamp((scrollY - hh * 0.35) / (hh * 0.45), 0, 1) }
        roam.w += (wt - roam.w) * 0.08
        if (roam.w > 0.005) { if (!roam.init) { P0.x = pose.x; P0.y = pose.y; P0.s = pose.s } updateRoam(t) } else roam.init = false
        const w = roam.w
        // idle: smoothed (lerp) cursor follow with limited angle; auto-sway on touch
        const tx = !on ? 0 : touch ? Math.sin(t * 0.5) * 0.35 : live.mx * 0.45
        const ty = !on ? 0 : touch ? Math.sin(t * 0.37) * 0.08 : live.my * 0.25
        ox += (tx - ox) * 0.06; oy += (ty - oy) * 0.06
        const br = on ? Math.sin(t * 1.2) : 0                     // slow breathing
        const mix = (a: number, b: number) => a + (b - a) * w     // blend hero pose -> observing pose by scroll
        g.rotation.set(mix(pose.rx + oy, roam.rx), mix(pose.ry + ox, roam.ry), 0)
        g.position.set(mix(pose.x, roam.x), mix(pose.y, roam.y) + br * 0.05, pose.z)
        g.scale.setScalar(Math.max(0.01, mix(pose.s, roam.s) * (1 + br * 0.012)))
        disc.color.copy(bc).multiplyScalar(pose.glow); core.color.copy(cc).multiplyScalar(pose.glow)
        key.intensity = rim.intensity = 40 * pose.glow
        r.render(scene, cam)
      }
      // Pause when the tab is hidden
      const update = () => {
        const on = !document.hidden
        if (on && !raf) frame(); else if (!on) { cancelAnimationFrame(raf); raf = 0 }
      }
      document.addEventListener('visibilitychange', update); update()

      cleanup = () => {                                           // dispose everything on unmount
        cancelAnimationFrame(raf); raf = 0; ro.disconnect()
        document.removeEventListener('visibilitychange', update)
        scene.traverse(o => { const m = o as import('three').Mesh; m.geometry?.dispose(); (m.material as import('three').Material | undefined)?.dispose() })
        r.dispose()
      }
    })()

    return () => { disposed = true; cleanup() }
  }, [])

  return <canvas id="cv" ref={ref} aria-hidden="true" />
}
