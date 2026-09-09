/**
 * CHAMNAN FOOD - Order Tracking Logic
 */
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderIdParam = urlParams.get("orderId");
  const searchInput = document.getElementById("track-search-input");
  const trackBtn = document.getElementById("track-search-btn");

  if (orderIdParam) {
    if (searchInput) searchInput.value = orderIdParam;
    renderOrderTracking(orderIdParam);
  }

  if (trackBtn) {
    trackBtn.addEventListener("click", () => {
      const q = searchInput.value.trim();
      if (q) renderOrderTracking(q);
    });
  }
});

function renderOrderTracking(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(o => o.orderId.toLowerCase() === orderId.toLowerCase());
  const trackContainer = document.getElementById("tracking-result");

  if (!trackContainer) return;

  if (!order) {
    trackContainer.innerHTML = `
      <div style="text-align:center; padding: 40px; color: var(--danger);">
        <h3>រកមិនឃើញការកម្មង់ #${orderId} ទេ 😢</h3>
        <p>សូមពិនិត្យមើលលេខសម្គាល់ការកម្មង់របស់អ្នកម្តងទៀត។</p>
      </div>`;
    return;
  }

  const steps = [
    { status: "Pending", label: "ការកម្មង់ត្រូវបានទទួល (Order Received)" },
    { status: "Preparing", label: "ចុងភៅកំពុងរៀបចំ (Preparing)" },
    { status: "Out for Delivery", label: "កំពុងដឹកជញ្ជូន (Out for Delivery)" },
    { status: "Completed", label: "បានដឹកជញ្ជូនរួចរាល់ (Delivered)" }
  ];

  const statusMap = {
    "Pending": 0,
    "Confirmed": 0,
    "Preparing": 1,
    "Out for Delivery": 2,
    "Completed": 3,
    "Cancelled": -1
  };

  const currentStep = statusMap[order.status] !== undefined ? statusMap[order.status] : 0;

  let timelineHtml = "";
  if (order.status === "Cancelled") {
    timelineHtml = `<div style="padding: 20px; background: #ffebee; color: #c62828; border-radius: var(--radius-sm); text-align: center; font-weight: 700;">ការកម្មង់នេះត្រូវបានបោះបង់ (Cancelled)</div>`;
  } else {
    timelineHtml = `
      <div class="tracking-timeline" style="display: flex; justify-content: space-between; position: relative; margin: 40px 0;">
        ${steps.map((step, idx) => `
          <div style="flex: 1; text-align: center; position: relative;">
            <div style="
              width: 36px; height: 36px; border-radius: 50%;
              background: ${idx <= currentStep ? 'var(--primary)' : 'var(--border)'};
              color: white; display: flex; align-items: center; justify-content: center;
              margin: 0 auto 10px; font-weight: bold;
            ">${idx <= currentStep ? '✓' : idx + 1}</div>
            <div style="font-size: 0.85rem; font-weight: 600; color: ${idx <= currentStep ? 'var(--secondary)' : 'var(--text-muted)'};">${step.label}</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  trackContainer.innerHTML = `
    <div style="background: white; padding: 30px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
      <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--border); padding-bottom:15px;">
        <div>
          <h2>Order #${order.orderId}</h2>
          <p style="color:var(--text-muted);">កាលបរិច្ឆេទ: ${new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <span class="badge" style="background: var(--primary-light); color: var(--primary); font-size: 1rem; padding: 6px 14px;">Status: ${order.status}</span>
        </div>
      </div>

      ${timelineHtml}

      <div style="margin-top: 30px;">
        <h4>ព័ត៌មានអតិថិជន</h4>
        <p><strong>ឈ្មោះ:</strong> ${order.customerName}</p>
        <p><strong>លេខទូរស័ព្ទ:</strong> ${order.phone}</p>
        <p><strong>អាសយដ្ឋាន:</strong> ${order.address || 'Pick Up at Store'}</p>
        <p><strong>វិធីសាស្ត្របង់ប្រាក់:</strong> ${order.paymentMethod}</p>
      </div>

      <div style="margin-top: 20px;">
        <h4>មុខម្ហូបដែលបានកម្មង់</h4>
        <ul style="margin-top: 10px;">
          ${order.items.map(item => `
            <li style="display:flex; justify-content:space-between; padding: 8px 0; border-bottom: 1px dashed var(--border);">
              <span>${item.khName || item.name} x ${item.quantity}</span>
              <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
            </li>
          `).join("")}
        </ul>
        <div style="display:flex; justify-content:space-between; margin-top: 15px; font-size: 1.2rem; font-weight: 700;">
          <span>សរុបរួម:</span>
          <span style="color: var(--primary);">$${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  `;
}