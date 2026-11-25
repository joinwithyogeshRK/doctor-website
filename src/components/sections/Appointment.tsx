import { useMemo, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Loader2,
  Stethoscope,
} from 'lucide-react'
import type { AppointmentForm, ConsultationType, FormErrors } from '../../types'
import { departments } from '../../data/services'
import { doctor } from '../../data/doctor'
import { clinic } from '../../data/clinic'
import { testimonials } from '../../data/testimonials'
import { cn, todayISO } from '../../lib/format'
import {
  bookingReference,
  emptyAppointment,
  validateAppointment,
} from '../../lib/validation'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Button } from '../ui/Button'
import { ChoiceGroup, Field, SelectField, TextAreaField } from '../ui/Field'
import { Modal } from '../ui/Modal'

const TIMES = [
  '09:00',
  '09:30',
  '10:00',
  '11:00',
  '11:30',
  '12:30',
  '17:00',
  '17:30',
  '18:00',
  '19:00',
  '19:30',
]

const CONSULTATION_TYPES: Array<{ value: ConsultationType; label: string }> = [
  { value: 'in-person', label: 'In clinic' },
  { value: 'video', label: 'Video' },
  { value: 'follow-up', label: 'Follow-up' },
]

const STEPS = [
  {
    icon: CalendarCheck,
    title: 'Request goes to the clinic',
    detail: 'My team sees it immediately during working hours.',
  },
  {
    icon: Clock,
    title: 'Confirmed within two hours',
    detail: 'You get a call and an SMS with the slot and reference number.',
  },
  {
    icon: Stethoscope,
    title: 'Thirty minutes with me',
    detail: 'History, examination, and a written plan before you leave.',
  },
]

type Status = 'idle' | 'submitting' | 'error'

export function Appointment() {
  const reveal = useScrollReveal<HTMLDivElement>()
  const [form, setForm] = useState<AppointmentForm>(emptyAppointment)
  const [errors, setErrors] = useState<FormErrors<AppointmentForm>>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [confirmed, setConfirmed] = useState<AppointmentForm | null>(null)

  const minDate = useMemo(() => todayISO(), [])
  const errorCount = Object.keys(errors).length

  const update = <K extends keyof AppointmentForm>(
    key: K,
    value: AppointmentForm[K],
  ) => {
    const next = { ...form, [key]: value }
    setForm(next)
    // Only re-validate live once the visitor has tried to submit.
    if (submitted) setErrors(validateAppointment(next))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)

    const found = validateAppointment(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus('idle')
      document
        .querySelector('[aria-invalid="true"]')
        ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }

    setStatus('submitting')
    // Frontend demonstration: no booking API is called.
    await new Promise((resolve) => setTimeout(resolve, 850))

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setStatus('error')
      return
    }

    setStatus('idle')
    setConfirmed(form)
  }

  const reset = () => {
    setConfirmed(null)
    setForm(emptyAppointment)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <section
      id="appointment"
      className="relative scroll-mt-24 overflow-hidden bg-ice-100 pb-20 md:pb-28"
    >
      <div
        aria-hidden
        className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-brand-200/40 blur-[90px]"
      />

      <div ref={reveal} className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          {/* Form card */}
          <div
            data-reveal
            className="rounded-[1.75rem] border border-ice-200 bg-white p-6 shadow-panel sm:p-8"
          >
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-slate-ink">
              Book your appointment
            </h2>
            <p className="mt-2 text-[0.93rem] leading-relaxed text-slate-muted">
              Tell me what is going on and when suits you. The clinic confirms by
              phone within two working hours.
            </p>

            <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-4">
              {submitted && errorCount > 0 ? (
                <p
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl bg-rose-pulse/10 px-4 py-3 text-[0.85rem] text-rose-pulse"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {errorCount} {errorCount === 1 ? 'field needs' : 'fields need'} a
                    correction before this can be sent.
                  </span>
                </p>
              ) : null}

              {status === 'error' ? (
                <p
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl bg-amber-note/10 px-4 py-3 text-[0.85rem] text-amber-note"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    The request did not reach the clinic — you appear to be offline.
                    Reconnect and send it again, or call {doctor.phone}.
                  </span>
                </p>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Patient name"
                  placeholder="Full name"
                  autoComplete="name"
                  value={form.name}
                  error={errors.name}
                  onChange={(e) => update('name', e.target.value)}
                />
                <Field
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(e) => update('email', e.target.value)}
                />
                <Field
                  label="Phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  value={form.phone}
                  error={errors.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
                <SelectField
                  label="Medical department"
                  placeholder="Select department"
                  options={departments}
                  value={form.department}
                  error={errors.department}
                  onChange={(e) => update('department', e.target.value)}
                />
                <Field
                  label="Appointment date"
                  type="date"
                  min={minDate}
                  value={form.date}
                  error={errors.date}
                  onChange={(e) => update('date', e.target.value)}
                />
                <SelectField
                  label="Preferred time"
                  placeholder="Select a time"
                  options={TIMES}
                  value={form.time}
                  error={errors.time}
                  onChange={(e) => update('time', e.target.value)}
                />
              </div>

              <ChoiceGroup
                label="Consultation type"
                value={form.consultationType}
                options={CONSULTATION_TYPES}
                onChange={(value) => update('consultationType', value)}
              />

              <TextAreaField
                label="What is the problem?"
                placeholder="Symptoms, how long they have been going on, and anything you are already taking."
                value={form.problem}
                error={errors.problem}
                onChange={(e) => update('problem', e.target.value)}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === 'submitting'}
                icon={
                  status === 'submitting' ? undefined : <ArrowRight className="h-4 w-4" />
                }
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending request
                  </>
                ) : (
                  'Book appointment'
                )}
              </Button>

              <p className="text-center text-[0.75rem] text-slate-muted/80">
                Demonstration only — nothing is sent to a real booking system.
              </p>
            </form>
          </div>

          {/* Supporting column */}
          <div className="flex flex-col gap-5">
            <div data-reveal className="glass-dark rounded-[1.75rem] p-6 sm:p-7">
              <h3 className="font-display text-lg font-semibold text-slate-ink">
                What happens after you send this
              </h3>
              <ol className="mt-5 space-y-5">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <step.icon className="h-[18px] w-[18px]" />
                      {i < STEPS.length - 1 ? (
                        <span
                          aria-hidden
                          className="absolute top-[calc(100%+6px)] left-1/2 h-[18px] w-px -translate-x-1/2 bg-silver-300"
                        />
                      ) : null}
                    </span>
                    <span className="pt-0.5">
                      <span className="block font-display text-[0.95rem] font-semibold text-slate-ink">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-[0.85rem] leading-relaxed text-slate-muted">
                        {step.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div
              data-reveal
              className="glass-dark relative overflow-hidden rounded-[1.75rem] p-6 sm:p-7"
            >
              <div className="relative z-10">
                <p className="font-display text-sm font-semibold text-brand-700">
                  Today at the clinic
                </p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-slate-body">
                  {clinic.hours[0].time.split(',')[1]?.trim()} — four evening slots
                  remain. Video consultations run every weekday evening.
                </p>
                <a
                  href={`tel:${doctor.phone.replace(/\s/g, '')}`}
                  className="mt-4 inline-flex items-center gap-2 font-display text-[0.9rem] font-semibold text-slate-ink underline-offset-4 hover:text-brand-700 hover:underline"
                >
                  {doctor.phone}
                </a>
              </div>
              <img
                src="/assets/equipment-graphic.png"
                alt=""
                aria-hidden
                width={474}
                height={218}
                loading="lazy"
                className="pointer-events-none absolute -right-8 -bottom-6 w-44 opacity-80 select-none [mask-image:radial-gradient(closest-side,black_72%,transparent_100%)]"
              />
            </div>

            <div
              data-reveal
              className="glass-dark flex items-center gap-4 rounded-[1.75rem] p-6 sm:p-7"
            >
              <ul className="flex -space-x-3">
                {testimonials.slice(0, 4).map((patient) => (
                  <li key={patient.id}>
                    <img
                      src={patient.avatar}
                      alt=""
                      aria-hidden
                      width={189}
                      height={189}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                    />
                  </li>
                ))}
              </ul>
              <p className="text-[0.85rem] leading-relaxed text-slate-body">
                <span className="font-display font-semibold text-slate-ink">
                  5,000 patients
                </span>{' '}
                have been treated here since 2011, rating care 98% positive.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={Boolean(confirmed)}
        onClose={reset}
        title="appointment confirmation"
        labelledBy="appointment-confirmed-title"
      >
        {confirmed ? (
          <div className="p-7 sm:p-9">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h3
              id="appointment-confirmed-title"
              className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em] text-slate-ink"
            >
              Appointment requested
            </h3>
            <p className="mt-2 text-[0.93rem] leading-relaxed text-slate-muted">
              Thank you, {confirmed.name.split(' ')[0]}. The clinic will call{' '}
              {confirmed.phone} to confirm, and a copy is on its way to{' '}
              {confirmed.email}.
            </p>

            <dl className="mt-6 divide-y divide-ice-200 rounded-2xl bg-ice-50 px-5">
              {[
                ['Reference', bookingReference(confirmed)],
                ['Department', confirmed.department],
                [
                  'When',
                  `${new Date(`${confirmed.date}T00:00:00`).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })} at ${confirmed.time}`,
                ],
                [
                  'Type',
                  CONSULTATION_TYPES.find((t) => t.value === confirmed.consultationType)
                    ?.label ?? '',
                ],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-3">
                  <dt className="text-[0.85rem] text-slate-muted">{label}</dt>
                  <dd
                    className={cn(
                      'text-right font-display text-[0.88rem] font-semibold text-slate-ink',
                      label === 'Reference' && 'tnum text-brand-700',
                    )}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Button className="flex-1" onClick={reset}>
                Done
              </Button>
              <Button variant="outline" className="flex-1" onClick={reset}>
                Book another
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}
