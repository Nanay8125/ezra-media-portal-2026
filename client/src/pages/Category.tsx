import { Link, useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import SearchDialog from "@/components/SearchDialog";
import { useState, useEffect } from "react";
import { setSEOMetadata, generateCategoryMetadata } from "@/lib/seo";
import { ChevronRight, Loader2 } from "lucide-react";

import { getCategories, getArticlesByCategory } from "@/lib/sanityClient";

export default function Category() {
  const [match, params] = useRoute("/category/:slug");
  const [searchOpen, setSearchOpen] = useState(false);
  const categorySlug = params?.slug;
  const [category, setCategory] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) return;
    setIsLoading(true);
    Promise.all([
      getCategories(),
      getArticlesByCategory(categorySlug)
    ])
      .then(([cats, arts]) => {
        setAllCategories(cats);
        const cat = cats.find((c: any) => c.slug === categorySlug);
        setCategory(cat || { name: categorySlug, slug: categorySlug });
        setArticles(arts);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [categorySlug]);

  useEffect(() => {
    if (category) {
      setSEOMetadata(
        generateCategoryMetadata(
          category.name,
          category.description || `Read the latest ${category.name} articles`,
          window.location.href
        )
      );
    }
  }, [category]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar onSearchClick={() => setSearchOpen(true)} />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!match || !category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar onSearchClick={() => setSearchOpen(true)} />
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        <main className="flex-grow container py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Category Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The category you're looking for doesn't exist.
            </p>
            <Link href="/">
              <a className="text-primary hover:underline font-medium">
                Back to Home
              </a>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="flex-grow">
        {/* Category Header */}
        <section className="bg-secondary text-secondary-foreground py-12 md:py-16 border-b border-border" aria-label={`${category?.name} category`}>
          <div className="container">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-6 opacity-75">
              <Link href="/">
                <a className="hover:opacity-100 transition-opacity">Home</a>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span>{category.name}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg opacity-90 max-w-2xl">
                {category.description}
              </p>
            )}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="container py-12 md:py-16">
          {articles.length > 0 ? (
            <div>
              <p className="text-muted-foreground mb-8">
                Showing {articles.length} article{articles.length !== 1 ? "s" : ""}{" "}
                in {category.name}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-6">
                No articles found in this category yet.
              </p>
              <Link href="/">
                <a className="text-primary hover:underline font-medium">
                  Back to Home
                </a>
              </Link>
            </div>
          )}
        </section>

        {/* Other Categories */}
        <section className="bg-secondary border-t border-border py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-8">
              Other Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {allCategories
                .filter((c: any) => c._id !== category._id)
                .map((cat: any) => (
                  <Link key={cat._id} href={`/category/${cat.slug}`}>
                    <a className="block p-4 rounded-lg bg-card border border-border hover:border-primary hover:bg-background transition-all duration-200 text-center text-sm font-medium text-secondary-foreground hover:text-primary">
                      {cat.name}
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
