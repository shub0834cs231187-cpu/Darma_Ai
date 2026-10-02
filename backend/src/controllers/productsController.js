const Product = require("../models/Product");
const { createHttpError } = require("../utils/request");
const { searchProductWithGemini } = require("../utils/gemini");
const { skincareCatalog } = require("../data/skincareCatalog");

function toProductSummary(product) {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    image_url: product.image_url,
    price: product.price,
    rating: product.rating,
    reviews_count: product.reviews_count,
    safe_ingredients: product.safe_ingredients,
    acne_triggers: product.acne_triggers,
    comedogenic_score: product.comedogenic_score,
    source: "catalog",
  };
}

function productKey(product) {
  return `${product.brand}`.toLowerCase() + ":" + `${product.name}`.toLowerCase();
}

async function searchProducts(req, res) {
  const q = String(req.query.q || "");
  const page = Number(req.query.page || 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedQuery, "i");
  const products = await Product.find({
    $or: [{ name: regex }, { brand: regex }],
  })
    .skip(skip)
    .limit(limit);

  const databaseItems = products.map(toProductSummary);
  const databaseKeys = new Set(databaseItems.map(productKey));
  const catalogueItems = skincareCatalog
    .filter((product) => !databaseKeys.has(productKey(product)))
    .filter((product) => !q.trim() || regex.test(product.name) || regex.test(product.brand))
    .map((product) => ({ ...product, source: "catalog" }));
  const items = [...databaseItems, ...catalogueItems].slice(0, limit);
  // Gemini is only used for a named product missing from our own catalogue.
  if (q.trim() && items.length === 0) {
    const generatedProduct = await searchProductWithGemini(q);
    if (generatedProduct) items.push(generatedProduct);
  }

  res.json({
    items,
    page,
  });
}

async function getProduct(req, res) {
  const product = await Product.findOne({ id: req.params.product_id });
  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  res.json({
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    image_url: product.image_url,
    price: product.price,
    rating: product.rating,
    reviews_count: product.reviews_count,
    ingredients: product.ingredients,
    safe_ingredients: product.safe_ingredients,
    acne_triggers: product.acne_triggers,
    comedogenic_score: product.comedogenic_score,
  });
}

async function analyzeProduct(req, res) {
  const product = await Product.findOne({ id: req.params.product_id });
  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  res.json({
    product_id: product.id,
    safe_ingredients: product.safe_ingredients,
    acne_triggers: product.acne_triggers,
    comedogenic_score: product.comedogenic_score,
    recommendation: "Suitable for your skin type",
  });
}

async function getSimilarProducts(req, res) {
  const product = await Product.findOne({ id: req.params.product_id });
  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  const similar = await Product.find({
    brand: product.brand,
    id: { $ne: product.id },
  }).limit(5);

  res.json({
    items: similar.map((item) => ({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      rating: item.rating,
      image_url: item.image_url,
    })),
  });
}

module.exports = {
  searchProducts,
  getProduct,
  analyzeProduct,
  getSimilarProducts,
};
