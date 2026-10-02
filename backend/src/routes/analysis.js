const express = require("express");
const multer = require("multer");
const asyncHandler = require("../middleware/asyncHandler");
const { authenticateOptional, authenticateRequired } = require("../middleware/auth");
const controller = require("../controllers/analysisController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authenticateOptional);
router.post("/chat", asyncHandler(controller.skinChat));
router.post("/upload", authenticateRequired, upload.single("file"), asyncHandler(controller.uploadImage));
router.post("/analyze", authenticateRequired, asyncHandler(controller.analyzeImage));
router.get("/history", authenticateRequired, asyncHandler(controller.getAnalysisHistory));
router.get("/:analysis_id", authenticateRequired, asyncHandler(controller.getAnalysis));
router.delete("/:analysis_id", authenticateRequired, asyncHandler(controller.deleteAnalysis));

module.exports = router;
