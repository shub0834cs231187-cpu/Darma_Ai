const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password_hash: { type: String, default: "" },
    avatar: { type: String, default: null },
    subscription_plan: { type: String, default: "free" },
    is_verified: { type: Boolean, default: false },
    role: { type: String, default: "user" },
    email_verification_token: { type: String, default: null },
    email_verification_expires: { type: Date, default: null },
    reset_password_token: { type: String, default: null },
    reset_password_expires: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", userSchema);
