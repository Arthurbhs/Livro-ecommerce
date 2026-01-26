import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

export default function FeaturedCarousel({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        mx: "auto", // centraliza horizontalmente
        px: { xs: 1, sm: 2 },
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        "& .slick-list": {
          overflow: "hidden",
        },
        "& .slick-slide": {
          display: "flex !important",
          justifyContent: "center",
        },
        "& .slick-dots": {
          bottom: "-30px",
        },
      }}
    >
      <Slider {...settings}>
        {products.map((p) => (
          <Box
            key={p.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              px: { xs: 1, sm: 2 },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "90%",
                  sm: "80%",
                  md: "85%",
                  lg: "80%",
                },
              }}
            >
              <ProductCard product={p} />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
