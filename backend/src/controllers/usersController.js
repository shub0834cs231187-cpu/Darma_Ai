const User = require("../models/User");
const { getRequestUserId } = require("../utils/request");
const { uploadFileOrFallbackDataUrl } = require("../utils/uploads");

async function getProfile(req, res) {
  const userId = getRequestUserId(req);
  const user = await User.findOne({ id: userId });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  return res.json({
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
    subscription_plan: user.subscription_plan,
    created_at: user.created_at,
  });
}

async function updateProfile(req, res) {
  const userId = getRequestUserId(req);
  const user = await User.findOne({ id: userId });

  if (user) {
    const allowed = ["first_name", "last_name"];
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        user[key] = req.body[key];
      }
    }
    await user.save();
  }

  return res.json({ message: "Profile updated" });
}

async function updateAvatar(req, res) {
  const userId = getRequestUserId(req);
  const user = await User.findOne({ id: userId });
  if (!req.file) {
    return res.status(400).json({ detail: "File is required" });
  }

  const avatarUrl = await uploadFileOrFallbackDataUrl(req.file, "dermaai/avatars");
  if (user) {
    user.avatar = avatarUrl;
    await user.save();
  }

  return res.json({ avatar_url: avatarUrl });
}

async function getNotifications(_req, res) {
  return res.json({
    items: [
      { id: "1", message: "New product recommendation available", read: false },
      { id: "2", message: "Your skin analysis is ready", read: false },
    ],
  });
}

async function markNotificationAsRead(_req, res) {
  return res.json({ message: "Notification marked as read" });
}

module.exports = {
  getProfile,
  updateProfile,
  updateAvatar,
  getNotifications,
  markNotificationAsRead,
};
