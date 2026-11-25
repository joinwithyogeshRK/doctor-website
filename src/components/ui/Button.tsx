import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/format'
import { useMagnetic } from '../../hooks/useMagnetic'

type Variant = 'primary' | 'ghost' | 'light' | 'outline'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  magnetic?: boolean
  icon?: ReactNode
}

/* brand-600 and brand-700 both clear AA under white text; the lighter steps in
   the ramp do not, so they stay decorative. */
const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-[0_16px_34px_-18px_rgb(17_106_144/0.75)] hover:shadow-[0_20px_44px_-16px_rgb(17_106_144/0.85)]',
  ghost:
    'border border-ice-200 bg-white text-slate-ink hover:border-brand-300 hover:text-brand-700',
  light:
    'bg-white text-brand-700 border border-brand-100 shadow-lift hover:border-brand-300',
  outline:
    'border border-brand-600/35 text-brand-700 hover:border-brand-600 hover:bg-brand-50',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-8 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const magneticRef = useMagnetic<HTMLButtonElement>(0.22)

  return (
    <button
      ref={magnetic ? magneticRef : undefined}
      className={cn(
        'group/btn inline-flex items-center justify-center gap-2 rounded-pill font-display font-semibold',
        'transition-[background-color,box-shadow,border-color,transform] duration-300',
        'active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
      {icon ? (
        <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
          {icon}
        </span>
      ) : null}
    </button>
  )
}
