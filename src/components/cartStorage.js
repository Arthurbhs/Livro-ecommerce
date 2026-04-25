const CART_KEY = "cart";

export function getCart() {
  try {
    const data = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function isInCart(productId) {
  const cart = getCart();
  return cart.some(item => item.id === productId);
}

export function addToCart(product) {
  const cart = getCart();

  const exists = cart.find(item => item.id === product.id);
  if (exists) return false;

  cart.push({ ...product, quantidade: 1 });
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return true;
}

export function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return true;
}

// ✅ ADICIONE ISSO
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
