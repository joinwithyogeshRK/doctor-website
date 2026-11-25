import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { clinic } from '../../data/clinic'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Section, SectionHeading } from '../layout/Section'
import { Button } from '../ui/Button'

/** A drawn stand-in for an embedded map — no tiles are loaded. */
function MapPlaceholder() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-ice-200 bg-[#eef2f7]">
      <svg
        viewBox="0 0 400 250"
        className="absolute inset-0 h-full w-full"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="250" fill="#eaf0f6" />
        {/* Parks and water */}
        <path d="M0 196h118l26 54H0z" fill="#d7e9d8" />
        <path d="M296 0h104v62l-104 24z" fill="#cfe3f2" />
        {/* Blocks */}
        {[
          [24, 28, 86, 54],
          [132, 20, 64, 62],
          [222, 34, 52, 48],
          [38, 110, 72, 56],
          [138, 104, 92, 68],
          [258, 118, 78, 50],
          [176, 196, 96, 44],
          [306, 192, 72, 48],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#e0e6ee" />
        ))}
        {/* Roads */}
        <g stroke="#ffffff" fill="none" strokeLinecap="round">
          <path d="M0 96h400" strokeWidth="13" />
          <path d="M0 182h400" strokeWidth="9" />
          <path d="M120 0v250" strokeWidth="11" />
          <path d="M248 0v250" strokeWidth="8" />
          <path d="M340 60L400 96" strokeWidth="7" />
        </g>
        <g stroke="#f7b955" fill="none" strokeWidth="3" strokeDasharray="9 7">
          <path d="M0 96h400" />
        </g>
      </svg>

      {/* Marker */}
      <div className="absolute top-[38%] left-[46%] -translate-x-1/2 -translate-y-full">
        <span className="relative grid place-items-center">
          <span
            aria-hidden
            className="absolute h-10 w-10 rounded-full bg-brand-500/35 animate-pulse-ring"
          />
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-white shadow-[0_12px_24px_-10px_rgb(29_78_216/0.9)]">
            <MapPin className="h-5 w-5" />
          </span>
        </span>
      </div>

      <div className="glass-light absolute bottom-3.5 left-3.5 rounded-xl px-3.5 py-2.5">
        <p className="font-display text-[0.82rem] font-semibold text-slate-ink">
          {clinic.name}
        </p>
        <p className="text-[0.72rem] text-slate-body">{clinic.addressLines[0]}</p>
      </div>

      <span className="absolute right-3.5 bottom-3.5 rounded-lg bg-white/90 px-2.5 py-1 text-[0.65rem] font-medium text-slate-body backdrop-blur-sm">
        Map placeholder
      </span>
    </div>
  )
}

export function Clinic() {
  const reveal = useScrollReveal<HTMLDivElement>({ stagger: 0.06 })

  return (
    <Section id="clinic" tone="mist">
      <div ref={reveal} className="container-page">
        <SectionHeading
          kicker="The clinic"
          title="Where you will be seen"
          lead="A single-site clinic in Hauz Khas with its own lab, imaging and pharmacy, so most of your visit happens under one roof."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div data-reveal className="overflow-hidden rounded-[1.75rem] bg-white shadow-lift">
            <img
              src="/assets/clinic-building.png"
              alt={`${clinic.name} in Hauz Khas, New Delhi`}
              width={656}
              height={444}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-7">
              <div className="flex gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-[18px] w-[18px]" />
                </span>
                <span>
                  <span className="block font-display text-[0.85rem] font-semibold text-slate-ink">
                    Address
                  </span>
                  {clinic.addressLines.map((line) => (
                    <span
                      key={line}
                      className="block text-[0.82rem] leading-relaxed text-slate-muted"
                    >
                      {line}
                    </span>
                  ))}
                </span>
              </div>

              <div className="flex gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Phone className="h-[18px] w-[18px]" />
                </span>
                <span>
                  <span className="block font-display text-[0.85rem] font-semibold text-slate-ink">
                    Contact
                  </span>
                  <a
                    href={`tel:${clinic.phone.replace(/\s/g, '')}`}
                    className="block text-[0.82rem] text-slate-muted underline-offset-4 hover:text-brand-700 hover:underline"
                  >
                    {clinic.phone}
                  </a>
                  <a
                    href={`mailto:${clinic.email}`}
                    className="block text-[0.82rem] text-slate-muted underline-offset-4 hover:text-brand-700 hover:underline"
                  >
                    {clinic.email}
                  </a>
                </span>
              </div>

              <div className="flex gap-3.5 sm:col-span-2">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Clock className="h-[18px] w-[18px]" />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-[0.85rem] font-semibold text-slate-ink">
                    Opening hours
                  </span>
                  <span className="mt-1.5 block space-y-1">
                    {clinic.hours.map((entry) => (
                      <span
                        key={entry.days}
                        className="flex flex-wrap justify-between gap-x-4 text-[0.82rem] text-slate-muted"
                      >
                        <span>{entry.days}</span>
                        <span className="tnum font-medium text-slate-ink/80">
                          {entry.time}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div data-reveal>
              <MapPlaceholder />
            </div>

            <div
              data-reveal
              className="flex-1 rounded-[1.75rem] border border-ice-200 bg-white p-6 sm:p-7"
            >
              <h3 className="font-display text-[1rem] font-semibold text-slate-ink">
                Available facilities
              </h3>
              <ul className="mt-4 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
                {clinic.facilities.map((facility) => (
                  <li
                    key={facility}
                    className="flex items-start gap-2 text-[0.84rem] leading-relaxed text-slate-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow"
                    />
                    {facility}
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                size="sm"
                className="mt-6"
                icon={<Navigation className="h-3.5 w-3.5" />}
              >
                Get directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
