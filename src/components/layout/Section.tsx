import type { ReactNode } from 'react'
import { cn } from '../../lib/format'

type Tone = 'dark' | 'light' | 'ice'

const tones: Record<Tone, string> = {
  dark: 'bg-ink-950 text-white',
  light: 'bg-white text-slate-ink',
  ice: 'bg-ice-100 text-slate-ink',
}

export function Section({
  id,
  tone = 'light',
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
      className={cn('relative scroll-mt-24 py-20 md:py-28', tones[tone], className)}
    >
      {children}
    </section>
  )
}

export function SectionHeading({
  kicker,
  title,
  lead,
  tone = 'light',
  align = 'center',
}: {
  kicker?: string
  title: ReactNode
  lead?: string
  tone?: Tone
  align?: 'center' | 'left'
}) {
  const dark = tone === 'dark'
  return (
    <header
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
      )}
    >
      {kicker ? (
        <p
          data-reveal
          className={cn(
            'mb-3 font-display text-sm font-semibold',
            dark ? 'text-cyan-glow' : 'text-brand-600',
          )}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        data-reveal
        className={cn(
          'font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.02em]',
          dark ? 'text-white' : 'text-slate-ink',
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          data-reveal
          className={cn(
            'mt-4 text-[1.0625rem] leading-relaxed',
            dark ? 'text-brand-100/75' : 'text-slate-muted',
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  )
}
