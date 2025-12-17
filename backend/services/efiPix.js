import EfiPay from "sdk-node-apis-efi";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// resolve caminho absoluto do certificado
const certPath = path.resolve(process.env.EFI_CERT_PATH);

console.log("📄 Certificado PIX:", certPath);

const efi = new EfiPay({
  sandbox: true, // homologação
  client_id: process.env.EFI_CLIENT_ID,
  client_secret: process.env.EFI_CLIENT_SECRET,
  certificate: certPath,
});

export async function createPix({ valor, descricao }) {
  const valorNumerico = Number(valor);

  if (isNaN(valorNumerico)) {
    throw new Error("Valor inválido");
  }

  const valorFormatado = valorNumerico.toFixed(2);

  const body = {
    calendario: { expiracao: 3600 },
    valor: { original: valorFormatado },
    chave: process.env.EFI_PIX_KEY,
    solicitacaoPagador: descricao || "Compra na loja",
  };

  const response = await efi.pixCreateImmediateCharge({}, body);

  // 🔍 LOG DE DEPURAÇÃO
  console.log("📦 Resposta EFI:", response);

  return response; // ⬅️ ISSO É FUNDAMENTAL
}
