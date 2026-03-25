import { db, categories, authors, articles, comments } from './db.js';
import { mockArticles, categories as mockCategories } from '../client/src/lib/mockData.js';

async function seed() {
  console.log('Seeding categories...');
  for (const cat of mockCategories) {
    await db.insert(categories).values({
      id: cat._id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || null,
    }).onConflictDoNothing();
  }

  console.log('Seeding authors and articles...');
  for (const article of mockArticles) {
    const authorId = `author-${article.author.name.replace(/\\s+/g, '-').toLowerCase()}`;
    await db.insert(authors).values({
      id: authorId,
      name: article.author.name,
      email: article.author.email,
      bio: article.author.bio || null,
    }).onConflictDoNothing();

    await db.insert(articles).values({
      id: article._id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      featuredImageUrl: article.featuredImage.url,
      featuredImageAlt: article.featuredImage.alt,
      authorId,
      categoryId: article.category._id,
      publishedAt: article.publishedAt,
      body: article.body,
      featured: article.featured,
    }).onConflictDoNothing();
  }

  console.log('Database seeded successfully!');
}

seed().catch(console.error);
