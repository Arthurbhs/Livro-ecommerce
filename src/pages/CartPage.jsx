import { useEffect, useState } from "react";
import { getCart, removeFromCart, clearCart } from "../components/cartStorage";
import { QRCodeCanvas } from "qrcode.react";
import FormaPagamento from "../components/FormaPagamento";
import { auth, db } from "../api/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import EnderecoEntrega from "../components/endereco";

import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";


export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [pix, setPix] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [cep, setCep] = useState("");
const [frete, setFrete] = useState(null);
const [loadingFrete, setLoadingFrete] = useState(false);
const [usarEnderecoSalvo, setUsarEnderecoSalvo] = useState(true);

const [enderecoAlternativo, setEnderecoAlternativo] = useState({
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  complemento: ""
});

function copiarPix() {
  if (!pix?.pixCopiaCola) return;

  navigator.clipboard.writeText(pix.pixCopiaCola);
  setCopiado(true);

  setTimeout(() => setCopiado(false), 2000);
}
const cepFinal = usarEnderecoSalvo
  ? cep
  : enderecoAlternativo.cep;

async function calcularFrete() {
  try {
    setLoadingFrete(true);

    const res = await fetch(
      "https://backend-livro-ecommerce.onrender.com/api/calcular-frete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
     body: JSON.stringify({ cep: cepFinal })
      }
    );

    const text = await res.text(); // 👈 pega como texto primeiro

    let data;

    try {
      data = JSON.parse(text); // tenta converter
    } catch (err) {
      console.error("❌ NÃO é JSON:", text);
      alert("Erro no servidor (resposta inválida)");
      return;
    }

    if (!res.ok) {
      console.error("❌ Erro do backend:", data);
      alert(data.error || "Erro ao calcular frete");
      return;
    }

    setFrete(data.valor);

  } catch (err) {
    console.error("❌ Erro geral:", err);
    alert("Erro no frete");
  } finally {
    setLoadingFrete(false);
  }
}

useEffect(() => {
  async function carregarCepUsuario() {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) return;

      const data = snap.data();
      const cepSalvo = data.endereco?.cep;

      if (cepSalvo) {
        setCep(cepSalvo);

        // 🔥 calcula frete automático
        calcularFreteComCep(cepSalvo);
      } else {
        alert("Cadastre um endereço antes de continuar.");
      }

    } catch (err) {
      console.error("Erro ao buscar CEP do usuário:", err);
    }
  }

  carregarCepUsuario();
}, []);
useEffect(() => {
  const storedCart = getCart();

  if (Array.isArray(storedCart)) {
    setCart(storedCart);
  } else {
    console.warn("❌ Cart inválido vindo do storage:", storedCart);
    setCart([]);
  }
}, []);
async function finalizarCompra() {
  try {
    setLoading(true);

const payload = {
  cart: cart.map(item => ({
    titulo: item.titulo,
    preco: item.preco,
    quantidade: item.quantidade,
  })),
  frete,
  cep: cepFinal
};

    const res = await fetch("https://backend-livro-ecommerce.onrender.com/api/pix/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    // ✅ PRIMEIRO pega a resposta
    const data = await res.json();

    // ✅ DEPOIS verifica erro
    if (!res.ok) {
      console.error("Erro backend:", data);
      alert("Erro: " + (data.error || "Erro ao criar PIX"));
      return;
    }

    // ✅ sucesso
    setPix(data);

  } catch (err) {
    console.error(err);
    alert("Erro ao gerar PIX");
  } finally {
    setLoading(false);
  }
}


const subtotal = cart.reduce(
  (acc, item) => acc + item.preco * item.quantidade,
  0
);

const total = subtotal + (frete || 0);

  if (cart.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5">Seu carrinho está vazio 🛒</Typography>
      </Box>
    );
  }
  
  async function calcularFreteComCep(cepParam) {
  try {
    setLoadingFrete(true);

    const res = await fetch(
      "https://backend-livro-ecommerce.onrender.com/api/calcular-frete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cep: cepParam })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return;
    }

    setFrete(data.valor);

  } catch (err) {
    console.error(err);
  } finally {
    setLoadingFrete(false);
  }
}
  





  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        🛒 Meu Carrinho
      </Typography>

      {cart.map((item) => (
        <Card
          key={item.id}
          sx={{ display: "flex", mb: 2, p: 2, alignItems: "center", gap: 2 }}
        >
          <CardMedia
            component="img"
            image={item.imagem}
            alt={item.titulo}
            sx={{ width: 100, height: 140, objectFit: "cover" }}
          />

          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{item.titulo}</Typography>
            <Typography>Quantidade: {item.quantidade}</Typography>
            <Typography>Preço: R$ {item.preco}</Typography>
            <Typography fontWeight="bold" mt={1}>
              Subtotal: R$ {(item.quantidade * item.preco).toFixed(2)}
            </Typography>
          </CardContent>

          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              removeFromCart(item.id);
              setCart(getCart());
            }}
          >
            Remover
          </Button>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ p: 2, border: "1px solid #000", borderRadius: 2 }}>
      {/* CEP */}
<Box sx={{ mt: 2 }}>
  <Typography>Calcular frete</Typography>

  <Typography sx={{ mt: 1 }}>
  CEP de entrega: <strong>{cepFinal}</strong>
</Typography>

<Box sx={{ mt: 2 }}>
  <Typography variant="h6">Endereço</Typography>

  <Button
    variant={usarEnderecoSalvo ? "contained" : "outlined"}
    sx={{ mt: 1, mr: 1 }}
    onClick={() => setUsarEnderecoSalvo(true)}
  >
    Usar endereço salvo
  </Button>

  <Button
    variant={!usarEnderecoSalvo ? "contained" : "outlined"}
    sx={{ mt: 1 }}
    onClick={() => setUsarEnderecoSalvo(false)}
  >
    Outro endereço
  </Button>
</Box>

{!usarEnderecoSalvo && (
  <EnderecoEntrega
    endereco={enderecoAlternativo}
    setEndereco={setEnderecoAlternativo}
  />
)}


  <Button
    variant="outlined"
    fullWidth
    sx={{ mt: 1 }}
    onClick={calcularFrete}
    disabled={loadingFrete}
  >
    {loadingFrete ? "Calculando..." : "Calcular Frete"}
  </Button>

  {frete !== null && (
    <Typography sx={{ mt: 1 }}>
      Frete: <strong>R$ {frete.toFixed(2)}</strong>
    </Typography>
  )}
</Box>
       <Typography variant="h5">
  Total: <strong>R$ {total.toFixed(2)}</strong>
</Typography>

       <Typography variant="h6" mt={2}>
  Formas de pagamento
</Typography>

<FormaPagamento 
  cart={cart} 
  total={total}
  frete={frete}
  cep={cep}
/>



        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {
            clearCart();
            setCart([]);
          }}
        >
          Limpar Carrinho
        </Button>
      </Box>
    </Box>
  );
}
