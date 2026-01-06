"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Home, MessageCircle } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>

        <h1 className="text-2xl font-semibold text-zinc-900 mb-2">
          ¡Pago exitoso!
        </h1>

        <p className="text-zinc-600 mb-6">
          Tu compra ha sido procesada correctamente. Te contactaremos por
          WhatsApp para coordinar la entrega.
        </p>

        {paymentId && (
          <div className="bg-zinc-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-zinc-500 mb-1">ID de pago</p>
            <p className="text-sm font-mono text-zinc-700">{paymentId}</p>
          </div>
        )}

        <div className="space-y-3">
          <a
            href={`https://wa.me/5491157966147?text=¡Hola! 🎉 Acabo de realizar una compra en SE VENDE.%0A%0A🔖 ID de pago: ${paymentId || 'No disponible'}%0A%0A¡Quedo atento para coordinar la entrega! 📦`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            💬 Coordinar entrega por WhatsApp
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

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
          <div className="animate-pulse text-zinc-400">Cargando...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

