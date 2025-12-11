import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../api/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Box, Typography, Button, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  async function loadWishlist() {
    if (!user) return;

    const colRef = collection(db, "users", user.uid, "wishlist");
    const snap = await getDocs(colRef);

    const items = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setWishlist(items);
  }

  async function removeItem(id) {
    await deleteDoc(doc(db, "users", user.uid, "wishlist", id));
    loadWishlist(); // recarregar lista
  }

  useEffect(() => {
    loadWishlist();
  }, [user]);

  if (!user) {
    return <Typography sx={{ p: 3 }}>Faça login para ver sua lista de desejos.</Typography>;
  }

  if (wishlist.length === 0) {
    return <Typography sx={{ p: 3 }}>Sua lista de desejos está vazia ❤️</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>Minha Lista de Desejos ❤️</Typography>

      <Grid container spacing={3}>
        {wishlist.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <ProductCard product={item} />
            <Button
              color="error"
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => removeItem(item.id)}
            >
              Remover
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
