"use client"

import { createContext, useContext, useMemo, useState, useCallback } from "react"
import type { Product } from "@/lib/products"

export type CartItem = {
  product: Product
  size: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  subtotal: number
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, size: string, quantity?: number) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const keyOf = (id: string, size: string) => `${id}__${size}`

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((product: Product, size: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => keyOf(i.product.id, i.size) === keyOf(product.id, size))
      if (existing) {
        return prev.map((i) =>
          keyOf(i.product.id, i.size) === keyOf(product.id, size)
            ? { ...i, quantity: Math.min(i.quantity + quantity, 10) }
            : i,
        )
      }
      return [...prev, { product, size, quantity }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id: string, size: string) => {
    setItems((prev) => prev.filter((i) => keyOf(i.product.id, i.size) !== keyOf(id, size)))
  }, [])

  const updateQuantity = useCallback((id: string, size: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        keyOf(i.product.id, i.size) === keyOf(id, size)
          ? { ...i, quantity: Math.max(1, Math.min(quantity, 10)) }
          : i,
      ),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0), [items])

  const value = useMemo(
    () => ({
      items,
      isOpen,
      itemCount,
      subtotal,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clear,
    }),
    [items, isOpen, itemCount, subtotal, openCart, closeCart, addItem, removeItem, updateQuantity, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
