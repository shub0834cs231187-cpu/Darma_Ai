const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const blogSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4, unique: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    image_url: { type: String, default: "" },
    category: { type: String, default: "" },
    author: { type: String, default: "" },
    published_at: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
