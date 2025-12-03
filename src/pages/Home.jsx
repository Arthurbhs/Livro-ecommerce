import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firebaseConfig";
import { useCart } from "../store/cart";
import ProductGrid from "../components/ProductGrid";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const [products, setProducts] = useState([]);
  const addItem = useCart((state) => state.addItem);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ==================================================
  // Buscar produtos do Firestore
  // ==================================================
  useEffect(() => {
    async function fetchProducts() {
      try {
        const snap = await getDocs(collection(db, "products"));

        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(list);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Box sx={{ width: "100%", paddingBottom: 4 }}>
      
      {/* HERO RESPONSIVO */}
      <Box
        sx={{
          width: "100%",
          height: isMobile ? "40vh" : "65vh",
          backgroundImage: "url('/Hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      {/* CARROSSEL DE PRODUTOS */}
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: "bold",
          mt: 4,
          textAlign: "center",
          fontSize: { xs: "1.6rem", md: "2.2rem" },
        }}
      >
        Produtos em Destaque
      </Typography>

      <FeaturedCarousel products={products} />

      {/* GRID DE PRODUTOS */}
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: "bold",
          mt: 4,
          textAlign: "center",
          fontSize: { xs: "1.6rem", md: "2.2rem" },
        }}
      >
        Mais vendidos
      </Typography>

      <ProductGrid products={products} />
    </Box>
  );
}
