import { useEffect, useRef, useState } from 'react'

/* Does the visitor prefer reduced motion? */
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/* One-shot in-view flag */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px', ...options }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

/* Per-route document title + description */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title
    if (description) {
      let el = document.querySelector('meta[name="description"]')
      if (el) el.setAttribute('content', description)
    }
  }, [title, description])
}

/* Count-up that starts when scrolled into view */
export function useCountUp(to, { duration = 1500, started }) {
  const [val, setVal] = useState(0)
  const done = useRef(false)
  useEffect(() => {
    if (!started || done.current) return
    done.current = true
    if (prefersReducedMotion()) {
      setVal(to)
      return
    }
    let raf
    const t0 = performance.now()
    const step = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      done.current = false
    }
  }, [started, to, duration])
  return val
}

/* Document scroll progress, 0..1 */
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return p
}
