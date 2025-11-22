import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Link as MuiLink,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { auth, db } from "../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    rg: "",
    email: "",
    senha: "",
    repetirSenha: ""
  });

  const [showSenha, setShowSenha] = useState(false);
  const [showRepetirSenha, setShowRepetirSenha] = useState(false);

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (form.senha !== form.repetirSenha) {
      setErro("As senhas não são iguais.");
      return;
    }

    try {
      setLoading(true);

      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );

      const user = cred.user;

      await setDoc(doc(db, "users", user.uid), {
        nome: form.nome,
        rg: form.rg,
        email: form.email
      });

      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error(error);
      setErro("Erro ao cadastrar. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url('/biblioteca.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 3,
          boxShadow: 6,
           backgroundColor: "rgba(241, 241, 212, 0.9)",
          border: "3px solid #2e7d32",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            mb={3}
            color="#2e7d32"
          >
            Cadastro
          </Typography>

          {erro && (
            <Typography color="error" mb={2} textAlign="center">
              {erro}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            {/* Nome */}
            <TextField
              fullWidth
              label="Nome Completo"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              margin="normal"
              required
            />
<TextField
  fullWidth
  label="RG"
  name="rg"
  margin="normal"
  required
  value={form.rg}
  onChange={(e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 9) v = v.slice(0, 9);

    v = v.replace(/(\d{2})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1-$2");

    setForm({ ...form, rg: v });
  }}
/>


            {/* Email */}
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

            {/* Senha */}
            <TextField
              fullWidth
              label="Senha"
              name="senha"
              type={showSenha ? "text" : "password"}
              value={form.senha}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowSenha(!showSenha)}>
                      {showSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Repetir Senha */}
            <TextField
              fullWidth
              label="Repetir Senha"
              name="repetirSenha"
              type={showRepetirSenha ? "text" : "password"}
              value={form.repetirSenha}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowRepetirSenha(!showRepetirSenha)}
                    >
                      {showRepetirSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
                ":hover": { backgroundColor: "#256428" }
              }}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <Typography textAlign="center" mt={2}>
              Já tem conta?{" "}
              <MuiLink
                component={Link}
                to="/login"
                sx={{
                  color: "#1b5e20",
                  fontWeight: "bold",
                  "&:hover": { color: "#f9a825" },
                }}
              >
                Entrar
              </MuiLink>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
