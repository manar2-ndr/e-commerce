export type Category = "Dresses" | "Outerwear" | "Tops" | "Bottoms" | "Accessories"

export type Product = {
  id: string
  name: string
  price: number
  category: Category
  color: string
  image: string
  description: string
  details: string[]
  sizes: string[]
}

export const products: Product[] = [
  {
    id: "silk-slip-dress",
    name: "Silk Slip Dress",
    price: 420,
    category: "Dresses",
    color: "Ivory",
    image: "/images/silk-slip-dress.png",
    description:
      "A fluid bias-cut slip dress in lustrous sandwashed silk. Cut to skim the body with a delicate cowl neckline and adjustable straps.",
    details: ["100% mulberry silk", "Bias cut", "Adjustable straps", "Dry clean only", "Made in Italy"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "cashmere-overcoat",
    name: "Cashmere Overcoat",
    price: 1290,
    category: "Outerwear",
    color: "Camel",
    image: "/images/cashmere-overcoat.png",
    description:
      "An unstructured double-faced cashmere coat with a relaxed silhouette. Tailored for a clean drape that layers effortlessly.",
    details: ["100% cashmere", "Double-faced construction", "Tonal horn buttons", "Fully lined", "Made in Italy"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "wool-blazer",
    name: "Tailored Wool Blazer",
    price: 680,
    category: "Outerwear",
    color: "Charcoal",
    image: "/images/wool-blazer.png",
    description:
      "A sharply tailored single-breasted blazer in Italian virgin wool. Structured shoulders meet a nipped waist for a timeless line.",
    details: ["Virgin wool", "Single-breasted", "Notch lapel", "Interior pockets", "Made in Portugal"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "pleated-skirt",
    name: "Pleated Midi Skirt",
    price: 340,
    category: "Bottoms",
    color: "Black",
    image: "/images/pleated-skirt.png",
    description:
      "A fine knife-pleated midi skirt with fluid movement. Sits high on the waist and falls to an elegant mid-calf length.",
    details: ["Recycled polyester", "Knife pleats", "Concealed zip", "Midi length", "Machine washable"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "poplin-shirt",
    name: "Cotton Poplin Shirt",
    price: 210,
    category: "Tops",
    color: "White",
    image: "/images/poplin-shirt.png",
    description:
      "A crisp oversized shirt in crwhen compact cotton poplin. A wardrobe cornerstone with a relaxed collar and dropped shoulder.",
    details: ["100% cotton poplin", "Oversized fit", "Mother-of-pearl buttons", "Dropped shoulder", "Made in Portugal"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "wide-trousers",
    name: "Wide-Leg Trousers",
    price: 390,
    category: "Bottoms",
    color: "Beige",
    image: "/images/wide-trousers.png",
    description:
      "High-waisted wide-leg trousers with a pressed crease and fluid drape. Tailored in a breathable wool blend.",
    details: ["Wool blend", "High waist", "Pressed crease", "Side pockets", "Made in Italy"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "knit-turtleneck",
    name: "Cashmere Turtleneck",
    price: 360,
    category: "Tops",
    color: "Cream",
    image: "/images/knit-turtleneck.png",
    description:
      "A featherweight ribbed turtleneck in pure cashmere. Soft against the skin with a slim, elongating fit.",
    details: ["100% cashmere", "Ribbed knit", "Slim fit", "Hand wash cold", "Made in Scotland"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "leather-tote",
    name: "Leather Tote Bag",
    price: 890,
    category: "Accessories",
    color: "Tan",
    image: "/images/leather-tote.png",
    description:
      "A structured tote in full-grain vegetable-tanned leather. Roomy enough for daily essentials with a suede-lined interior.",
    details: ["Full-grain leather", "Suede lining", "Interior zip pocket", "Magnetic closure", "Made in Spain"],
    sizes: ["One Size"],
  },
  {
    id: "silk-scarf",
    name: "Printed Silk Scarf",
    price: 180,
    category: "Accessories",
    color: "Terracotta",
    image: "/images/silk-scarf.png",
    description:
      "A hand-rolled silk twill scarf in a painterly print. A finishing touch that transforms any look.",
    details: ["100% silk twill", "Hand-rolled edges", "90 x 90 cm", "Dry clean only", "Made in France"],
    sizes: ["One Size"],
  },
]

export const categories: Category[] = ["Dresses", "Outerwear", "Tops", "Bottoms", "Accessories"]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price)
}
