import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("https://d2xsxph8kpxj0f.cloudfront.net/118112117/eMZ4Hk2wvSPVqvPkCk3mQz/hero-broadcast-studio-bRrs9PrCcTR4qc7QGQXP9P.webp");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) setCategoryId(data[0].id);
      })
      .catch(err => console.error("Could not load categories", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          body,
          featuredImageUrl,
          categoryId,
          featured: true, // We'll set it to featured by default for testing
        }),
      });

      if (res.ok) {
        toast.success("News successfully published!");
        setTitle("");
        setExcerpt("");
        setBody("");
      } else {
        toast.error("Failed to publish news.");
      }
    } catch (error) {
      toast.error("An error occurred while publishing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onSearchClick={() => {}} />

      <main className="flex-grow container py-12 max-w-3xl border border-border p-8 rounded-lg mt-8 mb-8 bg-card shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-foreground border-b border-border pb-4">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Publish breaking news articles directly to the live database.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Headline (Title)</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="E.g., Local Election Results Announced"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              aria-label="Category"
              required
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Excerpt (Short Summary)</label>
            <input
              type="text"
              required
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="A brief 1-sentence wrap-up of the event."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Featured Image URL</label>
            <input
              type="url"
              required
              value={featuredImageUrl}
              onChange={e => setFeaturedImageUrl(e.target.value)}
              className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Story (Body)</label>
            <textarea
              required
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={8}
              className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write your news article here..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish Article"}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
