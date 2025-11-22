import { Box } from "@mui/material";
import Slider from "react-slick";

export default function YouTubeSection() {
  const videos = [
    { id: "FDYmWrZyMwE?si=296jjNmkxkJpr99m" },
    { id: "rIgfRiKFLas?si=lPdxwHVU27dUvVo7" }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        margin: "50px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        padding: "20px",

        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      {/* FOTO REDONDA */}
      <Box
        sx={{
          width: { xs: 150, sm: 200, md: 280 },
          height: { xs: 150, sm: 200, md: 280 },
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src="/youtube_profile.png"
          alt="YouTube Perfil"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
             borderRadius: "55%",       // ⬅️ deixa completamente redonda
    border: "7px solid #e61919", // ⬅️ borda vermelha
          }}
        />
      </Box>

      {/* CARROSSEL */}
      <Box sx={{ width: { xs: "100%", sm: "90%", md: "55%" } }}>
        
        {/* Logo do YouTube */}
      {/* LOGO CENTRALIZADA ACIMA DE TUDO */}



        <Slider {...settings}>
          {videos.map((video) => (
            <Box key={video.id} sx={{ px: 1 }}>
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${video.id}`}
                sx={{
                  width: "100%",
                  height: { xs: "220px", sm: "260px", md: "320px" },
                  borderRadius: "12px",
                  border: "none",
                }}
                allowFullScreen
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
