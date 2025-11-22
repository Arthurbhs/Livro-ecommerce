import { Box } from "@mui/material";
import { useInView } from "../Hook/useInView";

export default function AnimatedSection({ children }) {
  const [ref, isVisible] = useInView(0.2);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </Box>
  );
}
