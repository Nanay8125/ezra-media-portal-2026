// SEO utilities for managing meta tags and Open Graph data

export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
  author?: string;
  publishedDate?: string;
  type?: "article" | "website";
}

export function setSEOMetadata(metadata: SEOMetadata) {
  // Update title
  document.title = metadata.title;

  // Update or create meta tags
  updateMetaTag("description", metadata.description);
  updateMetaTag("og:title", metadata.title);
  updateMetaTag("og:description", metadata.description);
  updateMetaTag("twitter:title", metadata.title);
  updateMetaTag("twitter:description", metadata.description);

  if (metadata.image) {
    updateMetaTag("og:image", metadata.image);
    updateMetaTag("twitter:image", metadata.image);
  }

  if (metadata.url) {
    updateMetaTag("og:url", metadata.url);
  }

  if (metadata.author) {
    updateMetaTag("author", metadata.author);
  }

  if (metadata.publishedDate) {
    updateMetaTag("article:published_time", metadata.publishedDate);
  }

  if (metadata.type) {
    updateMetaTag("og:type", metadata.type);
  }

  // Always set Twitter card type
  updateMetaTag("twitter:card", "summary_large_image");
}

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    if (name.startsWith("og:") || name.startsWith("article:")) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export function generateArticleMetadata(
  title: string,
  excerpt: string,
  image: string,
  author: string,
  publishedDate: string,
  url: string
): SEOMetadata {
  return {
    title: `${title} | Ezra Radio & TV`,
    description: excerpt,
    image,
    url,
    author,
    publishedDate,
    type: "article",
  };
}

export function generateCategoryMetadata(
  categoryName: string,
  description: string,
  url: string
): SEOMetadata {
  return {
    title: `${categoryName} | Ezra Radio & TV`,
    description,
    url,
    type: "website",
  };
}

export function generateHomeMetadata(): SEOMetadata {
  return {
    title: "Ezra Radio & TV - Local News, Politics, Business & More",
    description:
      "Stay updated with the latest news from Ezra Radio & TV. Coverage of local news, politics, business, sports, entertainment, and community stories.",
    url: window.location.origin,
    type: "website",
  };
}
