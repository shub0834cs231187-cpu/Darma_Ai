const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4, unique: true, index: true },
    name: { type: String, required: true, index: true },
    brand: { type: String, required: true, index: true },
    description: { type: String, default: "" },
    image_url: { type: String, default: "" },
    price: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews_count: { type: Number, default: 0 },
    ingredients: { type: mongoose.Schema.Types.Mixed, default: {} },
    acne_triggers: { type: [String], default: [] },
    safe_ingredients: { type: [String], default: [] },
    comedogenic_score: { type: Number, default: 0 },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Product", productSchema);
