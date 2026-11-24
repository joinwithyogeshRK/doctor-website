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

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-[0_18px_40px_-18px_rgb(29_78_216/0.9)] hover:shadow-[0_22px_50px_-16px_rgb(46_107_255/0.95)]',
  ghost:
    'bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/16',
  light:
    'bg-white text-brand-700 border border-brand-100 shadow-lift hover:border-brand-300',
  outline:
    'border border-brand-600/30 text-brand-700 hover:border-brand-600 hover:bg-brand-50',
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
