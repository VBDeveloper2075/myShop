"use client";

import Image from "next/image";
import { Product, conditionColors, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const isSold = product.sold === true;
  
  return (
    <article
      onClick={() => !isSold && onClick(product)}
      className={`product-card group overflow-hidden rounded-xl border border-zinc-200 bg-white ${
        isSold ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`product-image object-cover ${isSold ? "grayscale" : ""}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAwEPwAB//9k="
        />
        
        {/* SOLD Badge */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-lg bg-red-600 px-4 py-2 text-lg font-bold uppercase tracking-wider text-white shadow-lg">
              Vendido
            </span>
          </div>
        )}
        
        {/* Condition Badge */}
        {!isSold && (
          <div className="absolute left-3 top-3">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                conditionColors[product.condition]
              }`}
            >
              {product.conditionLabel}
            </span>
          </div>
        )}

        {/* Unique Stock Indicator */}
        {!isSold && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-700 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              Pieza única
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
          {product.category}
        </div>
        <h3 className={`text-base font-medium line-clamp-2 ${isSold ? "text-zinc-500" : "text-zinc-900"}`}>
          {product.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className={`text-lg font-semibold ${isSold ? "text-zinc-400 line-through" : "text-zinc-900"}`}>
            {formatPrice(product.price)}
          </span>
          {!isSold && (
            <span className="text-xs text-zinc-400">
              o menos con transferencia
            </span>
          )}
        </div>
      </div>
    </article>
  );
}



