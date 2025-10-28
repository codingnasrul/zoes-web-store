document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const msg = document.getElementById("register-msg");

  // Ambil akun yang sudah ada di localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Validasi
  if (password !== confirmPassword) {
    msg.textContent = "Password tidak cocok!";
    msg.className = "error";
    return;
  }

  if (users.some(u => u.username === username)) {
    msg.textContent = "Username sudah digunakan!";
    msg.className = "error";
    return;
  }

  // Simpan akun baru
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  msg.textContent = "Akun berhasil dibuat! Silakan login.";
  msg.className = "success";

  // Redirect ke login setelah 2 detik
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
});
