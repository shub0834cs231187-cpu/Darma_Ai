const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const subscriptionSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4, unique: true, index: true },
    user_id: { type: String, index: true, required: true },
    plan: { type: String, required: true },
    razorpay_subscription_id: { type: String, default: "" },
    status: { type: String, default: "inactive" },
    created_at: { type: Date, default: Date.now },
    expires_at: { type: Date, default: null },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
