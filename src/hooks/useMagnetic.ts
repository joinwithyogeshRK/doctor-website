import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from './useReducedMotion'

/**
 * Pulls an element slightly toward the cursor while it is hovered.
 * Used only on the two primary calls to action.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 0.3) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || window.matchMedia('(hover: none)').matches) return

    const quickX = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const quickY = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      quickX((event.clientX - (rect.left + rect.width / 2)) * strength)
      quickY((event.clientY - (rect.top + rect.height / 2)) * strength)
    }
    const onLeave = () => {
      quickX(0)
      quickY(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [reduced, strength])

  return ref
}
