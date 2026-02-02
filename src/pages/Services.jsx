import { Box, Typography, Card, CardContent, Grid, Button } from "@mui/material";
import ContatoSection from "../components/Form";

export default function SobrePage() {
  return (
    <Box sx={{ backgroundColor: "#faf8f5", minHeight: "100vh" }}>

      {/* === HERO / APRESENTAÇÃO === */}
      <Box
        sx={{
          minHeight: "80vh",
          backgroundImage: "url('/fundo_com_livros.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            maxWidth: 820,
            px: 3,
            textAlign: "center",
            color: "#f5f5f5",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#FFD700", mb: 2 }}
          >
            Sobre Nós
          </Typography>

          <Typography sx={{ lineHeight: 1.9, fontSize: "1.05rem" }}>
            A <b>Periferia tem palavra</b> é uma editora preta de quebrada,
            voltada para autores negros, negras, LGBTQIAPN+ e periféricos,
            com o propósito de fortalecer e acessibilizar a literatura entre becos,
            vielas e encruzilhadas.
          </Typography>
        </Box>
        
      </Box>
{/* === TRANSIÇÃO ENTRE FUNDOS === */}
<Box
  sx={{
    height: { xs: 120, md: 50 },
    background: `
      linear-gradient(
        to bottom,
        rgba(41, 41, 41, 1),
        rgba(17, 17, 17, 0.98)
      )
    `,
  }}
/>

      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/escritorio.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          py: { xs: 8, md: 12 },
        }}
      >
        
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            maxWidth: 1200,
            mx: "auto",
            px: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#FFD700", fontWeight: 700, mb: 2 }}
          >
            Transformando o sonho em realidade
          </Typography>

          <Typography
            sx={{
              color: "#f0f0f0",
              mb: 6,
              fontSize: "1.05rem",
            }}
          >
            Publique seu livro em baixa tiragem e conquiste seu público.
          </Typography>

          <Grid
            container
            spacing={4}
            justifyContent="center"
          >
            {[{
              title: "Plano de Publicação",
              content: (
                <>
                  <b>Formato:</b> 14x21cm <br />
                  <b>Capa:</b> papel cartão 300g <br />
                  <b>Miolo:</b> papel pólen 80g <br />
                  <b>Páginas:</b> até 100 <br />
                  <b>Valor:</b> R$ 3.215,00 <br />
                  <b>Quantidade:</b> 100 exemplares
                </>
              ),
              align: "left"
            }].map((card, i) => (
              <Grid item xs={12} md={5} key={i}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    backgroundColor: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#f0a243",
                        mb: 2,
                        fontSize: "1.15rem",
                        textAlign: "center",
                      }}
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#222",
                        lineHeight: 1.8,
                        textAlign: card.align,
                      }}
                    >
                      {card.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

   
      <ContatoSection/>
    </Box>
  );
}
