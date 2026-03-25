import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchDialog from "@/components/SearchDialog";
import { Shield, Lock, Eye, FileText, CheckCircle } from "lucide-react";
import { setSEOMetadata } from "@/lib/seo";

export default function Privacy() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setSEOMetadata({
      title: "Privacy Policy | Ezra Radio & TV",
      description: "Learn how Ezra Radio & TV protects your personal data and privacy. Our commitment to secure and transparent media service.",
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
                <Shield className="w-6 h-6 text-primary" />
             </div>
             <div>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Privacy Policy</h1>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Last Updated: March 2024</p>
             </div>
          </div>

          <div className="prose prose-red max-w-none space-y-12 text-foreground/80 leading-relaxed font-medium">
             <section className="bg-secondary/30 p-8 rounded-2xl border border-border">
                <h2 className="text-xl font-black uppercase tracking-tight text-foreground flex items-center gap-3 mb-6">
                   <Lock className="w-5 h-5 text-primary" /> 1. Commitment to Privacy
                </h2>
                <p>
                  At Ezra Radio & TV, your privacy is our priority. We are committed to protecting the personal information you share with us while using our digital platforms including our website, mobile apps, and streaming services.
                </p>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase tracking-tight text-foreground flex items-center gap-3 mb-6">
                   <Eye className="w-5 h-5 text-primary" /> 2. Information We Collect
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                      <h3 className="font-black mb-3 uppercase text-xs tracking-widest text-primary">Directly Provided</h3>
                      <p className="text-sm">Information you give us when signing up for newsletters, entering competitions, or contacting our newsroom (e.g., Name, Email, Phone Number).</p>
                   </div>
                   <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                      <h3 className="font-black mb-3 uppercase text-xs tracking-widest text-primary">Automatically Collected</h3>
                      <p className="text-sm">Usage data, IP addresses, and device information collected via cookies to optimize your streaming experience.</p>
                   </div>
                </div>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase tracking-tight text-foreground flex items-center gap-3 mb-6">
                   <CheckCircle className="w-5 h-5 text-primary" /> 3. How We Use Data
                </h2>
                <ul className="grid grid-cols-1 gap-4">
                   {[
                     "To provide uninterrupted radio and TV streaming services.",
                     "To personalize your news feed based on your interests.",
                     "To communicate important service updates and community news.",
                     "To improve our platform performance and security."
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-3 bg-secondary/20 p-4 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span className="text-sm">{item}</span>
                     </li>
                   ))}
                </ul>
             </section>

             <section>
                <h2 className="text-xl font-black uppercase tracking-tight text-foreground flex items-center gap-3 mb-6">
                   <FileText className="w-5 h-5 text-primary" /> 4. Data Protection
                </h2>
                <p>
                  We implement industry-standard security measures including SSL encryption and secure firewalls to protect your data from unauthorized access or disclosure. We never sell your personal information to third parties.
                </p>
             </section>

             <section className="pt-8 border-t border-border">
                <p className="text-center italic opacity-60">
                   For any privacy-related inquiries, please contact our Data Protection Officer at 
                   <a href="mailto:privacy@ezranetwork.com" className="text-primary font-black ml-1">privacy@ezranetwork.com</a>
                </p>
             </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
