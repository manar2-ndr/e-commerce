import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getProduct, products } from "@/lib/products"
import { ProductDetail } from "@/components/product-detail"
import { ProductCard } from "@/components/product-card"

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return { title: "Not Found — MAISON" }
  return {
    title: `${product.name} — MAISON`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div>
      <nav className="mx-auto max-w-7xl px-4 pt-6 text-xs uppercase tracking-[0.15em] text-muted-foreground sm:px-6 lg:px-8">
        <Link href="/shop" className="transition-colors hover:text-foreground">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-serif text-2xl tracking-wide md:text-3xl">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
