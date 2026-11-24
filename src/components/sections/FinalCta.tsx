import { ArrowRight, CalendarClock, Phone, Siren } from 'lucide-react'
import { doctor } from '../../data/doctor'
import { clinic } from '../../data/clinic'
import { consultationSlots } from '../../data/consultation'
import { scrollToSection } from '../../hooks/useSmoothScroll'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Button } from '../ui/Button'
import { EcgLine } from '../ui/Bits'

export function FinalCta() {
  const reveal = useScrollReveal<HTMLDivElement>({ stagger: 0.07 })
  const nextSlot = consultationSlots.find((slot) => slot.available)

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-ink-950 pt-20 pb-24 md:pt-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(90%_120%_at_28%_10%,#17296f_0%,#0a1540_45%,#050b24_80%)]"
      />
      <div
        aria-hidden
        className="absolute -top-24 right-[12%] h-80 w-80 rounded-full bg-cyan-glow/12 blur-[110px] animate-orb"
      />

      <div ref={reveal} className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2
              data-reveal
              className="max-w-xl font-display text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-white"
            >
              Take care today for a healthier tomorrow
            </h2>
            <p
              data-reveal
              className="mt-5 max-w-lg text-[1.02rem] leading-[1.7] text-brand-100/72"
            >
              Book a slot, or call and speak to my team. If it is urgent, say so when
              you call — the clinic keeps slots free each day for exactly that.
            </p>

            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                magnetic
                icon={<ArrowRight className="h-4 w-4" />}
                onClick={() => scrollToSection('#appointment')}
              >
                Book an appointment
              </Button>
              <a href={`tel:${doctor.phone.replace(/\s/g, '')}`}>
                <Button size="lg" variant="ghost" icon={<Phone className="h-4 w-4" />}>
                  Contact the doctor
                </Button>
              </a>
            </div>

            <div data-reveal className="mt-10 max-w-md text-cyan-glow/45">
              <EcgLine />
            </div>
          </div>

          {/* Practical details, rather than another portrait */}
          <div data-reveal className="glass-dark rounded-[1.75rem] p-6 sm:p-8">
            <dl className="space-y-6">
              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-cyan-glow">
                  <CalendarClock className="h-[19px] w-[19px]" />
                </span>
                <span>
                  <dt className="font-display text-[0.9rem] font-semibold text-white">
                    Next available slot
                  </dt>
                  <dd className="mt-1 text-[0.88rem] text-brand-100/70">
                    {nextSlot
                      ? `${nextSlot.day} ${nextSlot.date}, ${nextSlot.time} — video consultation`
                      : 'Call the clinic for the next opening'}
                  </dd>
                </span>
              </div>

              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-cyan-glow">
                  <Phone className="h-[19px] w-[19px]" />
                </span>
                <span>
                  <dt className="font-display text-[0.9rem] font-semibold text-white">
                    Clinic line
                  </dt>
                  <dd className="mt-1 text-[0.88rem] text-brand-100/70">
                    <a
                      href={`tel:${clinic.phone.replace(/\s/g, '')}`}
                      className="underline-offset-4 hover:text-white hover:underline"
                    >
                      {clinic.phone}
                    </a>
                    <span className="block text-[0.8rem] text-brand-100/45">
                      {clinic.hours[0].days}, {clinic.hours[0].time}
                    </span>
                  </dd>
                </span>
              </div>

              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rose-pulse/15 text-rose-pulse">
                  <Siren className="h-[19px] w-[19px]" />
                </span>
                <span>
                  <dt className="font-display text-[0.9rem] font-semibold text-white">
                    In an emergency
                  </dt>
                  <dd className="mt-1 text-[0.88rem] text-brand-100/70">
                    Call your local emergency number. This site cannot triage urgent
                    symptoms.
                  </dd>
                </span>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
