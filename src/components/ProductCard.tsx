"use client";

import Image from "next/image";
import { Product, conditionColors, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <article
      onClick={() => onClick(product)}
      className="product-card group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="product-image object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Condition Badge */}
        <div className="absolute left-3 top-3">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
              conditionColors[product.condition]
            }`}
          >
            {product.conditionLabel}
          </span>
        </div>

        {/* Unique Stock Indicator */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-700 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Pieza única
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
          {product.category}
        </div>
        <h3 className="text-base font-medium text-zinc-900 line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-zinc-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-zinc-400">
            o menos con transferencia
          </span>
        </div>
      </div>
    </article>
  );
}



