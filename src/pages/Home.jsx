import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firebaseConfig";
import { useCart } from "../store/cart";
import ProductGrid from "../components/ProductGrid";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [products, setProducts] = useState([]);
  const addItem = useCart((state) => state.addItem);
const navigate = useNavigate();

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
        
      {/* PROPAGANDA EDITORIAL — ÁGUAS ANCESTRAIS */}
<Box
  sx={{
    mt: 8,
    mb: 10,
    px: { xs: 2, md: 6 },
   
  }}
>
  <Grid
    container
    spacing={7}
    alignItems="center"
    sx={{
      background:
        "linear-gradient(135deg, #3b1c5a 0%, #6a3fa0 100%)",
      borderRadius: 4,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          p: { xs: 2, md: 4 }, // 👈 AQUI ESTÁ O RESPIRO
    }}
  >
    {/* CAPA */}
    <Grid item xs={12} md={4} textAlign="center">
      <Box
        component="img"
        src="/aguas_ancestrais.png"
        alt="Livro Águas Ancestrais"
        sx={{
          width: "100%",
          maxWidth: 220,
          my: { xs: 4, md: 6 },
          borderRadius: 2,
          boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
        }}
      />
    </Grid>

    {/* TEXTO */}
    <Grid item xs={12} md={8}>
      <Box sx={{ pr: { md: 6 }, pb: { xs: 4, md: 0 } }}>
        <Typography
          variant="overline"
          sx={{
            letterSpacing: 3,
            color: "#e6d8ff",
          }}
        >
          Destaque editorial
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#fff",
            mt: 1,
            mb: 2,
          }}
        >
          Águas Ancestrais
        </Typography>

        <Typography
          sx={{
            color: "#f5edff",
            lineHeight: 1.9,
            mb: 3,
            maxWidth: 520,
          }}
        >
          Um mergulho na palavra como axé.  
          Poesia que escorre da ancestralidade,
          atravessa o corpo e encontra o tempo.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/aguas_ancestrais")}
          sx={{
            backgroundColor: "#ffffff",
            color: "#3b1c5a",
            fontWeight: 700,
            borderRadius: "999px",
            px: 4,
            py: 1.2,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f1e9ff",
            },
          }}
        >
          Conhecer o livro
        </Button>
      </Box>
    </Grid>
  </Grid>
</Box>

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
