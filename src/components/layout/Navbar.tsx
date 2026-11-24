import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { doctor, navLinks } from '../../data/doctor'
import { cn } from '../../lib/format'
import { scrollToSection } from '../../hooks/useSmoothScroll'
import { useCart } from '../../context/CartContext'
import { Button } from '../ui/Button'

function Logo() {
  return (
    <a
      href="#hero"
      onClick={(event) => {
        event.preventDefault()
        scrollToSection('#hero')
      }}
      className="flex items-center gap-3"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_10px_24px_-10px_rgb(46_107_255/0.9)]">
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
        <span className="block font-display text-[0.9rem] font-semibold whitespace-nowrap sm:text-[0.95rem]">
          {doctor.name}
        </span>
        <span className="hidden text-[0.7rem] text-current opacity-60 sm:block">
          {doctor.designation}
        </span>
      </span>
    </a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#hero')
  const { itemCount, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlights the link for whichever section currently owns the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const go = (href: string) => {
    setMenuOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      <a
        href="#appointment"
        onClick={(event) => {
          event.preventDefault()
          go('#appointment')
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-pill focus:bg-white focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:font-semibold focus:text-brand-700"
      >
        Skip to booking
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-90 transition-[background-color,box-shadow,backdrop-filter] duration-500',
          scrolled
            ? 'bg-ink-950/82 text-white shadow-[0_18px_50px_-30px_rgb(3_10_40/0.9)] backdrop-blur-xl'
            : 'bg-transparent text-white',
        )}
      >
        <div className="container-page flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  go(link.href)
                }}
                aria-current={active === link.href ? 'page' : undefined}
                className={cn(
                  'relative rounded-pill px-3.5 py-2 text-[0.88rem] font-medium transition-colors duration-200',
                  active === link.href
                    ? 'text-white'
                    : 'text-brand-100/70 hover:text-white',
                )}
              >
                {link.label}
                {active === link.href ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-pill bg-white/12"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/18"
              aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {itemCount > 0 ? (
                <span className="tnum absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-cyan-glow px-1 font-display text-[0.65rem] font-bold text-ink-950">
                  {itemCount}
                </span>
              ) : null}
            </button>

            <span className="hidden sm:inline-flex">
              <Button size="sm" onClick={() => go('#appointment')}>
                Book appointment
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/18 bg-white/10 text-white backdrop-blur-md lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-110 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              aria-label="Mobile"
              className="absolute inset-y-0 right-0 flex w-[min(88vw,22rem)] flex-col gap-2 bg-ink-900 p-6 pt-5"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-center justify-between text-white">
                <span className="font-display text-sm font-semibold opacity-70">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/8"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault()
                    go(link.href)
                  }}
                  className="rounded-2xl px-4 py-3.5 font-display text-lg font-medium text-white/85 transition-colors hover:bg-white/8 hover:text-white"
                >
                  {link.label}
                </a>
              ))}

              <Button className="mt-4" onClick={() => go('#appointment')}>
                Book appointment
              </Button>
              <a
                href={`tel:${doctor.phone.replace(/\s/g, '')}`}
                className="mt-auto text-center text-sm text-brand-100/60"
              >
                {doctor.phone}
              </a>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
