import { useState, useEffect } from "react";
import { Flame, TrendingUp, Hash, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { getTrendingTopics } from "@/lib/sanityClient";

export default function TrendingTopics() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingTopics().then(data => {
      if (!data || data.length === 0) {
        setTopics([
          { keyword: "Kumasi Market", engagement: "1.2k" },
          { keyword: "2024 Elections", engagement: "890" },
          { keyword: "Black Stars", engagement: "750" },
          { keyword: "Digital Ghana", engagement: "540" },
          { keyword: "Fuel Prices", engagement: "420" },
          { keyword: "AFCON 2025", engagement: "310" },
        ]);
      } else {
        setTopics(data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-12 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" /></div>;

  return (
    <div className="bg-secondary p-6 rounded-xl border border-border/50 shadow-lg relative overflow-hidden group">
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
             <Flame className="w-4 h-4 text-white fill-white" />
          </div>
          <h3 className="font-black uppercase tracking-widest text-sm text-secondary-foreground antialiased">Trending Topics</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {topics.map((topic, i) => (
            <Link key={topic._id || i} href={`/category/local-news`}>
              <a className="flex items-center justify-between group/item p-1 -m-1 rounded-lg hover:bg-white/5 transition-all outline-none">
                <div className="flex items-center gap-3">
                   <span className="font-black text-primary text-[10px] opacity-40 group-hover/item:opacity-100 transition-opacity">0{i+1}</span>
                   <div className="flex flex-col">
                      <span className="font-bold text-sm text-secondary-foreground group-hover/item:text-primary transition-colors tracking-tight">#{topic.keyword || topic.title}</span>
                      <div className="flex items-center gap-1.5 opacity-40">
                         <TrendingUp className="w-2.5 h-2.5" />
                         <span className="text-[9px] font-black uppercase tracking-widest">{topic.engagement || topic.count} reads</span>
                      </div>
                   </div>
                </div>
                {topic.isRising && <Flame className="w-3 h-3 text-red-500 animate-bounce" />}
              </a>
            </Link>
          ))}
        </div>

        <button className="w-full mt-8 py-3 bg-white/5 hover:bg-primary hover:text-white border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-secondary-foreground/60 transition-all shadow-inner">
           View All Hot Topics
        </button>
      </div>
    </div>
  );
}
