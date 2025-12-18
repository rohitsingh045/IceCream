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
  // Email service not configured
}

async function sendEmail({ to, subject, html }) {
  if (!transporter) {
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
  let subject;
  let extraContent = "";

  if (status === "confirmed" || status === "accepted") {
    subject = `Order Confirmed! #${order._id.toString().slice(-8)} 🎉`;
    line = "Great news! Your order has been confirmed and is being prepared with love.";
  } else if (status === "rejected" || status === "cancelled") {
    subject = `Order Cancelled #${order._id.toString().slice(-8)}`;
    line = "Unfortunately your order has been cancelled. Please contact support if you have questions.";
  } else if (status === "shipped") {
    subject = `Your Order is on the Way! #${order._id.toString().slice(-8)} 🚚`;
    line = "Exciting news! Your delicious ice cream is on its way to you!";
  } else if (status === "delivered") {
    subject = `Order Delivered! Thank You for Ordering 🍦❤️`;
    line = "Your order has been delivered successfully!";
    extraContent = `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; text-align: center; margin: 20px 0;">
        <h2 style="color: white; margin: 0; font-size: 28px;">🎉 Thank You! 🎉</h2>
        <p style="color: white; font-size: 18px; margin: 15px 0;">We hope you enjoy your delicious ice cream!</p>
        <p style="color: #f0f0f0; font-size: 14px;">Your happiness is our priority. See you again soon!</p>
      </div>

      <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
        <p style="margin: 0; color: #856404; font-size: 16px;">
          🌟 <strong>Loved our ice cream?</strong> Share your experience with friends and family! 🌟
        </p>
      </div>
    `;
  } else {
    subject = `Order #${order._id.toString().slice(-8)} – ${order.orderStatus}`;
    line = `Your order status is now: ${order.orderStatus}.`;
  }

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #ff6b9d 0%, #ffc3a0 100%); padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 32px;">🍦 Namaste Bharat</h1>
        <p style="color: white; margin: 5px 0 0 0; font-size: 14px;">Premium Ice Cream</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0;">Hi ${order.shippingAddress.fullName}! 👋</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">${line}</p>
        
        ${extraContent}

        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="margin: 5px 0; color: #333;"><strong>Order ID:</strong> #${order._id.toString().slice(-8)}</p>
          <p style="margin: 5px 0; color: #333;"><strong>Total:</strong> ₹${order.totalAmount}</p>
          <p style="margin: 5px 0; color: #333;"><strong>Payment:</strong> ${order.paymentMethod.toUpperCase()}</p>
        </div>

        <h3 style="color: #333; border-bottom: 2px solid #ff6b9d; padding-bottom: 10px;">🛒 Items Ordered</h3>
        <ul style="padding-left: 20px;">
          ${order.items.map((item) => `<li style="color: #555; margin: 8px 0;">${item.name} × ${item.quantity} – ₹${item.price}</li>`).join("")}
        </ul>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 14px; margin: 5px 0;">With love from</p>
          <p style="color: #ff6b9d; font-size: 20px; font-weight: bold; margin: 5px 0;">Namaste Bharat Ice Cream 🍨</p>
          <p style="color: #888; font-size: 12px; margin: 15px 0;">📞 +91 9931584900 | 📍 Konhwa More, Gopalganj, Bihar</p>
        </div>
      </div>
    </div>
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