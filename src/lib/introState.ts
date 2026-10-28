/** Shared, non-React state so the GSAP timeline and the Three.js loop can talk without re-renders. */
export const pose = { ry: 0, rx: 0, x: 0, y: 0, z: 0, s: 1, glow: 1 }   // tweened by GSAP, read by CameraScene each frame
export const live = { idle: false, mx: 0, my: 0 }                       // idle = intro finished (cursor follow / breathing on)

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
export const isTouch = () => matchMedia('(pointer:coarse)').matches
export const isLowPower = () => innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4

export const introSeen = () => { try { return sessionStorage.getItem('sl') === '1' } catch { return false } }
export const markSeen = () => { try { sessionStorage.setItem('sl', '1') } catch { /* storage blocked: ignore */ } }
export const setIntroClass = (on: boolean) => document.documentElement.classList.toggle('intro', on)
export const introClassOn = () => document.documentElement.classList.contains('intro')

/** Resting pose: camera small on the RIGHT (top-right on narrow screens). World half-height at z=0 is ~2.52. */
export const finalPose = (aspect: number, h = 800) => {
  if (aspect > 1) return { x: 1.3 * aspect, y: 0, s: 0.92 }   // desktop / landscape: right side, large
  // Phones: camera sits above the headline (centre ~105px from the top), ~68px radius
  return { x: 0.5 * 2.5226 * aspect, y: 2.5226 * (1 - 210 / h), s: Math.min(0.6, Math.max(0.35, 343 / h)) }
}
export const placeFinal = (aspect: number, h?: number) => Object.assign(pose, { rx: 0, ry: 0, z: 0, glow: 1 }, finalPose(aspect, h))