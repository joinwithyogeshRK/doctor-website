export type NavLink = {
  label: string
  href: `#${string}`
}

export type Stat = {
  value: number
  suffix?: string
  label: string
  caption?: string
}

export type Qualification = {
  degree: string
  institution: string
  years: string
}

export type Achievement = {
  title: string
  detail: string
}

export type Service = {
  id: string
  name: string
  blurb: string
  detail: string
  icon: string
  accent: 'brand' | 'rose' | 'violet' | 'cyan'
}

export type Feature = {
  id: string
  title: string
  blurb: string
  icon: string
  stat?: Stat
}

export type Testimonial = {
  id: string
  name: string
  context: string
  quote: string
  rating: 1 | 2 | 3 | 4 | 5
  avatar: string
}

export type Medicine = {
  id: string
  name: string
  form: string
  price: number
  description: string
  image: string
  prescriptionOnly: boolean
}

export type CartLine = {
  medicine: Medicine
  quantity: number
}

export type ConsultationSlot = {
  id: string
  day: string
  date: string
  time: string
  available: boolean
}

export type ConsultationPlan = {
  id: string
  name: string
  price: number
  duration: string
  includes: string[]
  featured?: boolean
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export type ConsultationType = 'in-person' | 'video' | 'follow-up'

export type AppointmentForm = {
  name: string
  email: string
  phone: string
  department: string
  date: string
  time: string
  consultationType: ConsultationType
  problem: string
}

export type FormErrors<T> = Partial<Record<keyof T, string>>

export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet'
