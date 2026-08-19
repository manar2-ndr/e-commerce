"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"

const SHIPPING_THRESHOLD = 500
const SHIPPING_COST = 20

function Field({
  label,
  id,
  type = "text",
  autoComplete,
  required = true,
  className = "",
}: {
  label: string
  id: string
  type?: string
  autoComplete?: string
  required?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
      />
    </div>
  )
}

export function CheckoutView() {
  const { items, subtotal, clear } = useCart()
  const [placed, setPlaced] = useState(false)

  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Demo order confirmation. Wire this handler to a Stripe Checkout Session
    // once the Stripe integration is connected.
    clear()
    setPlaced(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center sm:px-6">
        <CheckCircle2 className="h-12 w-12 text-accent" strokeWidth={1.25} />
        <h1 className="mt-6 font-serif text-3xl tracking-wide">Thank you for your order</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Your order has been received. A confirmation has been sent to your email, and your pieces will be on their
          way shortly.
        </p>
        <Button className="mt-8" nativeButton={false} render={<Link href="/shop" />}>
          Continue Shopping
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center sm:px-6">
        <h1 className="font-serif text-3xl tracking-wide">Your cart is empty</h1>
        <p className="mt-4 text-sm text-muted-foreground">Add a few pieces before heading to checkout.</p>
        <Button className="mt-8" nativeButton={false} render={<Link href="/shop" />}>
          Explore the Collection
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-10 font-serif text-4xl tracking-wide">Checkout</h1>

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <section>
            <h2 className="mb-5 text-sm uppercase tracking-[0.15em]">Contact</h2>
            <Field label="Email" id="email" type="email" autoComplete="email" />
          </section>

          <section>
            <h2 className="mb-5 text-sm uppercase tracking-[0.15em]">Shipping Address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First Name" id="firstName" autoComplete="given-name" />
              <Field label="Last Name" id="lastName" autoComplete="family-name" />
              <Field label="Address" id="address" autoComplete="street-address" className="sm:col-span-2" />
              <Field label="City" id="city" autoComplete="address-level2" />
              <Field label="Postal Code" id="postal" autoComplete="postal-code" />
              <Field label="Country" id="country" autoComplete="country-name" className="sm:col-span-2" />
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-sm uppercase tracking-[0.15em]">Payment</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Card Number" id="card" autoComplete="cc-number" className="sm:col-span-2" />
              <Field label="Expiry (MM/YY)" id="expiry" autoComplete="cc-exp" />
              <Field label="CVC" id="cvc" autoComplete="cc-csc" />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              This is a demo checkout — no payment is processed. Connect the Stripe integration to accept real
              payments through a secure Stripe Checkout Session.
            </p>
          </section>

          <Button type="submit" size="lg" className="w-full">
            Place Order · {formatPrice(total)}
          </Button>
        </form>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="border border-border bg-secondary/30 p-6">
            <h2 className="mb-6 text-sm uppercase tracking-[0.15em]">Order Summary</h2>
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.size}`} className="flex gap-4 py-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium leading-snug">{item.product.name}</p>
                      <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                        {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm tabular-nums">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="tabular-nums">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between pt-3 font-serif text-xl">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
