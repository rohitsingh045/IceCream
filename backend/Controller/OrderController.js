// filepath: c:\Users\rohit\OneDrive\Desktop\ICE\backend\Controller\OrderController.js
const Order = require("../models/OrderModels");
const {
  sendOrderNotificationToAdmin,
  sendOrderConfirmationToCustomer,
  sendOrderStatusEmail,
} = require("../services/emailService");

// USER: create new order
async function createOrder(req, res) {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Order must have at least one item" });
    }

    if (!shippingAddress || !shippingAddress.fullName) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const order = await Order.create({
      user: req.user?._id,
      items: items.map((item) => ({
        productSlug: item.productSlug || item.product,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress,
      paymentMethod,
      totalAmount,
      orderStatus: "pending",
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
    });

    // emails (do not block request)
    sendOrderNotificationToAdmin(order).catch((err) =>
      console.error("Admin email error:", err.message)
    );
    sendOrderConfirmationToCustomer(order).catch((err) =>
      console.error("Customer email error:", err.message)
    );

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while creating order" });
  }
}

// USER: get own orders
async function getOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json({ success: true, orders });
  } catch (error) {
    console.error("Get user orders error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error fetching orders" });
  }
}

// ADMIN: get all orders
async function getAdminOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    console.error("Get admin orders error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error fetching orders" });
  }
}

// ADMIN: update order status
async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    // send automatic email to user
    sendOrderStatusEmail(order).catch((err) =>
      console.error("Order status email error:", err.message)
    );

    return res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update order status" });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getAdminOrders,
  updateOrderStatus,
};