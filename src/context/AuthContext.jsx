import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../api/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // dados Firebase Auth
  const [profile, setProfile] = useState(null); // dados do Firestore
  const [role, setRole] = useState(null);       // "admin" | "user"
  const [loading, setLoading] = useState(true);

  async function loadUserData(firebaseUser) {
    if (!firebaseUser) {
      setUser(null);
      setProfile(null);
      setRole(null);
      setLoading(false);
      return;
    }

    const uid = firebaseUser.uid;

    // 🔍 Verificar se está na coleção ADMIN
    const adminRef = doc(db, "admins", uid);
    const adminSnap = await getDoc(adminRef);

    if (adminSnap.exists()) {
      setRole("admin");
      setProfile(adminSnap.data());
      setUser(firebaseUser);
      setLoading(false);
      return;
    }

    // 🔍 Se não for admin → checar na coleção USERS
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setRole("user");
      setProfile(userSnap.data());
    } else {
      // 🚨 usuário existe no auth mas não tem doc em nenhuma coleção
      setRole("user");
      setProfile(null);
    }

    setUser(firebaseUser);
    setLoading(false);
  }

  // Escuta login/logout
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      loadUserData(firebaseUser);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
