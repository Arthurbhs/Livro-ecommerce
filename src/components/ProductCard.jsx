import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: "100%", md: 280, lg: 300 },
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: { md: "scale(1.03)" },
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          image={product.imagem}
          alt={product.titulo}
          sx={{
            height: { xs: 220, sm: 240, md: 260, lg: 280 },
            objectFit: "contain",   // 🔥 mostra a imagem inteira sem cortar
            backgroundColor: "#fff" // fundo branco para capas verticais
          }}
        />

        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {product.titulo}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Autor: {product.autor}
          </Typography>
            <Typography variant="body2" color="text.secondary">Editora: {product.editora}</Typography>

          <Typography variant="body2" color="text.secondary">
            R$ {product.preco}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
