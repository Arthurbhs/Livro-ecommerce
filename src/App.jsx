import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Produto from "./pages/Produto.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import Checkout from "./pages/Checkout.jsx";
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx"
import Cadastro from "./pages/Cadastro.jsx"
import User from "./pages/userEdit.jsx"

export default function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produto/:id" element={<Produto />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/cadastro" element={<Cadastro/>} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
    </>
  );
}
