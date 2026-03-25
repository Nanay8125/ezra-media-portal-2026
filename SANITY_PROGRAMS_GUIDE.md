# 🎙️ Host & Program Management Guide

This guide explains how to add and manage your **Program Hosts** and **Broadcast Schedules** using Sanity CMS. 

## 1. Define the "Host" Schema
First, you need a place to store your hosts' details (Name and Photo). Add this to your Sanity schemas:

### `schemas/host.ts`
```typescript
export default {
  name: 'host',
  title: 'Program Host',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Host Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Host Photo',
      type: 'image',
      options: {
        hotspot: true, // IMPORTANT: Enable this to crop faces perfectly
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 2
    }
  ],
};
```

## 2. Define the "Program" Schema
Next, create the Program schema and link it to the Host using a **reference**.

### `schemas/program.ts`
```typescript
export default {
  name: 'program',
  title: 'Broadcast Program',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Program Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'host',
      title: 'Host',
      type: 'reference',
      to: [{ type: 'host' }], // Links to the host document
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'time',
      title: 'Air Time',
      type: 'string',
      placeholder: 'e.g. 06:00 AM - 10:00 AM',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'days',
      title: 'Days of the Week',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ]
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Radio', value: 'radio' },
          { title: 'tv', value: 'tv' }
        ]
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }
  ],
};
```

## 3. How to Add a Host Image
1. Log in to your **Sanity Studio**.
2. Click on **Program Host** in the sidebar.
3. Click **Create New**.
4. Enter the Host's Name.
5. **Upload Image**: Click the image upload box and select a photo of the host.
6. **Crop for High Impact**: Once uploaded, use the **Hotspot** tool in Sanity to center the host's face. This ensures it looks perfect in the circular cards on the site!
7. Click **Publish**.

## 4. Linking the Host to a Program
1. In Sanity Studio, click on **Broadcast Program**.
2. Click **Create New**.
3. In the **Host** field, search for the host you just created and select them.
4. Fill in the Title, Time, and Days.
5. Click **Publish**. ✅

---

### 💡 Pro Tip
Using high-quality square photos will make your "Schedule" page look incredibly professional. 🎙️📸🚀
