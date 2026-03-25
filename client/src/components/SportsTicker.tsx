import { useState, useEffect } from "react";
import { Trophy, TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { getArticlesByCategory } from "@/lib/sanityClient";

export default function SportsTicker() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSports() {
      try {
        const data = await getArticlesByCategory("sports");
        if (!data || data.length === 0) {
           setArticles([
            { _id: 's1', title: "Black Stars Prepare for AFCON Qualifiers", slug: "black-stars-afcon" },
            { _id: 's2', title: "Kotoko eyes first place in GPL", slug: "kotoko-top-spot" },
            { _id: 's3', title: "Iñaki Williams on top form in Spain", slug: "inaki-williams-form" },
            { _id: 's4', title: "Ashanti Gold: Regional Sports updates", slug: "ashanti-gold" }
           ]);
        } else {
           setArticles(data.slice(0, 10));
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch sports for ticker:", err);
        setLoading(false);
      }
    }
    loadSports();
  }, []);

  if (loading) return null;
  
  if (articles.length === 0) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden border-y border-red-800 shadow-inner">
      <div className="container flex items-center">
        {/* Label */}
        <div className="flex items-center gap-2 bg-red-800 px-4 py-1 skew-x-[-12deg] mr-8 shrink-0 shadow-md">
          <Trophy className="w-4 h-4 skew-x-[12deg]" />
          <span className="font-black italic uppercase tracking-tighter text-sm skew-x-[12deg]">
            Sports Update
          </span>
        </div>

        {/* Scrolling Content */}
        <div className="relative flex-grow h-6 flex items-center">
          <div className="absolute whitespace-nowrap animate-marquee flex items-center gap-12">
            {articles.map((article) => (
              <Link key={article._id} href={`/news/${article.slug}`}>
                <a className="flex items-center gap-2 hover:underline decoration-2 underline-offset-4 group">
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></div>
                  <span className="font-bold text-sm tracking-tight">{article.title}</span>
                  <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                </a>
              </Link>
            ))}
            {/* Duplicate for seamless loop */}
            {articles.map((article) => (
              <Link key={`${article._id}-dup`} href={`/news/${article.slug}`}>
                <a className="flex items-center gap-2 hover:underline decoration-2 underline-offset-4 group">
                   <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></div>
                  <span className="font-bold text-sm tracking-tight">{article.title}</span>
                   <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                </a>
              </Link>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="hidden md:flex items-center gap-1 shrink-0 ml-8 text-[10px] font-black uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
          <Link href="/category/sports">View All</Link>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
