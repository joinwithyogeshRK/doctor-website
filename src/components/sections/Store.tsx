import { ShoppingBag, Truck } from 'lucide-react'
import { DELIVERY_FEE, FREE_DELIVERY_OVER, medicines } from '../../data/medicines'
import type { Medicine } from '../../types'
import { formatPrice } from '../../lib/format'
import { useCart } from '../../context/CartContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Section, SectionHeading } from '../layout/Section'
import { Button } from '../ui/Button'
import { QuantityStepper } from '../ui/Bits'

function MedicineCard({ medicine }: { medicine: Medicine }) {
  const { add, setQuantity, quantityOf } = useCart()
  const quantity = quantityOf(medicine.id)

  return (
    <article
      data-reveal
      className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-ice-200 bg-white transition-[transform,box-shadow,border-color] duration-400 ease-[var(--ease-out-quint)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift"
    >
      {/* The product shots are opaque crops of one plate, not cutouts, so they
          are framed as thumbnails rather than floated on the tile. */}
      <div className="relative grid h-40 place-items-center overflow-hidden bg-ice-50 p-4">
        <img
          src={medicine.image}
          alt={medicine.name}
          width={240}
          height={200}
          loading="lazy"
          className="max-h-full w-auto rounded-xl object-contain ring-1 ring-ice-200 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:scale-[1.04]"
        />
        {medicine.prescriptionOnly ? (
          <span className="absolute top-3 left-3 z-10 rounded-pill bg-white/92 px-2.5 py-1 text-[0.65rem] font-semibold text-brand-700 shadow-[0_2px_8px_-4px_rgb(22_35_46/0.5)] backdrop-blur-sm">
            Prescription needed
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[0.98rem] font-semibold text-slate-ink">
          {medicine.name}
        </h3>
        <p className="mt-0.5 text-[0.76rem] font-medium text-brand-600">
          {medicine.form}
        </p>
        <p className="mt-2 flex-1 text-[0.82rem] leading-relaxed text-slate-muted">
          {medicine.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="tnum font-display text-[1.15rem] font-semibold text-slate-ink">
            {formatPrice(medicine.price)}
          </span>
          {quantity > 0 ? (
            <QuantityStepper
              value={quantity}
              label={medicine.name}
              onChange={(next) => setQuantity(medicine.id, next)}
            />
          ) : (
            <Button size="sm" variant="light" onClick={() => add(medicine)}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export function Store() {
  const reveal = useScrollReveal<HTMLDivElement>({ stagger: 0.055 })
  const { itemCount, openCart } = useCart()

  return (
    <Section id="store" tone="mist">
      <div ref={reveal} className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Medicine store"
            title="Shop medicines from our store"
            lead="Genuine medicines dispensed by the in-house pharmacy and delivered across Delhi NCR."
            align="left"
          />
          <span data-reveal className="inline-flex">
            <Button
              variant="outline"
              icon={<ShoppingBag className="h-4 w-4" />}
              onClick={openCart}
            >
              {itemCount > 0 ? `View cart (${itemCount})` : 'View cart'}
            </Button>
          </span>
        </div>

        <div
          data-reveal
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-brand-100 bg-white px-5 py-4"
        >
          <span className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-slate-ink">
            <Truck className="h-4 w-4 text-brand-600" />
            Same-day delivery on orders before 4pm
          </span>
          <span className="text-[0.85rem] text-slate-muted">
            {formatPrice(DELIVERY_FEE)} delivery, free over{' '}
            {formatPrice(FREE_DELIVERY_OVER)}
          </span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </div>
    </Section>
  )
}
