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
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, dots: false } }
    ]
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: { xs: "0 10px", sm: "0 20px" }
      }}
    >
      <Slider {...settings}>
        {products.map((p) => (
          <Box
            key={p.id}
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <ProductCard product={p} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
