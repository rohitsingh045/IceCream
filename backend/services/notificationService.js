const axios = require("axios");

/**
 * WhatsApp Notification Service
 * Using WhatsApp Business API or services like Twilio, MSG91, etc.
 * 
 * To enable WhatsApp notifications, set these environment variables:
 * - WHATSAPP_API_URL: The API endpoint (e.g., https://api.msg91.com/api/v5/whatsapp/send)
 * - WHATSAPP_API_KEY: Your API key
 * - WHATSAPP_SENDER_ID: Your WhatsApp Business number
 */

async function sendWhatsAppMessage(phone, message) {
  // Check if WhatsApp is configured
  if (!process.env.WHATSAPP_API_URL || !process.env.WHATSAPP_API_KEY) {
    // WhatsApp not configured, skip
    return { success: false, reason: "WhatsApp not configured" };
  }

  try {
    // Clean phone number (remove spaces, dashes, and ensure country code)
    let cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    if (!cleanPhone.startsWith("+")) {
      cleanPhone = "+91" + cleanPhone; // Default to India
    }
    if (cleanPhone.startsWith("+")) {
      cleanPhone = cleanPhone.substring(1); // Remove + for API
    }

    // MSG91 WhatsApp API format (you can modify for other providers)
    const response = await axios.post(
      process.env.WHATSAPP_API_URL,
      {
        integrated_number: process.env.WHATSAPP_SENDER_ID,
        content_type: "text",
        payload: {
          to: cleanPhone,
          type: "text",
          text: {
            body: message,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          authkey: process.env.WHATSAPP_API_KEY,
        },
      }
    );

    return { success: true, response: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * SMS Notification Service
 * Using Fast2SMS or MSG91 (popular in India)
 * 
 * To enable SMS notifications, set these environment variables:
 * - SMS_API_URL: The API endpoint (e.g., https://www.fast2sms.com/dev/bulkV2)
 * - SMS_API_KEY: Your API key
 * - SMS_SENDER_ID: Your sender ID (optional)
 */

async function sendSMS(phone, message) {
  // Check if SMS is configured
  if (!process.env.SMS_API_URL || !process.env.SMS_API_KEY) {
    // SMS not configured, skip
    return { success: false, reason: "SMS not configured" };
  }

  try {
    // Clean phone number
    let cleanPhone = phone.replace(/[\s\-\(\)\+]/g, "");
    // Remove country code if present for Indian numbers
    if (cleanPhone.startsWith("91") && cleanPhone.length > 10) {
      cleanPhone = cleanPhone.substring(2);
    }

    // Fast2SMS API format (modify for other providers)
    const response = await axios.post(
      process.env.SMS_API_URL,
      {
        route: "q", // Quick SMS route
        message: message,
        language: "english",
        flash: 0,
        numbers: cleanPhone,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: process.env.SMS_API_KEY,
        },
      }
    );

    return { success: true, response: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Send order status notification via WhatsApp and SMS
 */
async function sendOrderStatusNotification(order) {
  const phone = order?.shippingAddress?.phone;
  if (!phone) return;

  const customerName = order.shippingAddress.fullName;
  const orderId = order._id.toString().slice(-8);
  const status = (order.orderStatus || "").toLowerCase();
  const total = order.totalAmount;

  let statusMessage;
  let emoji;

  switch (status) {
    case "confirmed":
    case "accepted":
      emoji = "✅";
      statusMessage = `आपका ऑर्डर confirm हो गया है! हम जल्द ही आपका order prepare करेंगे।\nYour order has been confirmed and is being prepared.`;
      break;
    case "processing":
      emoji = "🔄";
      statusMessage = `आपका ऑर्डर prepare हो रहा है!\nYour order is being processed.`;
      break;
    case "shipped":
      emoji = "🚚";
      statusMessage = `आपका ऑर्डर dispatch हो गया है! जल्द ही आपके पास पहुंचेगा।\nYour order has been shipped and is on the way!`;
      break;
    case "delivered":
      emoji = "🎉";
      statusMessage = `आपका ऑर्डर deliver हो गया है! Enjoy your ice cream! 🍦\nYour order has been delivered. Thank you for ordering!`;
      break;
    case "cancelled":
    case "rejected":
      emoji = "❌";
      statusMessage = `आपका ऑर्डर cancel कर दिया गया है। किसी भी सवाल के लिए हमसे संपर्क करें।\nYour order has been cancelled. Please contact us for any queries.`;
      break;
    default:
      emoji = "📦";
      statusMessage = `आपके ऑर्डर का status update: ${order.orderStatus}`;
  }

  const message = `${emoji} *Namaste Bharat Ice Cream*

नमस्ते ${customerName}! 🙏

Order ID: #${orderId}
Status: *${order.orderStatus.toUpperCase()}*
Total: ₹${total}

${statusMessage}

📞 Contact: +91 9931584900
🌐 www.namastebharaticecream.com

धन्यवाद! Thank you for choosing us! 🍨`;

  // Send both WhatsApp and SMS (don't block, run in parallel)
  const results = await Promise.allSettled([
    sendWhatsAppMessage(phone, message),
    sendSMS(phone, message.replace(/\*/g, "")), // Remove markdown for SMS
  ]);

  return {
    whatsapp: results[0].status === "fulfilled" ? results[0].value : { success: false },
    sms: results[1].status === "fulfilled" ? results[1].value : { success: false },
  };
}

/**
 * Send new order notification to admin via WhatsApp
 */
async function sendNewOrderNotificationToAdmin(order) {
  const adminPhone = process.env.ADMIN_PHONE || process.env.WHATSAPP_ADMIN_NUMBER;
  if (!adminPhone) return;

  const customerName = order.shippingAddress.fullName;
  const customerPhone = order.shippingAddress.phone;
  const orderId = order._id.toString().slice(-8);
  const total = order.totalAmount;
  const itemCount = order.items.length;

  const message = `🆕 *New Order Received!*

Order ID: #${orderId}
Customer: ${customerName}
Phone: ${customerPhone}
Items: ${itemCount} items
Total: ₹${total}
Payment: ${order.paymentMethod.toUpperCase()}

📍 Address:
${order.shippingAddress.address}
${order.shippingAddress.city}, ${order.shippingAddress.state}
PIN: ${order.shippingAddress.pincode}

Please check admin dashboard to process this order.`;

  return await sendWhatsAppMessage(adminPhone, message);
}

/**
 * Send order confirmation to customer when order is placed
 */
async function sendOrderConfirmationNotification(order) {
  const phone = order?.shippingAddress?.phone;
  if (!phone) return;

  const customerName = order.shippingAddress.fullName;
  const orderId = order._id.toString().slice(-8);
  const total = order.totalAmount;

  const message = `🍦 *Namaste Bharat Ice Cream*

नमस्ते ${customerName}! 🙏

आपका ऑर्डर successfully place हो गया है! ✅

Order ID: #${orderId}
Total: ₹${total}
Payment: ${order.paymentMethod.toUpperCase()}

हम जल्द ही आपके ऑर्डर को confirm करेंगे और आपको notify करेंगे।

We will confirm your order soon and notify you.

📞 Helpline: +91 9931584900

धन्यवाद! Thank you! 🍨`;

  const results = await Promise.allSettled([
    sendWhatsAppMessage(phone, message),
    sendSMS(phone, message.replace(/\*/g, "")),
  ]);

  return {
    whatsapp: results[0].status === "fulfilled" ? results[0].value : { success: false },
    sms: results[1].status === "fulfilled" ? results[1].value : { success: false },
  };
}

module.exports = {
  sendWhatsAppMessage,
  sendSMS,
  sendOrderStatusNotification,
  sendNewOrderNotificationToAdmin,
  sendOrderConfirmationNotification,
};
