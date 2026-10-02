const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { authenticateOptional } = require("../middleware/auth");
const controller = require("../controllers/paymentsController");

const router = express.Router();

router.use(authenticateOptional);
router.post("/create-order", asyncHandler(controller.createOrder));
router.post("/verify", asyncHandler(controller.verifyPayment));
router.get("/subscription", asyncHandler(controller.getSubscription));

module.exports = router;
