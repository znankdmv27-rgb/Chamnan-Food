/**
 * CHAMNAN FOOD - Core Database Seed & Shared App Logic
 */
const DEFAULT_PRODUCTS = [
  { id: "p1", name: "Classic Beef Burger", khName: "ប៊ឺហ្គឺរសាច់គោបុរាណ", category: "burger", price: 3.50, rating: 4.8, desc: "សាច់គោអាំងស្រស់ ឈីស និងបន្លែធម្មជាតិ", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80", available: true },
  { id: "p2", name: "Cheese Burger", khName: "ឈីសប៊ឺហ្គឺរ", category: "burger", price: 4.00, rating: 4.9, desc: "ឈីសបន្ទះទ្វេដង ជាមួយទឹកជ្រលក់ពិសេស", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80", available: true },
  { id: "p3", name: "Double Beef Burger", khName: "ប៊ឺហ្គឺរសាច់គោពីរជាន់", category: "burger", price: 5.50, rating: 5.0, desc: "សាច់គោបន្ទះពីរជាន់ ឈីសពេញៗមាត់", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80", available: true },
  { id: "p4", name: "Margherita Pizza", khName: "ភីហ្សាម៉ាហ្គារីតា", category: "pizza", price: 5.00, rating: 4.6, desc: "ប៉េងប៉ោះស្រស់ ឈីសម៉ូហ្សារ៉េឡា និងស្លឹកបាស៊ីល", image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&q=80", available: true },
  { id: "p5", name: "Chicken Pizza", khName: "ភីហ្សាសាច់មាន់", category: "pizza", price: 6.00, rating: 4.7, desc: "សាច់មាន់បំពងជាមួយផ្សិត និងទឹកជ្រលក់ BBQ", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80", available: true },
  { id: "p6", name: "Seafood Pizza", khName: "ភីហ្សាគ្រឿងសមុទ្រ", category: "pizza", price: 7.50, rating: 4.9, desc: "បង្គា មឹក ក្តាម និងឈីសយ៉ាងជោកជាំ", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80", available: true },
  { id: "p7", name: "Fried Rice", khName: "បាយឆាពងមាន់", category: "rice", price: 2.50, rating: 4.5, desc: "បាយឆាឈ្ងុយឆ្ងាញ់ជាមួយបន្លែស្រស់", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80", available: true },
  { id: "p8", name: "Chicken Rice", khName: "បាយសាច់មាន់", category: "rice", price: 3.50, rating: 4.8, desc: "សាច់មាន់ទន់ឆ្ងាញ់ ជាមួយទឹកត្រីកោះកុង", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&q=80", available: true },
  { id: "p9", name: "Beef Rice", khName: "បាយឡុកឡាក់សាច់គោ", category: "rice", price: 4.00, rating: 4.9, desc: "សាច់គោផុយឆ្ងាញ់ ម្រេចកំពត និងពងមាន់ចៀន", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80", available: true },
  { id: "p10", name: "Fried Noodle", khName: "មីឆាសាច់ជ្រូក", category: "noodle", price: 3.00, rating: 4.6, desc: "មីឆាត្រកួន ជាមួយសាច់ជ្រូកបំពងរសជាតិដើម", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80", available: true },
  { id: "p11", name: "Beef Noodle", khName: "មីស៊ុបសាច់គោ", category: "noodle", price: 3.50, rating: 4.8, desc: "ទឹកស៊ុបខាប់ផ្អែមឆ្អឹងគោ បន្ថែមប្រហិតសាច់", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80", available: true },
  { id: "p12", name: "Seafood Noodle", khName: "មីឆាគ្រឿងសមុទ្រ", category: "noodle", price: 5.00, rating: 4.7, desc: "មីស្រូបគ្រឿងសមុទ្រស្រស់ៗ និងបន្លែចម្រុះ", image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&q=80", available: true },
  { id: "p13", name: "Crispy Fried Chicken", khName: "មាន់បំពងស្រួយ", category: "chicken", price: 4.50, rating: 4.9, desc: "មាន់បំពងរសជាតិហឹរស្រួយស្រួយ", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&q=80", available: true },
  { id: "p14", name: "Coca-Cola", khName: "កូកាកូឡាត្រជាក់", category: "drinks", price: 1.00, rating: 4.5, desc: "ភេសជ្ជៈកំប៉ុងត្រជាក់ ស្រស់ស្រាយ", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80", available: true },
  { id: "p15", name: "Orange Juice", khName: "ទឹកក្រូចច្របាច់", category: "drinks", price: 1.50, rating: 4.6, desc: "ទឹកក្រូចច្របាច់ស្រស់ៗ គ្មានជាតិស្ករគីមី", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80", available: true },
  { id: "p16", name: "Iced Coffee", khName: "កាហ្វេទឹកដោះគោទឹកកក", category: "drinks", price: 1.50, rating: 4.9, desc: "កាហ្វេដិតដល់ចិត្ត រសជាតិខ្មែរបុរាណ", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80", available: true }
];

// Initialize LocalStorage Data
function initDB() {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify([]));
  }
  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", JSON.stringify([]));
  }
}
initDB();

// Global Toast Utility
function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Global Nav & Menu Interactions
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }
});
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

    // UI Loading state
    const submitBtn = document.getElementById("btn-submit-order");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnSpinner = submitBtn.querySelector(".btn-spinner");

    submitBtn.disabled = true;
    if (btnSpinner) btnSpinner.style.display = "inline-block";
    if (btnText) btnText.textContent = "កំពុងដំណើរការ...";

    // Generate Order ID (Format: CF + YYYYMMDD + Random 3 Digits)
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomId = Math.floor(100 + Math.random() * 900);
    const orderId = `CF${dateStr}${randomId}`;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryMethod === "delivery" ? 1.00 : 0.00;

    const newOrder = {
      orderId: orderId,
      customerName: name,
      phone: phone,
      address: deliveryMethod === "delivery" ? address : "Pick Up at Store",
      notes: notes,
      deliveryMethod: deliveryMethod,
      paymentMethod: paymentMethod,
      items: cart,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: subtotal + deliveryFee,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.unshift(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.setItem("cart", JSON.stringify([]));

    // Redirect to success screen
    setTimeout(() => {
      window.location.href = `order-success.html?orderId=${orderId}`;
    }, 500);
  });
}