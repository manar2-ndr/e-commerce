import Link from "next/link"
import Image from "next/image"
import { type Product, formatPrice } from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{product.category}</p>
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-sm tabular-nums text-foreground/80">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
