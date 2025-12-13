// filepath: c:\Users\rohit\OneDrive\Desktop\ICE\backend\services\emailService.js
const nodemailer = require("nodemailer");

let transporter;

// create transporter only if env is set
if (
  process.env.EMAIL_HOST &&
  process.env.EMAIL_PORT &&
  process.env.EMAIL_USER &&
  process.env.EMAIL_PASS
) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} else {
  console.log("ℹ️ Email service not configured. Emails will not be sent.");
}

async function sendEmail({ to, subject, html }) {
  if (!transporter) {
    console.log("📧 [DEV] Email not sent (no transporter):", { to, subject });
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Namaste Bharat" <no-reply@example.com>`,
    to,
    subject,
    html,
  });
}

// NEW: specific helper for order status updates
async function sendOrderStatusEmail(order) {
  const email = order?.shippingAddress?.email;
  if (!email) return;

  const status = (order.orderStatus || "").toLowerCase();

  let line;
  if (status === "confirmed" || status === "accepted") {
    line = "Your order has been accepted and is being prepared.";
  } else if (status === "rejected" || status === "cancelled") {
    line = "Unfortunately your order has been rejected. Please contact support if you have questions.";
  } else if (status === "delivered") {
    line = "Your order has been delivered. Enjoy your ice cream!";
  } else {
    line = `Your order status is now: ${order.orderStatus}.`;
  }

  const subject = `Order #${order._id.toString().slice(-8)} – ${order.orderStatus}`;

  const html = `
    <h2>Namaste Bharat – Order Update</h2>
    <p>Hi ${order.shippingAddress.fullName},</p>
    <p>${line}</p>
    <p><strong>Order ID:</strong> #${order._id
      .toString()
      .slice(-8)}<br/>
       <strong>Total:</strong> ₹${order.totalAmount}<br/>
       <strong>Payment:</strong> ${order.paymentMethod.toUpperCase()}</p>

    <h3>Items</h3>
    <ul>
      ${order.items
        .map(
          (item) =>
            `<li>${item.name} × ${item.quantity} – ₹${item.price}</li>`
        )
        .join("")}
    </ul>

    <p>Thank you for ordering from Namaste Bharat Ice Cream.</p>
  `;

  await sendEmail({ to: email, subject, html });
}

// ✅ NEW: notify admin when a new order is created
async function sendOrderNotificationToAdmin(order) {
  const adminEmail =
    process.env.CONTACT_RECEIVER ||
    process.env.ADMIN_EMAIL ||
    process.env.EMAIL_USER;

  if (!adminEmail) return;

  const subject = `New order received #${order._id.toString().slice(-8)}`;

  const html = `
    <h2>New Order Received</h2>
    <p>Order ID: <strong>#${order._id.toString().slice(-8)}</strong></p>
    <p>Customer: <strong>${order.shippingAddress.fullName}</strong> (${order.shippingAddress.email})</p>
    <p>Total Amount: <strong>₹${order.totalAmount}</strong></p>
    <p>Payment Method: <strong>${order.paymentMethod.toUpperCase()}</strong></p>
    <h3>Items:</h3>
    <ul>
      ${order.items
        .map(
          (item) =>
            `<li>${item.name} × ${item.quantity} – ₹${item.price}</li>`
        )
        .join("")}
    </ul>
  `;

  await sendEmail({ to: adminEmail, subject, html });
}

// NEW: confirm order receipt to customer
async function sendOrderConfirmationToCustomer(order) {
  const email = order?.shippingAddress?.email;
  if (!email) return;

  const subject = `We received your order #${order._id.toString().slice(-8)}`;

  const html = `
    <h2>Namaste Bharat – Order Confirmation</h2>
    <p>Hi ${order.shippingAddress.fullName},</p>
    <p>Thank you for your order <strong>#${order._id
      .toString()
      .slice(-8)}</strong>. We have received it and will process it soon.</p>
    <p>Total Amount: <strong>₹${order.totalAmount}</strong></p>
    <p>Payment Method: <strong>${order.paymentMethod.toUpperCase()}</strong></p>

    <h3>Items:</h3>
    <ul>
      ${order.items
        .map(
          (item) =>
            `<li>${item.name} × ${item.quantity} – ₹${item.price}</li>`
        )
        .join("")}
    </ul>

    <p>We will notify you when the status of your order changes.</p>
    <p>— Namaste Bharat Ice Cream</p>
  `;

  await sendEmail({ to: email, subject, html });
}

module.exports = {
  sendEmail,
  sendOrderStatusEmail,
  sendOrderNotificationToAdmin,
  sendOrderConfirmationToCustomer, // 👈 export it
};