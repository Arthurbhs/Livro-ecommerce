import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Link as MuiLink
} from "@mui/material";

import { auth, db } from "../api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // 🔥 redirecionamento

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErro("");

  try {
    // 🔥 LOGIN NO AUTH
    const cred = await signInWithEmailAndPassword(auth, form.email, form.senha);
    const user = cred.user;

    // ------------------------------------------
    // 🔥 BUSCAR EM users/
    // ------------------------------------------
    const userRef = doc(db, "users", user.uid);
    let snap = await getDoc(userRef);

    // ------------------------------------------
    // 🔥 SE NÃO EXISTE EM /users, TENTA /admins
    // ------------------------------------------
    if (!snap.exists()) {
      const adminRef = doc(db, "admins", user.uid);
      snap = await getDoc(adminRef);
    }

    // ------------------------------------------
    // 🔥 SE NÃO EXISTE EM NENHUMA DAS DUAS
    // ------------------------------------------
    if (!snap.exists()) {
      setErro("Usuário não encontrado no banco de dados.");
      setLoading(false);
      return;
    }

    const dados = snap.data();

    // ------------------------------------------
    // 🔥 IDENTIFICAR USUÁRIO OU ADM
    // ------------------------------------------
    if (dados.tipo === "adm") {
      alert(`Bem-vindo(a), ${dados.nome}! (Administrador)`);
      navigate("/painel-admin");
    } else {
      alert(`Bem-vindo(a), ${dados.nome}!`);
      navigate("/home");
    }

  } catch (error) {
    console.error("Erro no login:", error);

    if (error.code === "auth/user-not-found") {
      setErro("E-mail não cadastrado.");
    } else if (error.code === "auth/wrong-password") {
      setErro("Senha incorreta.");
    } else if (error.code === "auth/invalid-email") {
      setErro("E-mail inválido.");
    } else {
      setErro("Erro ao fazer login.");
    }

  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,

        // 🔥 FUNDO COM IMAGEM
        backgroundImage: "url('/biblioteca.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: "rgba(241, 241, 212, 0.9)",
          backdropFilter: "blur(3px)",
          border: "3px solid #2e7d32",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            mb={3}
            sx={{ color: "#1b5e20" }}
          >
            Login
          </Typography>

          {erro && (
            <Typography color="error" mb={2} textAlign="center">
              {erro}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Senha"
              name="senha"
              type="password"
              value={form.senha}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                padding: 1.5,
                backgroundColor: "#2e7d32",
                "&:hover": {
                  backgroundColor: "#1b5e20",
                },
              }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <Typography textAlign="center" mt={3}>
            <MuiLink
              component={Link}
              to="/cadastro"
              sx={{
                color: "#1b5e20",
                fontWeight: "bold",
                "&:hover": {
                  color: "#f9a825",
                },
              }}
            >
              Criar uma nova conta
            </MuiLink>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}
