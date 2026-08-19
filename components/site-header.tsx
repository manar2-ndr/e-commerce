"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { categories } from "@/lib/products"
import { CartDrawer } from "@/components/cart-drawer"

export function SiteHeader() {
  const { itemCount, openCart } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <nav className="hidden flex-1 items-center gap-6 md:flex" aria-label="Categories">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/shop?category=${encodeURIComponent(c)}`}
              className="text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {c}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.35em] text-foreground md:flex-1 md:text-center"
        >
          MAISON
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <Link
            href="/shop"
            className="hidden text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Shop All
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2 text-foreground transition-opacity hover:opacity-70"
            aria-label={`Open cart, ${itemCount} items`}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <CartDrawer />
    </header>
  )
}
