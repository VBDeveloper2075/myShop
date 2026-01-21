"use client";

import { useState, useEffect, useCallback } from "react";
import { X, CreditCard, Building2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { SanityImage } from "./SanityImage";
import {
  SanityProduct,
  conditionColors,
  conditionLabels,
  formatPrice,
  calculateTransferPrice,
  productCategoryLabels,
} from "@/lib/sanity-types";

interface ProductDrawerProps {
  product: SanityProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = "card" | "transfer";

export function ProductDrawer({ product, isOpen, onClose }: ProductDrawerProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [currentImage, setCurrentImage] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setPaymentMethod("card");
      setCurrentImage(0);
      setError(null);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  const handleCheckout = async () => {
    if (!product) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          paymentMethod: paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al procesar el pago");
      }

      // Redirigir al checkout de Mercado Pago
      const checkoutUrl = data.initPoint || data.sandboxInitPoint;
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("No se pudo obtener la URL de pago");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Error al procesar el pago");
      setIsLoading(false);
    }
  };

  if (!product || (!isOpen && !isClosing)) return null;

  const transferPrice = calculateTransferPrice(product.listPrice, product.transferPrice);
  const finalPrice = paymentMethod === "card" ? product.listPrice : transferPrice;
  const discount = Math.round((1 - transferPrice / product.listPrice) * 100);

  const nextImage = () => {
    if (product.images?.length) {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images?.length) {
      setCurrentImage(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm ${
          isClosing ? "overlay-exit" : "overlay-enter"
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed bottom-0 right-0 top-0 z-50 w-full max-w-lg overflow-hidden bg-white shadow-2xl sm:rounded-l-2xl ${
          isClosing ? "drawer-exit" : "drawer-enter"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition-transform hover:scale-105"
        >
          <X className="h-5 w-5 text-zinc-700" />
        </button>

        {/* Content */}
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Image Gallery */}
          <div className="relative aspect-square w-full shrink-0 bg-zinc-100">
            {product.images?.[currentImage] && (
              <SanityImage
                image={product.images[currentImage]}
                alt={`${product.title} usado en Caseros`}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                priority
                className="object-cover"
              />
            )}

            {/* Image Navigation */}
            {product.images && product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition-transform hover:scale-105"
                >
                  <ChevronLeft className="h-5 w-5 text-zinc-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition-transform hover:scale-105"
                >
                  <ChevronRight className="h-5 w-5 text-zinc-700" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        idx === currentImage
                          ? "w-6 bg-white"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Condition Badge */}
            <div className="absolute left-4 top-4">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${
                  conditionColors[product.condition]
                }`}
              >
                {conditionLabels[product.condition]}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
              {productCategoryLabels[product.category] || product.category}
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">
              {product.title}
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              {product.description}
            </p>

            {/* Condition Details */}
            {product.conditionDescription && (
              <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Estado del producto
                </h3>
                <p className="mt-2 text-sm text-zinc-700">
                  {product.conditionDescription}
                </p>
              </div>
            )}

            {/* Stock Indicator */}
            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              <span className="text-sm font-medium text-zinc-700">
                Pieza única disponible
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="mt-8">
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Método de pago
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {/* Card Option */}
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                    paymentMethod === "card"
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                  }`}
                >
                  <CreditCard
                    className={`mb-2 h-5 w-5 ${
                      paymentMethod === "card" ? "text-white" : "text-zinc-400"
                    }`}
                  />
                  <div className="text-sm font-medium">Tarjeta</div>
                  <div
                    className={`mt-1 text-lg font-semibold ${
                      paymentMethod === "card" ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {formatPrice(product.listPrice)}
                  </div>
                  <div
                    className={`mt-1 text-xs ${
                      paymentMethod === "card"
                        ? "text-zinc-300"
                        : "text-zinc-400"
                    }`}
                  >
                    Hasta 3 cuotas
                  </div>
                </button>

                {/* Transfer Option */}
                <button
                  onClick={() => setPaymentMethod("transfer")}
                  className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                    paymentMethod === "transfer"
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                  }`}
                >
                  {/* Discount Badge */}
                  <div className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
                    -{discount}%
                  </div>

                  <Building2
                    className={`mb-2 h-5 w-5 ${
                      paymentMethod === "transfer"
                        ? "text-white"
                        : "text-zinc-400"
                    }`}
                  />
                  <div className="text-sm font-medium">Transferencia</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span
                      className={`text-lg font-semibold ${
                        paymentMethod === "transfer"
                          ? "text-white"
                          : "text-zinc-900"
                      }`}
                    >
                      {formatPrice(transferPrice)}
                    </span>
                    <span
                      className={`text-xs line-through ${
                        paymentMethod === "transfer"
                          ? "text-zinc-400"
                          : "text-zinc-400"
                      }`}
                    >
                      {formatPrice(product.listPrice)}
                    </span>
                  </div>
                  <div
                    className={`mt-1 text-xs ${
                      paymentMethod === "transfer"
                        ? "text-zinc-300"
                        : "text-zinc-400"
                    }`}
                  >
                    Pago inmediato
                  </div>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Action Button */}
            <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 border-t border-zinc-200 bg-white p-6">
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full rounded-xl bg-zinc-900 py-4 text-base font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Procesando...
                  </>
                ) : paymentMethod === "card" ? (
                  <>Pagar {formatPrice(finalPrice)} con Tarjeta</>
                ) : (
                  <>Pagar {formatPrice(finalPrice)} por Transferencia</>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-zinc-400">
                Serás redirigido a Mercado Pago para completar el pago
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
