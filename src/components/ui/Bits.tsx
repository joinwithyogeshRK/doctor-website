import { Minus, Plus, Star } from 'lucide-react'
import { cn, formatCount } from '../../lib/format'
import { useCountUp } from '../../hooks/useCountUp'

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={cn('flex gap-0.5', className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-brand-200',
          )}
        />
      ))}
    </div>
  )
}

export function QuantityStepper({
  value,
  onChange,
  label,
  tone = 'light',
}: {
  value: number
  onChange: (next: number) => void
  label: string
  tone?: 'light' | 'ice'
}) {
  const btn = cn(
    'grid h-8 w-8 place-items-center rounded-full transition-colors duration-200 disabled:opacity-40',
    tone === 'light'
      ? 'bg-brand-50 text-brand-700 hover:bg-brand-100'
      : 'bg-white text-brand-700 hover:bg-brand-50',
  )

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        aria-label={`Remove one ${label}`}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="tnum w-6 text-center font-display text-sm font-semibold">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        disabled={value >= 9}
        onClick={() => onChange(value + 1)}
        aria-label={`Add one ${label}`}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

/** A statistic that counts up the first time it scrolls into view. */
export function CountStat({
  value,
  suffix,
  label,
  caption,
  tone = 'dark',
}: {
  value: number
  suffix?: string
  label: string
  caption?: string
  tone?: 'dark' | 'light'
}) {
  const { ref, value: shown } = useCountUp(value)
  const dark = tone === 'dark'

  return (
    <div>
      <p
        className={cn(
          'tnum font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-none font-semibold',
          dark ? 'text-white' : 'text-slate-ink',
        )}
      >
        <span ref={ref}>{formatCount(shown)}</span>
        {suffix ? (
          <span className={dark ? 'text-cyan-glow' : 'text-brand-500'}>{suffix}</span>
        ) : null}
      </p>
      <p
        className={cn(
          'mt-1.5 text-[0.82rem] font-medium',
          dark ? 'text-brand-100/80' : 'text-slate-muted',
        )}
      >
        {label}
      </p>
      {caption ? (
        <p className={cn('text-[0.72rem]', dark ? 'text-brand-200/45' : 'text-slate-muted/70')}>
          {caption}
        </p>
      ) : null}
    </div>
  )
}

/** The ECG trace used as a divider; the line draws itself once on reveal. */
export function EcgLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 40"
      fill="none"
      aria-hidden
      className={cn('h-10 w-full', className)}
      preserveAspectRatio="none"
    >
      <path
        d="M0 20h58l7-13 9 26 8-19 7 6h30l6-9 8 18 7-12 6 5h40l7-14 9 27 8-20 7 7h30l6-8 7 16 7-11 6 4h43"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="[animation:ecg-draw_2.4s_var(--ease-out-quint)_forwards] [stroke-dasharray:1] [stroke-dashoffset:1]"
      />
    </svg>
  )
}
