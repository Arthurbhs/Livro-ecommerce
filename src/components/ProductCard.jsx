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
        width: {
          xs: "100%",   // 📱 Ocupa quase toda a largura do slide
          sm: "100%",
          md: 280,      // 💻 Tamanho ideal para tablets
          lg: 300,      // 🖥️ Desktop
        },
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: { md: "scale(1.03)" }, // hover só no desktop
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={product.imageUrl}
        alt={product.name}
        sx={{
          height: {
            xs: 180,   // menor no celular
            sm: 200,
            md: 220,
            lg: 240,   // maior em telas grandes
          },
          objectFit: "cover",
        }}
      />

      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "1.05rem",
              md: "1.1rem",
            },
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: {
              xs: "0.85rem",
              sm: "0.9rem",
            },
          }}
        >
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
          sx={{
            mt: 1,
            fontWeight: "bold",
            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
              md: "1.15rem",
            },
          }}
        >
          R$ {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
