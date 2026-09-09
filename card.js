/**
 * CHAMNAN FOOD - Shopping Cart Logic
 */
const DELIVERY_FEE = 1.00;

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

function addToCart(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  showToast("✅ បានបន្ថែមទៅកន្ត្រក!");
}

function updateQuantity(productId, delta) {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
      showToast("🗑️ បានលុបចេញពីកន្ត្រក!");
    }
    saveCart(cart);
  }
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  showToast("🗑️ បានលុបចេញពីកន្ត្រក!");
}

function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-count-badge").forEach(el => {
    el.textContent = totalCount;
  });
}

function renderCartDrawer() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-grand-total");
  if (!cartItemsContainer) return;

  const cart = getCart();
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align:center; padding: 40px 0; color: var(--text-muted);">
        <p style="font-size: 3rem;">🛒</p>
        <p>កន្ត្រករបស់អ្នកទទេស្អាត</p>
      </div>`;
    if (subtotalEl) subtotalEl.textContent = "$0.00";
    if (totalEl) totalEl.textContent = "$0.00";
    return;
  }

  let subtotal = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    const lineTotal = item.price * item.quantity;
    subtotal += lineTotal;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.khName || item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="del-item-btn" onclick="removeFromCart('${item.id}')">✕</button>
      </div>
    `;
  }).join("");

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${(subtotal + DELIVERY_FEE).toFixed(2)}`;
}

// Drawer Visibility
function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer && overlay) {
    renderCartDrawer();
    drawer.classList.add("open");
    overlay.classList.add("open");
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  const openCartButtons = document.querySelectorAll(".open-cart-trigger");
  openCartButtons.forEach(btn => btn.addEventListener("click", openCartDrawer));
  const closeCartBtn = document.getElementById("cart-close-btn");
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
  const overlay = document.getElementById("cart-overlay");
  if (overlay) overlay.addEventListener("click", closeCartDrawer);
});