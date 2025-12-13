const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    // use productSlug (string from frontend like "mango-kulfi-home")
    productSlug: {
      type: String,
      required: true,
    },
    name: { type: String, required: true }, // snapshot of product name
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }, // price at time of order
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    landmark: { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(v) => v.length > 0, "Order must have at least one item"],
    },

    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "upi", "card"],
      default: "cod",
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // main admin-controlled status
    orderStatus: {
      type: String,
      enum: [
        "pending",    // just placed
        "confirmed",  // accepted by admin
        "processing",
        "shipped",
        "delivered",
        "cancelled",  // rejected / cancelled
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);