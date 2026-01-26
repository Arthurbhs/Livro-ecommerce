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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCart(getCart());
  }, []);
async function finalizarCompra() {
  try {
    setLoading(true);

    const payload = {
      items: cart.map(item => ({
        id: item.id,
        name: item.titulo,
        unit_amount: Math.round(item.preco * 100), // PagBank usa centavos
        quantity: item.quantidade,
      }))
    };

    const res = await fetch("http://localhost:3001/create-pix", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Erro ao criar PIX");
    }

    const data = await res.json();
    setPix(data);
  } catch (err) {
    console.error(err);
    alert("Erro ao gerar PIX");
  } finally {
    setLoading(false);
  }
}


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

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        🛒 Meu Carrinho
      </Typography>

      {cart.map((item) => (
        <Card
          key={item.id}
          sx={{ display: "flex", mb: 2, p: 2, alignItems: "center", gap: 2 }}
        >
          <CardMedia
            component="img"
            image={item.imagem}
            alt={item.titulo}
            sx={{ width: 100, height: 140, objectFit: "cover" }}
          />

          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{item.titulo}</Typography>
            <Typography>Quantidade: {item.quantidade}</Typography>
            <Typography>Preço: R$ {item.preco}</Typography>
            <Typography fontWeight="bold" mt={1}>
              Subtotal: R$ {(item.quantidade * item.preco).toFixed(2)}
            </Typography>
          </CardContent>

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

      <Box sx={{ p: 2, border: "1px solid #000", borderRadius: 2 }}>
        <Typography variant="h5">
          Total: <strong>R$ {total.toFixed(2)}</strong>
        </Typography>

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2 }}
          onClick={finalizarCompra}
          disabled={loading}
        >
          {loading ? "Gerando PIX..." : "Finalizar Compra"}
        </Button>

        {/* 🟢 TELA PIX */}
        {pix && (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="h6">Pague com PIX</Typography>

            {pix.qrCodeLink && (
              <img
                src={pix.qrCodeLink}
                alt="QR Code PIX"
                style={{ width: 220, marginTop: 10 }}
              />
            )}

            <Typography sx={{ mt: 2 }}>Copia e cola:</Typography>

            <Typography
              sx={{
                wordBreak: "break-all",
                background: "#eee",
                p: 2,
                borderRadius: 2,
                mt: 1,
              }}
            >
              {pix.pixCopiaCola}
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
