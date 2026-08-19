"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { products, categories, type Category } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

type SortKey = "featured" | "price-asc" | "price-desc"

export function ShopView({ initialCategory }: { initialCategory?: string }) {
  const validInitial = categories.includes(initialCategory as Category) ? (initialCategory as Category) : null
  const [activeCategory, setActiveCategory] = useState<Category | null>(validInitial)
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("featured")

  const filtered = useMemo(() => {
    let result = products.slice()
    if (activeCategory) result = result.filter((p) => p.category === activeCategory)
    const q = query.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q),
      )
    }
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price)
    return result
  }, [activeCategory, query, sort])

  return (
    <div>
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl tracking-wide md:text-5xl">The Collection</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Enduring pieces in silk, wool, and cashmere — designed to be worn season after season.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`text-xs uppercase tracking-[0.15em] transition-colors ${
                activeCategory === null ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className={`text-xs uppercase tracking-[0.15em] transition-colors ${
                  activeCategory === c ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 lg:w-56">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                strokeWidth={1.5}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                aria-label="Search products"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>

        {filtered.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">
            No pieces match your search.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
