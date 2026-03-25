import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const client = createClient({ 
  url: process.env.TURSO_DATABASE_URL || 'file:sqlite.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});
export const db = drizzle(client);

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
});

export const authors = sqliteTable('authors', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  bio: text('bio'),
});

export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  featuredImageUrl: text('featured_image_url').notNull(),
  featuredImageAlt: text('featured_image_alt'),
  authorId: text('author_id').notNull().references(() => authors.id),
  categoryId: text('category_id').notNull().references(() => categories.id),
  publishedAt: text('published_at').notNull(),
  body: text('body').notNull(),
  featured: integer('featured', { mode: 'boolean' }).default(false),
});

export const comments = sqliteTable('comments', {
  id: text('id').primaryKey(),
  articleSlug: text('article_slug').notNull(),
  author: text('author').notNull(),
  email: text('email').notNull(),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull(),
  approved: integer('approved', { mode: 'boolean' }).default(false),
  parentId: text('parent_id'),
  likes: integer('likes').default(0),
});
