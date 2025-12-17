import { Drawer, Box, Typography, Button, Stack, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../api/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import AdminButton from "./inserirProduto";

export default function UserDrawer({ open, setOpen, user }) {
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    auth.signOut();
    setOpen(false);
  };

  // 🔥 Carrega avatar verdadeiro do Firestore
  useEffect(() => {
    async function loadUserData() {
      if (!user) return;

      let ref = doc(db, "users", user.uid);
      let snap = await getDoc(ref);

      if (!snap.exists()) {
        ref = doc(db, "admins", user.uid);
        snap = await getDoc(ref);
      }

      if (snap.exists()) {
        setUserData(snap.data());
      }
    }

    loadUserData();
  }, [user]);

  const avatar =
    userData?.avatar ||     // Avatar salvo no Firestore (base64)
    user?.photoURL || "";   // Padrão do Google Auth

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          width: 280,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "#273292ff",
          height: "100%",
          color: "#fff",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        {/* AVATAR */}
        <Avatar
          src={avatar}
          alt="Avatar"
          sx={{
            width: 90,
            height: 90,
            border: "3px solid #00aeffff",
            mb: 1
          }}
        />

        {/* NOME */}
        <Typography variant="h6" fontWeight={600} sx={{ color: "#fff" }}>
          {userData?.nome || user?.displayName || "Usuário"}
        </Typography>

        <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
          {user && (
            <Button
              variant="contained"
              component={Link}
              to={`/user/${user.uid}`}
              onClick={() => setOpen(false)}
              sx={{
                textTransform: "none",
                backgroundColor: "#0bccc2ff",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#00f7ebff"
                }
              }}
            >
              Editar Perfil
            </Button>
          )}

          <Button
            variant="contained"
            component={Link}
            to="/carrinho"
            onClick={() => setOpen(false)}
            sx={{
              textTransform: "none",
              backgroundColor: "#00aeffff",
              color: "#000",
              "&:hover": {
                backgroundColor: "#00f7e3ff"
              }
            }}
          >
            Meu Carrinho
          </Button>

            <Button
            variant="contained"
            component={Link}
            to="/wishlist"
            onClick={() => setOpen(false)}
            sx={{
              textTransform: "none",
              backgroundColor: "#00aeffff",
              color: "#000",
              "&:hover": {
                backgroundColor: "#00f7e3ff"
              }
            }}
          >
            Minha lista
          </Button>

          {/* Botão administrador */}
          <AdminButton />

          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              borderColor: "#fff",
              color: "#fff",
              "&:hover": {
                borderColor: "#00ffffff",
                backgroundColor: "rgba(255, 0, 0, 0.18)"
              }
            }}
          >
            Sair
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
