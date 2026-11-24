import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import type { CartLine, Medicine } from '../types'
import { DELIVERY_FEE, FREE_DELIVERY_OVER } from '../data/medicines'

type CartAction =
  | { type: 'add'; medicine: Medicine }
  | { type: 'setQuantity'; id: string; quantity: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' }

function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'add': {
      const existing = lines.find((line) => line.medicine.id === action.medicine.id)
      if (existing) {
        return lines.map((line) =>
          line.medicine.id === action.medicine.id
            ? { ...line, quantity: Math.min(9, line.quantity + 1) }
            : line,
        )
      }
      return [...lines, { medicine: action.medicine, quantity: 1 }]
    }
    case 'setQuantity': {
      if (action.quantity <= 0) {
        return lines.filter((line) => line.medicine.id !== action.id)
      }
      return lines.map((line) =>
        line.medicine.id === action.id
          ? { ...line, quantity: Math.min(9, action.quantity) }
          : line,
      )
    }
    case 'remove':
      return lines.filter((line) => line.medicine.id !== action.id)
    case 'clear':
      return []
  }
}

type CartValue = {
  lines: CartLine[]
  isOpen: boolean
  itemCount: number
  subtotal: number
  delivery: number
  total: number
  openCart: () => void
  closeCart: () => void
  add: (medicine: Medicine) => void
  setQuantity: (id: string, quantity: number) => void
  remove: (id: string) => void
  clear: () => void
  quantityOf: (id: string) => number
}

const CartContext = createContext<CartValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, [])
  const [isOpen, setOpen] = useState(false)

  const add = useCallback((medicine: Medicine) => {
    dispatch({ type: 'add', medicine })
    setOpen(true)
  }, [])

  const setQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'setQuantity', id, quantity })
  }, [])

  const remove = useCallback((id: string) => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const openCart = useCallback(() => setOpen(true), [])
  const closeCart = useCallback(() => setOpen(false), [])

  const value = useMemo<CartValue>(() => {
    const subtotal = lines.reduce(
      (sum, line) => sum + line.medicine.price * line.quantity,
      0,
    )
    const delivery =
      subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE

    return {
      lines,
      isOpen,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
      delivery,
      total: subtotal + delivery,
      openCart,
      closeCart,
      add,
      setQuantity,
      remove,
      clear,
      quantityOf: (id) =>
        lines.find((line) => line.medicine.id === id)?.quantity ?? 0,
    }
  }, [add, clear, closeCart, isOpen, lines, openCart, remove, setQuantity])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
