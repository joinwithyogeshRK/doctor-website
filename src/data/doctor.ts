import type { Achievement, NavLink, Qualification, Stat } from '../types'

export const doctor = {
  name: 'Dr. Vivek Sharma',
  shortName: 'Dr. Vivek',
  designation: 'Consultant Physician',
  credentials: 'MBBS, MD (Internal Medicine), FACP',
  headline: ['Your health,', 'our priority'],
  intro:
    'Expert care, advanced treatment and a healthier tomorrow. I treat adults for everyday illness and long-term conditions — in clinic in New Delhi, or by video wherever you are.',
  bio: [
    'I have spent fifteen years looking after adults with everything from a stubborn fever to diabetes, heart disease and thyroid disorders. Most of what I do is unglamorous and deeply practical: listen properly, examine carefully, order only the tests that will change the plan, and explain what we found in language that makes sense.',
    'Care works best when it continues. Every patient leaves with a written plan, and I follow up to see whether it is actually working — adjusting as we learn, rather than waiting for the next flare-up.',
  ],
  phone: '+91 98765 43210',
  email: 'care@drviveksharma.com',
  registration: 'DMC Reg. 44821',
} as const

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Consultation', href: '#consultation' },
  { label: 'Store', href: '#store' },
  { label: 'Clinic', href: '#clinic' },
]

export const heroStats: Stat[] = [
  { value: 15, suffix: '+', label: 'Years of practice', caption: 'Internal medicine' },
  { value: 5000, suffix: '+', label: 'Patients treated', caption: 'Since 2011' },
  { value: 98, suffix: '%', label: 'Patient satisfaction', caption: 'Post-visit survey' },
]

export const qualifications: Qualification[] = [
  {
    degree: 'MD, Internal Medicine',
    institution: 'All India Institute of Medical Sciences, New Delhi',
    years: '2008 – 2011',
  },
  {
    degree: 'MBBS',
    institution: 'Maulana Azad Medical College, New Delhi',
    years: '2002 – 2007',
  },
  {
    degree: 'Fellowship, Advanced Cardiac Care',
    institution: 'Royal College of Physicians, London',
    years: '2013',
  },
]

export const achievements: Achievement[] = [
  {
    title: 'Head of Internal Medicine',
    detail: 'Meridian Hospital, New Delhi — led a 24-bed unit and its diabetes care pathway.',
  },
  {
    title: 'Published on metabolic care',
    detail: '18 peer-reviewed papers on type 2 diabetes management in primary care settings.',
  },
  {
    title: 'Clinical Excellence Award',
    detail: 'Indian Medical Association, 2021, for outcomes in community cardiac screening.',
  },
  {
    title: 'Teaching faculty',
    detail: 'Guest faculty in diagnostics for postgraduate residents since 2016.',
  },
]

export const certifications: string[] = [
  'Fellow, American College of Physicians',
  'Advanced Cardiac Life Support (ACLS)',
  'Certified Diabetes Care Specialist',
  'Indian Medical Association, Life Member',
]

export const expertise: string[] = [
  'Diabetes & thyroid',
  'Hypertension',
  'Preventive screening',
  'Cardiac risk assessment',
  'Respiratory illness',
  'Geriatric medicine',
]
