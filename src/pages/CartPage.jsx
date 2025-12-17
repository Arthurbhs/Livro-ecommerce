import { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "../components/cartStorage";

import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";



export default function CartPage() {
  const [cart, setCart] = useState([]);
const [pix, setPix] = useState(null);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  if (cart.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5">Seu carrinho está vazio 🛒</Typography>
      </Box>
    );
  }


async function handleCheckout() {
  try {
    const response = await fetch("http://localhost:3333/pix/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: total,
        descricao: "Compra no carrinho",
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao gerar PIX");
    }

    const data = await response.json(); // ✅ AQUI

    console.log("📦 PIX criado:", data);
    setPix(data);

  } catch (err) {
    console.error("Erro ao finalizar compra:", err);
    alert("Erro ao gerar PIX. Tente novamente.");
  }
}



  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        🛒 Meu Carrinho
      </Typography>

      {cart.map((item) => (
        <Card
          key={item.id}
          sx={{
            display: "flex",
            mb: 2,
            p: 2,
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* IMAGEM */}
          <CardMedia
            component="img"
            image={item.imagem}
            alt={item.titulo}
            sx={{
              width: 100,
              height: 140,
              objectFit: "cover",
              borderRadius: 1,
            }}
          />

          {/* INFORMAÇÕES */}
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{item.titulo}</Typography>
            <Typography>Quantidade: {item.quantidade}</Typography>
            <Typography>Preço: R$ {item.preco}</Typography>

            <Typography fontWeight="bold" mt={1}>
              Subtotal: R$ {(item.quantidade * item.preco).toFixed(2)}
            </Typography>
          </CardContent>

          {/* BOTÃO REMOVER */}
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              removeFromCart(item.id);
              setCart(getCart());
            }}
          >
            Remover
          </Button>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />

      {/* TOTAL */}
      <Box
        sx={{
          p: 2,
          border: "1px solid #000",
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h5">
          Total: <strong>R$ {total.toFixed(2)}</strong>
        </Typography>

       <Button
  variant="contained"
  color="success"
  fullWidth
  sx={{ mt: 2 }}
  onClick={handleCheckout}
>
  Finalizar Compra
</Button>

{pix && (
  <Box
    sx={{
      mt: 4,
      p: 3,
      border: "2px dashed #2e7d32",
      borderRadius: 2,
      backgroundColor: "#f1f8f5",
      textAlign: "center",
    }}
  >
    <Typography variant="h6" mb={2}>
      💸 Pague com PIX
    </Typography>

    {/* QR CODE */}
    <img
      src={`https://${pix.location}`}
      alt="QR Code PIX"
      style={{ maxWidth: 260, marginBottom: 16 }}
    />

    {/* COPIA E COLA */}
    <Typography variant="body2" sx={{ wordBreak: "break-all", mb: 2 }}>
      {pix.pixCopiaECola}
    </Typography>

    <Button
      variant="outlined"
      onClick={() => {
        navigator.clipboard.writeText(pix.pixCopiaECola);
        alert("Código PIX copiado!");
      }}
    >
      Copiar código PIX
    </Button>

    <Typography sx={{ mt: 2, color: "gray" }}>
      Após o pagamento, a confirmação é automática.
    </Typography>
  </Box>
)}


        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {
            clearCart();
            setCart([]);
          }}
        >
          Limpar Carrinho
        </Button>
      </Box>
    </Box>
  );
}
