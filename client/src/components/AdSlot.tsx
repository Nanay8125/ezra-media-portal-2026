import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Megaphone, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAds } from "@/lib/sanityClient";

interface AdSlotProps {
  className?: string;
  type?: "sidebar" | "banner" | "inline";
}

export default function AdSlot({ className, type = "sidebar" }: AdSlotProps) {
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isSidebar = type === "sidebar";
  const isInline = type === "inline";

  useEffect(() => {
    getAds().then(allAds => {
      // Find one that matches the type or just take the first
      const matchedAd = allAds.find(a => a.slotType === type) || allAds[0];
      setAd(matchedAd);
      setLoading(false);
    });
  }, [type]);

  if (loading) return (
    <div className={cn("animate-pulse bg-secondary/5 border-2 border-dashed border-border/50 rounded-xl", isSidebar ? "aspect-[3/4]" : "h-24")}>
      <Loader2 className="w-4 h-4 animate-spin m-auto" />
    </div>
  );

  if (ad && ad.image) {
    return (
      <a href={ad.link} target="_blank" rel="noopener noreferrer" className={cn("block relative group overflow-hidden rounded-xl", className)}>
        <img src={ad.image} alt={ad.companyName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-[8px] font-black uppercase text-white/60 px-2 py-0.5 rounded-sm tracking-widest border border-white/10">Sponsored</div>
      </a>
    );
  }

  return (

    <div className={cn(
      "relative group w-full bg-secondary/5 border-2 border-dashed border-border/50 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center transition-all hover:border-primary/40 hover:bg-primary/[0.02]",
      isSidebar ? "aspect-[3/4]" : "min-h-[150px] md:min-h-[250px]",
      className
    )}>
      {/* Decorative Brand Circles */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
      
      <div className="relative z-10 space-y-4">
        <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform">
           <Megaphone className="w-6 h-6 text-primary" />
        </div>
        
        <div className="space-y-1">
           <h4 className="font-black uppercase tracking-tighter text-lg leading-tight">Your Ad Here</h4>
           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Reach 1M+ Readers Daily</p>
        </div>
        
        <Link href="/advertise">
          <a className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-sm font-black uppercase tracking-tighter text-[10px] shadow-lg hover:bg-black transition-all">
            Advertise Now
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Link>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  );
}
