import { Box } from "@mui/material";

export default function ContactSection() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 25,
        right: 25,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        zIndex: 9999,
      }}
    >
      {/* WhatsApp */}
      <Box
        component="a"
        href="https://wa.me/5513996950466"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: 65,
          height: 65,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        <img
          src="/whatsapp_icon.png"
          alt="WhatsApp"
          style={{ width: 76 , height: 76 }}
        />
      </Box>

      {/* YouTube */}
      <Box
        component="a"
        href="https://www.youtube.com/@periferiatempalavra"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: 65,
          height: 65,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        <img
          src="/youtube_icon.png"
          alt="YouTube"
          style={{ width: 80, height: 85 }}
        />
      </Box>
    </Box>
  );
}
