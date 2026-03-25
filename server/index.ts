import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  process.on('uncaughtException', err => console.error('Uncaught Exception:', err));
  process.on('unhandledRejection', err => console.error('Unhandled Rejection:', err));
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("/api/categories", async (_req, res) => {
    try {
      const { db, categories } = await import("./db.js");
      const allCategories = await db.select().from(categories);
      res.json(allCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/articles", async (_req, res) => {
    try {
      const { db, articles, authors, categories } = await import("./db.js");
      const allArticles = await db.select().from(articles);
      
      // For simplicity, returning articles with manual joins (or could use drizzle relational queries)
      // I'll fetch authors and categories to reconstruct the expected object type
      const allAuthors = await db.select().from(authors);
      const allCategories = await db.select().from(categories);

      const formattedArticles = allArticles.map(article => ({
        ...article,
        _id: article.id,
        featuredImage: { url: article.featuredImageUrl, alt: article.featuredImageAlt },
        author: allAuthors.find(a => a.id === article.authorId),
        category: allCategories.find(c => c.id === article.categoryId),
      }));

      // Sort by date descending
      formattedArticles.sort((a,b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      
      res.json(formattedArticles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const { db, articles } = await import("./db.js");
      const { title, excerpt, body, featuredImageUrl, featuredImageAlt, categoryId, featured } = req.body;
      let { authorId } = req.body;

      if (!authorId) {
        authorId = "author-sarah-johnson"; // Default author for simple admin
      }

      const id = nanoid();
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      await db.insert(articles).values({
        id,
        title,
        slug,
        excerpt,
        body,
        featuredImageUrl,
        featuredImageAlt,
        authorId,
        categoryId,
        publishedAt: new Date().toISOString(),
        featured: !!featured,
      });

      res.status(201).json({ success: true, id, slug });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create article" });
    }
  });

  app.delete("/api/articles/:id", async (req, res) => {
    try {
      const { db, articles } = await import("./db.js");
      const { id } = req.params;
      await db.delete(articles).where(eq(articles.id, id));
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete article" });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 5001;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
