import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { services } from '../../data/services'
import type { Service } from '../../types'
import { cn } from '../../lib/format'
import { scrollToSection } from '../../hooks/useSmoothScroll'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Section, SectionHeading } from '../layout/Section'
import { Button } from '../ui/Button'

const accents: Record<Service['accent'], string> = {
  brand: 'from-brand-500/18 to-brand-500/0',
  rose: 'from-rose-pulse/18 to-rose-pulse/0',
  violet: 'from-violet-glow/18 to-violet-glow/0',
  cyan: 'from-cyan-glow/20 to-cyan-glow/0',
}

function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false)
  const panelId = `${service.id}-detail`

  return (
    <article
      data-reveal
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-ice-200 bg-white p-6',
        'transition-[transform,box-shadow,border-color] duration-400 ease-[var(--ease-out-quint)]',
        'hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift',
      )}
    >
      {/* Accent wash, revealed on hover */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-x-0 top-0 h-28 bg-gradient-to-b opacity-0 transition-opacity duration-400 group-hover:opacity-100',
          accents[service.accent],
        )}
      />

      <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-ice-100 transition-transform duration-400 ease-[var(--ease-out-quint)] group-hover:scale-[1.07]">
        <img
          src={service.icon}
          alt=""
          aria-hidden
          width={64}
          height={64}
          loading="lazy"
          className="h-8 w-8 object-contain"
        />
      </span>

      <h3 className="relative mt-5 font-display text-[1.0625rem] font-semibold text-slate-ink">
        {service.name}
      </h3>
      <p className="relative mt-2 text-[0.88rem] leading-relaxed text-slate-muted">
        {service.blurb}
      </p>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <p className="mt-3 border-t border-ice-200 pt-3 text-[0.85rem] leading-relaxed text-slate-muted">
              {service.detail}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="relative mt-5 inline-flex items-center gap-1.5 self-start font-display text-[0.82rem] font-semibold text-brand-600 transition-colors hover:text-brand-700"
      >
        {open ? 'Show less' : 'Learn more'}
        <Plus
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-300',
            open && 'rotate-45',
          )}
        />
      </button>
    </article>
  )
}

export function Services() {
  const reveal = useScrollReveal<HTMLDivElement>({ stagger: 0.055 })

  return (
    <Section id="services" tone="light">
      <div ref={reveal} className="container-page">
        <SectionHeading
          kicker="Our services"
          title="Comprehensive care for you and your family"
          lead="Eight areas of practice, all run from the same clinic so your records, tests and prescriptions stay in one place."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div data-reveal className="mt-12 flex justify-center">
          <Button
            variant="outline"
            icon={<ArrowUpRight className="h-4 w-4" />}
            onClick={() => scrollToSection('#appointment')}
          >
            Book one of these
          </Button>
        </div>
      </div>
    </Section>
  )
}
