import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, Menu, X, Facebook, Twitter, Instagram, Radio, PlayCircle, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import WeatherWidget from "@/components/WeatherWidget";
import { usePlayer } from "@/contexts/PlayerContext";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const { togglePlay, isPlaying } = usePlayer();

  useEffect(() => {
    const formatted = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b-4 border-primary shadow-sm font-sans">
      {/* Top Bar - Date and Socials */}
      <div className="bg-secondary text-secondary-foreground py-1 hidden lg:block border-b border-border/50">
        <div className="container flex items-center justify-between text-xs h-9">
          <div className="flex items-center gap-6">
            <div className="font-bold opacity-80 pl-2 uppercase tracking-tight text-[10px]">{currentDate}</div>
            <div className="h-4 w-[1px] bg-border/40"></div>
            <WeatherWidget />
          </div>
          <div className="flex items-center gap-4 pr-2">
            <span className="font-bold uppercase tracking-widest text-[10px] opacity-80">Follow Us</span>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="#" aria-label="Twitter" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
              <a href="#" aria-label="Instagram" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Area */}
          <Link href="/">
            <a className="flex items-center hover:opacity-90 transition-opacity shrink-0 group">
              <div className="bg-primary text-primary-foreground px-3 py-1.5 font-black text-3xl tracking-tighter italic mr-2 group-hover:bg-red-700 transition-colors shadow-sm">
                EZRA
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-black text-lg text-foreground uppercase tracking-tight">Radio & TV</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Your News Hub</span>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center flex-grow mx-8 gap-7 font-black text-[14px] uppercase tracking-wider">
            <Link href="/" className="text-foreground hover:text-primary transition-all border-b-2 border-transparent hover:border-primary py-2">Home</Link>
            <Link href="/live-tv" className="text-primary hover:opacity-80 transition-all border-b-2 border-transparent hover:border-primary py-2 flex items-center gap-1.5"><Tv className="w-3.5 h-3.5" /> Live TV</Link>
            <Link href="/category/politics" className="text-foreground hover:text-primary transition-all border-b-2 border-transparent hover:border-primary py-2">Politics</Link>
            <Link href="/category/local-news" className="text-foreground hover:text-primary transition-all border-b-2 border-transparent hover:border-primary py-2">Local</Link>
            <Link href="/category/business" className="text-foreground hover:text-primary transition-all border-b-2 border-transparent hover:border-primary py-2">Business</Link>
            <Link href="/category/sports" className="text-foreground hover:text-primary transition-all border-b-2 border-transparent hover:border-primary py-2">Sports</Link>
            <Link href="/category/entertainment" className="text-foreground hover:text-primary transition-all border-b-2 border-transparent hover:border-primary py-2">Showbiz</Link>
            <Link href="/programs" className="text-primary font-black scale-110 hover:opacity-80 transition-all border-b-2 border-transparent hover:border-primary py-2">Schedule</Link>
          </div>

          {/* Right Actions: Listen Live & Search & Menu */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <Button 
               onClick={togglePlay}
               className={cn(
                 "hidden md:flex gap-2 font-bold uppercase tracking-tight shadow-md rounded-none transition-all",
                 isPlaying ? "bg-red-800 text-white" : "bg-primary hover:bg-red-700 text-primary-foreground"
               )}
            >
              <Radio className={cn("w-4 h-4 relative top-[-1px]", isPlaying && "animate-pulse")} />
              {isPlaying ? "Now Playing" : "Listen Live"}
            </Button>
            
            <Button
              onClick={onSearchClick}
              className="bg-transparent hover:bg-secondary text-foreground border border-border/50 rounded-none w-10 h-10 p-0"
              aria-label="Search"
            >
              <Search className="w-5 h-5 flex-shrink-0" />
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-transparent hover:bg-secondary border border-border/50 text-foreground transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-in slide-in-from-top-4 fade-in duration-200">
             <Button 
                onClick={() => {
                  togglePlay();
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "w-full gap-2 font-black uppercase mb-6 rounded-none h-12 shadow-sm text-base",
                  isPlaying ? "bg-red-800 text-white" : "bg-primary hover:bg-red-700 text-primary-foreground"
                )}
              >
              <PlayCircle className={cn("w-5 h-5", isPlaying && "animate-pulse")} />
              {isPlaying ? "Playing Radio..." : "Listen Live"}
            </Button>
            <div className="grid grid-cols-2 gap-3 px-1 font-black uppercase text-[13px] tracking-wide">
              <Link href="/"><a onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center p-4 bg-secondary shadow-sm border border-border/30 hover:border-primary hover:text-primary transition-all">Home</a></Link>
              <Link href="/category/politics"><a onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center p-4 bg-secondary shadow-sm border border-border/30 hover:border-primary hover:text-primary transition-all">Politics</a></Link>
              <Link href="/category/local-news"><a onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center p-4 bg-secondary shadow-sm border border-border/30 hover:border-primary hover:text-primary transition-all">Local News</a></Link>
              <Link href="/category/business"><a onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center p-4 bg-secondary shadow-sm border border-border/30 hover:border-primary hover:text-primary transition-all">Business</a></Link>
              <Link href="/category/sports"><a onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center p-4 bg-secondary shadow-sm border border-border/30 hover:border-primary hover:text-primary transition-all">Sports</a></Link>
              <Link href="/category/entertainment"><a onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center p-4 bg-secondary shadow-sm border border-border/30 hover:border-primary hover:text-primary transition-all">Showbiz</a></Link>
              <Link href="/programs"><a onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center p-4 bg-primary text-white shadow-lg border border-primary hover:bg-black transition-all col-span-2">View Full Schedule</a></Link>
            </div>
            
            <div className="flex justify-center gap-8 pt-6 pb-2 border-t border-border mt-6">
              <a href="#" aria-label="Facebook" className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" aria-label="Twitter" className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" aria-label="Instagram" className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"><Instagram className="w-6 h-6" /></a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
