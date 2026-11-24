import { features } from '../../data/services'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Section, SectionHeading } from '../layout/Section'
import { CountStat } from '../ui/Bits'

export function WhyChoose() {
  const reveal = useScrollReveal<HTMLDivElement>({ stagger: 0.06 })

  return (
    <Section id="why" tone="dark" className="overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(85%_70%_at_50%_0%,#13225f_0%,#050b24_62%)]"
      />
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-glow/10 blur-[110px]"
      />

      <div ref={reveal} className="container-page relative">
        <SectionHeading
          kicker="Why choose this practice"
          title="A trusted partner in health and wellness"
          lead="Six things that shape how care runs here, and the numbers behind each of them."
          tone="dark"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.id}
              data-reveal
              className="group glass-dark relative overflow-hidden rounded-[1.5rem] p-6 transition-[transform,border-color] duration-400 ease-[var(--ease-out-quint)] hover:-translate-y-1.5 hover:border-cyan-glow/35"
            >
              <span
                aria-hidden
                className="absolute -top-20 -right-16 h-44 w-44 rounded-full bg-cyan-glow/0 blur-3xl transition-colors duration-500 group-hover:bg-cyan-glow/14"
              />

              <div className="relative flex items-start justify-between gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 transition-transform duration-400 ease-[var(--ease-out-quint)] group-hover:scale-[1.07]">
                  <img
                    src={feature.icon}
                    alt=""
                    aria-hidden
                    width={64}
                    height={64}
                    loading="lazy"
                    className="h-8 w-8 object-contain"
                  />
                </span>
                {feature.stat ? (
                  <div className="text-right">
                    <CountStat
                      value={feature.stat.value}
                      suffix={feature.stat.suffix}
                      label={feature.stat.label}
                      tone="dark"
                    />
                  </div>
                ) : null}
              </div>

              <h3 className="relative mt-6 font-display text-[1.0625rem] font-semibold text-white">
                {feature.title}
              </h3>
              <p className="relative mt-2 text-[0.88rem] leading-relaxed text-brand-100/70">
                {feature.blurb}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
