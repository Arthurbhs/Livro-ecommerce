import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { auth, db } from "../api/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

export default function EditarUsuario() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    avatar: "",
  });

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // Modal de confirmação
  const [openConfirm, setOpenConfirm] = useState(false);
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [confirmado, setConfirmado] = useState(false); // só pede uma vez
 const [senhaConfirmada, setSenhaConfirmada] = useState(false);


async function confirmarSenha() {
  try {
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, senhaDigitada);
    await reauthenticateWithCredential(user, cred);

    setSenhaConfirmada(true);       // ← Aqui bloqueia os botões
    setModalSenha(false);
    setSenhaDigitada("");

    alert("Senha confirmada!");
  } catch {
    alert("Senha incorreta.");
  }
}

  // Campos de edição que precisam de confirmação
  const [acao, setAcao] = useState(null);

  // Carrega os dados do usuário ao abrir a página
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
          cpf: data.cpf || "",
          avatar: data.avatar || "",
        });

        setPreview(data.avatar || "");
      }
    }
    load();
  }, []);

  // Upload de imagem base64
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

  // Máscara de CPF
  function maskCPF(value) {
    let v = value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);

    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return v;
  }

  // Abrir modal pedindo senha
 function solicitarConfirmacao(tipo) {
  setAcao(tipo);

  // Se já confirmou antes → não abre modal novamente
  if (senhaConfirmada) return;

  // Abrir modal
  setOpenConfirm(true);
}


  // Confirmar senha para CPF ou senha nova
  async function confirmarSenha() {
  try {
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      user.email,
      senhaConfirmacao
    );

    await reauthenticateWithCredential(user, credential);

    setSenhaConfirmada(true);   // ← trava os botões para sempre
    setOpenConfirm(false);
    setSenhaConfirmacao("");

  } catch {
    alert("Senha incorreta.");
  }
}


  // Salvamento final
  async function salvar() {
    try {
      setLoading(true);
      const user = auth.currentUser;

      // Atualiza Firestore
      await updateDoc(doc(db, "users", user.uid), {
        nome: form.nome,
        cpf: form.cpf,
        avatar: form.avatar,
      });

      // Atualiza senha se solicitado
      if (acao === "senhaNova" && form.senhaNova) {
        await updatePassword(user, form.senhaNova);
      }

      alert("Dados atualizados!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar.");
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
        backgroundColor: "rgba(220, 240, 220, 0.9)",
        border: "3px solid #2e7d32",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3} color="#2e7d32">
        Editar Usuário
      </Typography>

      {/* Avatar */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Avatar
          src={preview || ""}
          sx={{ width: 110, height: 110, margin: "0 auto", mb: 1 }}
        />
        <Button variant="outlined" component="label" color="success">
          Alterar Foto
          <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
        </Button>
      </Box>

      {/* Nome */}
      <TextField
        fullWidth
        label={`Nome atual: ${form.nome}`}
        placeholder="Novo nome"
        sx={{ mb: 2 }}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />

      {/* CPF */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          label={`CPF atual: ${form.cpf}`}
          placeholder="Novo CPF"
          value={form.cpf}
          onChange={(e) =>
            solicitarConfirmacao("cpf") ||
            setForm({ ...form, cpf: maskCPF(e.target.value) })
          }
        />

        <Button
  variant="contained"
  color="success"
  onClick={() => solicitarConfirmacao("cpf")}
  disabled={senhaConfirmada}     // ← desabilita depois da 1ª vez
>
  Alterar CPF
</Button>
      </Box>

      {/* Senha nova */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          label="Nova Senha"
          type="password"
          onChange={(e) => setForm({ ...form, senhaNova: e.target.value })}
        />

       <Button
  variant="contained"
  color="success"
  onClick={() => solicitarConfirmacao("senhaNova")}
  disabled={senhaConfirmada}
>
  Alterar Senha
</Button>
      </Box>

      {/* Botão salvar */}
      <Button
        fullWidth
        sx={{ mt: 3, p: 1.6 }}
        variant="contained"
        color="success"
        onClick={salvar}
        disabled={loading}
      >
        {loading ? "Salvando..." : "Salvar Alterações"}
      </Button>

      {/* Modal de confirmação */}
     <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
  <DialogTitle>Confirme sua senha</DialogTitle>

  <DialogContent>
    <TextField
      fullWidth
      type="password"
      label="Senha atual"
      value={senhaConfirmacao}
      onChange={(e) => setSenhaConfirmacao(e.target.value)}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
    <Button onClick={confirmarSenha} variant="contained" color="success">
      Confirmar
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}
