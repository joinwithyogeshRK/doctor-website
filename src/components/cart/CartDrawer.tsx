import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { FREE_DELIVERY_OVER } from '../../data/medicines'
import { formatPrice } from '../../lib/format'
import { useCart } from '../../context/CartContext'
import { scrollToSection } from '../../hooks/useSmoothScroll'
import { Button } from '../ui/Button'
import { QuantityStepper } from '../ui/Bits'

export function CartDrawer() {
  const {
    lines,
    isOpen,
    closeCart,
    setQuantity,
    remove,
    subtotal,
    delivery,
    total,
    itemCount,
  } = useCart()

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [closeCart, isOpen])

  const checkout = () => {
    closeCart()
    scrollToSection('#payment')
  }

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-120">
          <motion.div
            className="absolute inset-0 bg-slate-ink/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="absolute inset-y-0 right-0 flex w-[min(92vw,26rem)] flex-col bg-white shadow-[-30px_0_80px_-30px_rgb(22_35_46/0.28)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-center justify-between border-b border-ice-200 px-6 py-5">
              <h2 className="font-display text-lg font-semibold text-slate-ink">
                Your cart
                {itemCount > 0 ? (
                  <span className="tnum ml-2 text-[0.85rem] font-medium text-slate-muted">
                    {itemCount} item{itemCount === 1 ? '' : 's'}
                  </span>
                ) : null}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full bg-ice-100 text-slate-muted transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ice-100 text-brand-600">
                  <ShoppingBag className="h-7 w-7" />
                </span>
                <p className="font-display text-[1.05rem] font-semibold text-slate-ink">
                  Nothing in the cart yet
                </p>
                <p className="text-[0.88rem] leading-relaxed text-slate-muted">
                  Browse the store to add medicines. Prescription items are checked
                  against a valid prescription before dispatch.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    closeCart()
                    scrollToSection('#store')
                  }}
                >
                  Go to the store
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ice-200 overflow-y-auto px-6">
                  {lines.map((line) => (
                    <li key={line.medicine.id} className="flex gap-4 py-5">
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-ice-50 p-1.5">
                        <img
                          src={line.medicine.image}
                          alt=""
                          aria-hidden
                          width={120}
                          height={100}
                          className="max-h-full w-auto rounded-lg object-contain ring-1 ring-ice-200"
                        />
                      </span>

                      <span className="flex-1">
                        <span className="flex items-start justify-between gap-3">
                          <span>
                            <span className="block font-display text-[0.88rem] font-semibold text-slate-ink">
                              {line.medicine.name}
                            </span>
                            <span className="block text-[0.74rem] text-slate-muted">
                              {line.medicine.form}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={() => remove(line.medicine.id)}
                            aria-label={`Remove ${line.medicine.name} from the cart`}
                            className="text-slate-muted transition-colors hover:text-rose-pulse"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </span>

                        <span className="mt-3 flex items-center justify-between">
                          <QuantityStepper
                            value={line.quantity}
                            label={line.medicine.name}
                            onChange={(next) => setQuantity(line.medicine.id, next)}
                          />
                          <span className="tnum font-display text-[0.92rem] font-semibold text-slate-ink">
                            {formatPrice(line.medicine.price * line.quantity)}
                          </span>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-ice-200 px-6 py-5">
                  {delivery > 0 ? (
                    <p className="mb-3 rounded-xl bg-brand-50 px-3.5 py-2.5 text-[0.78rem] text-brand-700">
                      Add {formatPrice(FREE_DELIVERY_OVER - subtotal)} more for free
                      delivery.
                    </p>
                  ) : null}

                  <dl className="space-y-2 text-[0.88rem]">
                    <div className="flex justify-between">
                      <dt className="text-slate-muted">Subtotal</dt>
                      <dd className="tnum font-medium text-slate-ink">
                        {formatPrice(subtotal)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-muted">Delivery</dt>
                      <dd className="tnum font-medium text-slate-ink">
                        {delivery === 0 ? 'Free' : formatPrice(delivery)}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-ice-200 pt-2.5">
                      <dt className="font-display font-semibold text-slate-ink">
                        Total
                      </dt>
                      <dd className="tnum font-display text-[1.05rem] font-semibold text-slate-ink">
                        {formatPrice(total)}
                      </dd>
                    </div>
                  </dl>

                  <Button className="mt-4 w-full" onClick={checkout}>
                    Checkout
                  </Button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
