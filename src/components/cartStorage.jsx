export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
  let cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    cart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );
  } else {
    cart.push({ ...product, quantidade: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem("cart");
}
