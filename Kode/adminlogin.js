// admin-login.js
document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  // contoh login sederhana
  if (username === "admin" && password === "zoes123") {
    localStorage.setItem("adminLoggedIn", true);
    window.location.href = "admin.html";
  } else {
    errorMsg.textContent = "Username atau password salah!";
  }
});
