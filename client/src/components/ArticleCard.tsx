import { Link } from "wouter";
import { NewsArticle } from "@/lib/mockData";
import { Calendar, User } from "lucide-react";

interface ArticleCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  if (featured) {
    return (
      <Link href={`/news/${article.slug}`}>
        <a className="group block">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-96 md:h-96">
            {/* Featured Image */}
            <img
              src={article.featuredImage?.asset?.url || article.featuredImage?.url}
              alt={article.featuredImage?.alt || article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="mb-3">
                <span className="featured-badge bg-primary text-primary-foreground">
                  Featured
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
                {article.title}
              </h2>
              <p className="text-gray-200 text-sm line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
                <span className="category-badge bg-secondary text-secondary-foreground">
                  {article.category.name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  }

  return (
    <Link href={`/news/${article.slug}`}>
      <a className="group block h-full">
        <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden bg-secondary h-48 md:h-56">
            <img
              src={article.featuredImage?.asset?.url || article.featuredImage?.url}
              alt={article.featuredImage?.alt || article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-4 md:p-5 flex flex-col flex-grow">
            {/* Category */}
            <div className="mb-2">
              <span className="category-badge bg-secondary text-secondary-foreground">
                {article.category.name}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
