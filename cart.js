const products = [
  { id: 1, name: "Backpack", price: 29.99, img: "images/backpack.jpg" },
  { id: 2, name: "Bike Light", price: 9.99, img: "images/bike-light.jpg" },
  { id: 3, name: "T-Shirt", price: 15.99, img: "images/tshirt.jpg" },
  { id: 4, name: "Sneakers", price: 49.99, img: "images/sneakers.jpg" },
];

const listContainer = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");

function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = cart.length;
}

function addToCart(product) {
  const cart = loadCart();
  cart.push(product);
  saveCart(cart);
  alert(`${product.name} added to cart!`);
}

function renderProducts() {
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button>Add to Cart</button>
    `;
    card.querySelector("button").addEventListener("click", () => addToCart(p));
    listContainer.appendChild(card);
  });
  saveCart(loadCart());
}

document.getElementById("logoutBtn").onclick = () => {
  localStorage.clear();
  window.location.href = "index.html";
};

renderProducts();
