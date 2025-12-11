import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function FreteCalculator({ peso = 1 }) {
  const [cep, setCep] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulação simples de frete (pode conectar com API dos Correios depois)
  function calcularFrete() {
    if (cep.length !== 8) {
      alert("Digite um CEP válido (8 dígitos)");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // cálculo genérico fictício
      const valor = (peso * 4.5 + 12).toFixed(2);

      setResultado({
        prazo: "4 a 7 dias úteis",
        valor,
      });

      setLoading(false);
    }, 800);
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Typography sx={{ fontWeight: "bold", mb: 1 }}>
        Calcule o frete
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="CEP"
          size="small"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
          sx={{ width: 140 }}
        />
        <Button variant="outlined" onClick={calcularFrete} disabled={loading}>
          {loading ? "..." : "OK"}
        </Button>
      </Box>

      {resultado && (
        <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
          <Typography><strong>Valor:</strong> R$ {resultado.valor}</Typography>
          <Typography><strong>Prazo:</strong> {resultado.prazo}</Typography>
        </Box>
      )}
    </Box>
  );
}
