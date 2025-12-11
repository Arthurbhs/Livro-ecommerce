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
          onClick={() => alert("Finalizar compra em desenvolvimento...")}
        >
          Finalizar Compra
        </Button>

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
