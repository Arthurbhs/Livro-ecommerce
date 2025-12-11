import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import { db } from "../api/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditarProduto() {
  const { codigo } = useParams(); // código vindo da URL
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
    genero: "",
  });
  
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [carregandoProduto, setCarregandoProduto] = useState(true);

  // ======================================
  // Carregar produto
  // ======================================
  useEffect(() => {
    async function carregarProduto() {
      try {
        const ref = doc(db, "products", codigo);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          alert("Produto não encontrado!");
          return;
        }

        const dados = snap.data();
        setForm({
          titulo: dados.titulo,
          resumo: dados.resumo,
          autor: dados.autor,
          editora: dados.editora,
          ano: dados.ano,
          paginas: dados.paginas,
          isbn: dados.isbn,
          preco: dados.preco,
          imagem: dados.imagem,
          genero: dados.genero,
        });

        setPreview(dados.imagem);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar produto.");
      } finally {
        setCarregandoProduto(false);
      }
    }
    carregarProduto();
  }, [codigo]);


  // ======================================
  // Upload de imagem
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
  // Salvar Atualização
  // ======================================
  async function salvarAlteracoes() {
    if (!form.titulo || !form.autor || !form.imagem) {
      alert("Preencha pelo menos Título, Autor e Imagem!");
      return;
    }

    try {
      setLoading(true);

      await updateDoc(doc(db, "products", codigo), {
        ...form,
        preco: Number(form.preco),
        atualizadoEm: new Date(),
      });

      alert("Produto atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar alterações.");
    } finally {
      setLoading(false);
    }
  }


  if (carregandoProduto) {
    return (
      <Typography variant="h5" textAlign="center" mt={5}>
        Carregando produto...
      </Typography>
    );
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
          Editar Produto
        </Typography>

        {/* Imagem */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Avatar
            src={preview}
            variant="rounded"
            sx={{ width: 150, height: 200, margin: "0 auto", mb: 1 }}
          />
          <Button variant="outlined" component="label" color="success">
            Trocar Imagem
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

         <TextField
          fullWidth
          label="Genero"
          value={form.genero}
          onChange={(e) => setForm({ ...form, genero: e.target.value })}
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

        {/* Botão salvar */}
        <Button
          fullWidth
          sx={{ mt: 3, p: 1.6 }}
          variant="contained"
          color="success"
          onClick={salvarAlteracoes}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </Box>
    </Box>
  );
}
