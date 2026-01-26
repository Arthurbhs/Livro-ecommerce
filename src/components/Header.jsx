import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { auth, db } from "../api/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import SearchBar from "./SearchBar";
import { useTheme } from "@mui/material/styles";
import UserDrawer from "./UserDrawer";

export default function Header() {
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        setUser(null);
        return;
      }

      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUser({
          uid: u.uid,
          email: u.email,
          displayName: snap.data().nome,
          avatar: snap.data().avatar ?? null,
        });
      } else {
        setUser({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName || "Usuário",
          avatar: null,
        });
      }
    });

    return () => unsub();
  }, []);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f0a243ff",
          borderBottom: "3px solid #FFD700",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo_periferia_tem_palavra_transparente.png"
              alt="Logo"
              style={{
                width: isMobile ? 100 : 130,
              }}
            />
          </Box>

          {/* Desktop Search + Buttons */}
          {!isMobile && (
            <>
              <Box sx={{ width: 260 }}>
                <SearchBar />
              </Box>

              <Box>
                <Button component={Link} to="/" sx={{ color: "#fff" }}>
                  Home
                </Button>
                <Button component={Link} to="/sobre" sx={{ color: "#fff" }}>
                  Sobre Nós
                </Button>
                {user ? (
                  <Button
                    sx={{ color: "#fff" }}
                    onClick={() => setDrawerOpen(true)}
                  >
                    Minha Conta
                  </Button>
                ) : (
                  <Button component={Link} to="/login" sx={{ color: "#fff" }}>
                    Login
                  </Button>
                )}
              </Box>
            </>
          )}

          {/* Mobile icons */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SearchBar />
              <IconButton
                sx={{ color: "#fff", ml: 1 }}
                onClick={() => setMenuOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer lateral no mobile */}
      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 200, p: 2 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={() => setMenuOpen(false)}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/sobre" onClick={() => setMenuOpen(false)}>
                <ListItemText primary="Sobre Nós" />
              </ListItemButton>
            </ListItem>

            {user ? (
              <ListItem disablePadding>
                <ListItemButton onClick={() => {
                  setDrawerOpen(true);
                  setMenuOpen(false);
                }}>
                  <ListItemText primary="Minha Conta" />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/login" onClick={() => setMenuOpen(false)}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>

      {user && (
        <UserDrawer open={drawerOpen} setOpen={setDrawerOpen} user={user} />
      )}
    </>
  );
}
