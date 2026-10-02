const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const controller = require("../controllers/blogController");

const router = express.Router();

router.get("/categories", asyncHandler(controller.getCategories));
router.get("/", asyncHandler(controller.getBlogs));
router.get("/:slug", asyncHandler(controller.getBlog));

module.exports = router;
