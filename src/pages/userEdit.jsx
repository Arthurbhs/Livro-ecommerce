import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Avatar } from "@mui/material";
import { auth, db } from "../api/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditarUsuario() {
  const [form, setForm] = useState({
    nome: "",
    avatar: "", // base64
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    async function load() {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setForm({
          nome: data.nome || "",
          avatar: data.avatar || "",
        });
        setPreview(data.avatar || "");
      }
    }
    load();
  }, []);

  // Converte a imagem para base64
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, avatar: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function salvar() {
    const user = auth.currentUser;
    if (!user) return;

    await updateDoc(doc(db, "users", user.uid), form);
    alert("Dados atualizados!");
  }

  return (
    <Box sx={{ maxWidth: 400, m: "50px auto", p: 2 }}>
      <Typography variant="h5" mb={3}>
        Editar Usuário
      </Typography>

      {/* Avatar */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Avatar
          src={preview || ""}
          sx={{ width: 100, height: 100, margin: "0 auto", mb: 1 }}
        />

        <Button variant="outlined" component="label">
          Trocar Foto
          <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
        </Button>
      </Box>

      <TextField
        label="Nome"
        fullWidth
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" fullWidth onClick={salvar}>
        Salvar
      </Button>
    </Box>
  );
}
