/**
 * CHAMNAN FOOD - Checkout and Validation Logic
 */
document.addEventListener("DOMContentLoaded", () => {
  const checkoutSummary = document.getElementById("checkout-summary-list");
  const grandTotalEl = document.getElementById("checkout-grand-total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0 && window.location.pathname.includes("checkout.html")) {
    alert("កន្ត្រករបស់អ្នកទទេ! សូមជ្រើសរើសម្ហូបសិន។");
    window.location.href = "menu.html";
    return;
  }

  let subtotal = 0;
  if (checkoutSummary) {
    checkoutSummary.innerHTML = cart.map(item => {
      const lineTotal = item.price * item.quantity;
      subtotal += lineTotal;
      return `
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span>${item.khName || item.name} x ${item.quantity}</span>
          <span>$${lineTotal.toFixed(2)}</span>
        </div>
      `;
    }).join("");
    const grandTotal = subtotal + 1.00;
    if (grandTotalEl) grandTotalEl.textContent = `$${grandTotal.toFixed(2)}`;
    
    // Pass dynamic amount to KHQR Demo if selected
    const khqrAmount = document.getElementById("khqr-amount");
    if (khqrAmount) khqrAmount.textContent = `$${grandTotal.toFixed(2)}`;
  }

  // Toggle KHQR Preview
  const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
  const khqrBox = document.getElementById("khqr-demo-view");
  paymentRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "KHQR" && khqrBox) {
        khqrBox.style.display = "block";
      } else if (khqrBox) {
        khqrBox.style.display = "none";
      }
    });
  });

  // Handle Form Submit
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("cust-name").value.trim();
      const phone = document.getElementById("cust-phone").value.trim();
      const address = document.getElementById("cust-address").value.trim();
      const notes = document.getElementById("cust-notes").value.trim();
      const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;
      const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

      // Validation
      if (!name) return alert("សូមបញ្ចូលឈ្មោះរបស់អ្នក");
      if (!phone) return alert("សូមបញ្ចូលលេខទូរស័ព្ទ");
      if (!address && deliveryMethod === "delivery") return alert("សូមបញ្ចូលអាសយដ្ឋាន");

      const now = new Date();
      const dateStr = now.toISOString().slice(0,10).replace(/-/g, "");
      const randomId = Math.floor(100 + Math.random() * 900);
      const orderId = `CF${dateStr}${randomId}`;

      const newOrder = {
        orderId: orderId,
        customerName: name,
        phone: phone,
        address: address,
        notes: notes,
        deliveryMethod: deliveryMethod,
        paymentMethod: paymentMethod,
        items: cart,
        subtotal: subtotal,
        deliveryFee: 1.00,
        total: subtotal + 1.00,
        status: "Pending",
        createdAt: new Date().toISOString()
      };

      // Save to Orders
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.unshift(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Save/Update Customer in LocalStorage
      const customers = JSON.parse(localStorage.getItem("customers")) || [];
      const existingCustomer = customers.find(c => c.phone === phone);
      if (existingCustomer) {
        existingCustomer.ordersCount += 1;
        existingCustomer.totalSpent += newOrder.total;
        existingCustomer.address = address;
      } else {
        customers.push({
          name: name,
          phone: phone,
          address: address,
          ordersCount: 1,
          totalSpent: newOrder.total
        });
      }
      localStorage.setItem("customers", JSON.stringify(customers));

      // Clear Cart
      localStorage.setItem("cart", JSON.stringify([]));

      // Redirect to Confirmation
      window.location.href = `order-success.html?orderId=${orderId}`;
    });
  }
});