"use client"

import { useState } from "react"
import Image from "next/image"
import { type Product, formatPrice } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [size, setSize] = useState(product.sizes[0])

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="lg:py-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
        <h1 className="mt-3 font-serif text-4xl tracking-wide">{product.name}</h1>
        <p className="mt-3 text-lg tabular-nums text-foreground/80">{formatPrice(product.price)}</p>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <div className="mt-8">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-[0.15em]">Size</span>
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{product.color}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`min-w-14 border px-4 py-2.5 text-sm transition-colors ${
                  size === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:border-foreground"
                }`}
                aria-pressed={size === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Button size="lg" className="mt-8 w-full sm:w-auto sm:min-w-64" onClick={() => addItem(product, size)}>
          Add to Cart
        </Button>

        <div className="mt-10 border-t border-border pt-8">
          <h2 className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Details</h2>
          <ul className="mt-4 space-y-2">
            {product.details.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-foreground/80">
                <span className="text-accent" aria-hidden="true">
                  —
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
