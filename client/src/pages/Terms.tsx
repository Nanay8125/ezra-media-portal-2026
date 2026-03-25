import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchDialog from "@/components/SearchDialog";
import { Info, Gavel, Scale, AlertTriangle, HelpCircle } from "lucide-react";
import { setSEOMetadata } from "@/lib/seo";

export default function Terms() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setSEOMetadata({
      title: "Terms of Service | Ezra Radio & TV",
      description: "Read the full terms of service for Ezra Radio & TV. All user and service agreements for our digital products. Ghana's trusted media source.",
      image: "",
      url: window.location.href,
      type: "website"
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <main className="flex-grow py-16 md:py-24">
        <div className="container max-w-4xl px-8">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Gavel className="w-6 h-6 text-primary" />
             </div>
             <div>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Terms of Service</h1>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Effective Date: March 2024</p>
             </div>
          </div>

          <div className="prose prose-red max-w-none space-y-12 text-foreground/80 leading-relaxed font-medium">
             <section className="bg-secondary/30 p-8 rounded-2xl border border-border">
                <h2 className="text-xl font-black uppercase tracking-tight text-foreground flex items-center gap-3 mb-6">
                   <Info className="w-5 h-5 text-primary" /> 1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using the Ezra Radio & TV website, mobile application, and streaming services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, please discontinue use.
                </p>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase tracking-tight text-foreground flex items-center gap-3 mb-6">
                   <Scale className="w-5 h-5 text-primary" /> 2. Intellectual Property
                </h2>
                <p>
                   All content broadcast or published on Ezra Radio & TV, including but not limited to: text, graphics, logos, images, audio clips, video clips, and data compilations, is the property of Ezra Network Ltd. Unauthorized reproduction or redistribution is strictly prohibited and subject to legal action under Ghana's Copyright Act.
                </p>
             </section>

             <section>
                <div className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-2xl">
                   <h2 className="text-xl font-black uppercase tracking-tight text-amber-600 flex items-center gap-3 mb-6">
                      <AlertTriangle className="w-5 h-5" /> 3. Responsible Use
                   </h2>
                   <p className="text-amber-700/80 mb-6">
                      Users agree to use our platforms for lawful and non-commercial purposes ONLY. Prohibited activities include:
                   </p>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Attempting to disrupt or hack our streaming servers.",
                        "Using abusive or hate-filled language in our live chats.",
                        "Copying or scraping news content for commercial use.",
                        "Impersonating Ezra Radio & TV staff or journalists."
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 bg-white/50 p-3 rounded-lg text-sm text-amber-700 font-bold border border-amber-500/10 shadow-sm">
                           <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 shrink-0"></span>
                           {item}
                        </li>
                      ))}
                   </ul>
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase tracking-tight text-foreground flex items-center gap-3 mb-6">
                   <HelpCircle className="w-5 h-5 text-primary" /> 4. Disclaimer
                </h2>
                <p>
                  Ezra Radio & TV provide our services "as is" and "as available". While we strive for absolute accuracy in our reporting, Ezra Network Ltd is not responsible for any direct or indirect damages resulting from your use of the site or reliance on information provided.
                </p>
             </section>

             <section className="pt-8 border-t border-border">
                <p className="text-center italic opacity-60">
                   For help understanding our Terms of Service, please contact our Legal Team at 
                   <a href="mailto:legal@ezranetwork.com" className="text-primary font-black ml-1">legal@ezranetwork.com</a>
                </p>
             </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
