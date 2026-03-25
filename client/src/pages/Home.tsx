import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import SearchDialog from "@/components/SearchDialog";
import NewsletterSignup from "@/components/NewsletterSignup";
import CategoryList from "@/components/CategoryList";
import TrendingTopics from "@/components/TrendingTopics";
import AdSlot from "@/components/AdSlot";
import { setSEOMetadata, generateHomeMetadata } from "@/lib/seo";
import { Newspaper, Loader2 } from "lucide-react";

import { getArticles } from "@/lib/sanityClient";
import SportsTicker from "@/components/SportsTicker";
import TopStoriesSlider from "@/components/TopStoriesSlider";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSEOMetadata(generateHomeMetadata());
    
    getArticles()
      .then(data => {
        if (!data || data.length === 0) {
          // Add high-impact placeholders for the user to see the design
          setArticles([
            {
              _id: "p1",
              title: "Ezra Radio Breaking: New Infrastructure Projects Launched in Ashanti Region",
              excerpt: "Traditional rulers and government officials gathered today for the grand opening which promises 5,000 new jobs for local youth.",
              featured: true,
              publishedAt: new Date().toISOString(),
              slug: "infrastructure-launch-ashanti",
              category: { name: "Local News" },
              featuredImage: { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop" }
            },
            {
              _id: "p2",
              title: "Ghana's Tech Growth: Accra Becomes Digital Hub for West Africa",
              excerpt: "Global tech giants are opening regional headquarters in Accra as the startup ecosystem matures and draws record investment.",
              featured: true,
              publishedAt: new Date().toISOString(),
              slug: "accra-digital-hub",
              category: { name: "Business" },
              featuredImage: { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop" }
            }
          ]);
        } else {
          setArticles(data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const featuredArticles = (articles || []).filter(a => a?.featured).slice(0, 5);
  const mainFeatured = featuredArticles[0] || articles[0];
  const validTopStories = featuredArticles.length > 0 ? featuredArticles : (mainFeatured ? [mainFeatured] : []);
  const latestArticles = (articles || []).filter(a => a?._id !== mainFeatured?._id && !featuredArticles.some(f => f?._id === a?._id)).slice(0, 9);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <SportsTicker />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="flex-grow">
        {/* Hero Section with Top Stories Slider */}
        <section className="bg-secondary/5 border-b border-border py-4 md:py-8">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Slider - 2/3 width */}
                <div className="lg:col-span-2">
                  <TopStoriesSlider articles={validTopStories} />
                </div>

                {/* Sidebar - 1/3 width */}
                <aside className="space-y-8 pt-2">
                  <TrendingTopics />
                  <AdSlot />
                  
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-4">
                       <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                       <h3 className="font-black uppercase tracking-widest text-sm text-foreground">Explore Categories</h3>
                    </div>
                    <CategoryList />
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                     <NewsletterSignup />
                  </div>
                </aside>
              </div>
            </div>
          </section>

        {/* Latest News Section */}
        <section className="container py-12 md:py-16">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Latest News
              </h2>
            </div>
            <div className="w-12 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary text-secondary-foreground py-12 md:py-16 border-t border-border">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Never Miss a Story
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Get the latest news from your radio station delivered directly to
              your inbox. Subscribe to our newsletter for daily updates.
            </p>
            <NewsletterSignup />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
