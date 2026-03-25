# Sanity Media Extensions for Ezra Radio & TV

This guide explains how to add **Audio Players (Podcasts)** and **Image Galleries** to your Sanity Studio, allowing your journalists to create rich multimedia articles.

## 1. Update `schemas/blockContent.ts`

Open your Sanity Studio's `schemas/blockContent.ts` and update the `of` array to include the new block types:

```typescript
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // ... existing styles, lists, etc.
    },
    {
      type: 'image',
      options: { hotspot: true },
    },
    // --- ADD THE BLOCKS BELOW ---
    
    // 1. YouTube Embed Block
    {
      type: 'object',
      name: 'youtube',
      title: 'YouTube Embed',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'YouTube Video URL',
          description: 'Paste the full YouTube video URL (e.g., https://www.youtube.com/watch?v=...)',
        },
      ],
    },
    
    // 2. Audio Player (Podcast) Block
    {
      type: 'object',
      name: 'audio',
      title: 'Audio Player',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Audio Title',
          description: 'Name of the podcast or audio clip',
        },
        {
          name: 'asset',
          type: 'file',
          title: 'Audio File',
          options: {
            accept: 'audio/*',
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    
    // 3. Photo Gallery Block
    {
      type: 'object',
      name: 'gallery',
      title: 'Photo Gallery',
      fields: [
        {
          name: 'images',
          type: 'array',
          title: 'Images',
          of: [
            {
              type: 'image',
              fields: [
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                },
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Important for accessibility and SEO',
                },
              ],
              options: {
                hotspot: true,
              },
            },
          ],
          options: {
            layout: 'grid',
          },
        },
      ],
    },
  ],
};
```

## 2. Deploy Your Studio Changes

After updating the schema, go to your `studio` folder in the terminal and run:

```bash
# In your studio folder
sanity graphql deploy
sanity deploy
```

## 3. Frontend is Ready

I have already updated the website's frontend (`Article.tsx`) to support these new blocks.

- **YouTube**: Renders as a beautiful responsive player with an Ezra-red border.
- **Audio**: Renders as a dedicated podcast player block with a license/title.
- **Gallery**: Renders as a sleek image grid with hover captions and zoom effects.

---

## Happy Publishing 🎙️📸
