import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchDialog from "@/components/SearchDialog";
import { getPrograms } from "@/lib/sanityClient";
import { Clock, User, Radio, Tv, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setSEOMetadata } from "@/lib/seo";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Programs() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [programs, setPrograms] = useState<any[]>([]);
  const [filter, setFilter] = useState("all"); // 'all', 'radio', 'tv'
  const [activeDay, setActiveDay] = useState(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSEOMetadata({
      title: "Schedule & Hosts | Ezra Radio & TV",
      description: "Discover the full list of Radio and TV programs on Ezra. Meet your favorite hosts and view our daily broadcast schedule.",
      image: "",
      url: window.location.href,
      type: "website"
    });

    getPrograms().then(data => {
      // Mock data if Sanity returns empty (user can populate later)
      if (!data || data.length === 0) {
        setPrograms([
          { _id: '1', title: "Ezra Morning Show", type: "radio", host: { name: "Omanhene Kwabena Asante" }, time: "06:00 AM - 10:00 AM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "The biggest political talk show in the Ashanti Region." },
          { _id: '2', title: "Ezra Drive", type: "radio", host: { name: "Captain Smart" }, time: "03:00 PM - 06:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], description: "Music, infotainment, and the latest news for your drive home." },
          { _id: '3', title: "Sports Flash", type: "tv", host: { name: "Dan Kwaku Yeboah" }, time: "12:00 PM - 01:00 PM", days: ["Monday", "Wednesday", "Friday", "Sunday"], description: "Latest sports updates from around the world." },
          { _id: '4', title: "Sunday Gospel", type: "radio", host: { name: "Adom Kyei-Duah" }, time: "08:00 AM - 12:00 PM", days: ["Sunday"], description: "A soulful morning of worship and praise." },
          { _id: '5', title: "Mid-Day News", type: "tv", host: { name: "Naa Ayeley" }, time: "12:00 PM - 02:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], description: "Comprehensive news coverage from the heart of the capital." },
          { _id: '6', title: "Night Watch", type: "radio", host: { name: "Emma Darko" }, time: "10:00 PM - 12:00 AM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], description: "Late-night melodies and heartfelt conversations." }
        ]);
      } else {
        setPrograms(data);
      }
      setIsLoading(false);
    });
  }, []);

  const filteredPrograms = programs.filter(p => {
    const typeMatch = filter === "all" || p.type === filter;
    const dayMatch = p.days?.includes(activeDay);
    return typeMatch && dayMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-secondary text-secondary-foreground py-16 md:py-24 relative overflow-hidden">
           <div className="absolute inset-0 bg-primary opacity-5 animate-pulse blur-3xl rounded-full -mr-32 -mt-32"></div>
           <div className="container relative z-10 text-center">
              <h1 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic">Broadcast Schedule</h1>
              <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto font-medium">
                 Ezra Radio & TV — Ghana's most trusted voice. View our daily TV and Radio program line-up and meet the hosts.
              </p>
           </div>
        </section>

        {/* Filters Bar */}
        <div className="sticky top-[80px] z-40 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
           <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-6">
              {/* Type Switcher */}
              <div className="flex bg-secondary p-1 rounded-sm border border-border">
                 {['all', 'radio', 'tv'].map((t) => (
                   <button 
                     key={t}
                     onClick={() => setFilter(t)}
                     className={cn(
                       "px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all",
                       filter === t ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-background/20"
                     )}
                   >
                     {t}
                   </button>
                 ))}
              </div>
              
              {/* Day Switcher */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0">
                 {DAYS.map((day) => (
                   <button 
                     key={day}
                     onClick={() => setActiveDay(day)}
                     className={cn(
                       "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border",
                       activeDay === day ? "bg-secondary text-secondary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"
                     )}
                   >
                     {day.substring(0, 3)}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Schedule List */}
        <section className="container py-12 md:py-20">
           {isLoading ? (
             <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                <Clock className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
                <span className="font-medium text-muted-foreground opacity-50">Loading our programs...</span>
             </div>
           ) : filteredPrograms.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPrograms.map((program) => (
                   <div key={program._id} className="group flex flex-col md:flex-row bg-card border border-border/50 rounded-xl overflow-hidden shadow-lg hover:border-primary/40 transition-all hover:scale-[1.01] duration-300">
                      {/* Image Placeholder */}
                      <div className="w-full md:w-48 bg-secondary relative overflow-hidden h-48 md:h-auto">
                         <div className="absolute inset-x-0 bottom-0 py-2 px-3 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-2">
                             {program.type === 'radio' ? <Radio className="w-3.5 h-3.5 text-white" /> : <Tv className="w-3.5 h-3.5 text-white" />}
                             <span className="text-[10px] font-bold text-white uppercase tracking-widest">{program.type === 'radio' ? 'Radio' : 'TV'}</span>
                         </div>
                         <div className="flex items-center justify-center h-full">
                             {program.image ? (
                               <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                             ) : (
                               <Radio className="w-12 h-12 text-muted-foreground opacity-10" />
                             )}
                         </div>
                      </div>

                      {/* Info Content */}
                      <div className="flex-1 p-8">
                         <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[11px] font-black text-primary tracking-widest uppercase">{program.time}</span>
                         </div>
                         
                         <h3 className="text-xl md:text-2xl font-black mb-3 uppercase tracking-tighter italic leading-tight">{program.title}</h3>
                         <p className="text-muted-foreground text-sm font-medium mb-6 line-clamp-2 leading-relaxed">{program.description}</p>
                         
                         <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden border border-border">
                                  {program.host?.image ? (
                                    <img src={program.host.image} alt={program.host.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <User className="w-2/3 h-2/3 mx-auto mt-2 text-muted-foreground opacity-30" />
                                  )}
                               </div>
                               <div className="flex flex-col">
                                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Hosted by</span>
                                  <span className="text-sm font-black text-foreground uppercase tracking-tight">{program.host?.name || 'TBA'}</span>
                               </div>
                            </div>
                            <Button size="icon" variant="ghost" className="hover:bg-primary hover:text-white rounded-full transition-all group-hover:translate-x-1">
                               <ArrowRight className="w-5 h-5" />
                            </Button>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
           ) : (
             <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl opacity-40">
                <Calendar className="w-16 h-16 mx-auto mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">No programs found for {activeDay}</h3>
                <p className="text-sm font-medium mt-2">Try switching between Radio and TV or selecting another day.</p>
             </div>
           )}
        </section>

        {/* CTA */}
        <section className="bg-secondary text-secondary-foreground py-20 border-t border-border">
            <div className="container text-center max-w-2xl px-8">
               <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter italic">Want to sponsor a program?</h2>
               <p className="text-lg opacity-80 mb-8 font-medium">Get your brand heard by millions during our most popular segments. Our ad team is ready to help you thrive.</p>
               <Button className="bg-primary hover:bg-red-700 text-white font-black uppercase tracking-tighter px-10 py-8 rounded-sm text-lg shadow-xl">Contact Sales Team</Button>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Utility class helper
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
