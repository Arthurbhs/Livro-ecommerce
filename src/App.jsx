import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Produto from "./pages/Produto.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx"
import Cadastro from "./pages/Cadastro.jsx"
import User from "./pages/userEdit.jsx"
import Sobre from "./pages/About.jsx"
import Adm from "./pages/AdmLodin.jsx"
import Product from "./pages/CadastroProduto.jsx"
import ProductPage from "./pages/ProductPage.jsx"
import ProuctEdit from "./pages/EditarProduto.jsx"
import CartPage from "./pages/CartPage.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import WishlistPage from "./pages/WishList.jsx"
import SobrePage from "./pages/Services.jsx";

export default function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produto/:id" element={<Produto />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/cadastro" element={<Cadastro/>} />
      <Route path="/user/:id" element={<User />} />
       <Route path="/Admin/login/periferiatempalavra_log" element={<Adm />} />
       <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product/cadastro" element={<Product />} />
       <Route path="/sobre" element={<Sobre/>} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/product/editar/:codigo" element={<ProuctEdit />} /> 
      <Route path="/carrinho" element={<CartPage />} />
     <Route path="/buscar" element={<SearchResults />} />
     <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/Nossos_servicos" element={<SobrePage/> } />
    

    </Routes>
  );
}
