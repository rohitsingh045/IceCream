// filepath: c:\Users\rohit\OneDrive\Desktop\ICE\backend\Controller\OrderController.js
const Order = require("../models/OrderModels");
const {
  sendOrderNotificationToAdmin,
  sendOrderConfirmationToCustomer,
  sendOrderStatusEmail,
} = require("../services/emailService");
const {
  sendOrderStatusNotification,
  sendNewOrderNotificationToAdmin,
  sendOrderConfirmationNotification,
} = require("../services/notificationService");

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

    // Send notifications (do not block request)
    // Email notifications
    sendOrderNotificationToAdmin(order).catch(() => {});
    sendOrderConfirmationToCustomer(order).catch(() => {});
    
    // WhatsApp & SMS notifications
    sendNewOrderNotificationToAdmin(order).catch(() => {});
    sendOrderConfirmationNotification(order).catch(() => {});

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error while creating order" });
  }
}

// USER: get own orders
async function getOrders(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json({ success: true, orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error fetching orders", error: error.message });
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

    // Prevent admin from changing user-cancelled orders
    if (order.cancelledBy === "user") {
      return res.status(400).json({
        success: false,
        message: "This order was cancelled by the user and cannot be modified",
      });
    }

    order.orderStatus = status;
    
    // Track who cancelled if status is cancelled
    if (status === "cancelled") {
      order.cancelledBy = "admin";
    }
    
    await order.save();

    // Send notifications (do not block request)
    // Email notification
    sendOrderStatusEmail(order).catch(() => {});
    
    // WhatsApp & SMS notifications
    sendOrderStatusNotification(order).catch(() => {});

    return res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update order status" });
  }
}

// USER: cancel own order (only if pending)
async function cancelOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Check if the order belongs to the user
    if (order.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to cancel this order" });
    }

    // Only allow cancellation if order is pending
    if (order.orderStatus.toLowerCase() !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled. It has already been confirmed by the admin.",
      });
    }

    order.orderStatus = "cancelled";
    order.cancelledBy = "user";
    await order.save();

    // Send notifications (do not block request)
    // Email notification
    sendOrderStatusEmail(order).catch(() => {});
    
    // WhatsApp & SMS notifications
    sendOrderStatusNotification(order).catch(() => {});

    return res.json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to cancel order" });
  }
}

// ADMIN: delete order
async function deleteOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await Order.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete order" });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getAdminOrders,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
};