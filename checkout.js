document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Guards
  if (!window.ShopUtils) {
    alert("App error. Please reload the page.");
    return;
  }
  ShopUtils.requireAuth();
  if (!ShopUtils.getCart().length) {
    alert("Your cart is empty.");
    window.location.href = "products.html";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name) {
    alert("Please enter your full name.");
    return;
  }
  if (!address) {
    alert("Please enter your address.");
    return;
  }
  if (!payment) {
    alert("Please select a payment method.");
    return;
  }

  ShopUtils.clearCart();
  window.location.href = "thankyou.html";
});
