import { Drawer, Box, Typography, Button, Stack, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../api/firebaseConfig";

export default function UserDrawer({ open, setOpen, user }) {
  const handleLogout = () => {
    auth.signOut();
    setOpen(false);
  };

  const avatar =
    user?.avatar ||          // Avatar salvo no Firestore (base64)
    user?.photoURL || "";    // Avatar padrão do auth (Google, etc.)

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
        {/* AVATAR DO USUÁRIO */}
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

        {/* NOME DO USUÁRIO */}
        <Typography variant="h6" fontWeight={600} sx={{ color: "#fff" }}>
          {user?.displayName ?? "Usuário"}
        </Typography>

        <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
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
