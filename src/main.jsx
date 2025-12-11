import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Header from "./components/Header.jsx";  // <-- ADICIONE ISTO

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <Header />     {/* <-- AGORA AQUI! */}
          <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
