const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");
const Product = require("../models/Product");
const Blog = require("../models/Blog");
const FAQ = require("../models/FAQ");
const { hashPassword } = require("./password");

dotenv.config();

async function seed() {
  await connectDB();

  const existingUser = await User.findOne({ email: "user@example.com" });
  if (existingUser) {
    console.log("Database already seeded");
    process.exit(0);
  }

  await User.insertMany([
    {
      id: "demo-user",
      email: "user@example.com",
      first_name: "John",
      last_name: "Doe",
      password_hash: await hashPassword("password123"),
      subscription_plan: "pro",
      is_verified: true,
    },
    {
      email: "admin@example.com",
      first_name: "Admin",
      last_name: "User",
      password_hash: await hashPassword("admin123"),
      subscription_plan: "enterprise",
      is_verified: true,
      role: "admin",
    },
  ]);

  await Product.insertMany([
    {
      name: "Hydrating Cleanser",
      brand: "CeraVe",
      description: "Gentle hydrating facial cleanser",
      image_url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
      price: 12.99,
      rating: 4.5,
      reviews_count: 250,
      safe_ingredients: ["water", "glycerin", "ceramide"],
      acne_triggers: [],
      comedogenic_score: 1.0,
    },
    {
      name: "Retinol Night Cream",
      brand: "The Ordinary",
      description: "Powerful retinol treatment cream",
      image_url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500",
      price: 8.99,
      rating: 4.2,
      reviews_count: 180,
      safe_ingredients: ["retinol", "squalane"],
      acne_triggers: ["potential_irritant"],
      comedogenic_score: 2.0,
    },
    {
      name: "Oil-Free Moisturizer",
      brand: "Neutrogena",
      description: "Lightweight non-comedogenic moisturizer",
      image_url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500",
      price: 9.99,
      rating: 4.1,
      reviews_count: 320,
      safe_ingredients: ["glycerin", "water"],
      acne_triggers: [],
      comedogenic_score: 0.5,
    },
    {
      name: "Foaming Facial Cleanser",
      brand: "CeraVe",
      description: "A gentle gel cleanser formulated for normal-to-oily skin.",
      price: 14.99,
      rating: 4.4,
      reviews_count: 410,
      safe_ingredients: ["niacinamide", "ceramides", "hyaluronic acid"],
      acne_triggers: ["can be drying for very dry skin"],
      comedogenic_score: 1,
    },
    {
      name: "Hyaluronic Acid 2% + B5",
      brand: "The Ordinary",
      description: "A lightweight hydration serum with hyaluronic acid and vitamin B5.",
      price: 10.9,
      rating: 4.3,
      reviews_count: 680,
      safe_ingredients: ["hyaluronic acid", "panthenol", "glycerin"],
      acne_triggers: [],
      comedogenic_score: 0,
    },
    {
      name: "Niacinamide 10% + Zinc 1%",
      brand: "The Ordinary",
      description: "A water-based serum commonly used to support oil balance and uneven-looking texture.",
      price: 6.5,
      rating: 4.2,
      reviews_count: 905,
      safe_ingredients: ["niacinamide", "zinc PCA"],
      acne_triggers: ["may irritate sensitive skin at higher concentrations"],
      comedogenic_score: 0,
    },
    {
      name: "Anthelios Invisible Fluid SPF 50+",
      brand: "La Roche-Posay",
      description: "Broad-spectrum facial sunscreen with a lightweight fluid texture.",
      price: 29.99,
      rating: 4.5,
      reviews_count: 540,
      safe_ingredients: ["broad-spectrum UV filters", "vitamin E"],
      acne_triggers: ["some sunscreen filters can sting sensitive eyes"],
      comedogenic_score: 1,
    },
    {
      name: "Daily Facial Moisturizing Lotion SPF 30",
      brand: "CeraVe",
      description: "Daily moisturizer with ceramides, hyaluronic acid, and broad-spectrum sun protection.",
      price: 16.99,
      rating: 4.3,
      reviews_count: 370,
      safe_ingredients: ["ceramides", "hyaluronic acid", "niacinamide"],
      acne_triggers: ["may feel heavy on very oily skin"],
      comedogenic_score: 2,
    },
  ]);

  await Blog.insertMany([
    {
      title: "10 Tips for Glowing Skin",
      slug: "10-tips-for-glowing-skin",
      content: "<p>Skincare is more than just a routine...</p>",
      excerpt: "Learn the best practices for achieving radiant, glowing skin.",
      image_url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
      category: "skincare",
      author: "Dr. Sarah Mitchell",
      views: 0,
    },
    {
      title: "Understanding Your Skin Type",
      slug: "understanding-your-skin-type",
      content: "<p>There are five main skin types...</p>",
      excerpt: "Discover your skin type and learn how to care for it properly.",
      image_url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
      category: "education",
      author: "Dr. James Wilson",
      views: 0,
    },
  ]);

  await FAQ.insertMany([
    {
      question: "How often should I use the skin analysis?",
      answer: "We recommend using the skin analysis every 4-6 weeks to track your skin's progress.",
    },
    {
      question: "Is my data private?",
      answer: "Yes, we use enterprise-grade encryption and comply with GDPR and HIPAA regulations.",
    },
  ]);

  console.log("Database seeded successfully");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Failed to seed database:", error);
  process.exit(1);
});
