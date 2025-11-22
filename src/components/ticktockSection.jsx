import { motion } from "framer-motion";
import { useInView } from "../Hook/useInView";
import { useEffect } from "react";

export default function TikTokSection() {
  const [ref, isVisible] = useInView(0.3);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "black",
        paddingBottom: "20px",
        marginBottom: "50px"
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "3px solid white",
            borderRadius: "20px",
            padding: "20px",
            width: "90%",          // ⬅️ AQUI: ocupa quase toda tela
            maxWidth: "900px",      // ⬅️ AQUI: limite confortável
          }}
        >
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@negopandapoeta"
            data-unique-id="negopandapoeta"
            data-embed-type="creator"
            style={{
              width: "100%",         // ⬅️ Deixa o embed expandir
              minWidth: "300px",
            }}
          >
            <section>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@negopandapoeta"
              >
                @negopandapoeta
              </a>
            </section>
          </blockquote>
        </div>
      </div>
    </motion.div>
  );
}
