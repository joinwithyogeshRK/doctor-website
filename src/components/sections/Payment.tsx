import { useMemo, useState } from 'react'
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Smartphone,
  Wallet,
} from 'lucide-react'
import type { PaymentMethod } from '../../types'
import { consultationPlans } from '../../data/consultation'
import { cn, formatPrice } from '../../lib/format'
import { useCart } from '../../context/CartContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Section, SectionHeading } from '../layout/Section'
import { Button } from '../ui/Button'
import { Field } from '../ui/Field'
import { Modal } from '../ui/Modal'

const ADD_ONS = [
  { id: 'a1', name: 'Lipid profile', price: 600 },
  { id: 'a2', name: 'ECG on site', price: 400 },
  { id: 'a3', name: 'Home sample collection', price: 200 },
]

const METHODS: Array<{ id: PaymentMethod; label: string; icon: typeof CreditCard }> = [
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'netbanking', label: 'Net banking', icon: Building2 },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
]

const BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank']

/** Card marks drawn in CSS rather than used as low-resolution bitmaps. */
function PaymentMarks() {
  return (
    <ul className="flex flex-wrap items-center gap-2.5" aria-label="Accepted payment methods">
      <li className="grid h-8 w-12 place-items-center rounded-md border border-ice-200 bg-white font-display text-[0.68rem] font-bold tracking-tight text-[#1a1f71] italic">
        VISA
      </li>
      <li className="grid h-8 w-12 place-items-center rounded-md border border-ice-200 bg-white">
        <span className="flex" aria-label="Mastercard">
          <span className="h-4 w-4 rounded-full bg-[#eb001b]" />
          <span className="-ml-1.5 h-4 w-4 rounded-full bg-[#f79e1b] mix-blend-multiply" />
        </span>
      </li>
      <li className="grid h-8 w-12 place-items-center rounded-md border border-ice-200 bg-white font-display text-[0.65rem] font-bold text-[#097939]">
        UPI
      </li>
      <li className="grid h-8 w-14 place-items-center rounded-md border border-ice-200 bg-white font-display text-[0.65rem] font-semibold text-slate-ink">
        Pay
      </li>
    </ul>
  )
}

type Status = 'idle' | 'processing'

export function Payment() {
  const reveal = useScrollReveal<HTMLDivElement>()
  const { lines, subtotal: medicinesSubtotal, clear } = useCart()

  const [planId, setPlanId] = useState(consultationPlans[1].id)
  const [addOns, setAddOns] = useState<string[]>(['a2'])
  const [method, setMethod] = useState<PaymentMethod>('card')
  const [status, setStatus] = useState<Status>('idle')
  const [paid, setPaid] = useState<{ amount: number; method: PaymentMethod } | null>(
    null,
  )

  const plan = consultationPlans.find((p) => p.id === planId)!
  const addOnTotal = useMemo(
    () =>
      ADD_ONS.filter((a) => addOns.includes(a.id)).reduce((sum, a) => sum + a.price, 0),
    [addOns],
  )
  const total = plan.price + addOnTotal + medicinesSubtotal

  const toggleAddOn = (id: string) =>
    setAddOns((current) =>
      current.includes(id) ? current.filter((a) => a !== id) : [...current, id],
    )

  const pay = async () => {
    setStatus('processing')
    // Frontend demonstration: no payment gateway is contacted.
    await new Promise((resolve) => setTimeout(resolve, 1100))
    setStatus('idle')
    setPaid({ amount: total, method })
  }

  const finish = () => {
    setPaid(null)
    clear()
    setAddOns([])
  }

  return (
    <Section id="payment" tone="white">
      <div ref={reveal} className="container-page">
        <SectionHeading
          kicker="Payment"
          title="Settle the consultation and your order together"
          lead="One checkout for the appointment fee, any tests you add, and anything in your medicine cart."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Order summary */}
          <div
            data-reveal
            className="rounded-[1.75rem] border border-ice-200 bg-ice-50 p-6 sm:p-8"
          >
            <h3 className="font-display text-[1.05rem] font-semibold text-slate-ink">
              Order summary
            </h3>

            <div className="mt-5">
              <p className="font-display text-[0.8rem] font-semibold text-slate-ink/80">
                Consultation
              </p>
              <div className="mt-2.5 space-y-2">
                {consultationPlans.map((p) => (
                  <label
                    key={p.id}
                    className={cn(
                      'flex cursor-pointer items-center justify-between gap-4 rounded-2xl border bg-white px-4 py-3 transition-colors duration-200',
                      p.id === planId
                        ? 'border-brand-500 ring-1 ring-brand-500/25'
                        : 'border-ice-200 hover:border-brand-200',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="plan"
                        checked={p.id === planId}
                        onChange={() => setPlanId(p.id)}
                        className="h-4 w-4 accent-[var(--color-brand-600)]"
                      />
                      <span>
                        <span className="block font-display text-[0.88rem] font-semibold text-slate-ink">
                          {p.name}
                        </span>
                        <span className="block text-[0.75rem] text-slate-muted">
                          {p.duration}
                        </span>
                      </span>
                    </span>
                    <span className="tnum font-display text-[0.92rem] font-semibold text-slate-ink">
                      {formatPrice(p.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="font-display text-[0.8rem] font-semibold text-slate-ink/80">
                Add tests
              </p>
              <div className="mt-2.5 space-y-2">
                {ADD_ONS.map((addOn) => (
                  <label
                    key={addOn.id}
                    className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-ice-200 bg-white px-4 py-3 transition-colors duration-200 hover:border-brand-200"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.includes(addOn.id)}
                        onChange={() => toggleAddOn(addOn.id)}
                        className="h-4 w-4 rounded accent-[var(--color-brand-600)]"
                      />
                      <span className="text-[0.88rem] font-medium text-slate-ink">
                        {addOn.name}
                      </span>
                    </span>
                    <span className="tnum text-[0.88rem] text-slate-muted">
                      + {formatPrice(addOn.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {lines.length > 0 ? (
              <div className="mt-6">
                <p className="font-display text-[0.8rem] font-semibold text-slate-ink/80">
                  From the medicine store
                </p>
                <ul className="mt-2.5 divide-y divide-ice-200 rounded-2xl bg-white px-4">
                  {lines.map((line) => (
                    <li
                      key={line.medicine.id}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <span className="text-[0.85rem] text-slate-ink">
                        {line.medicine.name}
                        <span className="tnum ml-2 text-slate-muted">
                          × {line.quantity}
                        </span>
                      </span>
                      <span className="tnum text-[0.85rem] font-medium text-slate-ink">
                        {formatPrice(line.medicine.price * line.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <dl className="mt-6 space-y-2 border-t border-ice-200 pt-5 text-[0.9rem]">
              <div className="flex justify-between">
                <dt className="text-slate-muted">Consultation fee</dt>
                <dd className="tnum font-medium text-slate-ink">
                  {formatPrice(plan.price)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-muted">Tests</dt>
                <dd className="tnum font-medium text-slate-ink">
                  {formatPrice(addOnTotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-muted">Medicines</dt>
                <dd className="tnum font-medium text-slate-ink">
                  {formatPrice(medicinesSubtotal)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-ice-200 pt-3">
                <dt className="font-display font-semibold text-slate-ink">
                  Amount payable
                </dt>
                <dd className="tnum font-display text-[1.2rem] font-semibold text-brand-700">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Payment method */}
          <div
            data-reveal
            className="flex flex-col rounded-[1.75rem] border border-ice-200 bg-white p-6 sm:p-8"
          >
            <h3 className="font-display text-[1.05rem] font-semibold text-slate-ink">
              Payment method
            </h3>

            <div
              role="radiogroup"
              aria-label="Payment method"
              className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
            >
              {METHODS.map((item) => {
                const active = item.id === method
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setMethod(item.id)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-2xl border px-2 py-3.5 text-[0.76rem] font-semibold transition-colors duration-200',
                      active
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-ice-200 text-slate-muted hover:border-brand-200 hover:text-brand-700',
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex-1">
              {method === 'card' ? (
                <div className="space-y-4">
                  <Field label="Card number" placeholder="4242 4242 4242 4242" inputMode="numeric" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry" placeholder="MM / YY" inputMode="numeric" />
                    <Field label="CVV" placeholder="123" inputMode="numeric" type="password" />
                  </div>
                  <Field label="Name on card" placeholder="As printed on the card" />
                </div>
              ) : null}

              {method === 'upi' ? (
                <div className="space-y-4">
                  <Field label="UPI ID" placeholder="yourname@bank" />
                  <p className="rounded-2xl bg-ice-50 px-4 py-3 text-[0.82rem] leading-relaxed text-slate-muted">
                    You would get a collect request in your UPI app, and the booking
                    confirms once it is approved.
                  </p>
                </div>
              ) : null}

              {method === 'netbanking' ? (
                <div className="space-y-2.5">
                  {BANKS.map((bank) => (
                    <label
                      key={bank}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-ice-200 px-4 py-3 text-[0.88rem] text-slate-ink transition-colors hover:border-brand-200"
                    >
                      <input
                        type="radio"
                        name="bank"
                        defaultChecked={bank === BANKS[0]}
                        className="h-4 w-4 accent-[var(--color-brand-600)]"
                      />
                      {bank}
                    </label>
                  ))}
                </div>
              ) : null}

              {method === 'wallet' ? (
                <div className="space-y-2.5">
                  {['Paytm', 'PhonePe', 'Amazon Pay'].map((wallet) => (
                    <label
                      key={wallet}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-ice-200 px-4 py-3 text-[0.88rem] text-slate-ink transition-colors hover:border-brand-200"
                    >
                      <input
                        type="radio"
                        name="wallet"
                        defaultChecked={wallet === 'Paytm'}
                        className="h-4 w-4 accent-[var(--color-brand-600)]"
                      />
                      {wallet}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-7 space-y-4">
              <Button
                size="lg"
                className="w-full"
                disabled={status === 'processing'}
                onClick={pay}
              >
                {status === 'processing' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  `Pay ${formatPrice(total)}`
                )}
              </Button>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="inline-flex items-center gap-1.5 text-[0.76rem] text-slate-muted">
                  <Lock className="h-3.5 w-3.5 text-brand-600" />
                  Demonstration only — no gateway is contacted
                </p>
                <PaymentMarks />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={Boolean(paid)}
        onClose={finish}
        title="payment confirmation"
        labelledBy="payment-confirmed-title"
      >
        {paid ? (
          <div className="p-7 text-center sm:p-9">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h3
              id="payment-confirmed-title"
              className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em] text-slate-ink"
            >
              Payment successful
            </h3>
            <p className="tnum mt-2 font-display text-[1.6rem] font-semibold text-brand-700">
              {formatPrice(paid.amount)}
            </p>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-slate-muted">
              Paid by {METHODS.find((m) => m.id === paid.method)?.label.toLowerCase()}.
              A receipt and your appointment details would be emailed within a minute.
            </p>
            <p className="mt-5 inline-flex items-center gap-1.5 rounded-pill bg-ice-100 px-3.5 py-1.5 text-[0.76rem] font-medium text-slate-muted">
              <BadgeCheck className="h-3.5 w-3.5 text-brand-600" />
              Nothing was actually charged
            </p>
            <Button className="mt-6 w-full" onClick={finish}>
              Done
            </Button>
          </div>
        ) : null}
      </Modal>
    </Section>
  )
}
