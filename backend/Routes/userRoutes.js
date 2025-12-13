const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getAllUsers,
} = require("../Controller/UserController");
const { protect, authorize } = require("../Middleware/authMiddleware");

router.post("/login", loginUser);
router.post("/register", registerUser);

// admin – list all users
router.get("/admin/all", protect, authorize("admin"), getAllUsers);

module.exports = router;