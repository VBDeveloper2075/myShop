"use client";

import { SanityProduct } from "@/lib/sanity-types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: SanityProduct[];
  onProductClick: (product: SanityProduct) => void;
}

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={onProductClick}
          />
        ))}
      </div>
    </section>
  );
}
