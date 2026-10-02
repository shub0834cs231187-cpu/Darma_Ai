const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const controller = require("../controllers/productsController");

const router = express.Router();

router.get("/search", asyncHandler(controller.searchProducts));
router.get("/:product_id", asyncHandler(controller.getProduct));
router.post("/:product_id/analyze", asyncHandler(controller.analyzeProduct));
router.get("/:product_id/similar", asyncHandler(controller.getSimilarProducts));

module.exports = router;
