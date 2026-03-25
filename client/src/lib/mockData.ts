// Mock data for the radio station news website
// This will be replaced with real Sanity CMS data in production

export interface Author {
  name: string;
  email: string;
  bio?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: {
    url?: string;
    alt?: string;
    asset?: {
      url: string;
    };
  };
  author: Author;
  category: Category;
  publishedAt: string;
  body: string;
  featured: boolean;
}

export const categories: Category[] = [
  {
    _id: "1",
    name: "Local News",
    slug: "local-news",
    description: "News from our community",
  },
  {
    _id: "2",
    name: "Politics",
    slug: "politics",
    description: "Political coverage and analysis",
  },
  {
    _id: "3",
    name: "Business",
    slug: "business",
    description: "Business and market news",
  },
  {
    _id: "4",
    name: "Sports",
    slug: "sports",
    description: "Sports updates and coverage",
  },
  {
    _id: "5",
    name: "Entertainment",
    slug: "entertainment",
    description: "Entertainment and culture",
  },
  {
    _id: "6",
    name: "Community",
    slug: "community",
    description: "Community events and stories",
  },
];

export const mockArticles: NewsArticle[] = [
  {
    _id: "1",
    title: "Radio Station Launches Community Program",
    slug: "radio-station-launches-community-program",
    excerpt:
      "Our radio station is excited to announce a new initiative to support local community development and engagement.",
    featuredImage: {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/118112117/eMZ4Hk2wvSPVqvPkCk3mQz/featured-story-news-desk-8k5jmmcvt8Xt9DFzQAmEvK.webp",
      alt: "Radio station newsroom",
    },
    author: {
      name: "Sarah Johnson",
      email: "sarah@radiostation.com",
      bio: "Senior News Editor",
    },
    category: categories[5],
    publishedAt: new Date("2024-03-24").toISOString(),
    body: `Our radio station is thrilled to announce the launch of a groundbreaking community program designed to strengthen connections between our listeners and local organizations.

The initiative, called "Community Voices," will feature weekly segments highlighting local nonprofits, community leaders, and grassroots initiatives making a difference in our area.

"This program represents our commitment to being more than just a news source," said Station Director Michael Chen. "We want to be an active participant in building a stronger, more connected community."

The program will kick off next Monday with a special feature on the Local Food Bank's expansion efforts. Listeners will have the opportunity to call in with their own community stories and suggestions for future segments.

"We believe that radio has a unique power to bring people together," added Chen. "By giving voice to community initiatives, we're helping to amplify the important work being done right here at home."

The "Community Voices" segment will air every Monday at 6 PM, with reruns on Wednesday mornings. For more information or to suggest a community organization for coverage, listeners can visit our website or call our newsroom directly.

This launch marks an exciting new chapter for our station as we continue to evolve and serve our community in meaningful ways.`,
    featured: true,
  },
  {
    _id: "2",
    title: "Local Sports Team Advances to Regional Championship",
    slug: "local-sports-team-advances-regional-championship",
    excerpt:
      "In an exciting match, our local sports team secured their place in the regional championship tournament.",
    featuredImage: {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/118112117/eMZ4Hk2wvSPVqvPkCk3mQz/breaking-news-abstract-3evQMKKsvvXgqigpBrmNg5.webp",
      alt: "Sports action",
    },
    author: {
      name: "James Rodriguez",
      email: "james@radiostation.com",
      bio: "Sports Reporter",
    },
    category: categories[3],
    publishedAt: new Date("2024-03-23").toISOString(),
    body: `In a thrilling display of athletic excellence, our local sports team defeated their rivals 3-2 in overtime, securing their advancement to the regional championship tournament.

The match, played in front of a packed stadium of enthusiastic fans, showcased the team's determination and skill. The winning goal came in the final minutes of overtime, sending the crowd into celebration.

Team captain Alex Thompson praised the team's performance: "This victory is the result of months of hard work and dedication. We're grateful for the support of our fans and community."

The team will now prepare for the regional championship, which takes place next month. Fans are encouraged to show their support at upcoming practice sessions and games.

"This is a historic moment for our community," said Coach Maria Santos. "We believe in this team and we're excited to represent our city on the regional stage."

The team's next match is scheduled for April 5th at the Regional Sports Complex.`,
    featured: false,
  },
  {
    _id: "3",
    title: "New Business District Opens Downtown",
    slug: "new-business-district-opens-downtown",
    excerpt:
      "A major new business district has officially opened in downtown, bringing new jobs and economic opportunities.",
    featuredImage: {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/118112117/eMZ4Hk2wvSPVqvPkCk3mQz/hero-broadcast-studio-bRrs9PrCcTR4qc7QGQXP9P.webp",
      alt: "Downtown development",
    },
    author: {
      name: "Emily Chen",
      email: "emily@radiostation.com",
      bio: "Business Correspondent",
    },
    category: categories[2],
    publishedAt: new Date("2024-03-22").toISOString(),
    body: `The highly anticipated downtown business district officially opened its doors today, marking a significant milestone in the city's economic development.

The $500 million project spans 15 blocks and includes office spaces, retail shops, restaurants, and residential units. City officials estimate the development will create over 2,000 new jobs in the coming year.

"This is transformative for our community," said Mayor Patricia Williams at the opening ceremony. "This district will attract businesses from around the region and put our city on the map as a premier destination for commerce and innovation."

The first phase of the project includes 50 retail establishments and 200,000 square feet of office space. Several major corporations have already signed leases, with more announcements expected in the coming weeks.

Local business owners are optimistic about the opportunities. "This brings new energy to downtown," said restaurant owner David Park, whose establishment is one of the first to open in the district. "We're excited to be part of this growth."

The second phase of development is scheduled to begin in the fall, with completion expected by 2026.`,
    featured: false,
  },
  {
    _id: "4",
    title: "City Council Approves New Environmental Initiative",
    slug: "city-council-approves-environmental-initiative",
    excerpt:
      "The city council has unanimously approved a comprehensive environmental initiative aimed at reducing carbon emissions.",
    featuredImage: {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/118112117/eMZ4Hk2wvSPVqvPkCk3mQz/featured-story-news-desk-8k5jmmcvt8Xt9DFzQAmEvK.webp",
      alt: "City council meeting",
    },
    author: {
      name: "Robert Martinez",
      email: "robert@radiostation.com",
      bio: "Political Correspondent",
    },
    category: categories[1],
    publishedAt: new Date("2024-03-21").toISOString(),
    body: `In a unanimous vote, the city council has approved an ambitious environmental initiative designed to reduce the city's carbon emissions by 50% by 2030.

The comprehensive plan includes investments in renewable energy infrastructure, public transportation improvements, and green building standards for new development.

"This is a historic moment for our city," said Councilwoman Lisa Thompson, who championed the initiative. "We're taking concrete action to address climate change and build a sustainable future for our residents."

The initiative will be funded through a combination of municipal bonds, state grants, and private partnerships. Initial funding of $200 million has been allocated for the first phase of implementation.

Key components of the plan include:
- Installation of 10,000 solar panels on municipal buildings
- Expansion of public transit with electric buses
- Green building incentives for private developers
- Community education programs on sustainability

Environmental groups have praised the council's action. "This puts our city among the leaders in climate action," said Dr. Jennifer Lee, director of the Local Environmental Alliance. "We're excited to work with the city to implement these important initiatives."

The first phase of implementation is expected to begin in the summer.`,
    featured: false,
  },
  {
    _id: "5",
    title: "Local Artist Wins National Recognition",
    slug: "local-artist-wins-national-recognition",
    excerpt:
      "A talented local artist has been selected for a prestigious national art award, bringing recognition to our community.",
    featuredImage: {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/118112117/eMZ4Hk2wvSPVqvPkCk3mQz/breaking-news-abstract-3evQMKKsvvXgqigpBrmNg5.webp",
      alt: "Art exhibition",
    },
    author: {
      name: "Victoria Brooks",
      email: "victoria@radiostation.com",
      bio: "Arts and Culture Reporter",
    },
    category: categories[4],
    publishedAt: new Date("2024-03-20").toISOString(),
    body: `Local artist Marcus Williams has been selected as one of 10 recipients of the prestigious National Arts Fellowship, a recognition that comes with a $50,000 grant and international exhibition opportunities.

Williams, who has been creating art in our community for over 15 years, was recognized for his innovative mixed-media installations that explore themes of identity and social justice.

"I'm honored and humbled by this recognition," said Williams in an interview. "This award validates the work I've been doing and opens doors for new opportunities to share my art with a wider audience."

The National Arts Fellowship is one of the most competitive awards in the country, with thousands of artists applying each year. The selection committee praised Williams' unique vision and technical excellence.

"Marcus represents the best of our local arts community," said Director of the Arts Council, Dr. Amanda Foster. "His work challenges us to think differently about the world around us, and this national recognition is well-deserved."

Williams' work will be featured in a traveling exhibition that will visit 15 cities across the country over the next two years. A special exhibition of his work will also be displayed at the City Art Museum beginning next month.

"This is a proud moment for our community," added Mayor Patricia Williams. "We're grateful to have such talented artists calling our city home."`,
    featured: false,
  },
  {
    _id: "6",
    title: "Community Health Fair Provides Free Screenings",
    slug: "community-health-fair-provides-free-screenings",
    excerpt:
      "A major community health fair offered free medical screenings and health education to hundreds of residents.",
    featuredImage: {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/118112117/eMZ4Hk2wvSPVqvPkCk3mQz/hero-broadcast-studio-bRrs9PrCcTR4qc7QGQXP9P.webp",
      alt: "Community health event",
    },
    author: {
      name: "Dr. Michael Thompson",
      email: "michael@radiostation.com",
      bio: "Health and Science Reporter",
    },
    category: categories[5],
    publishedAt: new Date("2024-03-19").toISOString(),
    body: `Over 500 residents attended a comprehensive community health fair that provided free medical screenings, health education, and wellness resources.

The event, organized by the Community Health Foundation and local hospitals, offered screenings for blood pressure, cholesterol, diabetes, and cancer. Participants also received consultations with healthcare professionals.

"Events like this are crucial for preventive health care," said Dr. Sarah Chen, Medical Director of the Community Health Foundation. "Many people don't have access to regular health screenings, and this fair helps us reach those who need it most."

Local healthcare providers, nonprofits, and wellness organizations set up booths to provide information and resources. Topics covered included nutrition, exercise, mental health, and disease prevention.

"The response has been overwhelming," said event coordinator James Wilson. "People are hungry for health information and grateful for the opportunity to get free screenings."

The fair also featured health education workshops on topics including stress management, healthy eating, and chronic disease management. All services were provided free of charge.

"This is an investment in our community's health," said Mayor Patricia Williams, who attended the event. "When people have access to preventive care and health education, everyone benefits."

The Community Health Foundation announced plans to make the health fair an annual event, with plans to expand services next year.`,
    featured: false,
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return mockArticles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): NewsArticle[] {
  return mockArticles.filter((article) => article.category.slug === categorySlug);
}

export function getFeaturedArticle(): NewsArticle | undefined {
  return mockArticles.find((article) => article.featured);
}

export function getLatestArticles(limit: number = 10): NewsArticle[] {
  return mockArticles
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export function searchArticles(query: string): NewsArticle[] {
  const lowerQuery = query.toLowerCase();
  return mockArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.category.name.toLowerCase().includes(lowerQuery)
  );
}
