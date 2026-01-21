import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { ProductsSection } from "@/components/ProductsSection";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artículos Usados en Caseros | CB Jamstack Agency",
  description: "Venta de artículos usados en excelente estado. Tecnología, libros, hogar y más. Zona Caseros, Buenos Aires. Piezas únicas a precios accesibles.",
  openGraph: {
    title: "Artículos Usados en Caseros | CB Jamstack Agency",
    description: "Venta de artículos usados en excelente estado. Tecnología, libros, hogar y más.",
    locale: "es_AR",
    type: "website",
  },
};

async function ProductsLoader() {
  const { data: products } = await sanityFetch({
    query: PRODUCTS_QUERY,
  });

  return <ProductsSection products={products || []} />;
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <Suspense fallback={
          <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-xl bg-zinc-200" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-zinc-200" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-zinc-200" />
                </div>
              ))}
            </div>
          </section>
        }>
          <ProductsLoader />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
