import { Suspense } from "react";
import { ClothingSection } from "@/components/ClothingSection";
import { sanityFetch } from "@/sanity/lib/live";
import { CLOTHING_ITEMS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ropa y Accesorios Usados en Caseros | CB Jamstack Agency",
  description: "Prendas y accesorios de segunda mano de marcas premium. Ropa para hombre, mujer y accesorios en excelente estado. Zona Caseros, Buenos Aires.",
  openGraph: {
    title: "Ropa y Accesorios Usados en Caseros | CB Jamstack Agency",
    description: "Prendas y accesorios de segunda mano de marcas premium. Ropa para hombre, mujer y accesorios en excelente estado.",
    locale: "es_AR",
    type: "website",
  },
};

async function ClothingLoader() {
  const { data: items } = await sanityFetch({
    query: CLOTHING_ITEMS_QUERY,
  });

  return <ClothingSection items={items || []} />;
}

export default function RopaPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <a href="/" className="text-sm font-semibold tracking-tight text-zinc-900 hover:text-zinc-600 transition-colors">
              SE VENDE
            </a>
            <span className="text-zinc-300">/</span>
            <span className="text-sm font-medium text-zinc-500">ROPA</span>
          </div>
          <a
            href="/"
            className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            ← Volver a productos
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-gradient-to-b from-zinc-100 to-zinc-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-900 mb-3">
            Ropa & Accesorios
          </h1>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Piezas únicas de marcas premium. Segunda mano con estilo.
          </p>
        </div>
      </section>

      {/* Content */}
      <Suspense fallback={
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 w-24 rounded bg-zinc-200 animate-pulse" />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] rounded bg-zinc-200" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-zinc-200" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-zinc-200" />
                </div>
              ))}
            </div>
          </div>
        </section>
      }>
        <ClothingLoader />
      </Suspense>
    </main>
  );
}
