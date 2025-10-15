// Storage keys
const STORAGE_KEYS = {
  user: "loggedInUser",
  cart: "cart",
};

// Auth helpers
function getLoggedInUser() {
  return localStorage.getItem(STORAGE_KEYS.user) || null;
}

function requireAuth() {
  if (!getLoggedInUser()) {
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.user);
  // Do not clear the entire localStorage to preserve other app data if any
  window.location.href = "index.html";
}

// Cart helpers
function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.cart);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function saveCart(cartItems) {
  const safeItems = Array.isArray(cartItems) ? cartItems : [];
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(safeItems));
  updateCartCount(safeItems.length);
}

function addItemToCart(item) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
}

function removeItemFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(STORAGE_KEYS.cart);
  updateCartCount(0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + Number(item.price || 0), 0);
}

// UI helpers
function updateCartCount(count) {
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = String(count || 0);
}

function guardCartNotEmpty() {
  const cart = getCart();
  if (!cart.length) {
    window.location.href = "products.html";
  }
}

// Expose minimal API to global scope (for inline handlers if any)
window.ShopUtils = {
  getLoggedInUser,
  requireAuth,
  logout,
  getCart,
  saveCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
  getCartTotal,
  updateCartCount,
  guardCartNotEmpty,
};


