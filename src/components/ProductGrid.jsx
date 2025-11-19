import { Grid, Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products,  }) {
  return (
    <Box sx={{ width: "100%", padding: 2 }}>

      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
