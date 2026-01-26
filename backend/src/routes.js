import express from "express";
import { criarPedidoPix } from "./pagbank.js";

const router = express.Router();
console.log("✅ routes.js carregado");


/**
 * 🔹 CRIAR PIX
 */
router.post("/pix/create", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || !items.length) {
      return res.status(400).json({
        error: "Items inválidos",
      });
    }

    console.log("REQUEST PIX:", items);

    const pedido = await criarPedidoPix(items);

    return res.status(201).json(pedido);

  } catch (error) {
    console.error(
      "ERRO PIX:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      error: "Erro ao criar pagamento PIX",
    });
  }
});

/**
 * 🔔 WEBHOOK PAGBANK
 */
router.post("/webhook/pagbank", (req, res) => {
  console.log("🔔 WEBHOOK PAGBANK:", req.body);
  res.sendStatus(200);
});

router.get("/ping", (req, res) => {
  res.json({ ok: true });
});


export default router;
