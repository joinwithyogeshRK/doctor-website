import { Suspense, lazy } from 'react'
import { useInView } from '../../hooks/useCountUp'
import { useMediaQuery, useReducedMotion } from '../../hooks/useReducedMotion'

const HeroScene = lazy(() => import('./HeroScene'))
const PulseOrbScene = lazy(() => import('./PulseOrbScene'))

/**
 * Static stand-in for the scene: ambient lighting only, no object silhouette.
 * A solid shape here would sit awkwardly behind the portrait, so this reads as
 * light instead. Used while the scene loads and whenever motion is reduced.
 */
function SceneFallback() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute top-[12%] left-[8%] h-[42%] w-[52%] rounded-full bg-[radial-gradient(circle_at_45%_40%,rgba(54,215,244,0.3),rgba(46,107,255,0.18)_45%,transparent_72%)] blur-2xl" />
      <div className="absolute right-[6%] bottom-[18%] h-[38%] w-[44%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,107,255,0.22),transparent_70%)] blur-2xl" />
    </div>
  )
}

/**
 * Mounts the hero's WebGL scene only once it is on screen, and never when the
 * visitor has asked for reduced motion.
 */
export function HeroSceneMount() {
  const reduced = useReducedMotion()
  const isSmall = useMediaQuery('(max-width: 768px)')
  const { ref, inView } = useInView<HTMLDivElement>('120px')

  return (
    <div ref={ref} className="absolute inset-0">
      {reduced || !inView ? (
        <SceneFallback />
      ) : (
        <Suspense fallback={<SceneFallback />}>
          <HeroScene quality={isSmall ? 'low' : 'high'} />
        </Suspense>
      )}
    </div>
  )
}

/** The smaller consultation-section scene: one orb, cheap to run. */
export function PulseOrbMount({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>('150px')

  return (
    <div ref={ref} className={className}>
      {reduced || !inView ? (
        <SceneFallback />
      ) : (
        <Suspense fallback={<SceneFallback />}>
          <PulseOrbScene />
        </Suspense>
      )}
    </div>
  )
}
