import { useState } from 'react'
import { doctor, navLinks } from '../../data/doctor'
import { clinic } from '../../data/clinic'
import { scrollToSection } from '../../hooks/useSmoothScroll'
import { Modal } from '../ui/Modal'
import {
  FacebookMark,
  InstagramMark,
  LinkedinMark,
  XMark,
  YoutubeMark,
} from '../ui/SocialIcons'

const socials = [
  { label: 'Facebook', icon: FacebookMark, href: '#' },
  { label: 'X', icon: XMark, href: '#' },
  { label: 'LinkedIn', icon: LinkedinMark, href: '#' },
  { label: 'YouTube', icon: YoutubeMark, href: '#' },
  { label: 'Instagram', icon: InstagramMark, href: '#' },
]

const legal = {
  privacy: {
    title: 'Privacy policy',
    body: [
      'The clinic collects only what it needs to treat you: your contact details, your medical history and the records of your visits. Nothing is sold, and nothing is shared with advertisers.',
      'Records are shared with another clinician only when your care requires it, and with your consent except in an emergency. You can ask for a copy of your records, or ask for a correction, by writing to the clinic.',
      'This page is a frontend demonstration, so no form on it transmits or stores anything.',
    ],
  },
  terms: {
    title: 'Terms and conditions',
    body: [
      'Appointments can be cancelled or moved up to four hours before the slot at no charge. Inside four hours, half the consultation fee is retained. If the clinic has to reschedule, you are offered the next available slot and nothing is charged.',
      'Prescription-only medicines are dispensed against a valid prescription, which the pharmacy verifies before dispatch. Medicines cannot be returned once delivered, except where an item is damaged or incorrect.',
      'Nothing on this site is a substitute for an in-person examination. In an emergency, call your local emergency number rather than the clinic.',
    ],
  },
} as const

type LegalKey = keyof typeof legal

const currentYear = new Date().getFullYear()

export function Footer() {
  const [openDoc, setOpenDoc] = useState<LegalKey | null>(null)
  const doc = openDoc ? legal[openDoc] : null

  return (
    <footer className="relative bg-ice-50 pt-16 pb-8 text-slate-muted">
      <div className="rule-fade absolute inset-x-0 top-0" />

      <div className="container-page">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
                <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden>
                  <path
                    d="M4 16h4.6l2.1-5 3.1 10 2.5-6.6 1.8 3.8H28"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="block font-display text-[0.95rem] font-semibold text-slate-ink">
                  {doctor.name}
                </span>
                <span className="block text-[0.72rem]">{doctor.designation}</span>
              </span>
            </div>

            <p className="mt-5 max-w-xs text-[0.85rem] leading-relaxed">
              Adult internal medicine in New Delhi, in clinic and by video.{' '}
              {doctor.registration}.
            </p>

            <ul className="mt-6 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-ice-200 bg-white text-slate-muted transition-colors duration-250 hover:border-brand-300 hover:text-brand-700"
                  >
                    <social.icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="font-display text-[0.88rem] font-semibold text-slate-ink">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-[0.85rem] transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-[0.88rem] font-semibold text-slate-ink">
              Care
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'Book appointment', href: '#appointment' },
                { label: 'Online consultation', href: '#consultation' },
                { label: 'Medicine store', href: '#store' },
                { label: 'Patient reviews', href: '#testimonials' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-[0.85rem] transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic details */}
          <div>
            <h2 className="font-display text-[0.88rem] font-semibold text-slate-ink">
              Clinic details
            </h2>
            <address className="mt-4 space-y-1 text-[0.85rem] not-italic">
              <p className="font-medium text-slate-ink">{clinic.name}</p>
              {clinic.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                <a
                  href={`tel:${clinic.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-brand-700"
                >
                  {clinic.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${clinic.email}`}
                  className="transition-colors hover:text-brand-700"
                >
                  {clinic.email}
                </a>
              </p>
            </address>
            <p className="mt-4 text-[0.8rem] leading-relaxed">
              Mon–Fri 09:00–14:00 and 17:00–20:00
            </p>
          </div>
        </div>

        <div className="rule-fade mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-[0.78rem] sm:flex-row">
          <p>
            © {currentYear} {doctor.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {(Object.keys(legal) as LegalKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setOpenDoc(key)}
                className="transition-colors hover:text-brand-700"
              >
                {legal[key].title}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-[0.72rem] text-slate-muted/75">
          A frontend demonstration. No appointments, payments or orders are real.
        </p>
      </div>

      <Modal
        open={Boolean(doc)}
        onClose={() => setOpenDoc(null)}
        title={doc?.title ?? ''}
        labelledBy="legal-title"
      >
        {doc ? (
          <div className="p-7 sm:p-9">
            <h2
              id="legal-title"
              className="font-display text-xl font-semibold tracking-[-0.02em] text-slate-ink"
            >
              {doc.title}
            </h2>
            <div className="mt-4 space-y-3.5">
              {doc.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 20)}
                  className="text-[0.88rem] leading-[1.7] text-slate-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </footer>
  )
}
