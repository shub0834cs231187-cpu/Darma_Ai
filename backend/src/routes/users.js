const express = require("express");
const multer = require("multer");
const asyncHandler = require("../middleware/asyncHandler");
const { authenticateOptional } = require("../middleware/auth");
const controller = require("../controllers/usersController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authenticateOptional);
router.get("/profile", asyncHandler(controller.getProfile));
router.put("/profile", asyncHandler(controller.updateProfile));
router.post("/avatar", upload.single("file"), asyncHandler(controller.updateAvatar));
router.get("/notifications", asyncHandler(controller.getNotifications));
router.put("/notifications/:notification_id", asyncHandler(controller.markNotificationAsRead));

module.exports = router;
