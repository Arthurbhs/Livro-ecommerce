import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../api/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import FreteCalculator from "../components/FreteCalculator";
import { addToCart } from "../components/cartStorage";

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
  const [isInWishlist, setIsInWishlist] = useState(false);


  useEffect(() => {
  if (!user) return;

  async function checkWishlist() {
    const ref = doc(db, "users", user.uid, "wishlist", id);
    const snap = await getDoc(ref);
    setIsInWishlist(snap.exists());
  }

  checkWishlist();
}, [user, id]);


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

async function addToWishlist(product) {
  if (!user) {
    alert("Você precisa estar logado para salvar itens na lista de desejos!");
    return;
  }

  const ref = doc(db, "users", user.uid, "wishlist", product.id);

  await setDoc(ref, product, { merge: true });

  alert("Adicionado à lista de desejos! ❤️");
}


async function addToWishlist(product) {
  if (!user) {
    alert("Você precisa estar logado!");
    return;
  }

  const ref = doc(db, "users", user.uid, "wishlist", product.id);

  await setDoc(ref, product, { merge: true });
  setIsInWishlist(true);
}

async function removeFromWishlist() {
  if (!user) return;

  const ref = doc(db, "users", user.uid, "wishlist", id);
  await deleteDoc(ref);

  setIsInWishlist(false);
}



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

function shareProduct() {
  const url = window.location.href;

  navigator.clipboard.writeText(url)
    .then(() => {
      alert("Link copiado para a área de transferência!");
    })
    .catch(() => {
      alert("Não foi possível copiar o link.");
    });
}


  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      
     
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
  onClick={() => {
    console.log("Produto enviado ao carrinho:", product);
    addToCart(product);
    alert("Produto adicionado ao carrinho!");
  }}
>
  🛒 Comprar
</Button>



          <Typography sx={{ color: "green", mb: 3 }}>
            Estoque: <strong>Disponível</strong>
          </Typography>

        <FreteCalculator/>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
  variant={isInWishlist ? "contained" : "outlined"}
  color={isInWishlist ? "error" : "primary"}
  onClick={() =>
    isInWishlist ? removeFromWishlist() : addToWishlist(product)
  }
>
  {isInWishlist ? "Remover da Lista ❤️" : "Adicionar à Lista ❤️"}
</Button>


            <Button variant="outlined" onClick={shareProduct}>
  Compartilhar 🔗
</Button>

          </Box>
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
         <Typography><strong>Gênero:</strong> {product.genero}</Typography>
        <Typography><strong>Ano:</strong> {product.ano}</Typography>
        <Typography><strong>Páginas:</strong> {product.paginas}</Typography>
        <Typography><strong>ISBN:</strong> {product.isbn}</Typography>
      </Box>
    </Box>
  );
}
