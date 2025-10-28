/* ============================================
   ZOES SCRIPT.JS
   Menangani interaksi umum di seluruh halaman
   ============================================ */

// ========== 1. NAVBAR RESPONSIVE ==========
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("open");
    });
  }
});

// ========== 2. FITUR PENCARIAN PRODUK ==========
const products = [
  { name: "Mozzarella Stick", url: "produk-mozzarella.html" },
  { name: "French Fries", url: "produk-fries.html" },
  { name: "Pizza", url: "produk-pizza.html" },
  { name: "Italian Stromboli", url: "produk-stromboli.html" },
  { name: "Sausage Cheeze Butter Biscuit", url: "produk-biscuit.html" },
  { name: "Strawberry Cheesecake", url: "produk-cheesecake.html" },
  { name: "Frozen Salmon Fillet", url: "produk-salmon.html" },
  { name: "Mixed Berries", url: "produk-berries.html" },
  { name: "Chicken Nuggets", url: "produk-nugget.html" },
];

// Aktif hanya jika di halaman pencarian
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");

  if (!input || !resultsContainer) return;

  input.addEventListener("input", function () {
    const query = input.value.toLowerCase().trim();
    resultsContainer.innerHTML = "";

    if (query === "") return;

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      filtered.forEach((p) => {
        const link = document.createElement("a");
        link.href = p.url;
        link.textContent = p.name;
        resultsContainer.appendChild(link);
      });
    } else {
      resultsContainer.innerHTML = "<p>Tidak ada hasil ditemukan.</p>";
    }
  });
});

// Tombol clear (✖)
function clearSearch() {
  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");
  if (input && resultsContainer) {
    input.value = "";
    resultsContainer.innerHTML = "";
  }
}

// ========== 3. KLIK PRODUK DI HALAMAN UTAMA ==========
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const target = card.getAttribute("data-url");
      if (target) window.location.href = target;
    });
  });
});

// ========== 4. VALIDASI FORM KONTAK / PENDAFTARAN ==========
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector("#name").value.trim();
      const email = contactForm.querySelector("#email").value.trim();
      const message = contactForm.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        alert("Harap isi semua bidang sebelum mengirim!");
        return;
      }

      alert("Terima kasih, pesan Anda telah terkirim!");
      contactForm.reset();
    });
  }
});

// ========== 5. SCROLL TO TOP BUTTON (optional) ==========
const scrollBtn = document.createElement("button");
scrollBtn.textContent = "↑";
scrollBtn.id = "scrollToTopBtn";
scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "30px";
scrollBtn.style.right = "30px";
scrollBtn.style.padding = "10px 14px";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "6px";
scrollBtn.style.backgroundColor = "#ff8c00";
scrollBtn.style.color = "#fff";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";
scrollBtn.style.zIndex = "999";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================
// Wishlist Function
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const wishlistBtn = document.querySelector("#wishlist-btn");

  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      const product = {
        name: "Mozzarella Stick",
        price: "Rp 30.000",
        image: "images/mozzarella-stick.jpg",
        link: "produk-mozzarella.html"
      };

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      const exists = wishlist.some(item => item.name === product.name);
      if (!exists) {
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("❤️ Produk ditambahkan ke wishlist!");
      } else {
        alert("Produk ini sudah ada di wishlist ❤️");
      }
    });
  }
});

// ===== Tambah ke Keranjang =====
document.addEventListener("DOMContentLoaded", () => {
  const addCartBtn = document.getElementById("add-cart-btn");

  if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
      const name = document.getElementById("product-name").innerText;
      const price = document.getElementById("product-price").innerText;
      const quantity = parseInt(document.getElementById("quantity").value);
      const image = "images/mozzarella-stick.jpg";

      const product = { name, price, quantity, image };

      // Ambil keranjang lama dari localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Cek apakah produk sudah ada
      const existing = cart.find(p => p.name === name);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push(product);
      }

      // Simpan kembali ke localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${name} telah ditambahkan ke keranjang!`);
    });
  }
});

