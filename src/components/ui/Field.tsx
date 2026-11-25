import { useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/format'

const shell =
  'w-full rounded-2xl border bg-white px-4 text-[0.95rem] text-slate-ink placeholder:text-slate-muted/80 transition-colors duration-200'
const ok = 'border-ice-200 hover:border-brand-200 focus:border-brand-500'
const bad = 'border-rose-pulse/70 focus:border-rose-pulse'

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-display text-[0.8rem] font-semibold text-slate-body"
    >
      {children}
    </label>
  )
}

function Error({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-[0.78rem] text-rose-pulse">
      {message}
    </p>
  )
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Field({ label, error, className, ...rest }: FieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(shell, 'h-12', error ? bad : ok)}
        {...rest}
      />
      <Error id={errorId} message={error} />
    </div>
  )
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  options: string[]
  placeholder?: string
}

export function SelectField({
  label,
  error,
  options,
  placeholder = 'Select an option',
  className,
  ...rest
}: SelectProps) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(shell, 'h-12 appearance-none pr-10', error ? bad : ok)}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-brand-600"
        />
      </div>
      <Error id={errorId} message={error} />
    </div>
  )
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

export function TextAreaField({ label, error, className, ...rest }: TextAreaProps) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        rows={3}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(shell, 'resize-none py-3 leading-relaxed', error ? bad : ok)}
        {...rest}
      />
      <Error id={errorId} message={error} />
    </div>
  )
}

/** Segmented control used for the consultation type. */
export function ChoiceGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: Array<{ value: T; label: string }>
  onChange: (value: T) => void
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 font-display text-[0.8rem] font-semibold text-slate-body">
        {label}
      </legend>
      <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-ice-200 bg-white p-1.5">
        {options.map((option) => {
          const active = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                'rounded-xl py-2.5 text-[0.82rem] font-semibold transition-colors duration-200',
                active
                  ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white'
                  : 'text-slate-muted hover:bg-brand-50 hover:text-brand-700',
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
