const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../Middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getAdminOrders,
  updateOrderStatus,
} = require("../Controller/OrderController");

// user creates order
router.post("/", protect, createOrder);

// user sees own orders
router.get("/", protect, getOrders);

// admin sees all orders
router.get("/admin/all", protect, authorize("admin"), getAdminOrders);

// admin updates order status (URL used by your frontend)
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  updateOrderStatus
);

// (optional: you can keep this or remove if not used anywhere)
router.patch(
  "/admin/:id/status",
  protect,
  authorize("admin"),
  updateOrderStatus
);

module.exports = router;