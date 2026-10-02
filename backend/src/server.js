const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const analysisRoutes = require("./routes/analysis");
const productRoutes = require("./routes/products");
const recommendationRoutes = require("./routes/recommendations");
const blogRoutes = require("./routes/blog");
const contactRoutes = require("./routes/contact");
const paymentRoutes = require("./routes/payments");
const adminRoutes = require("./routes/admin");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: [frontendUrl, "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to DermaAI API",
    version: "1.0.0",
    docs: "/api-docs",
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/analysis", analysisRoutes);
app.use("/products", productRoutes);
app.use("/recommendations", recommendationRoutes);
app.use("/blog", blogRoutes);
app.use("/contact", contactRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT || 5000);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
