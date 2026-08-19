import { Suspense } from "react"
import { ShopView } from "@/components/shop-view"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  return (
    <Suspense fallback={null}>
      <ShopView initialCategory={category} />
    </Suspense>
  )
}
