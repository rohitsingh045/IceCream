const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/ProductController');
const { protect, authorize } = require('../Middleware/authMiddleware');

// Public routes
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

// Admin only routes
router.post('/admin/create', protect, authorize('admin'), ProductController.createProduct);
router.put('/admin/:id', protect, authorize('admin'), ProductController.updateProduct);
router.delete('/admin/:id', protect, authorize('admin'), ProductController.deleteProduct);

module.exports = router;