import Link from "next/link"
import { categories } from "@/lib/products"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl tracking-[0.35em]">MAISON</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Considered wardrobe essentials, crafted in natural fibres and made to last beyond the season.
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Shop</h3>
          <ul className="mt-4 space-y-2">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  href={`/shop?category=${encodeURIComponent(c)}`}
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Maison</h3>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li>Our Story</li>
            <li>Sustainability</li>
            <li>Shipping &amp; Returns</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} MAISON. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
