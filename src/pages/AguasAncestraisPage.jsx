import { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebaseConfig";
import { addToCart, isInCart, removeFromCart } from "../components/cartStorage";

const AguasAncestraisPage = () => {
  const [product, setProduct] = useState(null);
  const [alreadyInCart, setAlreadyInCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const ref = doc(db, "products", "T7KOHEA6");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = { id: snap.id, ...snap.data() };
        setProduct(data);
        setAlreadyInCart(isInCart(data.id));
      }
    }

    fetchProduct();
  }, []);

  function handleCartToggle() {
    if (!product) return;

    if (alreadyInCart) {
      removeFromCart(product.id);
      setAlreadyInCart(false);
    } else {
      addToCart(product);
      setAlreadyInCart(true);
    }
  }

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
            <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.75 }}>
              Poesia • Ancestralidade • Axé
            </Typography>

            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 3 }}>
              Águas Ancestrais
            </Typography>

            <Typography sx={{ fontSize: "1.15rem", lineHeight: 1.9, opacity: 0.9 }}>
              As águas guardam memória.
              Carregam nomes, corpos, vozes e caminhos.
              <br /><br />
              Este livro é um mergulho na palavra como axé,
              na poesia como território e na ancestralidade
              como presença viva.
            </Typography>

            {/* PREÇO + CARRINHO */}
            {product && (
              <>
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 4 }}>
                  R$ {product.preco}
                </Typography>

                <Button
                  variant={alreadyInCart ? "outlined" : "contained"}
                  onClick={handleCartToggle}
                  sx={{
                    mt: 2,
                    borderRadius: "999px",
                    px: 4,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: alreadyInCart ? "transparent" : "#fff",
                    color: alreadyInCart ? "#fff" : "#2a0f3d",
                    border: "2px solid #fff",
                    "&:hover": {
                      backgroundColor: alreadyInCart
                        ? "rgba(255,255,255,0.08)"
                        : "#f5f0fa",
                    },
                  }}
                >
                  {alreadyInCart
                    ? "Remover do Carrinho"
                    : "Adicionar ao Carrinho 🛒"}
                </Button>
              </>
            )}
          </Grid>
        </Grid>

       

        {/* TRECHO */}
        <Box mt={10} textAlign="center">
          <Typography
            sx={{
              fontFamily: `"Playfair Display", serif`,
              fontWeight: 700,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              lineHeight: 2.1,
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
        </Box>

         {/* SOBRE */}
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
 {/* FORMATOS */}
        <Box mt={8} textAlign="center">
          <Typography variant="h6" sx={{ mb: 3 }}>
           outros Formatos disponíveis
          </Typography>

          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
            <Button
              variant="outlined"
              startIcon={<MenuBookIcon />}
              href="/Livro_aguas ancestrais_PDF_DIGITAL.pdf"
              target="_blank"
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.5)",
                borderRadius: "999px",
                px: 4,
                py: 1.3,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Ler em PDF
            </Button>

            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              href="/Livro_aguas ancestrais_DIGITAL.cbz.zip"
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.5)",
                borderRadius: "999px",
                px: 4,
                py: 1.3,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Versão em imagens (CBZ)
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};


export default AguasAncestraisPage;
