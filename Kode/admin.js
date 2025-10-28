// admin.js
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");
  if (!isLoggedIn) {
    alert("Silakan login terlebih dahulu!");
    window.location.href = "admin-login.html";
  }

  const form = document.getElementById("addProductForm");
  const container = document.getElementById("productContainer");
  const logoutBtn = document.getElementById("logout-btn");

  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Render produk
  function renderProducts() {
    container.innerHTML = products
      .map(
        (p, i) => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}" />
          <h4>${p.name}</h4>
          <p>${p.price}</p>
          <button class="delete-btn" data-index="${i}">Hapus</button>
        </div>
      `
      )
      .join("");
  }

  renderProducts();

  // Tambah produk baru
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const image = document.getElementById("productImage").value.trim();

    if (name && price && image) {
      products.push({ name, price, image });
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
      form.reset();
      alert("Produk berhasil ditambahkan!");
    }
  });

  // Hapus produk
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
    }
  });

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "admin-login.html";
  });
});
