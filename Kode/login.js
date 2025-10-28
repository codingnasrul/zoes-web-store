// Login form handler
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  // Reset pesan error setiap kali submit
  errorMsg.textContent = "";

  if (role === "admin") {
    // Validasi login untuk admin
    if (username === "admin" && password === "zoes123") {
      localStorage.setItem("adminLoggedIn", true);
      window.location.href = "admin.html";
    } else {
      errorMsg.textContent = "❌ Username atau password admin salah!";
    }

  } else if (role === "buyer") {
    // Login pembeli berdasarkan daftar akun yang sudah terdaftar
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("buyerLoggedIn", true);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      errorMsg.textContent = "❌ Username atau password salah!";
    }

  } else {
    errorMsg.textContent = "⚠️ Pilih jenis akun terlebih dahulu!";
  }
});
