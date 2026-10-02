const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const skinAnalysisSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4, unique: true, index: true },
    user_id: { type: String, index: true, required: true },
    image_url: { type: String, required: true },
    skin_score: { type: Number, required: true },
    hydration_score: { type: Number, required: true },
    acne_score: { type: Number, required: true },
    risk_score: { type: Number, required: true },
    skin_type: { type: String, required: true },
    conditions: { type: [String], default: [] },
    recommendations: { type: [String], default: [] },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

module.exports = mongoose.model("SkinAnalysis", skinAnalysisSchema);
