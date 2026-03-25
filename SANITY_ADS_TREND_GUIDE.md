# 📈 Advertising & Trending Topics Guide

This guide explains how to manage your **Corporate Advertisers** and **Trending Keyword Dashboard** using Sanity CMS.

## 1. Advertiser Schema
Use this to manage banner ads across the site.

### `schemas/advertiser.ts`
```typescript
export default {
  name: 'advertiser',
  title: 'Advertiser',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'adImage',
      title: 'Ad Banner Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Redirect Link',
      type: 'url',
      placeholder: 'https://client-website.com'
    },
    {
      name: 'slotType',
      title: 'Ad Slot Placement',
      type: 'string',
      options: {
        list: [
          { title: 'Sidebar (Card)', value: 'sidebar' },
          { title: 'Home Banner (Wide)', value: 'banner' },
          { title: 'Inline Article', value: 'inline' }
        ]
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'active',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true
    }
  ]
}
```

## 2. Trending Topic Schema
Use this to highlight viral keywords in the sidebar.

### `schemas/trendingTopic.ts`
```typescript
export default {
  name: 'trendingTopic',
  title: 'Trending Topic',
  type: 'document',
  fields: [
    {
      name: 'keyword',
      title: 'Keyword',
      type: 'string',
      placeholder: 'e.g. 2024 Elections',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'engagement',
      title: 'Engagement Count',
      type: 'string',
      placeholder: 'e.g. 1.5k'
    },
    {
      name: 'isRising',
      title: 'Is Rising? (Shows Fire Icon)',
      type: 'boolean',
      initialValue: false
    }
  ]
}
```

## 3. Managing Ad Slots
1. **Sidebar Ads**: Upload a portrait (3:4) image for best results in the Home sidebar.
2. **Banner Ads**: Use wide landscape (1200x200) images.
3. **Deactivating Ads**: Simply toggle "Is Active" to `false` in Sanity Studio to take an ad down without deleting the record.

## 4. Managing Trending Topics
1. Add keywords that are currently "hot" on social media.
2. Toggle **"Is Rising"** for topics that are gaining rapid traction to show the animated fire icon 🔥 on the website.

---

### 💡 Pro Tip for Monetization:
You can charge higher rates for "Rising" status on trending keywords to give brands more visibility! 💰🚀✨
