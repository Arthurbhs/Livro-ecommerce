import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { CircularProgress } from "@mui/material";

export default function FormaPagamento({ cart, total, frete, cep }) {
  const [metodo, setMetodo] = useState(null);
  const [pix, setPix] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);
const [erro, setErro] = useState(null);
const [sucesso, setSucesso] = useState(false);

  // ================= PIX =================
  async function gerarPix() {
     if (loading) return; // 👈 ADICIONE AQUI
    try {
      setLoading(true);
   setErro(null);
setSucesso(false);
      const payload = {
        cart: cart.map(item => ({
          titulo: item.titulo,
          preco: item.preco,
          quantidade: item.quantidade,
        }))
      };

      const res = await fetch(
        "https://backend-livro-ecommerce.onrender.com/api/pix/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
       if (!res.ok) {
  throw new Error("Erro ao gerar PIX");
}
        return;
      }

      setPix(data);

    } catch (err) {
      console.error(err);
     if (!res.ok) {
  throw new Error("Erro ao gerar PIX");
}
    } finally {
      setLoading(false);
    }
  }

  function copiarPix() {
    if (!pix?.pixCopiaCola) return;

    navigator.clipboard.writeText(pix.pixCopiaCola);
    setCopiado(true);

    setTimeout(() => setCopiado(false), 2000);
  }

  // ================= CARTÃO =================
  async function pagarCartao() {
      if (loading) return; 
    try {
      setLoading(true);
 setErro(null);
setSucesso(false);
      const encryptedCard = "FAKE_ENCRYPTED_CARD"; // ⚠️ depois substituir

      const res = await fetch(
        "https://backend-livro-ecommerce.onrender.com/api/credit-card/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
  encryptedCard,
  cart,
  frete,
  cep
})
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (!res.ok) {
  throw new Error("Erro ao gerar PIX");
}
        return;
      }

     if (!res.ok) {
  throw new Error("Erro ao gerar PIX");
}

    } catch (err) {
      console.error(err);
      if (!res.ok) {
  throw new Error("Erro ao gerar PIX");
}
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Formas de pagamento</Typography>

      {erro && (
  <Alert severity="error" sx={{ mt: 2 }}>
    {erro}
  </Alert>
)}

{sucesso && (
  <Alert severity="success" sx={{ mt: 2 }}>
    Pagamento aprovado com sucesso! 🎉
  </Alert>
)}

      {/* BOTÕES */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant={metodo === "pix" ? "contained" : "outlined"}
          fullWidth
          onClick={() => setMetodo("pix")}
        >
          PIX
        </Button>

        <Button
          variant={metodo === "cartao" ? "contained" : "outlined"}
          fullWidth
          onClick={() => setMetodo("cartao")}
        >
          Cartão
        </Button>
      </Box>

      {/* ================= PIX ================= */}
      {metodo === "pix" && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
  variant="contained"
  color="success"
  fullWidth
  onClick={gerarPix}
  disabled={loading}
>
  {loading ? <CircularProgress size={24} color="inherit" /> : "Gerar PIX"}
</Button>

          {pix && (
            <>
              <Typography mt={2}>Escaneie o QR Code</Typography>

              <QRCodeCanvas value={pix.pixCopiaCola} size={220} />

              <Box sx={{ mt: 2 }}>
                <Button fullWidth variant="contained" onClick={copiarPix}>
                  {copiado ? "Copiado ✅" : "Copiar código PIX"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}

      {/* ================= CARTÃO ================= */}
      {metodo === "cartao" && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Pagamento com Cartão</Typography>

         <TextField disabled={loading} label="Número do cartão" fullWidth sx={{ mt: 2 }} />
<TextField disabled={loading} label="Nome no cartão" fullWidth sx={{ mt: 2 }} />
<TextField disabled={loading} label="Validade" fullWidth sx={{ mt: 2 }} />
<TextField disabled={loading} label="CVV" fullWidth sx={{ mt: 2 }} />

         <Button
  variant="contained"
  fullWidth
  sx={{ mt: 2 }}
  onClick={pagarCartao}
  disabled={loading}
>
  {loading ? (
    <CircularProgress size={24} color="inherit" />
  ) : (
    `Pagar R$ ${total.toFixed(2)}`
  )}
</Button>
        </Box>
      )}
    </Box>
  );
}