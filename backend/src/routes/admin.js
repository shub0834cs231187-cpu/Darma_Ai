const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const controller = require("../controllers/adminController");

const router = express.Router();

router.get("/analytics", asyncHandler(controller.getAnalytics));
router.get("/users", asyncHandler(controller.getUsers));
router.put("/users/:user_id", asyncHandler(controller.updateUser));
router.delete("/users/:user_id", asyncHandler(controller.deleteUser));
router.get("/products", asyncHandler(controller.getProducts));
router.post("/products", asyncHandler(controller.createProduct));
router.put("/products/:product_id", asyncHandler(controller.updateProduct));
router.delete("/products/:product_id", asyncHandler(controller.deleteProduct));
router.get("/faq", asyncHandler(controller.getFaqs));
router.post("/faq", asyncHandler(controller.createFaq));
router.put("/faq/:faq_id", asyncHandler(controller.updateFaq));
router.delete("/faq/:faq_id", asyncHandler(controller.deleteFaq));

module.exports = router;
