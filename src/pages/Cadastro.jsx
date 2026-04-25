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
  cpf: "",
  email: "",
  senha: "",
  repetirSenha: "",
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  complemento: ""
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
  cpf: form.cpf,
  email: form.email,
  endereco: {
    cep: form.cep,
    rua: form.rua,
    numero: form.numero,
    bairro: form.bairro,
    cidade: form.cidade,
    estado: form.estado,
    complemento: form.complemento
  }
});

      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error(error);
      setErro("Erro ao cadastrar. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  const buscarCep = async (cep) => {
  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) return;

  const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  const data = await res.json();

  if (!data.erro) {
    setForm((prev) => ({
      ...prev,
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf
    }));
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
  label="CPF"
  name="cpf"
  margin="normal"
  required
  value={form.cpf}
  onChange={(e) => {
    let v = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

    if (v.length > 11) v = v.slice(0, 11); // CPF tem 11 dígitos

    // MÁSCARA CPF CORRETA
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setForm({ ...form, cpf: v });
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

           

            <TextField
  fullWidth
  label="CEP"
  name="cep"
  margin="normal"
  value={form.cep}
  onChange={(e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);

    v = v.replace(/(\d{5})(\d)/, "$1-$2");

    setForm({ ...form, cep: v });
   buscarCep}}
  required
/>

<TextField
  fullWidth
  label="Rua"
  name="rua"
  value={form.rua}
  onChange={handleChange}
  margin="normal"
  required
/>

<Box display="flex" gap={2}>
  <TextField
    fullWidth
    label="Número"
    name="numero"
    value={form.numero}
    onChange={handleChange}
    margin="normal"
    required
  />

  <TextField
    fullWidth
    label="Complemento"
    name="complemento"
    value={form.complemento}
    onChange={handleChange}
    margin="normal"
  />
</Box>

<TextField
  fullWidth
  label="Bairro"
  name="bairro"
  value={form.bairro}
  onChange={handleChange}
  margin="normal"
  required
/>

<Box display="flex" gap={2}>
  <TextField
    fullWidth
    label="Cidade"
    name="cidade"
    value={form.cidade}
    onChange={handleChange}
    margin="normal"
    required
  />

  <TextField
    fullWidth
    label="Estado (UF)"
    name="estado"
    value={form.estado}
    onChange={(e) => {
      let v = e.target.value.toUpperCase().slice(0, 2);
      setForm({ ...form, estado: v });
    }}
    margin="normal"
    required
  />
</Box>

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
