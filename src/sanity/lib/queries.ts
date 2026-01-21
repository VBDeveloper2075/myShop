import { defineQuery } from 'next-sanity'

// Fragmento para imágenes optimizadas
const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height }
    }
  },
  alt,
  hotspot,
  crop
`

// Query para todos los productos (página principal)
export const PRODUCTS_QUERY = defineQuery(/* groq */ `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    conditionDescription,
    listPrice,
    transferPrice,
    condition,
    category,
    images[] {
      ${imageFragment}
    },
    inStock,
    featured
  }
`)

// Query para productos destacados
export const FEATURED_PRODUCTS_QUERY = defineQuery(/* groq */ `
  *[_type == "product" && featured == true && inStock == true] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    listPrice,
    transferPrice,
    condition,
    category,
    images[] {
      ${imageFragment}
    },
    inStock,
    featured
  }
`)

// Query para un producto individual por slug
export const PRODUCT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    conditionDescription,
    listPrice,
    transferPrice,
    condition,
    category,
    images[] {
      ${imageFragment}
    },
    inStock,
    featured
  }
`)

// Query para todos los items de ropa
export const CLOTHING_ITEMS_QUERY = defineQuery(/* groq */ `
  *[_type == "clothingItem"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    condition,
    category,
    size,
    brand,
    images[] {
      ${imageFragment}
    },
    sold
  }
`)

// Query para items de ropa por categoría
export const CLOTHING_BY_CATEGORY_QUERY = defineQuery(/* groq */ `
  *[_type == "clothingItem" && category == $category] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    condition,
    category,
    size,
    brand,
    images[] {
      ${imageFragment}
    },
    sold
  }
`)

// Query para slugs de productos (para generateStaticParams)
export const PRODUCT_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "product" && defined(slug.current)]{ "slug": slug.current }
`)

// Query para slugs de ropa (para generateStaticParams)
export const CLOTHING_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "clothingItem" && defined(slug.current)]{ "slug": slug.current }
`)
