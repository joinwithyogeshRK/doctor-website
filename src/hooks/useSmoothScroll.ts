import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pointerState, updateScroll } from '../lib/scrollState'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

/**
 * Scrolls to a section, going through Lenis so the easing matches the page.
 *
 * The gap below the fixed header comes from each section's `scroll-mt-24`,
 * which both Lenis and native scrollIntoView already honour — adding a manual
 * offset on top of it double-counts the header.
 */
export function scrollToSection(hash: string) {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.1 })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Installs Lenis, keeps ScrollTrigger in sync with it, and feeds the shared
 * scroll/pointer snapshot the 3D scene reads.
 */
export function useSmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerState.x = (event.clientX / window.innerWidth) * 2 - 1
      pointerState.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  useEffect(() => {
    if (reduced) {
      const onScroll = () =>
        updateScroll(
          window.scrollY,
          document.documentElement.scrollHeight - window.innerHeight,
        )
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisInstance = lenis

    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      updateScroll(scroll, limit)
      ScrollTrigger.update()
    })

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [reduced])
}
