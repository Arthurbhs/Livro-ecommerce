import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { db, auth } from "../api/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function AdminButton() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function load() {
      const user = auth.currentUser;
      if (!user) return;

      const refAdmin = doc(db, "admins", user.uid);
      const snapAdmin = await getDoc(refAdmin);

      setIsAdmin(snapAdmin.exists());
    }

    load();
  }, []);

  if (!isAdmin) return null;

  return (
    <Button
      variant="contained"
      component={Link}
      to="/product/cadastro"
      sx={{
        textTransform: "none",
        backgroundColor: "#00ff9d",
        color: "#000",
        "&:hover": {
          backgroundColor: "#00ffa6",
        },
      }}
    >
      Inserir Produto
    </Button>
  );
}
