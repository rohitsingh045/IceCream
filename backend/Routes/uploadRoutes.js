const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { protect, authorize } = require("../Middleware/authMiddleware");

const router = express.Router();

// Use memory storage so we can stream directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @desc    Upload a product image to Cloudinary
// @route   POST /api/upload/product-image
// @access  Private/Admin
router.post(
  "/product-image",
  protect,
  authorize("admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file uploaded",
        });
      }

      const uploadFromBuffer = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "namaste-bharat-products",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          stream.end(fileBuffer);
        });
      };

      const result = await uploadFromBuffer(req.file.buffer);

      return res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        url: result.secure_url,
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).json({
        success: false,
        message: "Error uploading image",
        error: error.message,
      });
    }
  }
);

module.exports = router;
