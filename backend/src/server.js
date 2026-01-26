import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use("/api", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("🔥 Backend rodando na porta", PORT);
  console.log("Ambiente:", process.env.NODE_ENV || "sandbox");
});
