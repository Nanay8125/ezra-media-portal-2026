import { useState, useEffect } from "react";
import { X, ArrowRight, Zap } from "lucide-react";
import { Link } from "wouter";
import { getBreakingNews } from "@/lib/sanityClient";

export default function BreakingNewsAlert() {
  const [news, setNews] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function checkBreaking() {
      try {
        const data = await getBreakingNews();
        if (data) {
          // Compare with a local key to see if user has already dismissed THIS specific news item
          const dismissedId = localStorage.getItem("breaking-news-dismissed");
          if (dismissedId !== data._id) {
            setNews(data);
            setIsVisible(true);
          }
        }
      } catch (err) {
        console.error("Checking breaking news failed:", err);
      }
    }
    
    checkBreaking();
    // Re-check for new breaking stories every 2 minutes
    const interval = setInterval(checkBreaking, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const dismiss = () => {
    if (news?._id) {
      localStorage.setItem("breaking-news-dismissed", news._id);
    }
    setIsVisible(false);
  };

  if (!news || !isVisible) return null;

  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 md:right-10 z-[60] max-w-[340px] md:max-w-[400px] animate-in slide-in-from-right-10 fade-in duration-700 delay-500">
      <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-primary via-red-600 to-secondary shadow-[0_20px_60px_-15px_rgba(220,38,38,0.5)] group overflow-hidden">
        
        {/* Animated Background Pulse */}
        <div className="absolute inset-0 bg-primary opacity-20 animate-pulse"></div>

        <div className="relative bg-background text-foreground rounded-[14px] overflow-hidden">
          
          {/* Header */}
          <div className="bg-primary text-white py-2 px-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 fill-white animate-pulse" />
              <span className="font-black italic uppercase tracking-widest text-[10px] sm:text-[11px] leading-none antialiased">Breaking Alert</span>
            </div>
            <button 
              onClick={dismiss}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <h3 className="font-black text-xl md:text-2xl leading-[1.1] mb-3 tracking-tighter uppercase italic text-foreground text-pretty">
               {news.title}
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm mb-6 line-clamp-2 md:line-clamp-3 font-medium leading-relaxed">
               {news.excerpt}
            </p>
            
            <Link href={`/news/${news.slug}`}>
              <a 
                onClick={dismiss}
                className="flex items-center justify-center gap-2.5 bg-primary text-white font-black uppercase tracking-tighter py-4 rounded-xl hover:bg-black transition-all hover:gap-4 shadow-lg active:scale-95"
              >
                Full Breaking Story
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
          </div>
          
          {/* Subheader/Status */}
          <div className="px-6 pb-4 flex items-center justify-between">
             <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">Live Report</span>
             </div>
             <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">
                Ezra Network Newsroom
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}
