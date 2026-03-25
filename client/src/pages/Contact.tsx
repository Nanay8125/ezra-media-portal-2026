import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchDialog from "@/components/SearchDialog";
import { Mail, Phone, MapPin, Send, MessageCircle, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setSEOMetadata } from "@/lib/seo";

export default function Contact() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSEOMetadata({
      title: "Contact Us | Ezra Radio & TV",
      description: "Get in touch with the Ezra Radio & TV team. Send us your news tips, feedback, or advertising inquiries.",
      image: "",
      url: window.location.href,
      type: "website"
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! We will get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-secondary text-secondary-foreground py-16 md:py-24 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--primary),_transparent)]"></div>
           <div className="container relative z-10 text-center">
              <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter italic">Contact Us</h1>
              <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto font-medium">
                Have a news tip, feedback, or business inquiry? Our team is available 24/7 to hear from you.
              </p>
           </div>
        </section>

        {/* Contact Content */}
        <section className="container py-12 md:py-20 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="bg-card p-8 border border-border rounded-xl shadow-lg border-l-4 border-l-primary hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Call Us</h3>
                <p className="text-muted-foreground mb-4 text-sm font-medium">Direct line to our newsroom and studio.</p>
                <a href="tel:+233240000000" className="text-xl font-black text-foreground hover:text-primary transition-colors">+233 24 000 0000</a>
              </div>

              <div className="bg-card p-8 border border-border rounded-xl shadow-lg border-l-4 border-l-secondary hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Email Us</h3>
                <p className="text-muted-foreground mb-4 text-sm font-medium">Send us your press releases or inquiries.</p>
                <a href="mailto:info@ezraradio.com" className="text-xl font-black text-foreground hover:text-secondary transition-colors truncate block">info@ezraradio.com</a>
              </div>

              <div className="bg-card p-8 border border-border rounded-xl shadow-lg border-l-4 border-l-[#128c7e] hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 bg-[#128c7e]/10 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="w-6 h-6 text-[#128c7e]" />
                </div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">WhatsApp</h3>
                <p className="text-muted-foreground mb-4 text-sm font-medium">Fastest way to send news tips & photos.</p>
                <a href="https://wa.me/233240000000" target="_blank" rel="noopener noreferrer" className="text-xl font-black text-foreground hover:text-[#128c7e] transition-colors">Chat Now</a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card p-8 md:p-12 border border-border rounded-xl shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-black mb-8 uppercase tracking-tighter">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="e.g Kwesi Arthur" 
                        className="w-full bg-secondary/10 border border-border/50 rounded-sm p-4 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="e.g kwesi@example.com" 
                        className="w-full bg-secondary/10 border border-border/50 rounded-sm p-4 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject</label>
                    <select 
                      title="Select Inquiry Type"
                      className="w-full bg-secondary/10 border border-border/50 rounded-sm p-4 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
                    >
                      <option>General Inquiry</option>
                      <option>News Tip / Breaking News</option>
                      <option>Advertising & Sponsorship</option>
                      <option>Report a Bug</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Your Message</label>
                    <textarea 
                      required 
                      rows={6} 
                      placeholder="Tell us what's on your mind..." 
                      className="w-full bg-secondary/10 border border-border/50 rounded-sm p-4 text-foreground focus:ring-2 focus:ring-primary outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                    ></textarea>
                  </div>

                  <Button 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-black text-white font-black uppercase tracking-tighter py-8 text-lg rounded-sm shadow-xl transition-all group overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? "Sending..." : "Submit Message"}
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="container pb-20">
           <div className="bg-secondary text-secondary-foreground rounded-2xl p-8 md:p-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 blur-[100px] -mr-32 -mt-32"></div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="max-w-md">
                    <div className="flex items-center gap-2 mb-4">
                       <MapPin className="w-6 h-6 text-primary" />
                       <span className="font-black uppercase tracking-widest text-sm opacity-60">Our Headquarters</span>
                    </div>
                    <h2 className="text-3xl font-black mb-6 uppercase italic tracking-tighter">Visit Us in Kumasi</h2>
                    <p className="text-lg opacity-80 font-medium mb-8">
                      Ezra Radio & TV Towers,<br />
                      P.O. Box KS 000, Kumasi,<br />
                      Ashanti Region, Ghana.
                    </p>
                    <div className="flex gap-4">
                       <Button variant="outline" className="border-white/20 hover:bg-white hover:text-black">Get Directions</Button>
                    </div>
                 </div>
                 
                 {/* Social Feed Placeholder */}
                 <div className="flex-1 w-full max-w-lg bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/5">
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-60">Follow our social feed</h4>
                    <div className="grid grid-cols-3 gap-6">
                       <div className="flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors shadow-inner">
                             <Facebook className="text-white" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Facebook</span>
                       </div>
                       <div className="flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors shadow-inner">
                             <Twitter className="text-white" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Twitter</span>
                       </div>
                       <div className="flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors shadow-inner">
                             <Instagram className="text-white" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Instagram</span>
                       </div>
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
