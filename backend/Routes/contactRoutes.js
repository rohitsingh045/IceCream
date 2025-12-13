const express = require("express");
const router = express.Router();
const { submitContactForm } = require("../Controller/ContactController");

// POST /api/contact
router.post("/", submitContactForm);

module.exports = router;