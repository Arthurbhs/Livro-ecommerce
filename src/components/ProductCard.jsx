import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating
} from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <Card
      sx={{
        minWidth: 250,    
        maxWidth: 320,        // ✅ largura mínima
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Autor: {product.author}
        </Typography>

        <Rating
          name="read-only"
          value={product.rating || 4}
          readOnly
          size="small"
          sx={{ mt: 1 }}
        />

        <Typography
          variant="h6"
          sx={{ mt: 1, fontWeight: "bold" }}
        >
          R$ {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
