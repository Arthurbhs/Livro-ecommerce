import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import { db } from "../api/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";



export default function CadastrarProduto() {
  const [form, setForm] = useState({
    titulo: "",
    resumo: "",
    autor: "",
    editora: "",
    ano: "",
    paginas: "",
    isbn: "",
    preco: "",
    imagem: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================================
  // Upload de imagem base64
  // ======================================
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, imagem: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  // ======================================
  // Gerar código do produto
  // ======================================
  function gerarCodigoProduto() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    for (let i = 0; i < 8; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
  }

  // ======================================
  // Salvar produto
  // ======================================
  async function cadastrarProduto() {
    if (!form.titulo || !form.autor || !form.imagem) {
      alert("Preencha pelo menos Título, Autor e Imagem!");
      return;
    }

    try {
      setLoading(true);

      const codigo = gerarCodigoProduto();

      await setDoc(doc(db, "products", codigo), {
        ...form,
        codigo,
        preco: Number(form.preco),
        criadoEm: new Date(),
      });

      alert(`Produto cadastrado! Código: ${codigo}`);

      // Zerar formulário
      setForm({
        titulo: "",
        resumo: "",
        autor: "",
        editora: "",
        ano: "",
        paginas: "",
        isbn: "",
        preco: "",
        imagem: "",
      });
      setPreview("");

    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar produto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        py: 4,
        backgroundImage: "url('/biblioteca.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          margin: "0 auto",
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          background: "rgba(220, 240, 220, 0.95)",
          border: "3px solid #2e7d32",
        }}
      >
        <Typography variant="h4" textAlign="center" mb={3} color="#2e7d32">
          Cadastrar Produto
        </Typography>

        {/* Imagem */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Avatar
            src={preview}
            variant="rounded"
            sx={{ width: 150, height: 200, margin: "0 auto", mb: 1 }}
          />
          <Button variant="outlined" component="label" color="success">
            Enviar Imagem
            <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>

        {/* Campos */}
        <TextField
          fullWidth
          label="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Resumo"
          multiline
          rows={3}
          value={form.resumo}
          onChange={(e) => setForm({ ...form, resumo: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Autor"
          value={form.autor}
          onChange={(e) => setForm({ ...form, autor: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Editora"
          value={form.editora}
          onChange={(e) => setForm({ ...form, editora: e.target.value })}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Ano"
            type="number"
            value={form.ano}
            onChange={(e) => setForm({ ...form, ano: e.target.value })}
            fullWidth
          />

          <TextField
            label="Páginas"
            type="number"
            value={form.paginas}
            onChange={(e) => setForm({ ...form, paginas: e.target.value })}
            fullWidth
          />
        </Box>

        <TextField
          fullWidth
          label="ISBN"
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Preço (R$)"
          type="number"
          value={form.preco}
          onChange={(e) => setForm({ ...form, preco: e.target.value })}
          sx={{ mb: 2 }}
        />

        {/* Botão cadastrar */}
        <Button
          fullWidth
          sx={{ mt: 3, p: 1.6 }}
          variant="contained"
          color="success"
          onClick={cadastrarProduto}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Cadastrar Produto"}
        </Button>
      </Box>
    </Box>
  );
}
