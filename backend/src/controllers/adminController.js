const User = require("../models/User");
const Product = require("../models/Product");
const FAQ = require("../models/FAQ");

async function getAnalytics(_req, res) {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  res.json({
    total_users: totalUsers,
    total_products: totalProducts,
    active_users: totalUsers * 0.7,
    revenue: 50000,
  });
}

async function getUsers(req, res) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const skip = (page - 1) * limit;
  const users = await User.find({}).skip(skip).limit(limit);

  res.json({
    items: users.map((user) => ({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      subscription_plan: user.subscription_plan,
      created_at: user.created_at,
    })),
  });
}

async function updateUser(req, res) {
  const user = await User.findOne({ id: req.params.user_id });
  if (user) {
    Object.assign(user, req.body);
    await user.save();
  }

  res.json({ message: "User updated" });
}

async function deleteUser(req, res) {
  await User.findOneAndDelete({ id: req.params.user_id });
  res.json({ message: "User deleted" });
}

async function getProducts(req, res) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const skip = (page - 1) * limit;
  const products = await Product.find({}).skip(skip).limit(limit);

  res.json({
    items: products.map((product) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      rating: product.rating,
    })),
  });
}

async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.json({ id: product.id });
}

async function updateProduct(req, res) {
  const product = await Product.findOne({ id: req.params.product_id });
  if (product) {
    Object.assign(product, req.body);
    await product.save();
  }

  res.json({ message: "Product updated" });
}

async function deleteProduct(req, res) {
  await Product.findOneAndDelete({ id: req.params.product_id });
  res.json({ message: "Product deleted" });
}

async function getFaqs(_req, res) {
  const faqs = await FAQ.find({});
  res.json({
    items: faqs.map((faq) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    })),
  });
}

async function createFaq(req, res) {
  const faq = await FAQ.create(req.body);
  res.json({ id: faq.id });
}

async function updateFaq(req, res) {
  const faq = await FAQ.findOne({ id: req.params.faq_id });
  if (faq) {
    Object.assign(faq, req.body);
    await faq.save();
  }
  res.json({ message: "FAQ updated" });
}

async function deleteFaq(req, res) {
  await FAQ.findOneAndDelete({ id: req.params.faq_id });
  res.json({ message: "FAQ deleted" });
}

module.exports = {
  getAnalytics,
  getUsers,
  updateUser,
  deleteUser,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
};
