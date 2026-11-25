import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import { cn } from '../../lib/format'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Section, SectionHeading } from '../layout/Section'
import { StarRating } from '../ui/Bits'

export function Testimonials() {
  const reveal = useScrollReveal<HTMLDivElement>()
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir)
    setIndex((next + testimonials.length) % testimonials.length)
  }, [])

  const next = useCallback(() => go(index + 1, 1), [go, index])
  const previous = useCallback(() => go(index - 1, -1), [go, index])

  // Advances on its own, but stops as soon as someone takes control.
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (reduced || paused) return
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next, paused, reduced])

  const current = testimonials[index]

  return (
    <Section id="testimonials" tone="white">
      <div ref={reveal} className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            kicker="What patients say"
            title="Real stories from the clinic"
            lead="Names changed where patients asked. Every review is from someone treated here in the last three years."
            align="left"
          />

          <div
            data-reveal
            className="flex items-center gap-5 rounded-[1.5rem] border border-ice-200 bg-white px-6 py-5"
          >
            <div>
              <p className="tnum font-display text-[2rem] leading-none font-semibold text-slate-ink">
                4.9
                <span className="ml-1 text-[0.9rem] font-medium text-slate-muted">
                  / 5
                </span>
              </p>
              <StarRating rating={5} className="mt-2" />
            </div>
            <div className="border-l border-ice-200 pl-5">
              <ul className="flex -space-x-3">
                {testimonials.slice(0, 4).map((patient) => (
                  <li key={patient.id}>
                    <img
                      src={patient.avatar}
                      alt=""
                      aria-hidden
                      width={189}
                      height={189}
                      loading="lazy"
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[0.8rem] text-slate-muted">
                From 318 post-visit surveys
              </p>
            </div>
          </div>
        </div>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            data-reveal
            className="relative overflow-hidden rounded-[1.75rem] border border-ice-200 bg-white px-6 py-10 shadow-lift sm:px-12 sm:py-14"
          >
            <Quote
              aria-hidden
              className="absolute top-8 right-10 h-20 w-20 text-brand-50"
              fill="currentColor"
            />

            <div
              aria-live="polite"
              aria-atomic="true"
              className="relative min-h-[16rem] sm:min-h-[14rem]"
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={current.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -28 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StarRating rating={current.rating} />
                  <blockquote className="mt-5 max-w-[46ch] font-display text-[1.15rem] leading-[1.55] font-medium text-slate-ink sm:text-[1.45rem]">
                    “{current.quote}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3.5">
                    <img
                      src={current.avatar}
                      alt=""
                      aria-hidden
                      width={189}
                      height={189}
                      loading="lazy"
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-100"
                    />
                    <span>
                      <span className="block font-display text-[0.95rem] font-semibold text-slate-ink">
                        {current.name}
                      </span>
                      <span className="block text-[0.8rem] text-slate-muted">
                        {current.context}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div data-reveal className="mt-7 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous review"
              className="grid h-11 w-11 place-items-center rounded-full border border-ice-200 bg-white text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`Review ${i + 1} of ${testimonials.length}`}
                  aria-current={i === index}
                  className={cn(
                    'h-2 rounded-full transition-[width,background-color] duration-300',
                    i === index ? 'w-7 bg-brand-600' : 'w-2 bg-brand-200 hover:bg-brand-300',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="grid h-11 w-11 place-items-center rounded-full border border-ice-200 bg-white text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  )
}
