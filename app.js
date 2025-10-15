document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username && password) {
    // Save session
    localStorage.setItem("loggedInUser", username);
    window.location.href = "products.html";
  } else {
    document.getElementById("errorMsg").textContent = "Invalid credentials!";
  }
});
