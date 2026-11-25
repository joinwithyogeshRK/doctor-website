import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, CalendarClock, ShieldCheck } from 'lucide-react'
import { doctor, heroStats } from '../../data/doctor'
import { consultationSlots } from '../../data/consultation'
import { scrollToSection } from '../../hooks/useSmoothScroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Button } from '../ui/Button'
import { CountStat } from '../ui/Bits'
import { HeroSceneMount } from '../three/SceneMount'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const visual = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const nextSlot = consultationSlots.find((slot) => slot.available)

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
        .from(
          '[data-hero-visual]',
          { opacity: 0, scale: 0.96, yPercent: 3, duration: 1.2 },
          '-=1.25',
        )
        .from('[data-hero-chip-float]', { opacity: 0, y: 18, duration: 0.6 }, '-=0.5')
    }, root)

    return () => ctx.revert()
  }, [reduced])

  // The subject leans toward the cursor, which gives the flat composition depth.
  useEffect(() => {
    const el = visual.current
    if (!el || reduced || window.matchMedia('(hover: none)').matches) return

    const quickX = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' })
    const quickY = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' })
    const quickRotate = gsap.quickTo(el, 'rotateZ', { duration: 1.1, ease: 'power3.out' })

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = (event.clientY / window.innerHeight) * 2 - 1
      quickX(x * -16)
      quickY(y * -12)
      quickRotate(x * -0.7)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      gsap.set(el, { x: 0, y: 0, rotateZ: 0 })
    }
  }, [reduced])

  return (
    <section
      ref={root}
      id="hero"
      className="relative isolate overflow-hidden bg-white pt-[var(--nav-h)]"
    >
      {/* Pale sky wash from the upper right, over white */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_85%_at_80%_6%,#e4f2fb_0%,#f2f8fc_42%,#ffffff_76%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(55%_45%_at_52%_118%,rgba(56,182,232,0.16),transparent_70%)]"
      />
      {/* Faint silver grid, far enough back to read as texture rather than decoration */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.4] [background-image:linear-gradient(rgba(159,180,198,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(159,180,198,.22)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:radial-gradient(62%_52%_at_62%_28%,black,transparent)]"
      />

      <div className="container-page grid min-h-[calc(100svh-var(--nav-h))] items-center gap-8 pt-10 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] lg:gap-10 lg:pt-0 lg:pb-0">
        {/* Copy column */}
        <div className="relative z-10 max-w-xl">
          <p
            data-hero-chip
            className="inline-flex items-center gap-2 rounded-pill border border-ice-200 bg-white/85 px-3.5 py-1.5 font-display text-[0.78rem] font-medium text-slate-body shadow-[0_6px_20px_-14px_rgb(22_35_46/0.5)] backdrop-blur-md"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
            {doctor.credentials} · {doctor.registration}
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.7rem,6vw,4.15rem)] leading-[1.02] font-semibold tracking-[-0.038em] text-slate-ink">
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
            className="mt-6 max-w-[46ch] text-[1.05rem] leading-[1.65] text-slate-body"
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

          <a
            data-hero-chip-float
            href="#appointment"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('#appointment')
            }}
            className="mt-6 inline-flex items-center gap-2.5 rounded-pill border border-ice-200 bg-white py-2 pr-4 pl-2.5 text-[0.82rem] shadow-[0_8px_24px_-18px_rgb(22_35_46/0.6)] transition-colors duration-300 hover:border-brand-300 hover:bg-brand-50"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-50 text-brand-600">
              <CalendarClock className="h-[15px] w-[15px]" />
            </span>
            <span className="relative grid h-1.5 w-1.5 place-items-center">
              <span className="absolute h-1.5 w-1.5 rounded-full bg-teal-soft animate-pulse-ring" />
              <span className="h-1.5 w-1.5 rounded-full bg-teal-soft" />
            </span>
            <span className="font-display font-semibold text-slate-ink">Booking now</span>
            <span className="text-slate-muted">
              {nextSlot
                ? `next slot ${nextSlot.day} ${nextSlot.date}, ${nextSlot.time}`
                : 'call the clinic for openings'}
            </span>
          </a>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-ice-200 pt-7 sm:gap-6">
            {heroStats.map((stat) => (
              <div key={stat.label} data-hero-stat>
                <CountStat {...stat} />
              </div>
            ))}
          </dl>
        </div>

        {/* Visual column: WebGL atmosphere behind, the supplied composition in front */}
        <div className="relative h-[clamp(18rem,76vw,31rem)] lg:h-[calc(100svh-var(--nav-h))]">
          <HeroSceneMount />

          <div
            data-hero-visual
            ref={visual}
            className="absolute inset-0 z-10 flex items-end justify-center lg:bottom-[3%] lg:justify-end"
          >
            <div className="relative flex h-full w-full shrink-0 items-end justify-center lg:h-auto lg:w-[126%] lg:-mr-[18%]">
              {/* Stage glow, grounds the subject instead of leaving it floating */}
              <div
                aria-hidden
                className="absolute inset-x-[4%] bottom-[1%] -z-10 h-[26%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(56,182,232,0.3),rgba(56,182,232,0.08)_55%,transparent_78%)] blur-2xl"
              />
              <img
                src="/assets/doctor-hero.webp"
                srcSet="/assets/doctor-hero-720.webp 720w, /assets/doctor-hero.webp 1165w"
                sizes="(max-width: 1024px) 92vw, 46vw"
                alt={`${doctor.name}, ${doctor.designation}`}
                width={1165}
                height={941}
                fetchPriority="high"
                decoding="async"
                className="max-h-full w-auto max-w-none shrink-0 drop-shadow-[0_28px_55px_rgba(22,35,46,0.16)] [mask-image:linear-gradient(to_right,transparent,black_6%,black_100%)] lg:max-h-none lg:w-full"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Section seam into the booking panel below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-ice-100"
      />
    </section>
  )
}
