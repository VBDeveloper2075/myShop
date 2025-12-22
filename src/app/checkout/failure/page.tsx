"use client";

import Link from "next/link";
import { XCircle, Home, RefreshCw } from "lucide-react";

export default function CheckoutFailurePage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-semibold text-zinc-900 mb-2">
          Pago no completado
        </h1>

        <p className="text-zinc-600 mb-6">
          Hubo un problema al procesar tu pago. No se realizó ningún cargo.
          Puedes intentarlo nuevamente.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-zinc-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-zinc-800 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Intentar nuevamente
          </Link>

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

