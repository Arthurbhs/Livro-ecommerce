import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();


const app = express();

app.set("trust proxy", 1);

/**
 * ===============================
 * MIDDLEWARES
 * ===============================
 */
app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

/**
 * ===============================
 * ROTAS
 * ===============================
 */
app.use("/api", routes);

/**
 * ===============================
 * START SERVER
 * ===============================
 */
const PORT = process.env.PORT || 3001;

// ⚠️ NÃO logar token inteiro em produção
if (process.env.NODE_ENV !== "production") {
  console.log("🔑 PAGBANK TOKEN (dev):", process.env.PAGBANK_TOKEN);
}

app.listen(PORT, () => {
  console.log("🔥 Backend rodando na porta", PORT);
  console.log("Ambiente:", process.env.NODE_ENV || "development");
});
