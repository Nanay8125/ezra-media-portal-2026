# Sanity CMS Quick Start Guide for Journalists

This guide will help your radio station team publish news articles using Sanity CMS without any coding knowledge.

## What is Sanity CMS?

Sanity is a **content management system** that lets you:
- Write and publish articles from a web browser
- Upload featured images
- Organize articles by category
- Schedule publication dates
- Collaborate with other team members
- No coding required!

## Step 1: Create Your Sanity Account (5 minutes)

1. Go to **[sanity.io](https://sanity.io)**
2. Click **"Get Started"** or **"Sign Up"**
3. Create an account using:
   - Email address
   - Password
   - Or sign in with Google/GitHub

## Step 2: Create a New Project (5 minutes)

1. After signing in, click **"Create Project"**
2. Fill in the project details:
   - **Project Name**: "Radio Station News" (or your station name)
   - **Dataset**: "production"
   - **Project Type**: Choose "Blank project"
3. Click **"Create"**

Sanity will set up your project. This takes about 1-2 minutes.

## Step 3: Get Your Project Credentials (2 minutes)

You'll need these to connect your website to Sanity:

1. In your Sanity project, go to **Settings** (gear icon)
2. Click **"API"** in the left menu
3. Find and copy:
   - **Project ID** (looks like: `abc123def456`)
   - **Dataset** (should be: `production`)

**Save these somewhere safe!** You'll need them later.

## Step 4: Create Content Schemas (10 minutes)

Schemas tell Sanity what information to collect for each article.

### Option A: Use Sanity's Web Interface (Easiest)

1. In your Sanity project, click **"Create"** (+ icon)
2. Click **"Create Document Type"**
3. Name it: `article`
4. Add these fields by clicking **"Add Field"**:

| Field Name | Type | Required | Notes |
|---|---|---|---|
| title | Text | Yes | Article headline |
| slug | Slug | Yes | Auto-generate from title |
| excerpt | Text | Yes | Short summary (200 chars) |
| featuredImage | Image | Yes | Main article image |
| author | Reference | Yes | Link to Author document |
| category | Reference | Yes | Link to Category document |
| publishedAt | Date | Yes | Publication date |
| body | Rich Text | Yes | Full article content |
| featured | Boolean | No | Mark as featured story |

5. Repeat for `category` document:

| Field Name | Type | Required |
|---|---|---|
| name | Text | Yes |
| slug | Slug | Yes |
| description | Text | No |

6. Repeat for `author` document:

| Field Name | Type | Required |
|---|---|---|
| name | Text | Yes |
| email | Email | Yes |
| bio | Text | No |

### Option B: Use Code (Advanced)

Create a `sanity.config.ts` file with your schemas. See the SANITY_SETUP.md file for code examples.

## Step 5: Launch Sanity Studio (2 minutes)

Sanity Studio is your content editor dashboard.

1. In your Sanity project, click **"Manage"** (top menu)
2. Click **"Hosting"**
3. Click **"Deploy"** button
4. Wait for deployment to complete

Your Sanity Studio is now live at:
```
https://your-project-id.sanity.studio
```

**Bookmark this URL!** This is where you'll write articles.

## Step 6: Connect to Your Website (Technical - Ask Your Developer)

Your developer needs to:

1. Install Sanity client:
```bash
pnpm add @sanity/client
```

2. Add environment variables to `.env.local`:
```
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

3. Update the website code to fetch articles from Sanity instead of mock data.

## Publishing Your First Article

### Step 1: Go to Sanity Studio

1. Visit your Sanity Studio URL (from Step 5)
2. You'll see a dashboard with document types

### Step 2: Create an Author

1. Click **"Author"** in the left menu
2. Click **"Create"** button
3. Fill in:
   - **Name**: Your name
   - **Email**: your.email@radiostation.com
   - **Bio**: (Optional) Short bio
4. Click **"Publish"** button (top right)

### Step 3: Create a Category

1. Click **"Category"** in the left menu
2. Click **"Create"** button
3. Fill in:
   - **Name**: "Local News" (or another category)
   - **Slug**: Will auto-generate
   - **Description**: (Optional) What this category covers
4. Click **"Publish"** button

### Step 4: Write Your First Article

1. Click **"Article"** in the left menu
2. Click **"Create"** button
3. Fill in the form:

| Field | What to Enter |
|---|---|
| **Title** | Your article headline |
| **Slug** | Auto-generates from title (don't change) |
| **Excerpt** | 1-2 sentence summary |
| **Featured Image** | Click to upload your image |
| **Author** | Select the author you created |
| **Category** | Select a category |
| **Published At** | Today's date |
| **Body** | Full article text (use formatting tools) |
| **Featured** | Check if this is your top story |

### Step 5: Publish

1. Click **"Publish"** button (top right)
2. Your article is now live! 🎉

## Editing Articles

1. Go to Sanity Studio
2. Click **"Article"** in the left menu
3. Click the article you want to edit
4. Make your changes
5. Click **"Publish"** to save

## Scheduling Articles

Want to publish at a specific time?

1. Write your article
2. Instead of clicking **"Publish"**, click **"Schedule"**
3. Choose the date and time
4. Click **"Schedule"**

Your article will automatically publish at that time!

## Adding Images

### Upload from Your Computer

1. Click the image field
2. Click **"Upload"**
3. Choose image from your computer
4. Wait for upload to complete

### Recommended Image Sizes

- **Featured Image**: 1200 x 630 pixels (or 16:9 ratio)
- **File Size**: Under 5MB
- **Format**: JPG, PNG, or WebP

### Image Tips

- Use high-quality, relevant images
- Avoid text overlays
- Make sure images are clear and bright
- Test on mobile to ensure readability

## Writing Articles in Sanity

### Formatting Text

In the **Body** field, you can:

- **Bold**: Select text, click **B** button
- **Italic**: Select text, click **I** button
- **Headings**: Click **H** dropdown, select heading level
- **Lists**: Click **•** for bullet points or **1.** for numbered lists
- **Links**: Select text, click link icon, paste URL
- **Quotes**: Click **"** for block quotes

### Adding Images in Article

1. Click in the body where you want the image
2. Click the **image icon**
3. Upload or select an image
4. Add alt text (description for accessibility)

### Tips for Better Articles

- **Use headings** to break up long text
- **Keep paragraphs short** (2-3 sentences)
- **Add images** to break up text visually
- **Use bold** to highlight key points
- **Link to related articles** for context

## Team Collaboration

### Invite Team Members

1. Go to **Settings** (gear icon)
2. Click **"Members"**
3. Click **"Invite"**
4. Enter team member's email
5. Select their role:
   - **Editor**: Can create and edit articles
   - **Viewer**: Can only read articles
   - **Admin**: Full access

### Roles Explained

| Role | Can Create | Can Edit | Can Delete | Can Manage Team |
|---|---|---|---|---|
| Viewer | No | No | No | No |
| Editor | Yes | Yes | No | No |
| Admin | Yes | Yes | Yes | Yes |

## Troubleshooting

### "I can't see my articles on the website"

1. Make sure you **clicked Publish** (not just saved)
2. Wait 1-2 minutes for the website to update
3. Refresh the website in your browser
4. Check that the article's **Published At** date is today or earlier

### "My images aren't showing up"

1. Check that the image uploaded successfully (no red error)
2. Make sure the image file is under 5MB
3. Try a different image format (JPG instead of PNG)
4. Refresh the website page

### "I accidentally deleted an article"

1. Go to **Settings** → **History**
2. Find your article in the version history
3. Click to restore it

### "I can't log in to Sanity Studio"

1. Go to [sanity.io](https://sanity.io)
2. Click **"Sign In"**
3. Enter your email
4. Click **"Send Magic Link"** (or use password)
5. Check your email for login link

## Best Practices

### Daily Publishing Workflow

1. **Morning**: Check Sanity Studio for scheduled articles
2. **Throughout Day**: Write new articles as news breaks
3. **Before Publishing**: 
   - Check spelling and grammar
   - Verify all facts
   - Add relevant images
   - Select appropriate category
4. **Publish**: Click Publish button
5. **Share**: Share on social media

### Content Guidelines

- **Headlines**: Clear, compelling, under 80 characters
- **Excerpts**: 1-2 sentences, summarize the story
- **Categories**: Use consistent categories
- **Images**: Always add featured images
- **Authors**: Always assign an author
- **Dates**: Use accurate publication dates

### SEO Tips

- Use descriptive headlines with keywords
- Write informative excerpts
- Add alt text to images
- Use relevant categories
- Include links to related articles

## Advanced Features

### Scheduling Multiple Articles

1. Write several articles
2. For each, click **"Schedule"**
3. Set different times throughout the day
4. Your articles will publish automatically

### Bulk Publishing

1. Create multiple articles
2. Use **"Batch Actions"** to publish all at once
3. Great for publishing weekly roundups

### Search and Filter

1. Click **"Article"** in left menu
2. Use search bar to find articles
3. Filter by:
   - Author
   - Category
   - Publication date
   - Status (published, draft, scheduled)

## Getting Help

### Sanity Documentation

- [Sanity Docs](https://www.sanity.io/docs)
- [Sanity Community](https://slack.sanity.io)
- [Video Tutorials](https://www.sanity.io/learn)

### Your Website Team

Contact your developer if you need help with:
- Connecting Sanity to your website
- Adding new fields to articles
- Customizing the editor interface
- Fixing technical issues

## Quick Reference

| Task | Steps |
|---|---|
| **Write Article** | Article → Create → Fill form → Publish |
| **Edit Article** | Article → Click article → Edit → Publish |
| **Delete Article** | Article → Click article → Delete button |
| **Schedule Article** | Article → Create → Fill form → Schedule |
| **Add Author** | Author → Create → Fill form → Publish |
| **Add Category** | Category → Create → Fill form → Publish |
| **Invite Team Member** | Settings → Members → Invite |
| **Upload Image** | Click image field → Upload → Choose file |

## Next Steps

1. ✅ Create your Sanity account
2. ✅ Create your project
3. ✅ Set up document types (schemas)
4. ✅ Deploy Sanity Studio
5. ✅ Ask your developer to connect to the website
6. ✅ Write your first article!

---

**You're ready to start publishing! 🚀**

For detailed technical information, see SANITY_SETUP.md

**Last Updated**: March 2024
