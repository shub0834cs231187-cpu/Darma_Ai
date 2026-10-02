const Blog = require("../models/Blog");

async function getCategories(_req, res) {
  const categories = await Blog.distinct("category");
  res.json(categories.filter(Boolean));
}

async function getBlogs(req, res) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const category = req.query.category;
  const skip = (page - 1) * limit;
  const query = category ? { category: String(category) } : {};

  const blogs = await Blog.find(query)
    .sort({ published_at: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    items: blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      image_url: blog.image_url,
      category: blog.category,
      author: blog.author,
      published_at: blog.published_at,
      views: blog.views,
    })),
    page,
    limit,
  });
}

async function getBlog(req, res) {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    return res.json({ error: "Blog not found" });
  }

  blog.views += 1;
  await blog.save();

  return res.json({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    excerpt: blog.excerpt,
    image_url: blog.image_url,
    category: blog.category,
    author: blog.author,
    published_at: blog.published_at,
    views: blog.views,
  });
}

module.exports = { getCategories, getBlogs, getBlog };
