# Development Guide

This guide covers development workflows, best practices, and extending the Radio Station News website.

## Development Setup

### Prerequisites

- Node.js 18+ ([download](https://nodejs.org))
- pnpm 8+ (`npm install -g pnpm`)
- Git
- Code editor (VS Code recommended)

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd radio-station-news

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

## Project Structure

```
radio-station-news/
├── client/
│   ├── public/              # Static files (favicon, robots.txt)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── lib/             # Utilities and helpers
│   │   ├── contexts/        # React contexts
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   └── index.html           # HTML template
├── server/                  # Express server (production)
├── package.json             # Dependencies
├── README.md                # Project overview
├── DEPLOYMENT.md            # Deployment guide
└── DEVELOPMENT.md           # This file
```

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server with hot reload

# Building
pnpm build            # Build for production
pnpm preview          # Preview production build locally

# Code Quality
pnpm check            # Type check with TypeScript
pnpm format           # Format code with Prettier

# Other
pnpm start            # Run production server
```

## Adding New Pages

### 1. Create a Page Component

Create `client/src/pages/YourPage.tsx`:

```typescript
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { setSEOMetadata } from "@/lib/seo";

export default function YourPage() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setSEOMetadata({
      title: "Your Page | Radio Station News",
      description: "Page description",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-bold mb-4">Your Page</h1>
        {/* Your content here */}
      </main>

      <Footer />
    </div>
  );
}
```

### 2. Add Route in App.tsx

```typescript
import YourPage from "./pages/YourPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/your-page" component={YourPage} />
      {/* ... other routes */}
    </Switch>
  );
}
```

## Adding New Components

### Create a Reusable Component

Create `client/src/components/YourComponent.tsx`:

```typescript
interface YourComponentProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

export default function YourComponent({
  title,
  description,
  onClick,
}: YourComponentProps) {
  return (
    <div className="p-4 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
      <h3 className="font-bold text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      )}
      {onClick && (
        <button
          onClick={onClick}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          Action
        </button>
      )}
    </div>
  );
}
```

## Styling Guidelines

### Using Tailwind CSS

The project uses Tailwind CSS 4 with custom design tokens. Always use utility classes:

```typescript
// ✅ Good
<div className="p-4 rounded-lg bg-card border border-border shadow-md hover:shadow-lg transition-shadow">

// ❌ Avoid
<div style={{padding: '1rem', borderRadius: '0.5rem', ...}}>
```

### Design Tokens

Available color tokens (defined in `client/src/index.css`):

- `bg-background` / `text-foreground` - Main background and text
- `bg-card` / `text-card-foreground` - Card backgrounds
- `bg-secondary` / `text-secondary-foreground` - Secondary backgrounds
- `bg-primary` / `text-primary-foreground` - Primary accent (red)
- `bg-muted` / `text-muted-foreground` - Muted/disabled states
- `border-border` - Border color
- `ring-ring` - Focus ring color

### Typography

- **Headings**: Use `<h1>`, `<h2>`, `<h3>` tags (automatically styled with Playfair Display)
- **Body**: Use `<p>` tags (automatically styled with Inter)
- **Classes**: Use `.article-title`, `.article-subtitle`, `.featured-badge`, `.category-badge`

## Data Management

### Mock Data

The project uses mock data in `client/src/lib/mockData.ts`. To modify:

```typescript
export const mockArticles: NewsArticle[] = [
  {
    _id: "1",
    title: "Article Title",
    slug: "article-slug",
    excerpt: "Short excerpt",
    featuredImage: {
      url: "https://example.com/image.jpg",
      alt: "Image description",
    },
    author: {
      name: "Author Name",
      email: "author@example.com",
      bio: "Author bio",
    },
    category: categories[0],
    publishedAt: new Date().toISOString(),
    body: "Full article content...",
    featured: false,
  },
];
```

### Integrating with Sanity CMS

1. Install Sanity client:
```bash
pnpm add @sanity/client
```

2. Create `client/src/lib/sanityClient.ts`:
```typescript
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function getArticles() {
  return await sanityClient.fetch(`
    *[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      author->,
      category->,
      publishedAt,
      body,
      featured
    }
  `);
}
```

3. Replace mock data functions with Sanity queries

## SEO Best Practices

### Adding SEO to New Pages

```typescript
import { setSEOMetadata } from "@/lib/seo";

useEffect(() => {
  setSEOMetadata({
    title: "Page Title | Radio Station News",
    description: "Page description for search results",
    image: "https://example.com/og-image.jpg",
    url: window.location.href,
    type: "website",
  });
}, []);
```

### Meta Tags

- **Title**: 50-60 characters, include keywords
- **Description**: 150-160 characters, compelling call-to-action
- **Image**: 1200x630px, high quality
- **URL**: Canonical URL for the page

## Performance Optimization

### Image Optimization

```typescript
// Use CDN URLs for images
<img
  src="https://cdn.example.com/image.webp"
  alt="Descriptive alt text"
  loading="lazy"
  className="w-full h-auto"
/>
```

### Code Splitting

The project automatically code-splits pages. For manual splitting:

```typescript
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("@/components/HeavyComponent"));

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Testing

### Manual Testing Checklist

- [ ] Homepage loads and displays featured article
- [ ] Latest news grid displays correctly
- [ ] Category navigation works
- [ ] Article pages load with correct content
- [ ] Search functionality works
- [ ] Newsletter signup works
- [ ] Social share buttons work
- [ ] Mobile responsive on all breakpoints
- [ ] SEO meta tags are present
- [ ] No console errors

### Browser Testing

Test on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Chrome
- Mobile Safari

## Debugging

### Enable Debug Mode

```typescript
// In any component
useEffect(() => {
  console.log("Component mounted", props);
  return () => console.log("Component unmounted");
}, []);
```

### React DevTools

Install React DevTools browser extension for debugging component state and props.

### Network Tab

Use browser DevTools Network tab to:
- Monitor API calls
- Check image loading
- Verify cache headers

## Common Tasks

### Adding a New Category

1. Update `client/src/lib/mockData.ts`:
```typescript
export const categories: Category[] = [
  // ... existing categories
  {
    _id: "7",
    name: "New Category",
    slug: "new-category",
    description: "Category description",
  },
];
```

2. The category will automatically appear in:
   - Navigation menu
   - Category filter
   - Category pages

### Changing Colors

Edit `client/src/index.css`:

```css
:root {
  --primary: #your-color;
  --foreground: #your-color;
  /* ... other colors */
}
```

### Adding Social Media Links

Update `Footer.tsx` and add links to social profiles.

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
pnpm dev -- --port 3001
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors

```bash
# Check for type errors
pnpm check

# Fix common issues
pnpm format
```

### Build Fails

```bash
# Check build locally
pnpm build
pnpm preview

# Check for errors
pnpm check
```

## Code Quality

### Formatting

```bash
pnpm format
```

### Type Checking

```bash
pnpm check
```

### Best Practices

- Use TypeScript for type safety
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic
- Follow the existing code style
- Test on multiple devices

## Git Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add your feature"

# Push to GitHub
git push origin feature/your-feature

# Create a Pull Request on GitHub
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Wouter Documentation](https://github.com/molefrog/wouter)
- [Vite Documentation](https://vitejs.dev)

---

**Happy coding! 🚀**
