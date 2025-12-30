import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Eres el asistente virtual de MY ARCHIVE STORE, una tienda online de productos usados y seminuevos de alta calidad en Argentina.

INFORMACIÓN DE LA TIENDA:
- Vendemos: electrónica (PCs, impresoras), libros, ropa y accesorios de marcas premium
- Todo es usado/seminuevo en excelente estado
- Ubicación: Buenos Aires, Argentina
- Envíos: A todo el país via Mercado Envíos
- Pagos: Mercado Pago (tarjetas hasta 3 cuotas, transferencia con 10% descuento)
- Contacto WhatsApp: 11 5796 6147

PRODUCTOS DESTACADOS:
- PC Desktop i7 con 16GB RAM - electrónica
- Impresora Brother WiFi - electrónica  
- Conservadora Black & Decker 12V - hogar
- Libros de educación y literatura (Jon Fosse Nobel 2023)
- Ropa de marcas: Mauro Sergio, Zara, H&M, Levi's, Nike, Michael Kors

POLÍTICAS:
- Piezas únicas, cuando se venden no hay reposición
- Devolución: 30 días si el producto no es como se describió
- Entrega: Coordinamos por WhatsApp después de la compra

INSTRUCCIONES:
- Responde en español argentino, amigable y profesional
- Sé conciso (máximo 2-3 oraciones por respuesta)
- Si preguntan por un producto específico, sugiere que lo busquen en la tienda o consulten por WhatsApp
- Si preguntan algo que no sabes, sugiere contactar por WhatsApp
- Usa emojis moderadamente para ser amigable
- No inventes información sobre productos específicos que no conoces`;

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
      max_tokens: 200,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "Lo siento, no pude procesar tu mensaje.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}

