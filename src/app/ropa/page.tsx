"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  clothingItems,
  getClothingByCategory,
  formatPrice,
  clothingConditionColors,
  categoryLabels,
  type ClothingCategory,
  type ClothingItem,
} from "@/lib/clothing";

const categories: ClothingCategory[] = ["hombre", "mujer", "accesorios"];

export default function RopaPage() {
  const [activeCategory, setActiveCategory] = useState<ClothingCategory>("mujer");
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredItems = getClothingByCategory(activeCategory);

  const openDrawer = (item: ClothingItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeDrawer = () => {
    setSelectedItem(null);
  };

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) =>
        prev === selectedItem.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedItem.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <a href="/" className="text-sm font-semibold tracking-tight text-zinc-900 hover:text-zinc-600 transition-colors">
              MY ARCHIVE
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

      {/* Category Tabs */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex justify-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeCategory === cat
                    ? "text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {categoryLabels[cat]}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isSold = item.sold === true;
              return (
                <article
                  key={item.id}
                  onClick={() => !isSold && openDrawer(item)}
                  className={`group bg-white border border-zinc-200 transition-all duration-300 ${
                    isSold 
                      ? "opacity-60 cursor-not-allowed" 
                      : "cursor-pointer hover:border-zinc-400 hover:shadow-lg"
                  }`}
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-zinc-100">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className={`object-cover transition-transform duration-500 ${
                        isSold ? "grayscale" : "group-hover:scale-105"
                      }`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* SOLD Badge */}
                    {isSold && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="rounded-lg bg-red-600 px-4 py-2 text-lg font-bold uppercase tracking-wider text-white shadow-lg">
                          Vendido
                        </span>
                      </div>
                    )}
                    {!isSold && (
                      <span
                        className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${
                          clothingConditionColors[item.condition]
                        }`}
                      >
                        {item.conditionLabel}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    {item.brand && (
                      <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
                        {item.brand}
                      </p>
                    )}
                    <h3 className={`text-sm font-medium mb-1 line-clamp-1 ${isSold ? "text-zinc-500" : "text-zinc-900"}`}>
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-semibold ${isSold ? "text-zinc-400 line-through" : "text-zinc-900"}`}>
                        {formatPrice(item.price)}
                      </p>
                      {item.size && !isSold && (
                        <span className="text-xs text-zinc-400 border border-zinc-200 px-2 py-0.5">
                          Talle {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Drawer */}
      {selectedItem && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={closeDrawer}
          />

          {/* Drawer Panel */}
          <div className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white z-50 overflow-y-auto shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-zinc-200">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                {categoryLabels[selectedItem.category]}
              </span>
              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-zinc-500" />
              </button>
            </div>

            {/* Image Gallery */}
            <div className="relative aspect-square bg-zinc-100">
              <Image
                src={selectedItem.images[currentImageIndex]}
                alt={selectedItem.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 480px"
              />
              {selectedItem.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <span
                className={`absolute bottom-4 left-4 px-3 py-1.5 text-xs font-medium uppercase tracking-wider ${
                  clothingConditionColors[selectedItem.condition]
                }`}
              >
                {selectedItem.conditionLabel}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              {selectedItem.brand && (
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                  {selectedItem.brand}
                </p>
              )}
              <h2 className="text-xl font-medium text-zinc-900 mb-2">
                {selectedItem.name}
              </h2>
              {selectedItem.size && (
                <p className="text-sm text-zinc-500 mb-4">
                  Talle: <span className="font-medium text-zinc-900">{selectedItem.size}</span>
                </p>
              )}
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              <div className="border-t border-zinc-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-zinc-500">Precio</span>
                  <span className="text-2xl font-semibold text-zinc-900">
                    {formatPrice(selectedItem.price)}
                  </span>
                </div>

                <a
                  href={`https://wa.me/5491157966147?text=¡Hola! 👋 Vi este producto en MY ARCHIVE y me encantaría saber más:%0A%0A🛍️ *${selectedItem.name}*%0A${selectedItem.size ? `📏 Talle: ${selectedItem.size}%0A` : ''}💰 Precio: ${formatPrice(selectedItem.price)}%0A%0A¿Está disponible? ¿Podríamos coordinar?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-4 bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors rounded-lg"
                >
                  💬 Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}




