const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const recommendationSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4, unique: true, index: true },
    user_id: { type: String, index: true, required: true },
    skin_type: { type: String, required: true },
    morning_routine: { type: [mongoose.Schema.Types.Mixed], default: [] },
    night_routine: { type: [mongoose.Schema.Types.Mixed], default: [] },
    weekly_routine: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);
