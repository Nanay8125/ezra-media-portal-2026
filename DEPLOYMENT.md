# Deployment Guide

This guide covers deploying the Radio Station News website to production.

## Quick Start: Deploy to Vercel

Vercel is the recommended platform for deploying this Next.js-style React application.

### Step 1: Prepare Your Repository

1. Initialize a Git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Radio Station News MVP"
```

2. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/radio-station-news.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

5. Click "Deploy"

Your site will be live at `https://your-project.vercel.app`

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update your domain's DNS records to point to Vercel

## Environment Variables

For production deployment with Sanity CMS, add these environment variables in Vercel:

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

## Alternative Deployment Options

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `dist`
4. Deploy

### AWS S3 + CloudFront

1. Build the project: `pnpm build`
2. Upload `dist` folder to S3
3. Create CloudFront distribution pointing to S3
4. Configure custom domain via Route 53

### Docker (Self-Hosted)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

Build and run:
```bash
docker build -t radio-station-news .
docker run -p 3000:3000 radio-station-news
```

## Performance Optimization

### Image Optimization

- All images are served from CDN with compression
- Use WebP format for better compression
- Implement lazy loading for below-the-fold images

### Caching Strategy

- Set long cache headers for static assets (1 year)
- Set short cache headers for HTML (1 hour)
- Use service workers for offline support

### SEO Checklist

- [ ] Verify all meta tags are present
- [ ] Test Open Graph sharing on social media
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Configure robots.txt
- [ ] Test mobile responsiveness

## Monitoring & Analytics

### Google Analytics

1. Create a Google Analytics property
2. Add tracking ID to environment variables
3. The analytics script is already configured in `client/index.html`

### Error Tracking

Consider adding error tracking with:
- Sentry
- LogRocket
- Rollbar

## Continuous Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Database Integration (Future)

When integrating with Sanity CMS:

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Set up authentication tokens
3. Add environment variables for Sanity API
4. Deploy Sanity Studio for content management

## Backup & Recovery

- Use Git for version control
- Keep backups of content in Sanity CMS
- Monitor uptime with services like Uptime Robot

## SSL/TLS Certificate

- Vercel automatically provides SSL certificates
- Certificates are renewed automatically
- HTTPS is enforced by default

## Performance Metrics

Monitor these key metrics:

- **Core Web Vitals**:
  - Largest Contentful Paint (LCP): < 2.5s
  - First Input Delay (FID): < 100ms
  - Cumulative Layout Shift (CLS): < 0.1

- **Page Speed**:
  - First Contentful Paint: < 1.8s
  - Time to Interactive: < 3.8s

Use Google PageSpeed Insights to monitor performance.

## Troubleshooting

### Build Fails

1. Check Node.js version: `node --version` (should be 18+)
2. Clear cache: `pnpm store prune`
3. Reinstall dependencies: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
4. Check for TypeScript errors: `pnpm check`

### Site Not Loading

1. Check deployment logs in Vercel dashboard
2. Verify environment variables are set correctly
3. Test locally: `pnpm dev`
4. Check browser console for errors

### Images Not Loading

1. Verify CDN URLs are correct
2. Check image file permissions
3. Clear browser cache
4. Verify CORS settings if using external CDN

## Support

For deployment issues, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)

---

**Last Updated**: March 2024
