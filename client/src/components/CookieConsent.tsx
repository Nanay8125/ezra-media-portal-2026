import { useState, useEffect } from "react";
import { X, ShieldCheck, ArrowRight, Settings } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookie-consent");
    if (!hasConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-8 animate-in slide-in-from-bottom-20 fade-in duration-700">
      <div className="container max-w-6xl mx-auto">
        <div className="bg-secondary/95 backdrop-blur-xl border border-border/80 shadow-[0_30px_100px_rgba(0,0,0,0.25)] rounded-2xl md:rounded-[32px] overflow-hidden p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative">
          
          {/* Decorative Pattern */}
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
             <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl md:rounded-[24px] flex items-center justify-center shrink-0 border border-primary/20">
                <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-primary" />
             </div>
             <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic text-foreground leading-none">Privacy First</h3>
                <p className="text-muted-foreground text-sm md:text-base font-medium max-w-xl leading-relaxed">
                   We use cookies to enhance your radio and TV streaming experience. By clicking "Accept", you agree to our data usage as outlined in our 
                   <Link href="/privacy"><a className="text-primary font-bold mx-1 hover:underline underline-offset-4">Privacy Policy</a></Link>.
                </p>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
             <button 
               onClick={accept}
               className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-black uppercase tracking-tighter rounded-xl hover:bg-black hover:scale-105 transition-all shadow-xl group flex items-center justify-center gap-2"
             >
                Continue Streaming
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
             </button>
             <Link href="/terms">
               <a className="w-full sm:w-auto px-8 py-3 bg-white/50 border border-border text-foreground/60 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all text-center">
                  Terms Only
               </a>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
