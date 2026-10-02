const crypto = require("crypto");
const User = require("../models/User");
const { hashPassword, verifyPassword } = require("../utils/password");
const { createAccessToken } = require("../utils/jwt");
const { createHttpError } = require("../utils/request");
const { sendEmail } = require("../services/emailService");

function buildAuthResponse(user) {
  return {
    access_token: createAccessToken({ sub: user.id }),
    token_type: "bearer",
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar || undefined,
      subscription_plan: user.subscription_plan,
      is_verified: user.is_verified,
      created_at: user.created_at,
    },
  };
}

async function register(req, res) {
  const { email, first_name, last_name, password } = req.body;
  if (!email || !first_name || !last_name || !password) {
    throw createHttpError(400, "Missing required fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, "Email already registered");
  }

  const user = await User.create({
    email,
    first_name,
    last_name,
    password_hash: await hashPassword(password),
    is_verified: true,
  });

  res.json(buildAuthResponse(user));
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    throw createHttpError(401, "Invalid credentials");
  }

  res.json(buildAuthResponse(user));
}

async function googleLogin(req, res) {
  const payload = req.body || {};
  const tokenPayload =
    typeof payload.token === "object" && payload.token !== null ? payload.token : {};

  const email = payload.email || tokenPayload.email;
  const first_name = payload.first_name || tokenPayload.first_name || "";
  const last_name = payload.last_name || tokenPayload.last_name || "";

  if (!email) {
    throw createHttpError(400, "Email is required");
  }

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      email,
      first_name,
      last_name,
      password_hash: "",
      is_verified: true,
    });
  }

  res.json(buildAuthResponse(user));
}

async function me(req, res) {
  if (!req.user?.sub) {
    throw createHttpError(401, "Authentication credentials were not provided");
  }

  const user = await User.findOne({ id: req.user.sub });
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  res.json({
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
    subscription_plan: user.subscription_plan,
    is_verified: user.is_verified,
    created_at: user.created_at,
  });
}

async function logout(_req, res) {
  res.json({ message: "Logged out successfully" });
}

async function verifyEmail(req, res) {
  const { token } = req.body;
  if (!token) {
    throw createHttpError(400, "Token is required");
  }

  const user = await User.findOne({
    email_verification_token: token,
    email_verification_expires: { $gt: new Date() },
  });

  if (!user) {
    throw createHttpError(400, "Invalid or expired token");
  }

  user.is_verified = true;
  user.email_verification_token = null;
  user.email_verification_expires = null;
  await user.save();

  res.json({ message: "Email verified successfully" });
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  if (!email) {
    throw createHttpError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  if (user) {
    const otp = crypto.randomInt(100000, 1000000).toString();
    user.reset_password_token = crypto.createHash("sha256").update(otp).digest("hex");
    user.reset_password_expires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const emailSent = await sendEmail({
      to: user.email,
      subject: "DermaAI Password Reset Code",
      text: `Your DermaAI password reset code is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your DermaAI password reset code is:</p><p><strong>${otp}</strong></p><p>This code expires in 10 minutes.</p>`,
    });

    if (!emailSent) {
      user.reset_password_token = null;
      user.reset_password_expires = null;
      await user.save();
      throw createHttpError(503, "Email service is not configured");
    }
  }

  res.json({ message: "If the email exists, a verification code was sent" });
}

async function verifyPasswordResetOtp(req, res) {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw createHttpError(400, "Email and verification code are required");
  }

  const otpHash = crypto.createHash("sha256").update(String(otp)).digest("hex");
  const user = await User.findOne({
    email,
    reset_password_token: otpHash,
    reset_password_expires: { $gt: new Date() },
  });

  if (!user) {
    throw createHttpError(400, "Invalid or expired verification code");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.reset_password_token = resetToken;
  user.reset_password_expires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  res.json({ reset_token: resetToken });
}

async function resetPassword(req, res) {
  const { token, password } = req.body;
  if (!token || !password) {
    throw createHttpError(400, "Token and password are required");
  }

  const user = await User.findOne({
    reset_password_token: token,
    reset_password_expires: { $gt: new Date() },
  });

  if (!user) {
    throw createHttpError(400, "Invalid or expired token");
  }

  user.password_hash = await hashPassword(password);
  user.reset_password_token = null;
  user.reset_password_expires = null;
  await user.save();

  res.json({ message: "Password reset successful" });
}

module.exports = {
  register,
  login,
  googleLogin,
  me,
  logout,
  verifyEmail,
  forgotPassword,
  verifyPasswordResetOtp,
  resetPassword,
};
