import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, HeartPulse, Users } from 'lucide-react'
import { doctor, heroStats } from '../../data/doctor'
import { scrollToSection } from '../../hooks/useSmoothScroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Button } from '../ui/Button'
import { CountStat } from '../ui/Bits'
import { HeroSceneMount } from '../three/SceneMount'

/** The two glass readouts that float over the portrait, as in the reference. */
function FloatingBadge({
  icon,
  value,
  label,
  className,
  delay,
}: {
  icon: React.ReactNode
  value: string
  label: string
  className: string
  delay: string
}) {
  return (
    <div
      data-hero-badge
      className={`glass-dark absolute hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/14">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="tnum block font-display text-lg font-semibold text-white">
          {value}
        </span>
        <span className="block text-[0.72rem] text-brand-100/70">{label}</span>
      </span>
    </div>
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  // One orchestrated entrance for the whole hero, rather than per-element fades.
  useEffect(() => {
    if (reduced || !root.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-chip]', { y: 14, opacity: 0, duration: 0.55 })
        .from('[data-hero-line]', { yPercent: 108, duration: 0.85, stagger: 0.09 }, '-=0.25')
        .from('[data-hero-copy]', { y: 16, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('[data-hero-cta]', { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.35')
        .from('[data-hero-stat]', { y: 18, opacity: 0, duration: 0.5, stagger: 0.09 }, '-=0.3')
        .from('[data-hero-portrait]', { opacity: 0, scale: 0.94, duration: 1.1 }, '-=1.1')
        .from('[data-hero-badge]', { opacity: 0, x: 24, duration: 0.6, stagger: 0.12 }, '-=0.6')
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={root}
      id="hero"
      className="relative isolate overflow-hidden bg-ink-950 pt-[var(--nav-h)]"
    >
      {/* Gradient ground */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_85%_at_72%_18%,#15277a_0%,#0a1540_42%,#050b24_78%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-px bg-gradient-to-r from-transparent via-cyan-glow/30 to-transparent"
      />
      {/* Ambient lighting: soft, never a hard-edged shape */}
      <div
        aria-hidden
        className="absolute top-[6%] right-[26%] -z-20 h-[26rem] w-[26rem] rounded-full bg-brand-500/18 blur-[120px] animate-orb"
      />
      <div
        aria-hidden
        className="absolute -right-24 bottom-[8%] -z-20 h-[30rem] w-[30rem] rounded-full bg-violet-glow/14 blur-[130px]"
      />
      {/* Faint grid, gives the dark field some depth without reading as decoration */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.16] [background-image:linear-gradient(rgba(126,167,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(126,167,255,.14)_1px,transparent_1px)] [background-size:68px_68px] [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]"
      />

      <div className="container-page grid min-h-[calc(100svh-var(--nav-h))] items-center gap-10 pt-10 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pt-0 lg:pb-0">
        {/* Copy column */}
        <div className="relative z-10 max-w-xl">
          <p
            data-hero-chip
            className="inline-flex items-center gap-2 rounded-pill border border-white/14 bg-white/8 px-3.5 py-1.5 font-display text-[0.78rem] font-medium text-brand-100/85 backdrop-blur-md"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute h-2 w-2 rounded-full bg-cyan-glow animate-pulse-ring" />
              <span className="h-2 w-2 rounded-full bg-cyan-glow" />
            </span>
            {doctor.designation} · {doctor.credentials}
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,6.2vw,4.1rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-white">
            {doctor.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span
                  data-hero-line
                  className={i === 1 ? 'block text-gradient-cool' : 'block'}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-copy
            className="mt-6 max-w-lg text-[1.05rem] leading-[1.65] text-brand-100/72"
          >
            {doctor.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <span data-hero-cta className="inline-flex">
              <Button
                size="lg"
                magnetic
                icon={<ArrowRight className="h-4 w-4" />}
                onClick={() => scrollToSection('#appointment')}
              >
                Book appointment
              </Button>
            </span>
            <span data-hero-cta className="inline-flex">
              <Button size="lg" variant="ghost" onClick={() => scrollToSection('#services')}>
                Explore services
              </Button>
            </span>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-5 border-t border-white/10 pt-7">
            {heroStats.map((stat) => (
              <div key={stat.label} data-hero-stat>
                <CountStat {...stat} tone="dark" />
              </div>
            ))}
          </dl>
        </div>

        {/* Visual column: WebGL behind, the cleaned portrait in front */}
        <div className="relative h-[clamp(22rem,52vw,38rem)] lg:h-[calc(100svh-var(--nav-h))]">
          <HeroSceneMount />

          <div
            data-hero-portrait
            className="absolute inset-x-0 bottom-0 z-10 flex justify-center lg:bottom-[7%]"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-x-[-32%] bottom-[-10%] -z-10 h-[78%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(46,107,255,0.6),rgba(54,215,244,0.18)_45%,transparent_70%)] blur-2xl"
              />
              <img
                src="/assets/doctor-portrait.png"
                alt={`${doctor.name}, ${doctor.designation}`}
                width={270}
                height={480}
                className="mask-feather-b h-[clamp(15rem,36vw,27rem)] w-auto drop-shadow-[0_30px_60px_rgba(3,10,40,0.55)] animate-orb"
                fetchPriority="high"
              />
            </div>
          </div>

          <FloatingBadge
            icon={<Users className="h-[18px] w-[18px] text-cyan-glow" />}
            value="5,000+"
            label="Happy patients"
            className="top-[12%] right-0 animate-orb lg:right-[-4%]"
            delay="0s"
          />
          <FloatingBadge
            icon={<HeartPulse className="h-[18px] w-[18px] text-rose-pulse" />}
            value="98%"
            label="Success rate"
            className="bottom-[20%] left-0 animate-orb lg:left-[-6%]"
            delay="1.4s"
          />
        </div>
      </div>

      {/* Section seam into the light content below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-ink-950"
      />
    </section>
  )
}
