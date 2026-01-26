import { Box, Typography, Card, CardContent, Grid, Button } from "@mui/material";

export default function SobrePage() {
  return (
    <Box
      sx={{
        backgroundColor: "#faf8f5",
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 6 },
        textAlign: "center",
      }}
    >
      {/* === SEÇÃO DE APRESENTAÇÃO === */}
      <Box sx={{ mb: 6, maxWidth: 800, mx: "auto" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#f0a243ff",
            mb: 2,
          }}
        >
          Sobre Nós
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "1.1rem",
            color: "#333",
            lineHeight: 1.8,
          }}
        >
          A <b>Periferia tem palavra</b> é uma editora preta de quebrada,
          voltada para autores negros, negras, LGBTQIAPN+ e periféricos,
          com o propósito de fortalecer e acessibilizar a literatura entre becos,
          vielas e encruzilhadas.
        </Typography>
      </Box>

      {/* === TÍTULO PLANOS === */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#f0a243ff",
            mb: 1,
          }}
        >
          Transformando o sonho em realidade
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#555" }}>
          Publique seu livro em baixa tiragem e conquiste seu público.
        </Typography>
      </Box>

      {/* === SEÇÃO DE PLANOS === */}
      <Grid container spacing={4} justifyContent="center">
        {/* === CARD 1 === */}
        <Grid item xs={12} sm={6} md={5}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#f0a243ff", mb: 2 }}
              >
                Plano de Publicação
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#333", lineHeight: 1.7, textAlign: "left" }}
              >
                <b>Formato tamanho:</b> 14x21cm <br />
                <b>Capa:</b> papel cartão 300g (com orelhas 6cm) <br />
                <b>Miolo:</b> papel pólen 80g <br />
                <b>N° de páginas:</b> até 100 <br />
                <b>Valor:</b> R$ 3.215,00 <br />
                <b>Quantidade:</b> 100 exemplares
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "#f0a243ff",
                    mb: 1,
                  }}
                >
                  Serviços Inclusos
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#333", textAlign: "left", lineHeight: 1.7 }}
                >
                  • Projeto Gráfico do livro <br />
                  • Criação de capa <br />
                  • Diagramação <br />
                  • ISBN e Registro <br />
                  • Frete a combinar
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* === CARD 2 === */}
        <Grid item xs={12} sm={6} md={5}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#f0a243ff", mb: 2 }}
              >
                Assessoria em Publicação
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#333", textAlign: "left", lineHeight: 1.7 }}
              >
                A <b>editora Periferia tem palavra</b> oferece assessoria,
                suporte técnico e criativo ao seu projeto, através de um
                acompanhamento personalizado que será desenvolvido de acordo
                com a necessidade de cada obra.
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#f0a243ff", mb: 1 }}
                >
                  Valor da Assessoria
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#333", textAlign: "left" }}
                >
                  Entre em contato para maiores informações.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* === BOTÃO DE CONTATO === */}
      <Box sx={{ mt: 6 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f0a243ff",
            "&:hover": { backgroundColor: "#e08c1e" },
            color: "#fff",
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontWeight: "bold",
          }}
          href="/contato"
        >
          Entre em Contato
        </Button>
      </Box>
    </Box>
  );
}
