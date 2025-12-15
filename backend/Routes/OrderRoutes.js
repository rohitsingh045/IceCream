const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../Middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getAdminOrders,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
} = require("../Controller/OrderController");

// user creates order
router.post("/", protect, createOrder);

// user sees own orders
router.get("/", protect, getOrders);

// user cancels own order (only if pending)
router.patch("/:id/cancel", protect, cancelOrder);

// admin sees all orders
router.get("/admin/all", protect, authorize("admin"), getAdminOrders);

// admin deletes order
router.delete("/:id", protect, authorize("admin"), deleteOrder);

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