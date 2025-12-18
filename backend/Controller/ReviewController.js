const Review = require("../models/reviewModel");

// Add or update a review
async function addReview(req, res) {
  try {
    const { productId, productName, rating, review } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Product ID and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user._id,
      productId,
    });

    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.review = review || "";
      existingReview.productName = productName || existingReview.productName;
      await existingReview.save();

      return res.json({
        success: true,
        message: "Review updated successfully",
        review: existingReview,
      });
    }

    // Create new review
    const newReview = await Review.create({
      user: req.user._id,
      productId,
      productName: productName || "Ice Cream",
      rating,
      review: review || "",
      userName: req.user.name,
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add review",
    });
  }
}

// Get reviews for a product
async function getProductReviews(req, res) {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 })
      .limit(50);

    // Calculate average rating
    const totalReviews = reviews.length;
    const avgRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    return res.json({
      success: true,
      reviews,
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
}

// Get average ratings for multiple products
async function getProductRatings(req, res) {
  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({
        success: false,
        message: "Product IDs array is required",
      });
    }

    const ratings = await Review.aggregate([
      { $match: { productId: { $in: productIds } } },
      {
        $group: {
          _id: "$productId",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    // Convert to object for easy lookup
    const ratingsMap = {};
    ratings.forEach((r) => {
      ratingsMap[r._id] = {
        averageRating: Math.round(r.averageRating * 10) / 10,
        totalReviews: r.totalReviews,
      };
    });

    return res.json({
      success: true,
      ratings: ratingsMap,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch ratings",
    });
  }
}

// Get top rated products
async function getTopRatedProducts(req, res) {
  try {
    const topRated = await Review.aggregate([
      {
        $group: {
          _id: "$productId",
          productName: { $first: "$productName" },
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
      { $match: { totalReviews: { $gte: 1 } } }, // At least 1 review
      { $sort: { averageRating: -1, totalReviews: -1 } },
      { $limit: 10 },
    ]);

    return res.json({
      success: true,
      topRated: topRated.map((p) => ({
        productId: p._id,
        productName: p.productName,
        averageRating: Math.round(p.averageRating * 10) / 10,
        totalReviews: p.totalReviews,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch top rated products",
    });
  }
}

// Get user's review for a product
async function getUserReview(req, res) {
  try {
    const { productId } = req.params;

    const review = await Review.findOne({
      user: req.user._id,
      productId,
    });

    return res.json({
      success: true,
      review: review || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch review",
    });
  }
}

// Delete a review
async function deleteReview(req, res) {
  try {
    const { productId } = req.params;

    const review = await Review.findOneAndDelete({
      user: req.user._id,
      productId,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
}

module.exports = {
  addReview,
  getProductReviews,
  getProductRatings,
  getTopRatedProducts,
  getUserReview,
  deleteReview,
};
