import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firebaseConfig";
import { Box, Typography, CircularProgress } from "@mui/material";
import ProductGrid from "../components/ProductGrid";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q")?.toLowerCase().trim();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function search() {
      setLoading(true);

      const snap = await getDocs(collection(db, "products"));
      const list = [];

      snap.forEach((docItem) => {
        const item = { id: docItem.id, ...docItem.data() };

        // Campos que realmente são pesquisáveis
        const campos = [
          item.titulo,
          item.autor,
          item.genero,
          item.editora,
          item.isbn,
          item.codigo,
          item.resumo,
        ];

        // Verifica se algum desses campos contém o termo da busca
        const encontrou = campos.some((campo) =>
          campo?.toString().toLowerCase().includes(query)
        );

        if (encontrou) list.push(item);
      });

      setResults(list);
      setLoading(false);
    }

    if (query && query.length > 0) {
      search();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        Resultados para: "{query}"
      </Typography>

      {results.length === 0 ? (
        <Typography>Nenhum produto encontrado.</Typography>
      ) : (
        <ProductGrid products={results} />
      )}
    </Box>
  );
}
