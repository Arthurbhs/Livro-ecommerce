import { Box, Typography } from "@mui/material";
import TikTokSection from "../components/ticktockSection";
import YouTubeSection from "../components/yotubeSection";
import ContactSection from "../components/ContactSection";
import AnimatedSection from "../components/AnimatedSection";

export default function HeroSobre() {
  return (
    <>
      <AnimatedSection>
        <Box
          sx={{
            width: "100%",
            height: { xs: "67vh", md: "100vh", lg: "125vh" },
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            backgroundImage: 'url("/walpapper.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            paddingBottom: { xs: "20px", sm: "30px" },
            borderBottom: "5px solid #fafafaff",
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              maxWidth: { xs: "85%", sm: "70%", md: "50%" },
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.18)",
              padding: { xs: "12px 16px", sm: "18px 24px", md: "20px 30px" },
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              backdropFilter: "blur(6px)",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#000",
                fontSize: { xs: "0.85rem", sm: "1rem", md: "1.15rem" },
                lineHeight: { xs: "1.4rem", sm: "1.5rem", md: "1.7rem" },
              }}
            >
              A Periferia tem Palavra é uma editora de impacto social periférico
              voltada para a publicação de autores negros, negras, LGBTQIA+ e
              periféricos com a intenção de transformar sonhos em realidade. A
              editora busca promover a diversidade literária e incentivar a
              produção cultural periférica. Hoje nosso projeto literário se
              tornou um maravilhoso balaio poético carregado de 7 antologias
              possibilitando uma primeira publicação para diversos escritores e
              14 autores publicados com livros solos.
            </Typography>
          </Box>
        </Box>
      </AnimatedSection>

      {/* TikTok Logo */}
      <AnimatedSection>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <img
            src="/tiktokLogo.png"
            alt="TikTok Logo"
            style={{
              width: "150px",
              height: "auto",
              maxWidth: "60%",
            }}
          />
        </Box>

        <TikTokSection />
      </AnimatedSection>

      {/* YouTube Logo */}
      <AnimatedSection>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <img
            src="/yotubeLogo.png"
            alt="YouTube Logo"
            style={{
              width: "150px",
              height: "auto",
              maxWidth: "60%",
            }}
          />
        </Box>

        <YouTubeSection />
      </AnimatedSection>

      <ContactSection />
    </>
  );
}
