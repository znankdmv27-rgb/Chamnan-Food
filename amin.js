/**
 * CHAMNAN FOOD - Admin Dashboard Controller
 */
document.addEventListener("DOMContentLoaded", () => {
  renderAdminOverview();
  renderAdminOrders();
  renderAdminProducts();
  renderAdminCustomers();
});

// Admin Home Overview
function renderAdminOverview() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const totalOrdersEl = document.getElementById("admin-total-orders");
  const pendingOrdersEl = document.getElementById("admin-pending-orders");
  const completedOrdersEl = document.getElementById("admin-completed-orders");
  const totalRevenueEl = document.getElementById("admin-total-revenue");

  if (!totalOrdersEl) return;

  const pending = orders.filter(o => o.status === "Pending" || o.status === "Confirmed").length;
  const completed = orders.filter(o => o.status === "Completed").length;
  const revenue = orders
    .filter(o => o.status === "Completed")
    .reduce((sum, o) => sum + o.total, 0);

  totalOrdersEl.textContent = orders.length;
  pendingOrdersEl.textContent = pending;
  completedOrdersEl.textContent = completed;
  totalRevenueEl.textContent = `$${revenue.toFixed(2)}`;

  // Pure Canvas Sales Chart Demo
  const canvas = document.getElementById("salesChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const data = [12, 19, 25, 18, 30, 42, 35];
    const max = 50;
    const padding = 30;
    const chartHeight = canvas.height - padding * 2;
    const chartWidth = canvas.width - padding * 2;
    const step = chartWidth / (data.length - 1);

    ctx.strokeStyle = "#FF6B35";
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = padding + i * step;
      const y = canvas.height - padding - (val / max) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw dots
    ctx.fillStyle = "#2B2D42";
    data.forEach((val, i) => {
      const x = padding + i * step;
      const y = canvas.height - padding - (val / max) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

// Order Management
function renderAdminOrders() {
  const tableBody = document.getElementById("admin-orders-table-body");
  if (!tableBody) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  if (orders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">គ្មានការកម្មង់នៅឡើយទេ</td></tr>`;
    return;
  }

  tableBody.innerHTML = orders.map(order => `
    <tr>
      <td><strong>${order.orderId}</strong></td>
      <td>${order.customerName}</td>
      <td>${order.phone}</td>
      <td>$${order.total.toFixed(2)}</td>
      <td>${order.paymentMethod}</td>
      <td>
        <select onchange="changeOrderStatus('${order.orderId}', this.value)">
          ${["Pending", "Confirmed", "Preparing", "Out for Delivery", "Completed", "Cancelled"].map(st => `
            <option value="${st}" ${order.status === st ? 'selected' : ''}>${st}</option>
          `).join("")}
        </select>
      </td>
      <td>
        <button class="btn btn-outline" style="padding:4px 8px; font-size:0.75rem;" onclick="viewOrderDetails('${order.orderId}')">View</button>
        <button class="btn" style="background:#f8d7da; color:#dc3545; padding:4px 8px; font-size:0.75rem;" onclick="deleteOrder('${order.orderId}')">Delete</button>
      </td>
    </tr>
  `).join("");
}

function changeOrderStatus(orderId, newStatus) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(o => o.orderId === orderId);
  if (order) {
    order.status = newStatus;
    localStorage.setItem("orders", JSON.stringify(orders));
    renderAdminOverview();
    showToast(`Status updated to: ${newStatus}`);
  }
}

function deleteOrder(orderId) {
  if (confirm(`តើអ្នកប្រាកដថាចង់លុប Order #${orderId} មែនទេ?`)) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders = orders.filter(o => o.orderId !== orderId);
    localStorage.setItem("orders", JSON.stringify(orders));
    renderAdminOrders();
    renderAdminOverview();
  }
}

function viewOrderDetails(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(o => o.orderId === orderId);
  if (order) {
    alert(`Order: #${order.orderId}\nCustomer: ${order.customerName} (${order.phone})\nAddress: ${order.address}\nItems:\n` +
      order.items.map(i => `- ${i.name} x ${i.quantity}`).join("\n") +
      `\nTotal: $${order.total.toFixed(2)}`
    );
  }
}

// Product Management
function renderAdminProducts() {
  const container = document.getElementById("admin-products-table-body");
  if (!container) return;

  const products = JSON.parse(localStorage.getItem("products")) || [];
  container.innerHTML = products.map(prod => `
    <tr>
      <td><img src="${prod.image}" style="width: 40px; height: 40px; border-radius:4px; object-fit:cover;"></td>
      <td><strong>${prod.name}</strong><br><small>${prod.khName || ''}</small></td>
      <td>${prod.category}</td>
      <td>$${prod.price.toFixed(2)}</td>
      <td>⭐ ${prod.rating}</td>
      <td>
        <button class="btn" style="background:${prod.available ? '#d4edda' : '#f8d7da'}; color:${prod.available ? '#155724' : '#721c24'}; padding:4px 8px; font-size:0.75rem;" onclick="toggleProductAvailability('${prod.id}')">
          ${prod.available ? 'Available' : 'Disabled'}
        </button>
      </td>
      <td>
        <button class="btn" style="background:#f8d7da; color:#dc3545; padding:4px 8px; font-size:0.75rem;" onclick="deleteProduct('${prod.id}')">Delete</button>
      </td>
    </tr>
  `).join("");
}

function toggleProductAvailability(id) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const p = products.find(prod => prod.id === id);
  if (p) {
    p.available = !p.available;
    localStorage.setItem("products", JSON.stringify(products));
    renderAdminProducts();
  }
}

function deleteProduct(id) {
  if (confirm("តើអ្នកប្រាកដថាចង់លុបមុខម្ហូបនេះ?")) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    renderAdminProducts();
  }
}

// Add New Product
function handleAddProduct(e) {
  e.preventDefault();
  const name = document.getElementById("prod-name").value;
  const khName = document.getElementById("prod-kh-name").value;
  const category = document.getElementById("prod-cat").value;
  const price = parseFloat(document.getElementById("prod-price").value);
  const image = document.getElementById("prod-img").value || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80";
  const desc = document.getElementById("prod-desc").value;

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const newProduct = {
    id: "p" + (Date.now()),
    name,
    khName,
    category,
    price,
    rating: 5.0,
    desc,
    image,
    available: true
  };

  products.unshift(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  alert("ផលិតផលត្រូវបានបន្ថែមដោយជោគជ័យ!");
  window.location.reload();
}

// Customer List
function renderAdminCustomers() {
  const container = document.getElementById("admin-customers-table-body");
  if (!container) return;

  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  if (customers.length === 0) {
    container.innerHTML = `<tr><td colspan="5" style="text-align:center;">មិនទាន់មានអតិថិជនទេ</td></tr>`;
    return;
  }

  container.innerHTML = customers.map(c => `
    <tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.phone}</td>
      <td>${c.address || 'N/A'}</td>
      <td>${c.ordersCount}</td>
      <td><strong>$${c.totalSpent.toFixed(2)}</strong></td>
    </tr>
  `).join("");
}