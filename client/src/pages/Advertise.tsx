import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchDialog from "@/components/SearchDialog";
import { BarChart3, Megaphone, Users, Target, CheckCircle, ArrowRight, Mail, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setSEOMetadata } from "@/lib/seo";

export default function Advertise() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setSEOMetadata({
      title: "Advertise With Us | Ezra Radio & TV",
      description: "Partner with Ezra Radio & TV. Grow your business with targeted advertising on Ghana's leading news and media platform.",
      image: "",
      url: window.location.href,
      type: "website"
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20 md:py-32 relative overflow-hidden">
          {/* Animated Background Circles */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full -mr-64 -mt-64 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-800 opacity-20 rounded-full -ml-32 -mb-32 blur-2xl"></div>
          
          <div className="container relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/10 shadow-xl">
               <Megaphone className="w-4 h-4 text-white" />
               <span className="text-[10px] font-black uppercase tracking-widest">Grow Your Brand</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] uppercase tracking-tighter italic drop-shadow-2xl">
              Advertise <br className="hidden md:block" /> with Ezra
            </h1>
            <p className="text-lg md:text-2xl opacity-90 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
               Reach over 1,000,000+ monthly active listeners and readers with targeted placement on Ghana's fastest-growing news and media network.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <Button className="bg-white text-primary hover:bg-black hover:text-white px-10 py-8 text-lg font-black uppercase tracking-tighter rounded-sm shadow-2xl transition-all group">
                  Download Rate Card
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1" />
               </Button>
               <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black hover:border-white px-10 py-8 text-lg font-black uppercase tracking-tighter rounded-sm">
                  Contact Sales Team
               </Button>
            </div>
          </div>
        </section>

        {/* Audience Stats */}
        <section className="bg-secondary/5 py-20 border-b border-border">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { icon: Users, stat: "1.2M+", label: "Monthly Users", color: "text-primary" },
                 { icon: Globe, stat: "3.5M+", label: "Page Views", color: "text-blue-500" },
                 { icon: BarChart3, stat: "15min+", label: "Avg. Session Time", color: "text-emerald-500" },
                 { icon: Target, stat: "75%", label: "Decision Makers", color: "text-purple-500" },
               ].map((item, i) => (
                 <div key={i} className="bg-card p-10 border border-border/50 rounded-xl shadow-lg text-center hover:scale-[1.02] transition-transform duration-300">
                    <div className={cn("w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-secondary", item.color)}>
                       <item.icon className="w-7 h-7" />
                    </div>
                    <div className="text-4xl font-black text-foreground mb-2 mt-2 tracking-tighter">{item.stat}</div>
                    <div className="text-xs uppercase tracking-widest font-black text-muted-foreground opacity-60">{item.label}</div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Ad Solutions */}
        <section className="container py-24">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Advertising Solutions</h2>
             <div className="w-20 h-2 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             {[
               {
                 title: "Display Ads",
                 desc: "Standard IAB sized banners across our homepage and article pages for maximum brand awareness. Includes Sidebar, Header, and In-content placements.",
                 features: ["CPM & CPC Options", "Mobile & Desktop Optimized", "Smart Geo-targeting"],
                 popular: true
               },
               {
                 title: "Sponsored Content",
                 desc: "Native storytelling by our expert writers. Deeply integrate your brand into our news feed with articles that provide value to our readers.",
                 features: ["SEO Benefits", "Social Shared Guaranteed", "Editorial Support"],
                 popular: false
               },
               {
                 title: "Radio & Audio",
                 desc: "Pre-roll on our Live Stream and mid-roll ads in our Podcast Network. Captivate our engaged listeners with professional audio spot.",
                 features: ["Live Audio Stream", "Podcast Integration", "Host-read Adverts"],
                 popular: false
               }
             ].map((plan, i) => (
               <div key={i} className={cn(
                 "p-10 border-2 rounded-2xl flex flex-col relative transition-all duration-300",
                 plan.popular ? "border-primary bg-primary/5 shadow-2xl scale-105" : "border-border bg-card shadow-lg hover:border-primary/40"
               )}>
                  {plan.popular && (
                    <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Most Popular</div>
                  )}
                  <h3 className="text-2xl font-black mb-6 uppercase italic tracking-tight">{plan.title}</h3>
                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed font-medium">
                     {plan.desc}
                  </p>
                  <ul className="space-y-4 mb-10 flex-grow">
                     {plan.features.map((f, j) => (
                       <li key={j} className="flex items-center gap-3 text-sm font-bold">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{f}</span>
                       </li>
                     ))}
                  </ul>
                  <Button className="w-full py-8 bg-black hover:bg-primary text-white font-black uppercase tracking-tighter rounded-sm shadow-xl mt-4">Get Details</Button>
               </div>
             ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="container pb-24">
           <div className="bg-secondary p-12 md:p-20 rounded-[40px] text-center border-t-8 border-primary shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter italic">Ready to make an impact?</h2>
              <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-12 font-medium">
                 Join names like Unilever, MTN, and Guinness in partnering with Ghana's most trusted news network.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                 <div className="flex items-center gap-3">
                    <Mail className="w-7 h-7 text-primary" />
                    <div className="text-left">
                       <div className="text-[10px] uppercase tracking-widest font-black opacity-40">Email Our Team</div>
                       <a href="mailto:ads@ezranetwork.com" className="text-xl font-black hover:text-primary transition-colors">ads@ezranetwork.com</a>
                    </div>
                 </div>
                 <div className="hidden md:block w-0.5 h-12 bg-white/10"></div>
                 <div className="flex items-center gap-3">
                    <Phone className="w-7 h-7 text-primary" />
                    <div className="text-left">
                       <div className="text-[10px] uppercase tracking-widest font-black opacity-40">Call Advertising</div>
                       <a href="tel:+233302123456" className="text-xl font-black hover:text-primary transition-colors">+233 302 123 456</a>
                    </div>
                 </div>
              </div>
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
