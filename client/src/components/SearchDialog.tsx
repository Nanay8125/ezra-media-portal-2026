import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchArticles, NewsArticle } from "@/lib/mockData";
import { Search } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NewsArticle[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchArticles(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search News</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search articles by title, category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4"
              autoFocus
            />
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((article) => (
                  <Link key={article._id} href={`/news/${article.slug}`}>
                    <a
                      onClick={handleClose}
                      className="block p-3 rounded-lg hover:bg-secondary transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={article.featuredImage.url}
                          alt={article.featuredImage.alt}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {article.category.name} •{" "}
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No articles found for "{query}"</p>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Start typing to search articles</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
