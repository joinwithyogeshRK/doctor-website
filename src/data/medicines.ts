import type { Medicine } from '../types'

export const medicines: Medicine[] = [
  {
    id: 'm1',
    name: 'Metformin 500 mg',
    form: '60 tablets',
    price: 180,
    description: 'First-line control for type 2 diabetes. Take with food, morning and evening.',
    image: '/assets/med-tablet-strip.png',
    prescriptionOnly: true,
  },
  {
    id: 'm2',
    name: 'Vitamin D3 60k',
    form: '8 sachets',
    price: 240,
    description: 'Weekly supplement for diagnosed deficiency. Dissolve in milk after a meal.',
    image: '/assets/med-orange-bottle.png',
    prescriptionOnly: false,
  },
  {
    id: 'm3',
    name: 'Amoxicillin 625 mg',
    form: '10 tablets',
    price: 165,
    description: 'Broad-spectrum antibiotic. Finish the full course even once you feel better.',
    image: '/assets/med-blister-purple.png',
    prescriptionOnly: true,
  },
  {
    id: 'm4',
    name: 'Electrolyte solution',
    form: '200 ml',
    price: 95,
    description: 'Oral rehydration for fever, vomiting or heat exhaustion. Keep chilled.',
    image: '/assets/med-blue-bottle.png',
    prescriptionOnly: false,
  },
  {
    id: 'm5',
    name: 'Antacid suspension',
    form: '170 ml',
    price: 130,
    description: 'Relief from acidity and reflux. Two spoons after meals and at bedtime.',
    image: '/assets/med-white-bottle.png',
    prescriptionOnly: false,
  },
  {
    id: 'm6',
    name: 'Omega-3 capsules',
    form: '30 capsules',
    price: 420,
    description: 'Supports the lipid plan for patients managing cardiac risk. One a day.',
    image: '/assets/med-capsules.png',
    prescriptionOnly: false,
  },
]

export const DELIVERY_FEE = 40
export const FREE_DELIVERY_OVER = 500
