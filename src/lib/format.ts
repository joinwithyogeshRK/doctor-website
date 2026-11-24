const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export const formatPrice = (value: number) => inr.format(value)

export const formatCount = (value: number) =>
  new Intl.NumberFormat('en-IN').format(value)

/** YYYY-MM-DD for today, used as the booking date floor. */
export const todayISO = () => {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  return new Date(d.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ')
