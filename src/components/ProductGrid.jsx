import { Grid, Box } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <Box
      sx={{
        width: "100%",
        py: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          maxWidth: "1200px", // limita a largura total para centralizar
          justifyContent: "center", // centraliza horizontalmente
          alignItems: "center", // centraliza verticalmente (se houver altura definida)
        }}
      >
        {products.map((p) => (
          <Grid
            item
            key={p.id}
            xs={12}
            sm={6}
            md={4}
            lg={3} // opcional, melhora o layout em telas grandes
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
