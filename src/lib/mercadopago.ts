import { MercadoPagoConfig, Preference } from "mercadopago";

// Inicializar cliente de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
});

export const preferenceClient = new Preference(client);

export interface CreatePreferenceParams {
  productId: string;
  productName: string;
  productDescription: string;
  price: number;
  quantity: number;
  paymentMethod: "card" | "transfer";
  buyerEmail?: string;
}

export async function createPreference(params: CreatePreferenceParams) {
  const {
    productId,
    productName,
    productDescription,
    price,
    quantity,
    paymentMethod,
  } = params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Configurar métodos de pago según selección
  const paymentMethods =
    paymentMethod === "transfer"
      ? {
          // Solo transferencia bancaria
          excluded_payment_types: [
            { id: "credit_card" },
            { id: "debit_card" },
            { id: "prepaid_card" },
          ],
        }
      : {
          // Tarjetas de crédito/débito
          excluded_payment_types: [{ id: "bank_transfer" }, { id: "ticket" }],
          installments: 3, // Hasta 3 cuotas
        };

  const preference = await preferenceClient.create({
    body: {
      items: [
        {
          id: productId,
          title: productName,
          description: productDescription,
          quantity: quantity,
          unit_price: price,
          currency_id: "ARS",
        },
      ],
      payment_methods: paymentMethods,
      back_urls: {
        success: `${baseUrl}/checkout/success`,
        failure: `${baseUrl}/checkout/failure`,
        pending: `${baseUrl}/checkout/pending`,
      },
      auto_return: "approved" as const,
      external_reference: productId,
    },
  });

  return preference;
}
