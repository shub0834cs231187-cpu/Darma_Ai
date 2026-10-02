const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { authenticateRequired } = require("../middleware/auth");
const controller = require("../controllers/authController");

const router = express.Router();

router.post("/register", asyncHandler(controller.register));
router.post("/login", asyncHandler(controller.login));
router.post("/google-login", asyncHandler(controller.googleLogin));
router.post("/verify-email", asyncHandler(controller.verifyEmail));
router.post("/forgot-password", asyncHandler(controller.forgotPassword));
router.post("/verify-password-reset-otp", asyncHandler(controller.verifyPasswordResetOtp));
router.post("/reset-password", asyncHandler(controller.resetPassword));
router.get("/me", authenticateRequired, asyncHandler(controller.me));
router.post("/logout", asyncHandler(controller.logout));

module.exports = router;
