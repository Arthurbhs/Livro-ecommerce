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
import { useState, useEffect } from "react";
import { auth, db } from "../api/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

export default function EditarUsuario() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    avatar: "",
    senhaNova: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState(false);

  const [acao, setAcao] = useState(null);
  const [refUser, setRefUser] = useState(null);

  // ------------------------------------------------------
  // Carregar dados do usuário
  // ------------------------------------------------------
  useEffect(() => {
    async function load() {
      const user = auth.currentUser;
      if (!user) return;

      let ref = doc(db, "users", user.uid);
      let snap = await getDoc(ref);

      if (!snap.exists()) {
        ref = doc(db, "admins", user.uid);
        snap = await getDoc(ref);
      }

      if (!snap.exists()) return;

      const data = snap.data();

      setForm({
        nome: data.nome || "",
        cpf: data.cpf || "",
        avatar: data.avatar || "",
        senhaNova: "",
      });

      setPreview(data.avatar || "");
      setIsAdmin(data.tipo === "adm");
      setRefUser(ref);
    }

    load();
  }, []);

  // Upload de imagem
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

  // Máscara CPF
  function maskCPF(v) {
    v = v.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return v;
  }

  function solicitarConfirmacao(tipo) {
    setAcao(tipo);
    if (senhaConfirmada) return;
    setOpenConfirm(true);
  }

  async function confirmarSenha() {
    try {
      const user = auth.currentUser;
      const cred = EmailAuthProvider.credential(user.email, senhaConfirmacao);
      await reauthenticateWithCredential(user, cred);

      setSenhaConfirmada(true);
      setOpenConfirm(false);
      setSenhaConfirmacao("");
      alert("Senha confirmada!");
    } catch {
      alert("Senha incorreta.");
    }
  }

  // Salvar alterações
  async function salvar() {
    try {
      setLoading(true);

      if (!refUser) {
        alert("Erro interno: referência do usuário não carregada.");
        return;
      }

      const user = auth.currentUser;

      await updateDoc(refUser, {
        nome: form.nome,
        cpf: form.cpf,
        avatar: form.avatar,
      });

      if (acao === "senhaNova" && form.senhaNova) {
        await updatePassword(user, form.senhaNova);
      }

      alert("Dados atualizados com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
         backgroundImage: "url('/biblioteca.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

      
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 450,
          width: "90%",
          p: 4,
          borderRadius: 3,
          boxShadow: 5,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(3px)",
        }}
      >
        <Typography variant="h4" textAlign="center" mb={3} color="green">
          Editar Usuário
        </Typography>

        {isAdmin ? (
          <Typography textAlign="center" color="red" mb={2}>
            🔥 Você é administrador
          </Typography>
        ) : (
          <Typography textAlign="center" color="blue" mb={2}>
            Usuário comum
          </Typography>
        )}

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
            disabled={senhaConfirmada}
          >
            Alterar CPF
          </Button>
        </Box>

        {/* Senha */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            type="password"
            label="Nova Senha"
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
    </Box>
  );
}
