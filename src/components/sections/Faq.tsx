import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../../data/clinic'
import { doctor } from '../../data/doctor'
import { cn } from '../../lib/format'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Section, SectionHeading } from '../layout/Section'

export function Faq() {
  const reveal = useScrollReveal<HTMLDivElement>({ stagger: 0.05 })
  const [openId, setOpenId] = useState<string | null>(faqs[0].id)

  return (
    <Section id="faq" tone="light">
      <div ref={reveal} className="container-page">
        <SectionHeading
          kicker="Questions"
          title="Everything patients usually ask"
          lead="If your question is not here, call the clinic and my team will answer it the same working day."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {faqs.map((item) => {
            const open = item.id === openId
            return (
              <div key={item.id} data-reveal className="border-b border-ice-200">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                    aria-controls={`${item.id}-answer`}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-brand-700"
                  >
                    <span className="font-display text-[1.02rem] font-semibold text-slate-ink">
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-[background-color,transform] duration-300',
                        open
                          ? 'rotate-45 bg-brand-600 text-white'
                          : 'bg-ice-100 text-brand-700',
                      )}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={`${item.id}-answer`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pr-12 pb-6 text-[0.92rem] leading-[1.75] text-slate-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <p data-reveal className="mt-10 text-center text-[0.88rem] text-slate-muted">
          Still unsure?{' '}
          <a
            href={`tel:${doctor.phone.replace(/\s/g, '')}`}
            className="font-display font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            Call {doctor.phone}
          </a>
        </p>
      </div>
    </Section>
  )
}
