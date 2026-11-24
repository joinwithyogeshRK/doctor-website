import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
  /** CSS selector for the children to stagger; omit to animate the root itself. */
  selector?: string
  y?: number
  stagger?: number
  duration?: number
  start?: string
}

/**
 * One restrained entrance per section: a short rise and fade, triggered once.
 * Returns a ref to put on the section wrapper.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  selector = '[data-reveal]',
  y = 18,
  stagger = 0.06,
  duration = 0.7,
  start = 'top 82%',
}: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const root = ref.current
    if (!root || reduced) return

    const targets = selector
      ? Array.from(root.querySelectorAll<HTMLElement>(selector))
      : [root]
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start, once: true },
      })
    }, root)

    return () => ctx.revert()
  }, [duration, reduced, selector, stagger, start, y])

  return ref
}

/** Parallax drift for a decorative layer, measured against the viewport. */
export function useParallax<T extends HTMLElement = HTMLDivElement>(distance = 60) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [distance, reduced])

  return ref
}
