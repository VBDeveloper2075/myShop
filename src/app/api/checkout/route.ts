import { NextRequest, NextResponse } from "next/server";
import { getProductById, calculateTransferPrice } from "@/lib/products";

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

    // Obtener producto
    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Calcular precio según método de pago
    const price =
      paymentMethod === "transfer"
        ? calculateTransferPrice(product.price)
        : product.price;

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
          title: product.name,
          description: `${product.conditionLabel} - ${product.category}`,
          quantity: 1,
          unit_price: price,
          currency_id: "ARS",
        },
      ],
      payer: {
        email: "test_user@testuser.com",
      },
      payment_methods: {
        excluded_payment_types: excludedPaymentTypes,
        installments: paymentMethod === "card" ? 3 : 1,
      },
      back_urls: {
        success: "http://localhost:3000/checkout/success",
        failure: "http://localhost:3000/checkout/failure",
        pending: "http://localhost:3000/checkout/pending",
      },
      auto_return: "approved",
      external_reference: productId,
      statement_descriptor: "MY ARCHIVE SHOP",
    };

    console.log("Creating preference via API...");

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
  } catch (error: any) {
    console.error("Error creating preference:", error);
    
    return NextResponse.json(
      { error: "Error al crear la preferencia de pago" },
      { status: 500 }
    );
  }
}
