import { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { auth, db } from "../api/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import UserDrawer from "./UserDrawer";

export default function Header() {
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        setUser(null);
        return;
      }

      // busca no firestore
      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUser({
          uid: u.uid,
          email: u.email,
          displayName: snap.data().nome,
          avatar: snap.data().avatar ?? null,  // <-- AQUI!
        });
      } else {
        // se não existir no firestore, mostra apenas os dados do auth
        setUser({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName || "Usuário",
          avatar: null,
        });
      }
    });

    return () => unsub();
  }, []);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f0a243ff",
          borderBottom: "3px solid #FFD700",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>

          {/* LOGO */}
          <Box>
            <img
              src="/logo_periferia_tem_palavra_transparente.png"
              alt="Logo"
              style={{ width: 130 }}
            />
          </Box>

          {/* Botões */}
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/" sx={{ color: "#fff" }}>
              Home
            </Button>

            <Button component={Link} to="/sobre" sx={{ color: "#fff" }}>
              Sobre Nós
            </Button>

            {user ? (
              <Button sx={{ color: "#fff" }} onClick={() => setDrawerOpen(true)}>
                Minha Conta
              </Button>
            ) : (
              <Button component={Link} to="/login" sx={{ color: "#fff" }}>
                Login
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {user && (
  <UserDrawer open={drawerOpen} setOpen={setDrawerOpen} user={user} />
)}

    </>
  );
}
