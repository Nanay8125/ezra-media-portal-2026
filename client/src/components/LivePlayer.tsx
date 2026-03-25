import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Radio, X, ExternalLink, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/contexts/PlayerContext";
import { cn } from "@/lib/utils";

export default function LivePlayer() {
  const { isPlaying, setIsPlaying, togglePlay } = usePlayer();
  const [isVisible, setIsVisible] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sample streaming URL (replace with actual stream URL)
  const streamUrl = "https://stream.zeno.fm/ezraradio"; // Placeholder, can be any MP3 stream

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  if (!isVisible && !isPlaying) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out",
      (!isPlaying && !isVisible) ? "translate-y-full" : "translate-y-0"
    )}>
      {/* Background with Blur */}
      <div className="bg-secondary/95 backdrop-blur-md border-t-4 border-primary shadow-[0_-8px_30px_rgb(0,0,0,0.12)] px-4 py-3 md:py-4">
        <div className="container max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Station Info */}
          <div className="flex items-center gap-3 md:gap-4 flex-1">
            <div className="relative group">
               <div className={cn(
                 "w-12 h-12 md:w-14 md:h-14 bg-primary flex items-center justify-center rounded-sm shadow-lg border-2 border-white/10 overflow-hidden",
                 isPlaying && "animate-pulse"
               )}>
                 <Radio className="w-6 h-6 md:w-8 md:h-8 text-white" />
               </div>
               {isPlaying && (
                 <div className="absolute -top-1 -right-1 flex gap-0.5">
                    <Activity className="w-4 h-4 text-red-400 animate-bounce" />
                 </div>
               )}
            </div>
            
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                 <span className="bg-red-600 text-[9px] text-white font-black px-1.5 rounded-full animate-pulse uppercase tracking-wider">Live</span>
                 <h3 className="font-black text-white text-sm md:text-base uppercase tracking-tight truncate">Ezra Radio & TV</h3>
              </div>
              <p className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-widest truncate">Broadcasting from Kumasi, Ghana</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 md:gap-6 flex-1">
            <Button
              size="icon"
              variant="outline"
              onClick={togglePlay}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-primary hover:bg-white/90 hover:scale-105 border-0 shadow-xl transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6 md:w-8 md:h-8 fill-primary" /> : <Play className="w-6 h-6 md:w-8 md:h-8 fill-primary ml-1" />}
            </Button>
          </div>

          {/* Volume & Close */}
          <div className="hidden sm:flex items-center justify-end gap-6 flex-1">
            <div className="flex items-center gap-3 group">
              <button onClick={() => setIsMuted(!isMuted)}>
                {isMuted || volume === 0 ? <VolumeX className="text-white/60 w-5 h-5" /> : <Volume2 className="text-white/80 w-5 h-5 group-hover:text-white" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                title="Volume Control"
                className="w-20 md:w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
            
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                if(isPlaying) setIsPlaying(false);
                setIsVisible(false);
              }}
              className="text-white/40 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Mobile close only */}
          <div className="sm:hidden">
             <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  if(isPlaying) setIsPlaying(false);
                  setIsVisible(false);
                }}
                className="text-white/40"
              >
                <X className="w-5 h-5" />
              </Button>
          </div>
        </div>
      </div>
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={streamUrl} preload="none" />
    </div>
  );
}
