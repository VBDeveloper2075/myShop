import { NextRequest, NextResponse } from "next/server";

// Webhook para recibir notificaciones de Mercado Pago
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log para debugging (remover en producción)
    console.log("Webhook Mercado Pago:", JSON.stringify(body, null, 2));

    const { type, data } = body;

    if (type === "payment") {
      const paymentId = data.id;
      
      // Aquí puedes:
      // 1. Verificar el estado del pago con la API de MP
      // 2. Actualizar tu base de datos
      // 3. Enviar email de confirmación
      // 4. Marcar el producto como vendido
      
      console.log(`Pago recibido: ${paymentId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}

// Mercado Pago también puede enviar GET para verificar el endpoint
export async function GET() {
  return NextResponse.json({ status: "ok" });
}

