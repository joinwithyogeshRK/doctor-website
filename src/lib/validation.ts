import type { AppointmentForm, FormErrors } from '../types'
import { todayISO } from './format'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+\d][\d\s-]{8,15}$/

export const emptyAppointment: AppointmentForm = {
  name: '',
  email: '',
  phone: '',
  department: '',
  date: '',
  time: '',
  consultationType: 'in-person',
  problem: '',
}

export function validateAppointment(
  form: AppointmentForm,
): FormErrors<AppointmentForm> {
  const errors: FormErrors<AppointmentForm> = {}

  if (form.name.trim().length < 2) {
    errors.name = 'Enter the patient’s full name.'
  }
  if (!EMAIL.test(form.email.trim())) {
    errors.email = 'Enter an email we can send the confirmation to.'
  }
  if (!PHONE.test(form.phone.trim())) {
    errors.phone = 'Enter a phone number with at least 10 digits.'
  }
  if (!form.department) {
    errors.department = 'Choose the department you need.'
  }
  if (!form.date) {
    errors.date = 'Choose a date for the visit.'
  } else if (form.date < todayISO()) {
    errors.date = 'Pick today or a later date.'
  }
  if (!form.time) {
    errors.time = 'Choose a preferred time.'
  }
  if (form.problem.trim().length < 10) {
    errors.problem = 'Describe the problem in a sentence or two, so I can prepare.'
  }

  return errors
}

/** Deterministic booking reference, so the confirmation reads like a real one. */
export function bookingReference(form: AppointmentForm) {
  const seed = `${form.name}${form.date}${form.time}`
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 99991
  }
  return `MC-${String(hash).padStart(5, '0')}`
}
