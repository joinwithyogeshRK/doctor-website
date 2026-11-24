import { useState } from 'react'
import {
  Check,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  ShieldCheck,
  Video,
  VideoOff,
} from 'lucide-react'
import {
  callFeatures,
  consultationPlans,
  consultationSlots,
} from '../../data/consultation'
import { doctor } from '../../data/doctor'
import { cn, formatPrice } from '../../lib/format'
import { scrollToSection } from '../../hooks/useSmoothScroll'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Section, SectionHeading } from '../layout/Section'
import { Button } from '../ui/Button'
import { PulseOrbMount } from '../three/SceneMount'

/** A mock call window: the controls toggle so the interface feels alive. */
function CallMockup() {
  const [muted, setMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)

  const control = (active: boolean) =>
    cn(
      'grid h-11 w-11 place-items-center rounded-full transition-colors duration-200',
      active
        ? 'bg-rose-pulse/85 text-white'
        : 'bg-white/12 text-white hover:bg-white/20',
    )

  return (
    <div className="glass-dark overflow-hidden rounded-[1.75rem] p-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[radial-gradient(85%_80%_at_50%_15%,#1b2f86,#070f2e)]">
        {cameraOff ? (
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-white/10 font-display text-2xl font-semibold text-white">
              VS
            </span>
          </div>
        ) : (
          <img
            src="/assets/doctor-tile.webp"
            alt=""
            aria-hidden
            width={665}
            height={921}
            loading="lazy"
            className="absolute bottom-0 left-1/2 h-[96%] w-auto -translate-x-1/2"
          />
        )}

        {/* Call chrome */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-ink-950/55 px-2.5 py-1 text-[0.7rem] font-medium text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-pulse" />
            Live · 12:04
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-ink-950/55 px-2.5 py-1 text-[0.7rem] font-medium text-cyan-glow backdrop-blur-md">
            <ShieldCheck className="h-3 w-3" />
            Encrypted
          </span>
        </div>

        <p className="absolute bottom-3.5 left-3.5 rounded-pill bg-ink-950/55 px-3 py-1 text-[0.75rem] font-medium text-white backdrop-blur-md">
          {doctor.name}
        </p>

        {/* Self-view tile */}
        <div className="absolute right-3.5 bottom-3.5 h-14 w-20 overflow-hidden rounded-xl border border-white/15 sm:h-20 sm:w-28 bg-[linear-gradient(140deg,#24306b,#121a45)]">
          <span className="absolute inset-0 grid place-items-center font-display text-[0.7rem] text-white/55">
            You
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2.5 px-2 py-4">
        <button
          type="button"
          onClick={() => setMuted((v) => !v)}
          className={control(muted)}
          aria-pressed={muted}
          aria-label={muted ? 'Turn the microphone on' : 'Turn the microphone off'}
        >
          {muted ? <MicOff className="h-[18px] w-[18px]" /> : <Mic className="h-[18px] w-[18px]" />}
        </button>
        <button
          type="button"
          onClick={() => setCameraOff((v) => !v)}
          className={control(cameraOff)}
          aria-pressed={cameraOff}
          aria-label={cameraOff ? 'Turn the camera on' : 'Turn the camera off'}
        >
          {cameraOff ? (
            <VideoOff className="h-[18px] w-[18px]" />
          ) : (
            <Video className="h-[18px] w-[18px]" />
          )}
        </button>
        <button
          type="button"
          className={control(false)}
          aria-label="Share your reports on screen"
        >
          <MonitorUp className="h-[18px] w-[18px]" />
        </button>
        <button
          type="button"
          className="grid h-11 w-16 place-items-center rounded-pill bg-rose-pulse text-white transition-colors hover:bg-rose-pulse/85"
          aria-label="Leave the call"
        >
          <PhoneOff className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  )
}

export function Consultation() {
  const reveal = useScrollReveal<HTMLDivElement>({ stagger: 0.06 })
  const [slotId, setSlotId] = useState<string | null>(null)
  const [planId, setPlanId] = useState(consultationPlans[1].id)

  const slot = consultationSlots.find((s) => s.id === slotId)
  const plan = consultationPlans.find((p) => p.id === planId)

  return (
    <Section id="consultation" tone="dark" className="overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#050b24_0%,#0b1545_45%,#050b24_100%)]"
      />
      <PulseOrbMount className="pointer-events-none absolute top-0 right-[1%] hidden h-72 w-72 opacity-70 lg:block" />

      <div ref={reveal} className="container-page relative">
        <SectionHeading
          kicker="Consultation and video meetings"
          title="See me from wherever you are"
          lead="Video slots run every weekday evening. Send your reports beforehand and the twenty minutes go on decisions, not reading."
          tone="dark"
          align="left"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div data-reveal>
            <CallMockup />
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-2.5">
              {callFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-[0.84rem] text-brand-100/70"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-glow" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* Slots */}
            <div data-reveal>
              <h3 className="font-display text-[1.05rem] font-semibold text-white">
                Available slots this week
              </h3>
              <p className="mt-1.5 text-[0.86rem] text-brand-100/60">
                All times are IST. Pick one and it carries into the booking form.
              </p>
              <div
                role="radiogroup"
                aria-label="Consultation slots"
                className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
              >
                {consultationSlots.map((s) => {
                  const selected = s.id === slotId
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      disabled={!s.available}
                      onClick={() => setSlotId(s.id)}
                      className={cn(
                        'rounded-2xl border px-3 py-3 text-left transition-[background-color,border-color,transform] duration-250',
                        s.available
                          ? selected
                            ? 'border-cyan-glow/70 bg-cyan-glow/14 text-white'
                            : 'border-white/12 bg-white/6 text-brand-100/80 hover:-translate-y-0.5 hover:border-white/30'
                          : 'cursor-not-allowed border-white/6 bg-white/3 text-brand-100/28 line-through',
                      )}
                    >
                      <span className="block font-display text-[0.78rem] font-semibold">
                        {s.day} {s.date}
                      </span>
                      <span className="tnum mt-0.5 block text-[0.95rem] font-semibold">
                        {s.time}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Pricing */}
            <div data-reveal className="mt-9">
              <h3 className="font-display text-[1.05rem] font-semibold text-white">
                Consultation pricing
              </h3>
              <div
                role="radiogroup"
                aria-label="Consultation type"
                className="mt-4 space-y-2.5"
              >
                {consultationPlans.map((p) => {
                  const selected = p.id === planId
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setPlanId(p.id)}
                      className={cn(
                        'flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors duration-250',
                        selected
                          ? 'border-cyan-glow/60 bg-white/10'
                          : 'border-white/10 bg-white/5 hover:border-white/25',
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border',
                          selected ? 'border-cyan-glow' : 'border-white/35',
                        )}
                      >
                        {selected ? (
                          <span className="h-2 w-2 rounded-full bg-cyan-glow" />
                        ) : null}
                      </span>
                      <span className="flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-display text-[0.95rem] font-semibold text-white">
                            {p.name}
                            {p.featured ? (
                              <span className="ml-2 rounded-pill bg-cyan-glow/18 px-2 py-0.5 text-[0.65rem] font-semibold text-cyan-glow">
                                Most booked
                              </span>
                            ) : null}
                          </span>
                          <span className="tnum font-display text-[1.05rem] font-semibold text-white">
                            {formatPrice(p.price)}
                            <span className="ml-1 text-[0.72rem] font-medium text-brand-100/55">
                              / {p.duration}
                            </span>
                          </span>
                        </span>
                        <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                          {p.includes.map((item) => (
                            <span
                              key={item}
                              className="text-[0.78rem] text-brand-100/60"
                            >
                              · {item}
                            </span>
                          ))}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div
              data-reveal
              className="mt-7 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-[0.88rem] text-brand-100/75">
                {slot ? (
                  <>
                    <span className="font-semibold text-white">
                      {plan?.name}, {slot.day} {slot.date} at {slot.time}
                    </span>{' '}
                    — {formatPrice(plan?.price ?? 0)}
                  </>
                ) : (
                  'Choose a slot above to continue.'
                )}
              </p>
              <Button
                magnetic
                disabled={!slot}
                onClick={() => scrollToSection('#payment')}
              >
                Book online consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
