import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createPix } from "./services/efiPix.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/pix/create", async (req, res) => {
  try {
    const { valor, descricao } = req.body;

    const pix = await createPix({
      valor,
      descricao,
    });

    // 🔴 MUITO IMPORTANTE
    return res.status(200).json(pix);

  } catch (err) {
    console.error("❌ Erro PIX:", err?.response?.data || err.message);

    return res.status(500).json({
      error: true,
      message: "Erro ao criar PIX",
    });
  }
});
app.post("/pix/webhook", (req, res) => {
  console.log("🔔 Webhook PIX recebido:");
  console.log(JSON.stringify(req.body, null, 2));

  // Sempre responda 200 para a Efí
  res.sendStatus(200);
});



app.listen(process.env.PORT, () => {
  console.log("🔥 PIX rodando na porta", process.env.PORT);
});
