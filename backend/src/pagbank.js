import axios from "axios";

import forge from "node-forge";

/**
 * ===============================
 * CONFIGURAÇÕES GERAIS (PRODUÇÃO)
 * ===============================
 * PagBank NÃO possui sandbox real para Orders.
 * Sempre usamos endpoint de produção + token de produção.
 */
const PAGBANK_API = "https://api.pagseguro.com/orders";

const headers = {
  Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`,
  "Content-Type": "application/json",
};

/**
 * ===============================
 * 🔹 TESTE SIMPLES DE AUTENTICAÇÃO
 * Cria um pedido básico apenas para validar o TOKEN
 * ===============================
 */
export async function criarPedidoTeste() {
  const payload = {
    reference_id: "teste-token-" + Date.now(),

    customer: {
      name: "Teste",
      email: "teste@email.com",
    },

    items: [
      {
        name: "Produto Teste",
        quantity: 1,
        unit_amount: 1000, // R$10,00
      },
    ],
  };

  console.log("📩 REQUEST PEDIDO TESTE:", JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(PAGBANK_API, payload, { headers });
    console.log("✅ RESPONSE PEDIDO TESTE:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ ERRO PEDIDO TESTE:",
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * ===============================
 * 🔹 CRIAR PEDIDO PIX (PRODUÇÃO)
 * ⚠️ PIX É REAL — SE PAGAR, O DINHEIRO ENTRA
 * ===============================
 */
export async function criarPedidoPix(cart) {
  const total = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const payload = {
    reference_id: "pedido_pix_" + Date.now(),

    notification_urls: [process.env.PAGBANK_WEBHOOK_URL],

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

  console.log("📩 REQUEST PIX:", JSON.stringify(payload, null, 2));

  const response = await axios.post(PAGBANK_API, payload, { headers });
  const order = response.data;
  const qrCode = order.qr_codes?.[0];

  if (!qrCode?.text) {
    console.error("❌ Resposta inesperada PagBank:", order);
    throw new Error("PIX Copia e Cola não retornado");
  }

  return {
    orderId: order.id,
    status: order.status,
    pixCopiaCola: qrCode.text,
    qrCodeLink:
      qrCode.links?.find((l) => l.rel === "QRCODE")?.href || null,
  };
}

/**
 * ===============================
 * 🔹 CRIAR PEDIDO CARTÃO (PRODUÇÃO)
 * ✔️ Usa CARTÕES DE TESTE
 * ✔️ Não cobra dinheiro real
 * ✔️ Não usa tokenização
 * ===============================
 */
export async function criarPedidoCartao(cart) {
  const total = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  // 1️⃣ Buscar public key
  const publicKey = await obterPublicKey();

  // 2️⃣ Criptografar cartão
  const encryptedCard = criptografarCartao(
    {
      number: "4111111111111111", // cartão de teste
      exp_month: "12",
      exp_year: "2030",
      security_code: "123",
      holder: { name: "CLIENTE TESTE" },
    },
    publicKey
  );

  const payload = {
    reference_id: "pedido_cartao_" + Date.now(),

    notification_urls: [process.env.PAGBANK_WEBHOOK_URL],

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

    charges: [
  {
    amount: {
      value: Math.round(total * 100),
      currency: "BRL",
    },
    billing_address: {
      street: "Rua Teste",
      number: "100",
      locality: "Centro",
      city: "São Paulo",
      region_code: "SP",
      country: "BRA",
      postal_code: "01001000",
    },
    payment_method: {
      type: "CREDIT_CARD",
      installments: 1,
      capture: true,
      card: {
        encrypted: encryptedCard,
      },
    },
  },
],

  };

  // ⚠️ LOG SEGURO (sem dados sensíveis)
 console.log("📩 PAGBANK ORDER REQUEST:", {
  reference_id: payload.reference_id,
  customer: payload.customer,
  items: payload.items,
  charge: {
    amount: payload.charges[0].amount,
    payment_method: {
      type: "CREDIT_CARD",
      installments: 1,
      capture: true,
      card: "ENCRYPTED",
    },
  },
});

  try {
    const response = await axios.post(PAGBANK_API, payload, { headers });

 console.log("✅ PAGBANK ORDER RESPONSE:", {
  order_id: response.data.id,
  reference_id: response.data.reference_id,
  status: response.data.status,
  charge_id: response.data.charges?.[0]?.id,
  charge_status: response.data.charges?.[0]?.status,
});


    return {
      orderId: response.data.id,
      status: response.data.status,
      charges: response.data.charges,
    };
  } catch (error) {
    console.error(
      "❌ ERRO CARTÃO:",
      error.response?.data || error.message
    );
    throw error;
  }
}


const PAGBANK_PUBLIC_KEY_API = "https://api.pagseguro.com/public-keys";

export async function obterPublicKey() {
  const response = await axios.get(PAGBANK_PUBLIC_KEY_API, {
    headers: {
      Authorization: `Bearer ${process.env.PAGBANK_INTEGRATION_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.data?.public_key) {
    console.error("Resposta PagBank Public Key:", response.data);
    throw new Error("Public key não retornada pela PagBank");
  }

  return response.data.public_key;
}




export function criptografarCartao(cartao, publicKeyPem) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  const payload = JSON.stringify({
    number: cartao.number,
    exp_month: cartao.exp_month,
    exp_year: cartao.exp_year,
    security_code: cartao.security_code,
    holder: {
      name: cartao.holder.name,
    },
  });

  const encrypted = publicKey.encrypt(payload, "RSA-OAEP", {
    md: forge.md.sha256.create(),
  });

  return forge.util.encode64(encrypted);
}

