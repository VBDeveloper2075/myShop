"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, Home, MessageCircle } from "lucide-react";
import { Suspense } from "react";

function PendingContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-amber-600" />
        </div>

        <h1 className="text-2xl font-semibold text-zinc-900 mb-2">
          Pago pendiente
        </h1>

        <p className="text-zinc-600 mb-6">
          Tu pago está siendo procesado. Te notificaremos cuando se acredite.
          Si elegiste pagar en efectivo, recuerda completar el pago en el punto
          de pago indicado.
        </p>

        {paymentId && (
          <div className="bg-zinc-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-zinc-500 mb-1">ID de pago</p>
            <p className="text-sm font-mono text-zinc-700">{paymentId}</p>
          </div>
        )}

        <div className="space-y-3">
          <a
            href={`https://wa.me/5491157966147?text=¡Hola! 👋 Realicé un pago en MY ARCHIVE y está pendiente de acreditación.%0A%0A🔖 ID de pago: ${paymentId || 'No disponible'}%0A%0A¿Podrían ayudarme a verificar el estado?`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-amber-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-amber-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            💬 Consultar por WhatsApp
          </a>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-zinc-100 text-zinc-700 py-3 px-4 rounded-xl font-medium hover:bg-zinc-200 transition-colors"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPendingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
          <div className="animate-pulse text-zinc-400">Cargando...</div>
        </div>
      }
    >
      <PendingContent />
    </Suspense>
  );
}

