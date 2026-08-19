"use client"

import Link from "next/link"
import Image from "next/image"
import { X, Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif text-xl tracking-wide">
            Cart <span className="text-muted-foreground">({itemCount})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button variant="outline" nativeButton={false} render={<Link href="/shop" onClick={closeCart} />}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.size}`} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${item.product.id}`}
                    onClick={closeCart}
                    className="relative h-28 w-20 shrink-0 overflow-hidden bg-muted"
                  >
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="text-sm font-medium leading-snug hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                          Size {item.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="h-fit text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <X className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm tabular-nums">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">Subtotal</span>
                <span className="font-serif text-xl tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
              <Button className="w-full" size="lg" nativeButton={false} render={<Link href="/checkout" onClick={closeCart} />}>
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
