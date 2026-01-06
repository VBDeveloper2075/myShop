import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Eres el asistente virtual de SE VENDE , una página de barrio para comerciar productos usados en Caseros, Buenos Aires, Argentina.

=== SOBRE NOSOTROS ===
Somos una plataforma local que conecta vecinos para comprar y vender productos usados.
⚠️ IMPORTANTE: Solo facilitamos el contacto entre compradores y vendedores. NO somos intermediarios ni nos responsabilizamos por las transacciones.

=== INFORMACIÓN BÁSICA ===
📍 Ubicación: Caseros, Buenos Aires (zona local/barrio)
📦 Envíos: NO hacemos envíos al interior - Solo entregas en persona en zona local
💳 Pagos: Mercado Pago (tarjetas hasta 3 cuotas, transferencia con 10% descuento)
📱 WhatsApp: 11 5796 6147

=== PRODUCTOS DISPONIBLES ===
Electrónica:
- PC Desktop i7 con 16GB RAM, GeForce GTS450
- Impresora Brother WiFi con cartuchos de regalo
- Conservadora Black & Decker 12V para auto
- Caja de herramientas resistente

Libros:
- Septología de Jon Fosse (Premio Nobel 2023)
- Libros de educación e inteligencia emocional

Ropa y Accesorios (sección /ropa):
- Saco Mauro Sergio Jacquard - $12.000 (como nuevo)
- Vestido Naranja Brasilero - $30.000 (un solo uso)
- Más prendas de marcas como Zara, H&M, Levi's, Nike

=== PAGOS CON MERCADO PAGO ===
Usamos Checkout Bricks de Mercado Pago:
- Tarjeta de crédito/débito (hasta 3 cuotas)
- Transferencia bancaria (10% descuento)
- Rapipago y Pago Fácil
- Cuenta de Mercado Pago y Cuotas sin Tarjeta
- Seguridad: 3DS 2.0, antifraude, certificación PCI
- Experiencia de pago en el sitio, sin redirecciones

=== ⚠️ ADVERTENCIAS DE SEGURIDAD ===
SIEMPRE menciona estas recomendaciones cuando corresponda:
1. Hacé TODAS las preguntas que consideres necesarias ANTES de comprar
2. Asegurate de encontrarte en LUGARES PÚBLICOS y SEGUROS
3. Verificá el producto EN PERSONA antes de concretar
4. Sé cuidadoso/a al retirar o entregar productos
5. Si algo no te convence, no procedas con la compra

=== POLÍTICAS ===
📦 ENTREGAS:
- Solo en persona, zona Caseros/Buenos Aires
- Coordinamos punto de encuentro por WhatsApp
- NO hay envíos al interior del país

🔄 DEVOLUCIONES:
- Se acuerdan entre las partes (comprador y vendedor)
- La página NO se responsabiliza por las transacciones
- Solo conectamos personas, no somos intermediarios

📌 PRODUCTOS:
- Piezas únicas usadas/seminuevas
- Sin reposición cuando se venden
- Estado detallado en cada descripción

=== INSTRUCCIONES PARA TUS RESPUESTAS ===
- Español argentino, amigable pero claro
- Conciso: 2-4 oraciones máximo
- Mencioná las advertencias de seguridad cuando sea relevante
- Para productos específicos: sugerí ver la tienda o escribir por WhatsApp
- Si no sabés algo: "Te sugiero consultar por WhatsApp al 11 5796 6147"
- Emojis con moderación
- NUNCA inventes información
- Recordá: solo conectamos personas, no somos responsables de transacciones`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Mensajes inválidos" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "API key no configurada" },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10), // Últimos 10 mensajes para contexto
      ],
      max_tokens: 350,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "Lo siento, no pude procesar tu mensaje.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    
    // Manejar error de cuota excedida
    const isQuotaError = error instanceof Error && 
      ('code' in error && (error as { code?: string }).code === 'insufficient_quota');
    
    if (isQuotaError) {
      return NextResponse.json({
        reply: "¡Hola! 👋 Nuestro asistente está temporalmente ocupado. Mientras tanto, podés:\n\n📱 Escribirnos por WhatsApp: **11 5796 6147**\n🛍️ Ver todos los productos en la tienda\n\n¡Gracias por tu paciencia!"
      });
    }
    
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}

