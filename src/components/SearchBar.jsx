import { useState } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/buscar?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <Box sx={{ width: 300 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Buscar livros..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        sx={{
          background: "#fff",
          borderRadius: 2,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
