import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { 
  calculateTransferPrice, 
  conditionLabels, 
  productCategoryLabels,
  type SanityProduct 
} from "@/lib/sanity-types";

// Query para obtener producto por ID
const PRODUCT_BY_ID_QUERY = /* groq */ `
  *[_type == "product" && _id == $id][0] {
    _id,
    title,
    listPrice,
    transferPrice,
    condition,
    category,
    inStock
  }
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, paymentMethod } = body;

    // Validar datos
    if (!productId || !paymentMethod) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    // Verificar Access Token
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("MERCADOPAGO_ACCESS_TOKEN no está configurado");
      return NextResponse.json(
        { error: "Mercado Pago no está configurado" },
        { status: 500 }
      );
    }

    // Obtener producto desde Sanity
    const product = await client.fetch<SanityProduct | null>(
      PRODUCT_BY_ID_QUERY,
      { id: productId }
    );

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Verificar que el producto esté disponible
    if (product.inStock === false) {
      return NextResponse.json(
        { error: "Este producto ya no está disponible" },
        { status: 400 }
      );
    }

    // Calcular precio según método de pago
    const transferPriceValue = calculateTransferPrice(product.listPrice, product.transferPrice);
    const price = paymentMethod === "transfer" ? transferPriceValue : product.listPrice;

    // Obtener URL base - prioridad: env var > Vercel URL > request host
    const baseUrl = 
      process.env.NEXT_PUBLIC_BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      `https://${request.headers.get("host")}`;

    console.log("Base URL:", baseUrl);

    // Configurar métodos de pago según selección
    const excludedPaymentTypes =
      paymentMethod === "transfer"
        ? [
            { id: "credit_card" },
            { id: "debit_card" },
            { id: "prepaid_card" },
          ]
        : [{ id: "bank_transfer" }, { id: "ticket" }];

    // Crear preferencia usando fetch directo a la API de Mercado Pago
    const preferenceData = {
      items: [
        {
          id: productId,
          title: product.title,
          description: `${conditionLabels[product.condition]} - ${productCategoryLabels[product.category] || product.category}`,
          quantity: 1,
          unit_price: price,
          currency_id: "ARS",
        },
      ],
      payer: {
        email: "comprador@email.com",
      },
      payment_methods: {
        excluded_payment_types: excludedPaymentTypes,
        installments: paymentMethod === "card" ? 3 : 1,
      },
      back_urls: {
        success: `${baseUrl}/checkout/success`,
        failure: `${baseUrl}/checkout/failure`,
        pending: `${baseUrl}/checkout/pending`,
      },
      auto_return: "approved",
      external_reference: productId,
      statement_descriptor: "SE VENDE",
    };

    console.log("Creating preference...");

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preferenceData),
    });

    const preference = await response.json();

    if (!response.ok) {
      console.error("Error from MP API:", preference);
      throw new Error(preference.message || "Error creating preference");
    }

    console.log("Preference created:", preference.id);

    return NextResponse.json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
    });
  } catch (error: unknown) {
    console.error("Error creating preference:", error);
    
    return NextResponse.json(
      { error: "Error al crear la preferencia de pago" },
      { status: 500 }
    );
  }
}
