import { useEffect, useRef, useState } from 'react'

const REDUCED = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Ajoute `.in` aux éléments `.reveal` du conteneur quand ils entrent dans le viewport. */
export function useRevealAll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    root.classList.add('rv')
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal'))
    if (REDUCED || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

/** Compteur animé 0 → value au passage dans le viewport. */
export function useCountUp(value: number, duration = 1200) {
  const ref = useRef<HTMLElement>(null)
  const [n, setN] = useState(REDUCED ? value : 0)
  useEffect(() => {
    const el = ref.current
    if (!el || REDUCED) return
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value, duration])
  return { ref, n }
}
