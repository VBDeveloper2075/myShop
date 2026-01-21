// Tipos de Sanity para productos
export type ProductCondition = 
  | "nuevo"
  | "como-nuevo" 
  | "muy-buen-estado" 
  | "buen-estado"

export type ProductCategory =
  | "tecnologia"
  | "libros"
  | "hogar"
  | "herramientas"
  | "fitness"
  | "educacion"
  | "camping"
  | "radioaficion"
  | "otro"

export interface SanityImageAsset {
  _id: string
  url: string
  metadata?: {
    lqip?: string
    dimensions?: {
      width: number
      height: number
    }
  }
}

export interface SanityImage {
  _key?: string
  asset: SanityImageAsset
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanityProduct {
  _id: string
  title: string
  slug: string
  description: string
  conditionDescription?: string
  listPrice: number
  transferPrice?: number
  condition: ProductCondition
  category: ProductCategory
  images: SanityImage[]
  inStock: boolean
  featured?: boolean
}

// Tipos para ropa
export type ClothingCondition = 
  | "nuevo-con-etiqueta" 
  | "como-nuevo" 
  | "muy-buen-estado" 
  | "buen-estado"

export type ClothingCategory = "hombre" | "mujer" | "accesorios"

export interface SanityClothingItem {
  _id: string
  name: string
  slug: string
  description: string
  price: number
  condition: ClothingCondition
  category: ClothingCategory
  size?: string
  brand?: string
  images: SanityImage[]
  sold: boolean
}

// Mapeo de condiciones a labels y colores
export const conditionLabels: Record<ProductCondition, string> = {
  "nuevo": "Nuevo",
  "como-nuevo": "Como nuevo",
  "muy-buen-estado": "Muy buen estado",
  "buen-estado": "Buen estado",
}

export const conditionColors: Record<ProductCondition, string> = {
  "nuevo": "bg-emerald-600 text-white",
  "como-nuevo": "bg-zinc-800 text-white",
  "muy-buen-estado": "bg-zinc-700 text-white",
  "buen-estado": "bg-zinc-500 text-white",
}

export const clothingConditionLabels: Record<ClothingCondition, string> = {
  "nuevo-con-etiqueta": "Nuevo con etiqueta",
  "como-nuevo": "Como nuevo",
  "muy-buen-estado": "Muy buen estado",
  "buen-estado": "Buen estado",
}

export const clothingConditionColors: Record<ClothingCondition, string> = {
  "nuevo-con-etiqueta": "bg-emerald-600 text-white",
  "como-nuevo": "bg-zinc-800 text-white",
  "muy-buen-estado": "bg-zinc-700 text-white",
  "buen-estado": "bg-zinc-500 text-white",
}

export const categoryLabels: Record<ClothingCategory, string> = {
  hombre: "Hombre",
  mujer: "Mujer",
  accesorios: "Accesorios",
}

export const productCategoryLabels: Record<ProductCategory, string> = {
  "tecnologia": "Tecnología",
  "libros": "Libros",
  "hogar": "Hogar",
  "herramientas": "Herramientas",
  "fitness": "Fitness",
  "educacion": "Educación",
  "camping": "Camping",
  "radioaficion": "Radioafición",
  "otro": "Otro",
}

// Utilidades
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function calculateTransferPrice(listPrice: number, transferPrice?: number): number {
  // Si hay un precio de transferencia definido, usarlo; sino calcular 15% menos
  return transferPrice ?? Math.round(listPrice * 0.85)
}
