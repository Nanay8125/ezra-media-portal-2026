import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchDialog from "@/components/SearchDialog";
import { Tv, Users, MessageCircle, Share2, Info, Activity, Radio, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setSEOMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

import LiveAIPanel from "@/components/LiveAIPanel";

export default function LiveTV() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [viewCount, setViewCount] = useState("458");

  useEffect(() => {
    setSEOMetadata({
      title: "Live TV | Ezra Radio & TV",
      description: "Watch Ezra TV live. Stream the latest news, talk shows, and entertainment directly from our Kumasi studios.",
      image: "",
      url: window.location.href,
      type: "website"
    });

    // Simulate fluctuating view count
    const interval = setInterval(() => {
      const base = parseInt(viewCount);
      const diff = Math.floor(Math.random() * 5) - 2;
      setViewCount((base + diff).toString());
    }, 5000);
    return () => clearInterval(interval);
  }, [viewCount]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="flex-grow bg-[#0c0c0c]">
        {/* Main Player & Grid Layout */}
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Player Column - 3/4 width */}
            <div className="xl:col-span-3 space-y-6">
               <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10">
                  {/* Actual Video Embed Placeholder */}
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/live_stream?channel=ezratv_gh&autoplay=1&mute=0" 
                    title="Ezra TV Live Stream"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-3 pointer-events-none">
                     <div className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-sm shadow-xl border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white antialiased">Live</span>
                     </div>
                     <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-sm shadow-xl border border-white/10">
                        <Users className="w-3.5 h-3.5 text-white/80" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white antialiased">{viewCount} watching</span>
                     </div>
                  </div>
               </div>

               {/* Live Info Section */}
               <div className="bg-[#161616] p-8 rounded-xl border border-white/5 shadow-2xl">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                     <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           <h1 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Ezra TV Live News</h1>
                           <div className="flex items-center gap-1.5 bg-primary/20 text-primary-foreground px-2 py-1 rounded-sm">
                              <Activity className="w-3.5 h-3.5 animate-pulse" />
                              <span className="text-[9px] font-black uppercase tracking-widest antialiased">High Def</span>
                           </div>
                        </div>
                        <p className="text-white/60 text-sm md:text-base font-medium">Broadcasting live from the Ezra Network Media City, Kumasi — Ashanti Region.</p>
                     </div>
                     
                     <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button className="flex-1 md:flex-none bg-primary hover:bg-white hover:text-black text-white font-black uppercase tracking-tighter shadow-lg transition-all rounded-sm h-12">
                           <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                        <Button variant="outline" className="flex-1 md:flex-none border-white/10 text-white hover:bg-white/10 rounded-sm h-12">
                           <Info className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Sidebar Column - AI Panel & Community */}
            <div className="space-y-8">
               {/* New AI Analysis Panel */}
               <LiveAIPanel />

               {/* Live Chat Mockup */}
               <div className="bg-[#161616] rounded-xl border border-white/5 shadow-2xl flex flex-col h-[400px]">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-primary" />
                        <span className="font-black uppercase tracking-widest text-xs text-white">Live Community Chat</span>
                     </div>
                  </div>
                  
                  <div className="flex-grow overflow-y-auto p-4 space-y-4">
                     {[
                       { user: "Kofi Owusu", msg: "Excellent reporting as always! 🇬🇭", color: "text-blue-400" },
                       { user: "Adjoa Mansa", msg: "Greetings from Accra! 📺", color: "text-amber-400" },
                       { user: "Prince Bonsu", msg: "Love this new website experience 🔥", color: "text-emerald-400" },
                     ].map((chat, i) => (
                       <div key={i} className="flex gap-3 text-xs">
                          <span className={cn("font-black tracking-tight shrink-0", chat.color)}>{chat.user}:</span>
                          <span className="text-white/80 font-medium leading-normal">{chat.msg}</span>
                       </div>
                     ))}
                  </div>
                  
                  <div className="p-4 border-t border-white/5">
                     <div className="flex gap-2">
                        <input 
                           type="text" 
                           placeholder="Say something nice..." 
                           className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white outline-none"
                        />
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* Features Bottom Bar */}
        <section className="bg-[#111] border-t border-white/5 py-16">
            <div className="container px-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-4 text-center md:text-left">
                     <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                        <Play className="w-6 h-6 text-white" />
                     </div>
                     <h3 className="text-white font-black uppercase tracking-tighter">On-Demand Library</h3>
                     <p className="text-white/40 text-sm leading-relaxed">Missed a show? Watch all our previous broadcasts anytime on our digital archive.</p>
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                     <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                        <Activity className="w-6 h-6 text-white" />
                     </div>
                     <h3 className="text-white font-black uppercase tracking-tighter">24/7 Connectivity</h3>
                     <p className="text-white/40 text-sm leading-relaxed">Stream consistently with adaptive bitrate technology designed for all network speeds.</p>
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                     <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                        <Users className="w-6 h-6 text-white" />
                     </div>
                     <h3 className="text-white font-black uppercase tracking-tighter">Mobile Ready</h3>
                     <p className="text-white/40 text-sm leading-relaxed">Take Ezra TV everywhere. Optimized for mobile, tablet and desktop browsers.</p>
                  </div>
               </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
