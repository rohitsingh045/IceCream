const express = require("express");
const router = express.Router();
const { protect } = require("../Middleware/authMiddleware");
const {
  addReview,
  getProductReviews,
  getProductRatings,
  getTopRatedProducts,
  getUserReview,
  deleteReview,
} = require("../Controller/ReviewController");

// Public routes
router.get("/product/:productId", getProductReviews);
router.get("/top-rated", getTopRatedProducts);
router.post("/ratings", getProductRatings);

// Protected routes (require login)
router.post("/", protect, addReview);
router.get("/user/:productId", protect, getUserReview);
router.delete("/:productId", protect, deleteReview);

module.exports = router;
