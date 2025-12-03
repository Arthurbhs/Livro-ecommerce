import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import { auth, db } from "../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function CadastrarAdmin() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
    avatar: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // =======================
  // Máscara de CPF
  // =======================
  function maskCPF(value) {
    let v = value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);

    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return v;
  }

  // =======================
  // Upload imagem Base64
  // =======================
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, avatar: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  // =======================
  // Cadastro
  // =======================
  async function cadastrarAdmin() {
    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (form.cpf.replace(/\D/g, "").length !== 11) {
      alert("CPF inválido!");
      return;
    }

    try {
      setLoading(true);

      // Cria o admin no Auth
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );

      const user = cred.user;

      // Salva no Firestore (coleção admins)
      await setDoc(doc(db, "admins", user.uid), {
        uid: user.uid,
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        avatar: form.avatar,
        criadoEm: new Date()
      });

      alert("Administrador cadastrado com sucesso!");

      // limpa campos
      setForm({
        nome: "",
        email: "",
        cpf: "",
        senha: "",
        confirmarSenha: "",
        avatar: "",
      });
      setPreview("");

    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar administrador.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: "40px auto",
        p: 3,
        borderRadius: 3,
        boxShadow: 4,
        background: "rgba(220, 240, 220, 0.95)",
        border: "3px solid #2e7d32",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3} color="#2e7d32">
        Cadastrar Administrador
      </Typography>

      {/* Avatar */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Avatar
          src={preview}
          sx={{ width: 110, height: 110, margin: "0 auto", mb: 1 }}
        />
        <Button variant="outlined" component="label" color="success">
          Enviar Foto
          <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
        </Button>
      </Box>

      {/* Nome */}
      <TextField
        fullWidth
        label="Nome"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
        sx={{ mb: 2 }}
      />

      {/* Email */}
      <TextField
        fullWidth
        label="E-mail"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        sx={{ mb: 2 }}
      />

      {/* CPF */}
      <TextField
        fullWidth
        label="CPF"
        value={form.cpf}
        onChange={(e) =>
          setForm({ ...form, cpf: maskCPF(e.target.value) })
        }
        sx={{ mb: 2 }}
      />

      {/* Senha */}
      <TextField
        fullWidth
        label="Senha"
        type="password"
        value={form.senha}
        onChange={(e) => setForm({ ...form, senha: e.target.value })}
        sx={{ mb: 2 }}
      />

      {/* Confirmar Senha */}
      <TextField
        fullWidth
        label="Confirmar Senha"
        type="password"
        value={form.confirmarSenha}
        onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })}
      />

      {/* Botão cadastrar */}
      <Button
        fullWidth
        sx={{ mt: 3, p: 1.6 }}
        variant="contained"
        color="success"
        onClick={cadastrarAdmin}
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar Admin"}
      </Button>
    </Box>
  );
}