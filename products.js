// Ensure user is authenticated on products page
ShopUtils.requireAuth();

const products = [
  { id: 1, name: "Backpack", price: 29.99, img: "images/backpack.jpg" },
  { id: 2, name: "Bike Light", price: 9.99, img: "images/bike-light.jpg" },
  { id: 3, name: "T-Shirt", price: 15.99, img: "images/tshirt.jpg" },
  { id: 4, name: "Sneakers", price: 49.99, img: "images/sneakers.jpg" },
];

const listContainer = document.getElementById("productList");

function renderProducts() {
  // Initialize cart count
  ShopUtils.updateCartCount(ShopUtils.getCart().length);

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button>Add to Cart</button>
    `;
    const button = card.querySelector("button");
    button.addEventListener("click", () => {
      ShopUtils.addItemToCart(product);
      alert(`${product.name} added to cart!`);
    });
    listContainer.appendChild(card);
  });
}

// Wire logout button
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", ShopUtils.logout);
}

renderProducts();


