import type { ConsultationPlan, ConsultationSlot } from '../types'

export const consultationSlots: ConsultationSlot[] = [
  { id: 's1', day: 'Mon', date: '24 Nov', time: '18:00', available: true },
  { id: 's2', day: 'Mon', date: '24 Nov', time: '18:30', available: false },
  { id: 's3', day: 'Tue', date: '25 Nov', time: '19:00', available: true },
  { id: 's4', day: 'Tue', date: '25 Nov', time: '19:30', available: true },
  { id: 's5', day: 'Wed', date: '26 Nov', time: '18:00', available: false },
  { id: 's6', day: 'Wed', date: '26 Nov', time: '20:00', available: true },
  { id: 's7', day: 'Thu', date: '27 Nov', time: '18:30', available: true },
  { id: 's8', day: 'Fri', date: '28 Nov', time: '19:00', available: true },
]

export const consultationPlans: ConsultationPlan[] = [
  {
    id: 'p1',
    name: 'Video consultation',
    price: 800,
    duration: '20 minutes',
    includes: [
      'Reports reviewed before the call',
      'Digital prescription the same day',
      'Written summary of the plan',
    ],
  },
  {
    id: 'p2',
    name: 'First clinic visit',
    price: 1200,
    duration: '30 minutes',
    includes: [
      'Full history and examination',
      'ECG and basic labs on site',
      'Written care plan and review date',
      'One free follow-up within 14 days',
    ],
    featured: true,
  },
  {
    id: 'p3',
    name: 'Follow-up review',
    price: 500,
    duration: '15 minutes',
    includes: [
      'Progress check against your plan',
      'Medication adjustment',
      'Repeat prescription',
    ],
  },
]

export const callFeatures: string[] = [
  'End-to-end encrypted video',
  'Share reports in the call',
  'Join from phone or laptop',
  'No app install needed',
]
