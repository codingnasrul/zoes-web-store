
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-items");
  const totalDisplay = document.querySelector(".cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Keranjang kamu masih kosong 🛒</p>";
    totalDisplay.textContent = "Total: Rp 0";
    return;
  }

  let total = 0;

  cartContainer.innerHTML = cart.map((item, index) => {
    // Ubah harga jadi angka
    const priceNum = parseInt(item.price.replace(/\D/g, ""));
    const subTotal = priceNum * item.quantity;
    total += subTotal;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.price}</p>
          <p>Jumlah: ${item.quantity}</p>
          <p>Subtotal: Rp ${subTotal.toLocaleString("id-ID")}</p>
          <button class="remove-btn" data-index="${index}">Hapus</button>
        </div>
      </div>
    `;
  }).join("");

  totalDisplay.textContent = `Total: Rp ${total.toLocaleString("id-ID")}`;

  // Hapus item dari keranjang
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload(); // refresh halaman
    });
  });
});
