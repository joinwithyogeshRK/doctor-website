import type { Feature, Service } from '../types'

export const services: Service[] = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    blurb: 'Diagnosis and treatment for everyday adult illness, from fevers to fatigue.',
    detail:
      'A full history, examination and only the tests that will change the plan. You leave with a written diagnosis, a treatment course and a date to review it.',
    icon: '/assets/icon-general.png',
    accent: 'brand',
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    blurb: 'Blood pressure, cholesterol and cardiac risk, assessed and managed over time.',
    detail:
      'ECG and echo interpretation in clinic, risk scoring against your family history, and medication reviewed every quarter rather than renewed on autopilot.',
    icon: '/assets/icon-cardiology.png',
    accent: 'rose',
  },
  {
    id: 'neurology',
    name: 'Neurology',
    blurb: 'Headache, dizziness, neuropathy and memory concerns.',
    detail:
      'Careful neurological examination first, imaging second. Where specialist surgery is needed I refer, and stay involved in the medical side of your care.',
    icon: '/assets/icon-neurology.png',
    accent: 'violet',
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    blurb: 'Joint pain, back pain and post-injury rehabilitation support.',
    detail:
      'Conservative management, pain control that does not sedate you, and physiotherapy coordination. Surgical cases go to a trusted orthopaedic colleague.',
    icon: '/assets/icon-orthopedics.png',
    accent: 'cyan',
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    blurb: 'Skin, hair and nail conditions, including allergy-driven flares.',
    detail:
      'Treatment for eczema, psoriasis, acne and fungal infection, with attention to the internal causes — thyroid, diabetes and medication — behind stubborn skin.',
    icon: '/assets/icon-dermatology.png',
    accent: 'brand',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    blurb: 'Child health reviews, immunisation guidance and growth checks.',
    detail:
      'Routine checks, vaccination schedules and advice for the common childhood illnesses, with same-week appointments when your child is unwell.',
    icon: '/assets/icon-pediatrics.png',
    accent: 'violet',
  },
  {
    id: 'preventive',
    name: 'Preventive Healthcare',
    blurb: 'Annual screening built around your age, family history and lifestyle.',
    detail:
      'A yearly panel that is actually tailored — not a packaged health check. Results are explained in person with a one-page plan for the year ahead.',
    icon: '/assets/icon-shield.png',
    accent: 'cyan',
  },
  {
    id: 'online',
    name: 'Online Consultation',
    blurb: 'Video appointments for reviews, reports and second opinions.',
    detail:
      'Twenty focused minutes by video, with your prescription and notes sent the same day. Best for follow-ups, report reviews and medication adjustments.',
    icon: '/assets/icon-support.png',
    accent: 'brand',
  },
]

export const departments: string[] = [
  'General Medicine',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Dermatology',
  'Pediatrics',
  'Preventive Healthcare',
]

export const features: Feature[] = [
  {
    id: 'experienced',
    title: 'Experienced physician',
    blurb:
      'Fifteen years in internal medicine, with a specialist interest in diabetes and cardiac risk.',
    icon: '/assets/icon-diamond.png',
    stat: { value: 15, suffix: '+', label: 'Years in practice' },
  },
  {
    id: 'personalised',
    title: 'Personalised treatment',
    blurb:
      'Your plan is written for your history and your routine, then revised as we see what works.',
    icon: '/assets/icon-handshake.png',
    stat: { value: 100, suffix: '%', label: 'Written care plans' },
  },
  {
    id: 'technology',
    title: 'Modern diagnostics',
    blurb:
      'On-site ECG, echo and lab work, so most answers arrive within the same appointment.',
    icon: '/assets/icon-cardiology.png',
    stat: { value: 24, suffix: 'h', label: 'Report turnaround' },
  },
  {
    id: 'patient-first',
    title: 'Patient-first approach',
    blurb:
      'Appointments run to thirty minutes because a rushed history is how diagnoses get missed.',
    icon: '/assets/icon-shield.png',
    stat: { value: 30, suffix: 'min', label: 'Average consultation' },
  },
  {
    id: 'online-care',
    title: 'Online consultation',
    blurb:
      'Video slots every weekday evening for reviews, reports and medication changes.',
    icon: '/assets/icon-support.png',
    stat: { value: 5000, suffix: '+', label: 'Patients treated' },
  },
  {
    id: 'support',
    title: 'Continuous support',
    blurb:
      'A direct line to the clinic between visits, answered by my team the same working day.',
    icon: '/assets/icon-general.png',
    stat: { value: 98, suffix: '%', label: 'Satisfaction score' },
  },
]
