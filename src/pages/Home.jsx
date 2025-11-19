import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firebaseConfig";
import { useCart } from "../store/cart";
import ProductGrid from "../components/ProductGrid";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const featuredProducts = [
  {
    id: 1,
    name: "Camisa Periferia",
    author: "João Silva",
    rating: 4.5,
    price: 79.9,
    imageUrl: "/produtos/camisa1.png",
  },
  {
    id: 2,
    name: "Boné Original",
    author: "Maria Souza",
    rating: 5,
    price: 59.9,
    imageUrl: "/produtos/bone1.png",
  },
  {
    id: 3,
    name: "Camisa Periferia",
    author: "João Silva",
    rating: 4.5,
    price: 79.9,
    imageUrl: "/produtos/camisa1.png",
  },
  {
    id: 4,
    name: "Boné Original",
    author: "Maria Souza",
    rating: 5,
    price: 59.9,
    imageUrl: "/produtos/bone1.png",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const addItem = useCart((state) => state.addItem);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchProducts();
  }, []);

  return (
    <Box sx={{ width: "100%", paddingBottom: 4 }}>
      
      {/* HERO RESPONSIVO */}
      <Box
        sx={{
          width: "100%",
          height: isMobile ? "40vh" : "65vh", // adapta à tela
          backgroundImage: "url('/Hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          // remove fixed no mobile (corrige bugs no Android/iOS)
          backgroundAttachment: isMobile ? "scroll" : "fixed",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />

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

      <FeaturedCarousel products={featuredProducts} />

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

      <ProductGrid products={featuredProducts} />
    </Box>
  );
}
