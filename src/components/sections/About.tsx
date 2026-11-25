import { useState } from 'react'
import { Award, BadgeCheck, GraduationCap, Play } from 'lucide-react'
import {
  achievements,
  certifications,
  doctor,
  expertise,
  qualifications,
} from '../../data/doctor'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Section } from '../layout/Section'
import { CountStat, EcgLine } from '../ui/Bits'
import { Modal } from '../ui/Modal'

export function About() {
  const reveal = useScrollReveal<HTMLDivElement>({ stagger: 0.07 })
  const [playerOpen, setPlayerOpen] = useState(false)

  return (
    <Section id="about" tone="mist">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent"
      />

      <div ref={reveal} className="container-page relative">
        <div className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* Visual column */}
          <div className="relative">
            <div
              data-reveal
              className="relative overflow-hidden rounded-[1.75rem] border border-ice-200 bg-white shadow-panel"
            >
              <img
                src="/assets/about-video.png"
                alt="Dr. Sharma during a procedure at Meridian Clinic"
                width={822}
                height={372}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setPlayerOpen(true)}
                aria-label="Play the clinic introduction"
                className="absolute inset-0 grid place-items-center bg-slate-ink/5 transition-colors duration-300 hover:bg-slate-ink/20"
              >
                <span className="relative grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-white/95 text-brand-700 shadow-[0_18px_40px_-14px_rgb(22_35_46/0.45)] transition-transform duration-300 hover:scale-105">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-white/70 animate-pulse-ring"
                  />
                  <Play className="relative h-5 w-5 translate-x-[1px] fill-current" />
                </span>
              </button>
            </div>

            <div
              data-reveal
              className="glass-light mt-5 flex items-center gap-5 rounded-[1.5rem] p-5"
            >
              <img
                src="/assets/heart-graphic.png"
                alt=""
                aria-hidden
                width={490}
                height={286}
                loading="lazy"
                className="h-20 w-auto animate-orb [mask-image:radial-gradient(closest-side,black_72%,transparent_100%)]"
              />
              <div>
                <p className="font-display text-sm font-semibold text-slate-ink">
                  {doctor.registration}
                </p>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-slate-muted">
                  {doctor.credentials}
                </p>
              </div>
            </div>

            <div
              data-reveal
              className="mt-6 grid grid-cols-3 gap-4 rounded-[1.5rem] border border-ice-200 bg-white p-5"
            >
              <CountStat value={15} suffix="+" label="Years" />
              <CountStat value={5000} suffix="+" label="Patients" />
              <CountStat value={18} label="Papers" />
            </div>
          </div>

          {/* Copy column */}
          <div>
            <p
              data-reveal
              className="font-display text-sm font-semibold text-brand-600"
            >
              About the doctor
            </p>
            <h2
              data-reveal
              className="mt-3 font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.12] font-semibold tracking-[-0.025em] text-slate-ink"
            >
              Fifteen years of listening first, then treating
            </h2>

            <div data-reveal className="mt-4 text-brand-300/70">
              <EcgLine className="h-8 max-w-sm text-brand-400/55" />
            </div>

            {doctor.bio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                data-reveal
                className="mt-4 text-[1rem] leading-[1.75] text-slate-muted"
              >
                {paragraph}
              </p>
            ))}

            {/* Education */}
            <div data-reveal className="mt-9">
              <h3 className="flex items-center gap-2 font-display text-[0.95rem] font-semibold text-slate-ink">
                <GraduationCap className="h-4 w-4 text-brand-600" />
                Medical education
              </h3>
              <ul className="mt-4 space-y-3.5">
                {qualifications.map((item) => (
                  <li
                    key={item.degree}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ice-200 pb-3.5 last:border-0"
                  >
                    <span>
                      <span className="block font-display text-[0.92rem] font-semibold text-slate-ink">
                        {item.degree}
                      </span>
                      <span className="block text-[0.82rem] text-slate-muted">
                        {item.institution}
                      </span>
                    </span>
                    <span className="tnum text-[0.78rem] font-medium text-brand-600">
                      {item.years}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div data-reveal className="mt-8">
              <h3 className="flex items-center gap-2 font-display text-[0.95rem] font-semibold text-slate-ink">
                <Award className="h-4 w-4 text-brand-600" />
                Professional achievements
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {achievements.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-ice-200 bg-white p-4"
                  >
                    <p className="font-display text-[0.88rem] font-semibold text-slate-ink">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[0.8rem] leading-relaxed text-slate-muted">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications and expertise */}
            <div data-reveal className="mt-8 grid gap-7 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 font-display text-[0.95rem] font-semibold text-slate-ink">
                  <BadgeCheck className="h-4 w-4 text-brand-600" />
                  Certifications
                </h3>
                <ul className="mt-3.5 space-y-2">
                  {certifications.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[0.84rem] leading-relaxed text-slate-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-[0.95rem] font-semibold text-slate-ink">
                  Areas of expertise
                </h3>
                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {expertise.map((item) => (
                    <li
                      key={item}
                      className="rounded-pill border border-brand-100 bg-white px-3 py-1.5 text-[0.78rem] font-medium text-brand-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={playerOpen}
        onClose={() => setPlayerOpen(false)}
        title="clinic introduction"
        labelledBy="player-title"
      >
        <div className="p-5 sm:p-6">
          <h3 id="player-title" className="sr-only">
            Clinic introduction
          </h3>
          <div className="overflow-hidden rounded-2xl bg-slate-ink">
            <img
              src="/assets/about-video.png"
              alt=""
              aria-hidden
              width={822}
              height={372}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-brand-700">
                <Play className="h-3.5 w-3.5 translate-x-[1px] fill-current" />
              </span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                <span className="block h-full w-[18%] rounded-full bg-cyan-glow" />
              </span>
              <span className="tnum text-[0.72rem] text-white/60">0:00 / 2:14</span>
            </div>
          </div>
          <p className="mt-4 text-[0.85rem] leading-relaxed text-slate-muted">
            The clip itself is not part of this frontend demonstration — the player
            is here to show how the walkthrough would sit on the page.
          </p>
        </div>
      </Modal>
    </Section>
  )
}
