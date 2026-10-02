const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const controller = require("../controllers/contactController");

const router = express.Router();

router.post("/", asyncHandler(controller.createContact));
router.get("/", asyncHandler(controller.getContacts));

module.exports = router;
