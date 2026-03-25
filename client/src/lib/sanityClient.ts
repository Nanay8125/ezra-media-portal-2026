import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Get variables from env, or use placeholders to avoid crashing if empty
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "demo_id";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const token = import.meta.env.VITE_SANITY_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-25", // Use current date
  useCdn: false, // Ensure token works for fetching drafts
  token,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return null;
  return builder.image(source);
}

// Ensure error handling directly inside data functions so that rendering doesn't crash if Sanity fails to fetch (e.g. invalid project ID)
export async function getArticles() {
  try {
    return await sanityClient.fetch(`
      *[_type == "article"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        featuredImage {
          asset->{url},
          alt
        },
        "author": author->{name, email, bio},
        "category": category->{"name": name, "slug": slug.current, description},
        publishedAt,
        body[] {
          ...,
          _type == "image" => {
            ...,
            asset->
          },
          _type == "audio" => {
            ...,
            asset->
          },
          _type == "gallery" => {
            ...,
            images[] {
              ...,
              asset->
            }
          }
        },
        featured,
        breaking
      }
    `);
  } catch (error) {
    console.warn("Sanity articles fetch failed:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    return await sanityClient.fetch(`
      *[_type == "article" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        featuredImage {
          asset->{url},
          alt
        },
        "author": author->{name, email, bio},
        "category": category->{"name": name, "slug": slug.current, description},
        publishedAt,
        body[] {
          ...,
          _type == "image" => {
            ...,
            asset->
          },
          _type == "audio" => {
            ...,
            asset->
          },
          _type == "gallery" => {
            ...,
            images[] {
              ...,
              asset->
            }
          }
        },
        featured,
        breaking
      }
    `, { slug });
  } catch (error) {
    console.warn("Sanity article fetch failed:", error);
    return null;
  }
}

export async function getArticlesByCategory(categorySlug: string) {
  try {
    return await sanityClient.fetch(`
      *[_type == "article" && category->slug.current == $slug] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        featuredImage {
          asset->{url},
          alt
        },
        "author": author->{name, email, bio},
        "category": category->{"name": name, "slug": slug.current, description},
        publishedAt,
        body[] {
          ...,
          _type == "image" => {
            ...,
            asset->
          },
          _type == "audio" => {
            ...,
            asset->
          },
          _type == "gallery" => {
            ...,
            images[] {
              ...,
              asset->
            }
          }
        },
        featured,
        breaking
      }
    `, { slug: categorySlug });
  } catch (error) {
    console.warn("Sanity category fetching failed:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    return await sanityClient.fetch(`
      *[_type == "category"] | order(name asc) {
        _id,
        name,
        "slug": slug.current,
        description
      }
    `);
  } catch (error) {
    console.warn("Sanity categories fetching failed:", error);
    return [];
  }
}

export async function getFeaturedArticle() {
  try {
    return await sanityClient.fetch(`
      *[_type == "article" && featured == true] | order(publishedAt desc)[0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        featuredImage {
          asset->{url},
          alt
        },
        "author": author->{name, email, bio},
        "category": category->{"name": name, "slug": slug.current, description},
        publishedAt,
        body[] {
          ...,
          _type == "image" => {
            ...,
            asset->
          },
          _type == "audio" => {
            ...,
            asset->
          },
          _type == "gallery" => {
            ...,
            images[] {
              ...,
              asset->
            }
          }
        },
        featured,
        breaking
      }
    `);
  } catch(error) {
    console.warn("Sanity featured fetch failed:", error);
    return null;
  }
}

export async function getBreakingNews() {
  try {
    return await sanityClient.fetch(`
      *[_type == "article" && breaking == true] | order(publishedAt desc)[0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt
      }
    `);
  } catch (error) {
    console.warn("Sanity breaking news fetch failed:", error);
    return null;
  }
}

export async function getPrograms() {
  try {
    return await sanityClient.fetch(`
      *[_type == "program"] | order(time asc) {
        _id,
        title,
        "slug": slug.current,
        description,
        time,
        days[],
        type,
        "host": host->{name, "image": image.asset->url},
        "image": image.asset->url
      }
    `);
  } catch (error) {
    console.warn("Sanity programs fetch failed:", error);
    return [];
  }
}

export async function getAds(): Promise<any[]> {
  try {
    return await sanityClient.fetch(`
      *[_type == "advertiser" && active == true] {
        _id,
        companyName,
        "image": adImage.asset->url,
        link,
        slotType
      } | order(_createdAt desc)
    `);
  } catch (error) {
    console.warn("Sanity ads fetch failed:", error);
    return [];
  }
}

export async function getTrendingTopics(): Promise<any[]> {
  try {
    return await sanityClient.fetch(`
      *[_type == "trendingTopic"] {
        _id,
        keyword,
        engagement,
        isRising
      } | order(engagement desc)
    `);
  } catch (error) {
    console.warn("Sanity trending topics fetch failed:", error);
    return [];
  }
}
