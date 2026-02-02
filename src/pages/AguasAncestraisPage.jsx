import { Box, Container, Typography, Grid, Paper, Divider } from "@mui/material";

const AguasAncestraisPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #5b2a86 0%, #2a0f3d 70%)",
        color: "#f5f0fa",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        {/* HERO */}
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="/aguas_ancestrais.png"
              alt="Capa do livro Águas Ancestrais"
              sx={{
                width: "100%",
                maxWidth: 380,
                borderRadius: 3,
                boxShadow: "0 25px 60px rgba(0,0,0,0.55)",
                display: "block",
                mx: { xs: "auto", md: 0 },
              }}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: 3, opacity: 0.75 }}
            >
              Poesia • Ancestralidade • Axé
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mt: 1, mb: 3 }}
            >
              Águas Ancestrais
            </Typography>

            <Typography
              sx={{
                fontSize: "1.15rem",
                lineHeight: 1.9,
                opacity: 0.9,
              }}
            >
              As águas guardam memória.  
              Carregam nomes, corpos, vozes e caminhos.
              <br />
              <br />
              Este livro é um mergulho na palavra como axé,
              na poesia como território e na ancestralidade
              como presença viva.
            </Typography>
          </Grid>
        </Grid>

        {/* TRECHO POÉTICO */}
        <Box mt={10}>
         {/* TRECHO POÉTICO */}
<Box
  mt={10}
  sx={{
    textAlign: "center",
    px: { xs: 2, md: 10 },
  }}
>
  <Typography
    sx={{
      fontFamily: `"Playfair Display", "Libre Baskerville", serif`,
      fontWeight: 700,
      fontSize: { xs: "1.2rem", md: "1.5rem" },
      lineHeight: 2.1,
      color: "#ffffff",
      textShadow: "0 4px 18px rgba(0,0,0,0.6)",
    }}
  >
    “Entre pedras que caminho  
    <br />
    não sigo sozinho  
    <br />
    não me perco nas encruzas  
    <br />
    é lá que me encontro no axé.”
  </Typography>

  <Typography
    sx={{
      mt: 3,
      fontSize: "0.9rem",
      letterSpacing: 1.5,
      opacity: 0.75,
    }}
  >
    Águas Ancestrais
  </Typography>
</Box>

        </Box>

        {/* CONCEITO */}
        <Box mt={10}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Palavra como axé
              </Typography>
              <Typography sx={{ lineHeight: 1.9, opacity: 0.9 }}>
                A escrita de <strong>Nego Panda</strong> atravessa o poema,
                o canto, a ladainha, o samba e a reza.  
                Cada verso é corpo em movimento, eco de tambor,
                comunicação entre passado, presente e futuro.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Água como ancestral
              </Typography>
              <Typography sx={{ lineHeight: 1.9, opacity: 0.9 }}>
                Da cachoeira de Oxum ao mar de Yemanjá,
                das lagoas às encruzilhadas,
                a água aparece como entidade,
                guardiã de histórias e caminhos.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* AUTORIA */}
        <Box mt={10} textAlign="center">
          <Typography variant="overline" sx={{ opacity: 0.7 }}>
            Autoria
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Nego Panda
          </Typography>

          <Typography sx={{ mt: 2, opacity: 0.8 }}>
            Literatura negra • poesia • ancestralidade • resistência
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AguasAncestraisPage;
