# Sanity CMS Setup Guide

This guide walks through setting up Sanity CMS for content management of the Radio Station News website.

## What is Sanity CMS?

Sanity is a headless CMS that provides:
- Flexible content modeling
- Real-time collaboration
- Powerful querying with GROQ
- Customizable Studio interface
- Version control for content

## Step 1: Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and sign up
2. Click "Create Project"
3. Choose a project name (e.g., "Radio Station News")
4. Select a dataset (e.g., "production")
5. Start with a blank project

## Step 2: Define Content Schemas

In your Sanity project, create the following schemas:

### Article Schema

Create `schemas/article.ts`:

```typescript
export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      };
    },
  },
};
```

### Category Schema

Create `schemas/category.ts`:

```typescript
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
  ],
};
```

### Author Schema

Create `schemas/author.ts`:

```typescript
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
```

### Block Content Schema

Create `schemas/blockContent.ts`:

```typescript
export default {
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
    },
  ],
};
```

## Step 3: Install Sanity Client

```bash
pnpm add @sanity/client
```

## Step 4: Create Sanity Client

Create `client/src/lib/sanityClient.ts`:

```typescript
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

// Queries
export async function getArticles() {
  return await sanityClient.fetch(`
    *[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset->{url},
        alt
      },
      author->{name, email, bio},
      category->{name, slug, description},
      publishedAt,
      body,
      featured
    }
  `);
}

export async function getArticleBySlug(slug: string) {
  return await sanityClient.fetch(`
    *[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset->{url},
        alt
      },
      author->{name, email, bio},
      category->{name, slug, description},
      publishedAt,
      body,
      featured
    }
  `, { slug });
}

export async function getArticlesByCategory(categorySlug: string) {
  return await sanityClient.fetch(`
    *[_type == "article" && category->slug.current == $slug] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset->{url},
        alt
      },
      author->{name, email, bio},
      category->{name, slug, description},
      publishedAt,
      body,
      featured
    }
  `, { slug: categorySlug });
}

export async function getCategories() {
  return await sanityClient.fetch(`
    *[_type == "category"] | order(name asc) {
      _id,
      name,
      slug,
      description
    }
  `);
}

export async function getFeaturedArticle() {
  return await sanityClient.fetch(`
    *[_type == "article" && featured == true] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset->{url},
        alt
      },
      author->{name, email, bio},
      category->{name, slug, description},
      publishedAt,
      body,
      featured
    }
  `);
}
```

## Step 5: Environment Variables

Add to `.env.local`:

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

Get your Project ID from Sanity dashboard: Settings → API → Project ID

## Step 6: Update Components

Replace mock data imports with Sanity queries:

### In Home.tsx

```typescript
import { getArticles, getFeaturedArticle } from "@/lib/sanityClient";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    async function loadData() {
      const [articlesData, featuredData] = await Promise.all([
        getArticles(),
        getFeaturedArticle(),
      ]);
      setArticles(articlesData);
      setFeatured(featuredData);
    }
    loadData();
  }, []);

  // ... rest of component
}
```

### In Article.tsx

```typescript
import { getArticleBySlug } from "@/lib/sanityClient";

export default function Article() {
  const [match, params] = useRoute("/news/:slug");
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (params?.slug) {
      getArticleBySlug(params.slug).then(setArticle);
    }
  }, [params?.slug]);

  // ... rest of component
}
```

## Step 7: Deploy Sanity Studio

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Deploy studio
sanity deploy
```

Your Sanity Studio will be available at `https://your-project.sanity.studio`

## Step 8: Add Sample Content

1. Go to your Sanity Studio
2. Create a few authors
3. Create categories
4. Create sample articles
5. Mark one as featured

## Querying Images

When displaying images from Sanity:

```typescript
import { urlFor } from "@/lib/sanityClient";

<img
  src={urlFor(article.featuredImage).width(800).url()}
  alt={article.featuredImage.alt}
/>
```

Add to `sanityClient.ts`:

```typescript
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}
```

## Real-time Updates

To subscribe to real-time content changes:

```typescript
useEffect(() => {
  const subscription = sanityClient
    .listen('*[_type == "article"]')
    .subscribe((update) => {
      console.log("Content updated:", update);
      // Refetch articles
    });

  return () => subscription.unsubscribe();
}, []);
```

## Backup & Export

### Export Content

```bash
sanity dataset export production articles.ndjson
```

### Import Content

```bash
sanity dataset import articles.ndjson production
```

## Troubleshooting

### API Errors

- Check Project ID is correct
- Verify dataset name matches
- Ensure API token has correct permissions

### Image Issues

- Check image assets are uploaded
- Verify CDN is enabled
- Check image URL format

### Query Errors

- Use Sanity Vision tool to test queries
- Check GROQ syntax
- Verify field names match schema

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity CLI](https://www.sanity.io/docs/cli)
- [Image URL Builder](https://www.sanity.io/docs/image-url)

---

**Ready to manage content! 🚀**
