import { useState } from "react";
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  ClickAwayListener,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  function handleSearch(e) {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/buscar?q=${encodeURIComponent(query.trim())}`);
      if (isMobile) setShowSearch(false); // fecha após pesquisar no celular
    }
  }

  function handleIconClick() {
    if (isMobile) setShowSearch((prev) => !prev);
  }

  function handleClickAway() {
    if (isMobile) setShowSearch(false);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Ícone de pesquisa sempre visível */}
        <IconButton onClick={handleIconClick} sx={{ color: "#fff" }}>
          <SearchIcon />
        </IconButton>

        {/* Campo de busca */}
        {(!isMobile || showSearch) && (
          <Box
            sx={{
              width: isMobile ? "70vw" : 300,
              ml: isMobile ? 1 : 0,
              transition: "all 0.3s ease",
            }}
          >
            <TextField
              autoFocus={isMobile && showSearch}
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
        )}
      </Box>
    </ClickAwayListener>
  );
}
