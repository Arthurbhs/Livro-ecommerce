import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  MenuItem
} from "@mui/material";
import emailjs from "@emailjs/browser";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TikTokIcon from "@mui/icons-material/MusicNote"; 


export default function ContatoSection() {
  const [formaRetorno, setFormaRetorno] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    time: ""
  });

const commonTextFieldProps = {
  fullWidth: true,
  variant: "outlined",
  InputLabelProps: { shrink: true }
};


  const handleSendEmail = async () => {
    if (!formaRetorno) {
      alert("Selecione a forma de retorno.");
      return;
    }

    setLoading(true);

    const retornoLabel = {
      ligacao: "Ligação telefônica",
      email: "E-mail",
      whatsapp: "WhatsApp"
    }[formaRetorno];

    try {
      await emailjs.send(
        "SEU_SERVICE_ID",
        "SEU_TEMPLATE_ID",
        {
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          return_type: retornoLabel,
          time:
            formaRetorno === "ligacao"
              ? formData.time || "Não informado"
              : "Não aplicável"
        },
        "SUA_PUBLIC_KEY"
      );

      alert("Mensagem enviada com sucesso!");
      setFormData({ name: "", phone: "", message: "", time: "" });
      setFormaRetorno("");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box sx={{ py: 10, px: { xs: 2, md: 8 }, backgroundColor: "#fff" }}>
      <Grid container spacing={8}>
        {/* ================= COLUNA ESQUERDA ================= */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{textAlign: "center"}}>
            Entre em contato
          </Typography>

          <Box sx={{ mb: 2, textAlign: "center" }}>
            <img
              src="/logo_periferia_tem_palavra_transparente.png"
              alt="Periferia tem palavra"
              style={{ width: 150 }}
            />
          </Box>

         <Typography
            sx={{ color: "text.secondary", mb: 3, textAlign: "center" }}
          >
            A <b>editora Periferia Tem Palavra</b> oferece assessoria,<br />
            suporte técnico e criativo ao seu projeto,<br />
            com acompanhamento personalizado de acordo<br />
            com a necessidade de cada obra.
          </Typography>

          {/* REDES SOCIAIS */}
          <Stack direction="row" spacing={1} mb={4} justifyContent="center">
  <IconButton
    component="a"
    href="https://www.facebook.com/negopanda"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <FacebookIcon />
  </IconButton>

  <IconButton
    component="a"
    href="https://www.instagram.com/negopanda_periferiatempalavra?igsh=emtrNTlia3Y3ZHpm"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <InstagramIcon />
  </IconButton>

  <IconButton
    component="a"
    href="https://www.tiktok.com/@negopandapoeta"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="TikTok"
  >
    <TikTokIcon />
  </IconButton>
</Stack>

          {/* CONTATOS */}
          <Stack spacing={2}>

            <Stack direction="row" spacing={1} alignItems="center">
              <WhatsAppIcon />
              <Typography>55 (13) 99695-0466</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon />
              <Typography>periferiatempalavra@gmail.com</Typography>
            </Stack>
          </Stack>
        </Grid>

        {/* ================= COLUNA DIREITA ================= */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Envie uma mensagem
          </Typography>

          <Stack spacing={3}>
           <TextField
  {...commonTextFieldProps}
  label="Nome"
  value={formData.name}
  onChange={(e) =>
    setFormData({ ...formData, name: e.target.value })
  }
/>


            <TextField
  {...commonTextFieldProps}
  label="Telefone"
  value={formData.phone}
  onChange={(e) =>
    setFormData({ ...formData, phone: e.target.value })
  }
/>

             
            {/* FORMA DE RETORNO */}
<TextField
  fullWidth
  required
  label="Selecione a forma de retorno"
  select
  value={formaRetorno}
  onChange={(e) => setFormaRetorno(e.target.value)}
  InputLabelProps={{ shrink: true }}
>
  <MenuItem value="ligacao">Ligação</MenuItem>
  <MenuItem value="email">E-mail</MenuItem>
  <MenuItem value="whatsapp">WhatsApp</MenuItem>
</TextField>


{/* OBSERVAÇÃO (sempre ocupa espaço) */}
<Box
  sx={{
    minHeight: 22,
    opacity: formaRetorno === "ligacao" ? 1 : 0,
    transition: "opacity 0.2s ease"
  }}
>
  <Typography variant="caption" color="text.secondary">
    Obs: O retorno pode ocorrer um pouco antes ou depois do horário selecionado,
    dependendo da nossa agenda.
  </Typography>
</Box>

{/* HORÁRIO (sempre existe, só fica invisível) */}
<Box
  sx={{
    opacity: formaRetorno === "ligacao" ? 1 : 0,
    pointerEvents: formaRetorno === "ligacao" ? "auto" : "none",
    transition: "opacity 0.2s ease"
  }}
>
 <TextField
  fullWidth
  label="Melhor horário para ligação"
  select
  value={formData.time}
  onChange={(e) =>
    setFormData({ ...formData, time: e.target.value })
  }
  InputLabelProps={{ shrink: true }}
>

    <MenuItem value="manha">Manhã</MenuItem>
    <MenuItem value="tarde">Tarde</MenuItem>
    <MenuItem value="noite">Noite</MenuItem>
  </TextField>
</Box>

<TextField
  {...commonTextFieldProps}
  label="Mensagem"
  multiline
  rows={5}
  value={formData.message}
  onChange={(e) =>
    setFormData({ ...formData, message: e.target.value })
  }
/>

          <Button
  size="large"
  disabled={loading}
  onClick={handleSendEmail}
  sx={{
    mt: 2,
    py: 1.6,
    fontWeight: "bold",
    background: "linear-gradient(90deg, #0A1AFF, #243CFF)",
    color: "#fff",
    borderRadius: "10px",
    "&:hover": { opacity: 0.9 }
  }}
>
  {loading ? "Enviando..." : "Enviar Mensagem"}
</Button>

          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
