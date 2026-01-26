import axios from "axios";

const PAGBANK_API =
  process.env.NODE_ENV === "production"
    ? "https://api.pagseguro.com/orders"
    : "https://sandbox.api.pagseguro.com/orders";

export async function criarPedidoPix(cart) {
  const total = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const payload = {
    reference_id: "pedido_" + Date.now(),

    notification_urls: [
      process.env.PAGBANK_WEBHOOK_URL
    ],

    customer: {
      name: "Cliente Teste",
      email: "cliente@email.com",
      tax_id: "12345678909",
    },

    items: cart.map((item) => ({
      name: item.titulo,
      quantity: item.quantidade,
      unit_amount: Math.round(item.preco * 100),
    })),

    qr_codes: [
      {
        amount: {
          value: Math.round(total * 100),
        },
      },
    ],
  };

  const response = await axios.post(
    PAGBANK_API,
    payload,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const order = response.data;
  const qrCode = order.qr_codes?.[0];

  if (!qrCode?.text) {
    console.error("Resposta PagBank:", order);
    throw new Error("PIX Copia e Cola não retornado");
  }

  return {
    orderId: order.id,
    status: order.status,
    pixCopiaCola: qrCode.text,
    qrCodeLink: qrCode.links?.find(
      (l) => l.rel === "QRCODE"
    )?.href || null,
  };
}
