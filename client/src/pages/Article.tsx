import { useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import { useState, useEffect } from "react";
import SearchDialog from "@/components/SearchDialog";
import { setSEOMetadata, generateArticleMetadata } from "@/lib/seo";
import { getArticleComments, initializeSampleComments, Comment } from "@/lib/comments";
import { PortableText } from '@portabletext/react';
import { getArticleBySlug, getArticlesByCategory, urlFor } from "@/lib/sanityClient";
import { 
  Calendar, User, Share2, Facebook, Twitter, Linkedin, 
  Mail, MessageCircle, Loader2, Headphones, Image as ImageIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Custom configurations for embedded Sanity blocks
const myPortableTextComponents = {
  types: {
    youtube: ({ value }: any) => {
      if (!value?.url) return null;
      const url = new URL(value.url);
      const id = url.searchParams.get("v") || url.pathname.split("/").pop();
      return (
        <div className="my-8 aspect-video w-full">
          <iframe 
            src={`https://www.youtube.com/embed/${id}`} 
            title="YouTube video player"
            className="w-full h-full rounded-lg shadow-lg border-2 border-primary"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    },
    audio: ({ value }: any) => {
      if (!value?.asset?.url) return null;
      return (
        <div className="my-8 p-6 bg-secondary rounded-lg border-l-4 border-primary shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
             <Headphones className="w-6 h-6 text-primary" />
             <span className="font-bold text-lg">Listen to Podcast</span>
          </div>
          {value.title && <p className="text-sm opacity-80">{value.title}</p>}
          <audio controls className="w-full mt-2">
            <source src={value.asset.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    },
    gallery: ({ value }: any) => {
      if (!value?.images || value.images.length === 0) return null;
      return (
        <div className="my-10 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <h3 className="text-xl font-bold uppercase tracking-wider">Photo Gallery</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {value.images.map((img: any, i: number) => (
               <div key={i} className="group relative overflow-hidden rounded-lg shadow-md aspect-[4/3]">
                 <img 
                    src={img.asset?.url || urlFor(img)?.url() || ""} 
                    alt={img.alt || `Gallery image ${i+1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 />
                 {img.caption && (
                   <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     {img.caption}
                   </div>
                 )}
               </div>
            ))}
          </div>
        </div>
      );
    }
  }
};
export default function Article() {
  const [match, params] = useRoute("/news/:slug");
  const [searchOpen, setSearchOpen] = useState(false);
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize sample comments on first load
  useEffect(() => {
    initializeSampleComments();
  }, []);

  useEffect(() => {
    if (params?.slug) {
      setIsLoading(true);
      getArticleBySlug(params.slug)
        .then(foundArticle => {
          setArticle(foundArticle || null);
          if (foundArticle?.category?.slug) {
             return getArticlesByCategory(foundArticle.category.slug);
          }
          return [];
        })
        .then(categoryArticles => {
           const relations = categoryArticles.filter((a: any) => a.slug !== params?.slug).slice(0, 3);
           setRelatedArticles(relations);
           setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [params?.slug]);

  useEffect(() => {
    if (article) {
      setSEOMetadata(
        generateArticleMetadata(
          article.title,
          article.excerpt,
          article.featuredImage?.asset?.url || article.featuredImage?.url || '',
          article.author?.name || 'Editorial Team',
          article.publishedAt,
          window.location.href
        )
      );
      // Load comments for this article
      const articleComments = getArticleComments(article.slug);
      setComments(articleComments);
    }
  }, [article]);

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

  if (!match || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar onSearchClick={() => setSearchOpen(true)} />
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        <main className="flex-grow container py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Article Not Found
            </h1>
            <p className="text-muted-foreground">
              The article you're looking for doesn't exist.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article.title;
    
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
    toast.success("Shared successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="flex-grow">
        {/* Featured Image */}
        <div className="w-full h-96 md:h-[500px] overflow-hidden">
          <img
            src={article.featuredImage?.asset?.url || article.featuredImage?.url}
            alt={article.featuredImage?.alt || article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="container py-8 md:py-12" itemScope itemType="https://schema.org/NewsArticle">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="category-badge bg-secondary text-secondary-foreground">
                  {article.category?.name || "News"}
                </span>
              </div>

              <h1 className="article-title mb-4">{article.title}</h1>

              <p className="article-subtitle">{article.excerpt}</p>

              {/* Meta Information */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6 pt-6 border-t border-border text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>By {article.author?.name || "Editorial Team"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2 mb-8 pb-8 border-b border-border">
              <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                <Share2 className="w-4 h-4" />
                Share:
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("facebook")}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("twitter")}
                className="hover:bg-blue-50 hover:text-blue-400"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("linkedin")}
                className="hover:bg-blue-50 hover:text-blue-700"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("email")}
                className="hover:bg-gray-50"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none text-foreground">
              {Array.isArray(article.body) ? (
                <PortableText value={article.body} components={myPortableTextComponents} />
              ) : (
                article.body?.split("\n\n").map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 leading-relaxed text-base md:text-lg">
                    {paragraph}
                  </p>
                ))
              )}
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-border bg-secondary rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">About the Author</h3>
              <p className="text-secondary-foreground">
                <strong>{article.author?.name || "Editorial Team"}</strong>
              </p>
              {article.author?.bio && (
                <p className="text-secondary-foreground text-sm mt-1">
                  {article.author.bio}
                </p>
              )}
            </div>

            {/* Comments Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-2 mb-8">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Comments ({comments.length})
                </h2>
              </div>

              {/* Comment Form */}
              <div className="mb-12">
                <CommentForm
                  articleSlug={article.slug}
                  onCommentAdded={() => {
                    const updatedComments = getArticleComments(article.slug);
                    setComments(updatedComments);
                  }}
                />
              </div>

              {/* Comments List */}
              <CommentList
                comments={comments}
                articleSlug={article.slug}
                onCommentAdded={() => {
                  const updatedComments = getArticleComments(article.slug);
                  setComments(updatedComments);
                }}
              />
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="bg-secondary border-t border-border py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-8">
              More News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard
                  key={relatedArticle._id}
                  article={relatedArticle}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
