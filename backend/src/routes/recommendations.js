const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { authenticateOptional } = require("../middleware/auth");
const controller = require("../controllers/recommendationsController");

const router = express.Router();

router.use(authenticateOptional);
router.post("/generate", asyncHandler(controller.generateRecommendationsEndpoint));
router.get("/", asyncHandler(controller.getRecommendations));
router.get("/routine", asyncHandler(controller.getSkinRoutine));

module.exports = router;
