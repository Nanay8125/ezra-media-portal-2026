import { useState, useEffect } from "react";
import { Brain, Activity, Clock, ChevronDown, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Highlight {
  time: string;
  second: number;
  description: string;
  impact: "low" | "medium" | "high";
}

export default function LiveAIPanel() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [summary, setSummary] = useState("");
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    // Simulate AI Processing
    const timer = setTimeout(() => {
       setIsAnalyzing(false);
       setSummary("The current broadcast is focusing on the upcoming economic policy changes in the Ashanti Region. The panel is discussing the impact of new trade regulations on local market vendors in Kumasi, with a particular focus on digital payment adoption.");
       setHighlights([
         { time: "18:25", second: 1105, description: "Host introduces the Ashanti Region regional trade panel.", impact: "medium" },
         { time: "18:32", second: 1112, description: "Discussion on new VAT implementation for retailers.", impact: "high" },
         { time: "18:45", second: 1125, description: "Analysis of mobile money transaction trends in Kumasi Central Market.", impact: "high" },
         { time: "18:50", second: 1130, description: "Quick update on local weather patterns for the weekend.", impact: "low" },
         { time: "18:55", second: 1135, description: "Viewer call-in session starts regarding electricity tariffs.", impact: "medium" }
       ]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#161616] rounded-xl border border-white/5 shadow-2xl flex flex-col h-full overflow-hidden group">
      {/* Header */}
      <div className="p-5 border-b border-white/5 bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between">
         <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/20">
               <Brain className="w-4 h-4 text-primary animate-pulse" />
            </div>
            <div>
               <h4 className="text-white font-black uppercase tracking-widest text-[11px] leading-none mb-1">Live AI Analysis</h4>
               <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[9px] font-bold text-emerald-500 tracking-wide uppercase">Processing Stream</span>
               </div>
            </div>
         </div>
         <Sparkles className="w-4 h-4 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex-grow overflow-y-auto p-5 space-y-8 custom-scrollbar">
         {/* Summary Section */}
         <section className="space-y-4">
            <h5 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
               <Activity className="w-3 h-3" /> Current Summary
            </h5>
            {isAnalyzing ? (
              <div className="space-y-2">
                 <div className="h-4 bg-white/5 rounded animate-pulse w-full"></div>
                 <div className="h-4 bg-white/5 rounded animate-pulse w-5/6"></div>
                 <div className="h-4 bg-white/5 rounded animate-pulse w-4/6"></div>
              </div>
            ) : (
              <p className="text-sm text-white/70 leading-relaxed font-medium border-l-2 border-primary/30 pl-4 animate-in fade-in slide-in-from-left-2">
                {summary}
              </p>
            )}
         </section>

         {/* Highlights Section */}
         <section className="space-y-4">
            <h5 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
               <Clock className="w-3 h-3" /> Key Moments
            </h5>
            
            <div className="space-y-3">
               {isAnalyzing ? (
                 [1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 rounded animate-pulse"></div>)
               ) : (
                 highlights.map((h, i) => (
                   <div key={i} className="relative p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group/card active:scale-[0.98]">
                      <div className="flex items-start justify-between gap-4">
                         <div className="space-y-1">
                            <div className="flex items-center gap-2">
                               <span className="px-2 py-0.5 rounded bg-black text-[9px] font-black text-primary border border-primary/20 tracking-tighter shadow-sm">{h.time}</span>
                               <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">({h.second}s)</span>
                            </div>
                            <p className="text-xs text-white/80 font-medium leading-normal">{h.description}</p>
                         </div>
                         <div className={cn(
                           "flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5",
                           h.impact === 'high' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : 
                           h.impact === 'medium' ? "bg-amber-500" : "bg-emerald-500"
                         )}></div>
                      </div>
                   </div>
                 ))
               )}
            </div>
         </section>
      </div>

      <div className="p-4 bg-black/40 border-t border-white/5">
         <div className="flex items-center gap-3 text-[9px] text-white/30 font-bold uppercase tracking-widest justify-center">
            <CheckCircle2 className="w-3 h-3 text-emerald-500/50" />
            VOD Chapters Auto-Generated
         </div>
      </div>
    </div>
  );
}
