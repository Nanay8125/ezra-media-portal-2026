# Radio Station News Website

A production-ready MVP news website for a radio station built with React, TypeScript, and Tailwind CSS. This website allows journalists to publish daily news stories and visitors to read the latest news easily.

## Features

### Public Website

- **Homepage**: Displays featured top story, latest news grid, and categories section
- **Featured Story**: Prominent display of the most important article with image overlay
- **Latest News Grid**: Responsive grid of recent articles with thumbnails, headlines, excerpts, and metadata
- **Article Pages**: Full article view with headline, featured image, author, date, category, and social sharing buttons
- **Category Pages**: Browse articles by category (Local News, Politics, Business, Sports, Entertainment, Community)
- **Search Functionality**: Search articles by headline and category with real-time results
- **Newsletter Signup**: Subscribe to daily news updates
- **Mobile-First Design**: Fully responsive and optimized for mobile readers
- **SEO Optimization**: Meta tags, Open Graph data, and structured data for better search visibility

### Design

The website follows a **Modern Newsroom Authority** design philosophy with:

- **Color Scheme**: Deep charcoal (#1a1a1a) for authority with vibrant red (#dc2626) for urgency
- **Typography**: Playfair Display serif font for headlines paired with Inter sans-serif for body text
- **Layout**: Asymmetric featured story layout with staggered card grid for latest news
- **Interactions**: Smooth hover effects, transitions, and subtle depth with shadows
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

## Project Structure

```
client/
  public/              # Small configuration files (favicon, robots.txt)
  src/
    components/        # Reusable UI components
      Navbar.tsx       # Navigation bar with search and categories
      Footer.tsx       # Footer with links and contact info
      ArticleCard.tsx  # Article card component for grid display
      SearchDialog.tsx # Search modal with real-time results
      NewsletterSignup.tsx  # Newsletter subscription form
      CategoryList.tsx # Category navigation
    pages/
      Home.tsx         # Homepage with featured story and latest news
      Article.tsx      # Individual article page
      Category.tsx     # Category page with filtered articles
      NotFound.tsx     # 404 page
    lib/
      mockData.ts      # Mock article data and helper functions
      seo.ts           # SEO utilities for meta tags
    App.tsx            # Main app component with routing
    index.css          # Global styles with design tokens
    main.tsx           # React entry point
  index.html           # HTML template
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Modern web browser

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
pnpm build
pnpm start
```

## Content Management

### Mock Data

Currently, the website uses mock data from `client/src/lib/mockData.ts`. This includes:

- 6 sample articles across different categories
- 6 news categories (Local News, Politics, Business, Sports, Entertainment, Community)
- Author information and metadata

### Integrating with Sanity CMS

To connect to a real CMS:

1. Set up a Sanity project at [sanity.io](https://sanity.io)
2. Create the following schemas:
   - **Article**: title, slug, excerpt, featuredImage, author, category, publishedAt, body, featured
   - **Category**: name, slug, description
   - **Author**: name, email, bio

3. Replace the mock data functions in `client/src/lib/mockData.ts` with Sanity client queries

4. Install Sanity client:
```bash
pnpm add @sanity/client
```

5. Create `client/src/lib/sanityClient.ts`:
```typescript
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});
```

## SEO Features

The website includes comprehensive SEO optimization:

- **Meta Tags**: Title, description, author, and publication date
- **Open Graph**: og:title, og:description, og:image, og:url for social sharing
- **Twitter Cards**: twitter:card, twitter:title, twitter:description, twitter:image
- **Structured Data**: Schema.org NewsArticle markup for search engines
- **Dynamic Titles**: Each page has a unique, descriptive title
- **Canonical URLs**: Prevents duplicate content issues

## Customization

### Colors

Edit the color scheme in `client/src/index.css`:

```css
:root {
  --primary: #dc2626;           /* Red accent */
  --foreground: oklch(0.15 0.01 0);  /* Deep charcoal */
  --background: oklch(0.98 0 0);     /* Off-white */
}
```

### Typography

Fonts are loaded from Google Fonts in `client/index.html`:

- **Headlines**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Categories

Add or modify categories in `client/src/lib/mockData.ts`:

```typescript
export const categories: Category[] = [
  {
    _id: "1",
    name: "Your Category",
    slug: "your-category",
    description: "Category description",
  },
  // ...
];
```

## Performance

- **Responsive Images**: Images are optimized and lazy-loaded
- **Fast Loading**: Minimal dependencies and optimized bundle size
- **Mobile-First**: Progressive enhancement for all screen sizes
- **Accessibility**: WCAG 2.1 AA compliant

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms

The website can be deployed to any static hosting:

- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any Node.js hosting (using the Express server)

## Future Enhancements

- Integration with Sanity CMS for content management
- Audio news player for radio station integration
- Podcast section
- Live radio streaming
- User comments and engagement
- Advanced analytics
- Email newsletter automation
- Social media integration

## License

MIT

## Support

For issues or questions, please contact the development team or open an issue in the project repository.

---

**Built with React, TypeScript, Tailwind CSS, and Wouter**
