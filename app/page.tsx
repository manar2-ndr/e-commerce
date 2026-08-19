import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/products"

export default function HomePage() {
  const featured = products.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[16/8]">
          <Image
            src="/images/hero.png"
            alt="Model wearing an ivory silk outfit and camel overcoat"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/10 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-md">
                <p className="text-xs uppercase tracking-[0.25em] text-foreground/70">Autumn / Winter</p>
                <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-wide text-foreground text-balance md:text-6xl">
                  Quiet luxury for the considered wardrobe
                </h1>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/80">
                  Timeless silhouettes in silk, cashmere, and virgin wool — made to be lived in and loved for years.
                </p>
                <Button size="lg" className="mt-8" nativeButton={false} render={<Link href="/shop" />}>
                  Explore the Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/shop?category=${encodeURIComponent(c)}`}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Curated</p>
            <h2 className="mt-2 font-serif text-3xl tracking-wide md:text-4xl">New Arrivals</h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.15em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Editorial band */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Our Philosophy</p>
          <p className="mt-5 font-serif text-2xl leading-relaxed tracking-wide text-balance md:text-3xl">
            We believe in buying less and choosing well. Each piece is made in limited runs by ateliers we know by
            name, in fabrics chosen to age gracefully.
          </p>
        </div>
      </section>
    </div>
  )
}
