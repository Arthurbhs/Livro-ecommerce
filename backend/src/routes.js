import express from "express";
import {
  criarPedidoPix,
  criarPedidoCartao,
  criarPedidoTeste
} from "./pagbank.js";

const router = express.Router();
console.log("✅ routes.js carregado");

/**
 * ===============================
 * 🔹 CRIAR PEDIDO PIX (PRODUÇÃO)
 * ⚠️ PIX REAL — se pagar, entra dinheiro
 * ===============================
 */
router.post("/pix/create", async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Carrinho inválido" });
    }

    console.log("📩 REQUEST PIX (CART):", cart);

    const pedido = await criarPedidoPix(cart);

    console.log("✅ PAGBANK PIX FINAL:", {
      orderId: pedido.orderId,
      status: pedido.status,
    });

    return res.status(201).json(pedido);

  } catch (error) {
    console.error("❌ ERRO PIX:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Erro ao criar pagamento PIX",
    });
  }
});

/**
 * ===============================
 * 🔹 CRIAR PEDIDO CARTÃO (PRODUÇÃO)
 * ✔️ Cartão criptografado (PCI)
 * ✔️ Cartão de teste
 * ===============================
 */
router.post("/credit-card/create", async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Carrinho inválido" });
    }

    console.log("📩 REQUEST CARTÃO (CART):", cart);

    const pedido = await criarPedidoCartao(cart);

    console.log("✅ PAGBANK ORDER FINAL:", {
      orderId: pedido.orderId,
      status: pedido.status,
      charges: pedido.charges?.map(c => ({
        charge_id: c.id,
        status: c.status
      })),
    });

    return res.status(201).json(pedido);

  } catch (error) {
    console.error("❌ ERRO CARTÃO:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Erro ao criar pagamento com cartão",
    });
  }
});

/**
 * ===============================
 * 🔹 PEDIDO DE TESTE (VALIDAR TOKEN)
 * ===============================
 */
router.post("/pedido/teste", async (_req, res) => {
  try {
    const pedido = await criarPedidoTeste();

    console.log("✅ TOKEN VALIDADO:", {
      order_id: pedido.id,
      status: pedido.status,
    });

    return res.status(201).json(pedido);

  } catch (error) {
    console.error("❌ ERRO PEDIDO TESTE:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Erro ao validar token PagBank",
    });
  }
});

/**
 * ===============================
 * 🔔 WEBHOOK PAGBANK
 * ===============================
 */
router.post("/webhook/pagbank", (req, res) => {
  res.sendStatus(200); // responde primeiro (obrigatório)

  console.log("🔔 WEBHOOK PAGBANK RECEBIDO:", {
    event: req.body?.type,
    order_id: req.body?.data?.id,
    status: req.body?.data?.status,
  });
});

/**
 * ===============================
 * 🔹 HEALTHCHECK
 * ===============================
 */
router.get("/ping", (_req, res) => {
  res.json({ ok: true });
});

export default router;
