// Protect page and ensure cart exists
ShopUtils.requireAuth();

const cartContainer = document.getElementById("cartItems");
const totalDiv = document.getElementById("totalPrice");

function renderCart() {
  const cart = ShopUtils.getCart();
  ShopUtils.updateCartCount(cart.length);

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += Number(item.price || 0);
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${Number(item.price || 0).toFixed(2)}</p>
      <button data-index="${index}">❌</button>
    `;
    cartContainer.appendChild(div);
  });

  totalDiv.textContent = "Total: $" + total.toFixed(2);

  // Attach remove handlers
  cartContainer.querySelectorAll("button[data-index]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.currentTarget.getAttribute("data-index"));
      ShopUtils.removeItemFromCart(idx);
      renderCart();
    });
  });
}

const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (!ShopUtils.getCart().length) {
      alert("Your cart is empty.");
      return;
    }
    window.location.href = "checkout.html";
  });
}

renderCart();


