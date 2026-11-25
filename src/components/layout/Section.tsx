import type { ReactNode } from 'react'
import { cn } from '../../lib/format'

/** White, a pale tint, or a slightly stronger tint — the page's only rhythm. */
type Tone = 'white' | 'mist' | 'tint'

const tones: Record<Tone, string> = {
  white: 'bg-white',
  mist: 'bg-ice-50',
  tint: 'bg-ice-100',
}

export function Section({
  id,
  tone = 'white',
  className,
  children,
}: {
  id: string
  tone?: Tone
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative scroll-mt-24 py-20 text-slate-body md:py-28',
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  )
}

export function SectionHeading({
  kicker,
  title,
  lead,
  align = 'center',
}: {
  kicker?: string
  title: ReactNode
  lead?: string
  align?: 'center' | 'left'
}) {
  return (
    <header
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
      )}
    >
      {kicker ? (
        <p data-reveal className="mb-3 font-display text-sm font-semibold text-brand-700">
          {kicker}
        </p>
      ) : null}
      <h2
        data-reveal
        className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-slate-ink"
      >
        {title}
      </h2>
      {lead ? (
        <p data-reveal className="mt-4 text-[1.0625rem] leading-relaxed text-slate-muted">
          {lead}
        </p>
      ) : null}
    </header>
  )
}
