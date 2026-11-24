import type { FaqItem } from '../types'

export const clinic = {
  name: 'Meridian Clinic',
  addressLines: ['123 Health Street, Hauz Khas', 'New Delhi 110016'],
  phone: '+91 98765 43210',
  email: 'care@drviveksharma.com',
  image: '/assets/clinic-building.png',
  hours: [
    { days: 'Monday – Friday', time: '09:00 – 14:00, 17:00 – 20:00' },
    { days: 'Saturday', time: '09:00 – 14:00' },
    { days: 'Sunday', time: 'Video consultation only' },
  ],
  facilities: [
    'On-site diagnostic lab',
    'ECG and echocardiography',
    'Digital X-ray',
    'Day-care observation beds',
    'In-house pharmacy',
    'Wheelchair access and lift',
    'Basement parking',
    'Insurance desk',
  ],
}

export const faqs: FaqItem[] = [
  {
    id: 'f1',
    question: 'How do I book an appointment?',
    answer:
      'Use the booking form on this page, or call the clinic on +91 98765 43210 between 9am and 8pm. Online requests are confirmed by phone within two working hours, and you will get a reference number either way.',
  },
  {
    id: 'f2',
    question: 'What does a consultation cost?',
    answer:
      'A first clinic visit is ₹1,200 for thirty minutes and includes an ECG and basic labs where needed. Follow-up reviews are ₹500 and video consultations are ₹800. Your first follow-up within fourteen days of a first visit is free.',
  },
  {
    id: 'f3',
    question: 'How does an online consultation work?',
    answer:
      'You get a secure video link by SMS and email an hour before the slot. It opens in your browser — no app to install. Send your reports beforehand so the twenty minutes go on decisions rather than reading. Your prescription arrives the same evening.',
  },
  {
    id: 'f4',
    question: 'Do you deliver medicines?',
    answer:
      'Yes, within Delhi NCR. Orders placed before 4pm arrive the same day; later orders arrive the next morning. Delivery is ₹40 and free over ₹500. Prescription-only items are dispensed against a valid prescription, which we verify before dispatch.',
  },
  {
    id: 'f5',
    question: 'What if I need to cancel or reschedule?',
    answer:
      'Cancel or move an appointment up to four hours before the slot at no charge, through the confirmation SMS or by calling the clinic. Inside four hours, half the fee is retained. If I have to reschedule, you are offered the next available slot and nothing is charged.',
  },
  {
    id: 'f6',
    question: 'How are follow-ups handled?',
    answer:
      'Every visit ends with a written plan and a review date. The clinic sends a reminder three days before. Between visits you can reach my team on the clinic line and they will answer the same working day, escalating to me where it needs a clinical decision.',
  },
]
