"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductDrawer } from "@/components/ProductDrawer";
import type { SanityProduct } from "@/lib/sanity-types";

interface ProductsSectionProps {
  products: SanityProduct[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<SanityProduct | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleProductClick = (product: SanityProduct) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <ProductGrid products={products} onProductClick={handleProductClick} />
      
      <ProductDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
