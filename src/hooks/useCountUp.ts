import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Counts a statistic up once it scrolls into view.
 * With reduced motion the final value is shown immediately.
 */
export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      setValue(target)
      return
    }

    let frame = 0
    let started = false

    const run = (start: number) => {
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(target * eased))
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true
          run(performance.now())
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [duration, reduced, target])

  return { ref, value }
}

/** True once the element has been scrolled into view at least once. */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = '200px',
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
