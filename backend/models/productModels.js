const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['Ice Cream', 'Kulfi', 'Cones', 'Cups', 'Sundaes', 'Family Packs', 'Special', 'Vanilla', 'Chocolate', 'Mango', 'Strawberry'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: 0,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=Product+Image',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    description: {
      type: String,
      default: '',
    },
    flavors: {
      type: [String],
      default: [],
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    // Where to display this product in the frontend (home, specials, or products list)
    displaySection: {
      type: String,
      enum: ['home', 'specials', 'products'],
      default: 'products',
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);