import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../api/firebaseConfig";
import { useAuth } from "../context/AuthContext";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TextField,
  Divider,
} from "@mui/material";

export default function ProductPage() {
  const { id } = useParams(); // id do produto
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Carrega produto
  useEffect(() => {
    const fetchProduct = async () => {
      const ref = doc(db, "products", id);
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        setProduct({ id: snapshot.id, ...snapshot.data() });
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  // Verifica admin
  useEffect(() => {
    async function checkAdmin() {
      if (!auth.currentUser) return;

      const refAdmin = doc(db, "admins", auth.currentUser.uid);
      const snapAdmin = await getDoc(refAdmin);

      setIsAdmin(snapAdmin.exists());
    }

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography sx={{ textAlign: "center", mt: 8 }}>
        Produto não encontrado.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      
      {/* BOTÃO EDITAR – SOMENTE ADMIN */}
      {isAdmin && (
        <Button
          variant="contained"
          component={Link}
          to={`/product/editar/${id}`}
          sx={{
            mt: 2,
            textTransform: "none",
            backgroundColor: "#00ff9d",
            color: "#000",
            "&:hover": {
              backgroundColor: "#00ffa6",
            },
          }}
        >
          Editar Produto
        </Button>
      )}

      {/* CONTAINER PRINCIPAL */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* IMAGEM */}
        <Box sx={{ flex: 1 }}>
          <img
            src={product.imagem}
            alt={product.titulo}
            style={{
              width: "100%",
              borderRadius: 8,
              maxHeight: 600,
              objectFit: "contain",
            }}
          />
        </Box>

        {/* INFORMAÇÕES */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {product.titulo}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "gray", fontWeight: "bold", mb: 2 }}
          >
            Código: {product.id}
          </Typography>

          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            R$ {product.preco}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#333",
              px: 4,
              py: 1.2,
              fontSize: "1.1rem",
              mb: 2,
            }}
          >
            🛒 Comprar
          </Button>

          <Typography sx={{ color: "green", mb: 3 }}>
            Estoque: <strong>Disponível</strong>
          </Typography>

          <Typography sx={{ fontWeight: "bold", mb: 1 }}>
            Calcule o frete
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            <TextField label="CEP" size="small" sx={{ width: 140 }} />
            <Button variant="outlined">OK</Button>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button variant="outlined">+ Lista de Desejos</Button>
            <Button variant="outlined">Compartilhar</Button>
          </Box>
        </Box>
      </Box>

      {/* DESCRIÇÃO */}
      <Box
        sx={{
          background: "#fff",
          mt: 5,
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography sx={{ lineHeight: 1.6, mb: 2 }}>
          {product.resumo}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography><strong>Título:</strong> {product.titulo}</Typography>
        <Typography><strong>Autora:</strong> {product.autor}</Typography>
        <Typography><strong>Editora:</strong> {product.editora}</Typography>
        <Typography><strong>Ano:</strong> {product.ano}</Typography>
        <Typography><strong>Páginas:</strong> {product.paginas}</Typography>
        <Typography><strong>ISBN:</strong> {product.isbn}</Typography>
      </Box>
    </Box>
  );
}
