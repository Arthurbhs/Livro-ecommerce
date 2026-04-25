import { Box, TextField, Typography } from "@mui/material";

export default function EnderecoEntrega({ endereco, setEndereco }) {

  function handleChange(e) {
    setEndereco({
      ...endereco,
      [e.target.name]: e.target.value
    });
  }

  function maskCEP(v) {
    v = v.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    return v;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">📦 Endereço de entrega</Typography>

      <TextField
        fullWidth
        label="CEP"
        name="cep"
        value={endereco.cep}
        onChange={(e) =>
          setEndereco({
            ...endereco,
            cep: maskCEP(e.target.value)
          })
        }
        sx={{ mt: 2 }}
      />

      <TextField
        fullWidth
        label="Rua"
        name="rua"
        value={endereco.rua}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          label="Número"
          name="numero"
          value={endereco.numero}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Complemento"
          name="complemento"
          value={endereco.complemento}
          onChange={handleChange}
        />
      </Box>

      <TextField
        fullWidth
        label="Bairro"
        name="bairro"
        value={endereco.bairro}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          label="Cidade"
          name="cidade"
          value={endereco.cidade}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="UF"
          name="estado"
          value={endereco.estado}
          onChange={(e) =>
            setEndereco({
              ...endereco,
              estado: e.target.value.toUpperCase().slice(0, 2)
            })
          }
        />
      </Box>
    </Box>
  );
}