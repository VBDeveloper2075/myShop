"use client"

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImage as SanityImageType } from '@/lib/sanity-types'

interface SanityImageProps {
  image: SanityImageType
  alt?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
  quality?: number
}

export function SanityImage({
  image,
  alt,
  width = 800,
  height,
  fill = false,
  sizes,
  priority = false,
  className,
  quality = 80,
}: SanityImageProps) {
  if (!image?.asset) return null

  // Calcular altura manteniendo aspect ratio si no se proporciona
  const aspectRatio = image.asset.metadata?.dimensions
    ? image.asset.metadata.dimensions.width / image.asset.metadata.dimensions.height
    : 4 / 3
  
  const calculatedHeight = height || Math.round(width / aspectRatio)

  // Generar URL optimizada con Sanity Image URL builder
  const imageUrl = urlFor(image)
    .width(width)
    .height(calculatedHeight)
    .quality(quality)
    .auto('format') // WebP/AVIF automático
    .url()

  // Usar alt personalizado o el del CMS o generar uno basado en contexto
  const imageAlt = alt || image.alt || ''

  // LQIP (Low Quality Image Placeholder) desde Sanity
  const blurDataURL = image.asset.metadata?.lqip

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        priority={priority}
        className={className}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
      />
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={imageAlt}
      width={width}
      height={calculatedHeight}
      sizes={sizes}
      priority={priority}
      className={className}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
    />
  )
}
