import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface TopStoriesSliderProps {
  articles: any[];
}

export default function TopStoriesSlider({ articles }: TopStoriesSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    
    // Auto-play
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(interval);
    };
  }, [emblaApi, onSelect]);

  const validArticles = (articles || []).filter(a => !!a);

  if (validArticles.length === 0) return null;

  return (
    <div className="relative group">
      {/* Viewport */}
      <div className="overflow-hidden rounded-xl shadow-2xl" ref={emblaRef}>
        <div className="flex">
          {validArticles.map((article) => (
            <div key={article._id || Math.random()} className="flex-[0_0_100%] min-w-0 relative h-[450px] md:h-[550px]">
              {/* Background Image */}
              <img
                src={article.featuredImage?.asset?.url || article.featuredImage?.url}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                <div className="container max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-sm shadow-lg">
                        {article.category?.name || "Top Story"}
                      </span>
                      <div className="flex items-center gap-1.5 text-white/70 text-xs font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tighter drop-shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                      {article.title}
                    </h2>
                    
                    <p className="text-white/80 text-sm md:text-lg mb-8 max-w-2xl line-clamp-2 md:line-clamp-3 font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                      {article.excerpt}
                    </p>
                    
                    <Link href={`/news/${article.slug}`}>
                      <a className="inline-flex items-center gap-2 bg-white text-black hover:bg-primary hover:text-white px-8 py-4 font-black uppercase tracking-tighter transition-all duration-300 transform hover:translate-x-2 rounded-sm shadow-xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                        Read Full Story
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          onClick={scrollPrev}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black pointer-events-auto shadow-2xl transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          onClick={scrollNext}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black pointer-events-auto shadow-2xl transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
        {validArticles.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-full shadow-lg",
              selectedIndex === i ? "w-10 bg-primary" : "w-3 bg-white/40 hover:bg-white/60"
            )}
            title={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
