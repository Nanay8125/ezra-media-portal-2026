import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground mt-16 border-t-4 border-primary font-sans relative">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <div className="inline-block bg-primary text-primary-foreground px-4 py-2 font-black text-3xl tracking-tighter italic">
              EZRA
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Ezra Radio & TV is your premier destination for the latest news, politics, entertainment, sports and business updates in Ghana and across the globe. Stay informed with our objective reporting.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center hover:bg-primary transition-colors text-secondary-foreground"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center hover:bg-primary transition-colors text-secondary-foreground"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center hover:bg-primary transition-colors text-secondary-foreground"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="Youtube" className="w-10 h-10 rounded-full bg-background/10 border border-background/20 flex items-center justify-center hover:bg-primary transition-colors text-secondary-foreground"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-secondary-foreground uppercase tracking-wider mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/"><a className="hover:text-primary hover:pl-2 transition-all opacity-80 hover:opacity-100 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:mr-2 before:rounded-full">Home</a></Link></li>
              <li><Link href="/category/politics"><a className="hover:text-primary hover:pl-2 transition-all opacity-80 hover:opacity-100 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:mr-2 before:rounded-full">Politics</a></Link></li>
              <li><Link href="/category/local-news"><a className="hover:text-primary hover:pl-2 transition-all opacity-80 hover:opacity-100 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:mr-2 before:rounded-full">Local News</a></Link></li>
              <li><Link href="/category/business"><a className="hover:text-primary hover:pl-2 transition-all opacity-80 hover:opacity-100 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:mr-2 before:rounded-full">Business</a></Link></li>
              <li><Link href="/category/sports"><a className="hover:text-primary hover:pl-2 transition-all opacity-80 hover:opacity-100 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:mr-2 before:rounded-full">Sports</a></Link></li>
              <li><Link href="/category/entertainment"><a className="hover:text-primary hover:pl-2 transition-all opacity-80 hover:opacity-100 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:mr-2 before:rounded-full">Showbiz</a></Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-secondary-foreground uppercase tracking-wider mb-6 text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">About Ezra Network</a></li>
              <li><Link href="/contact"><a className="hover:text-primary transition-colors opacity-80 hover:opacity-100">Contact Us</a></Link></li>
              <li><a href="#" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">Advertise With Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">Live TV</a></li>
              <li><a href="#" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">Live Radio</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-secondary-foreground uppercase tracking-wider mb-6 text-sm">Contact Details</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <span>Ezra Network, Kumasi, Ghana.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+233 302 763 459</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@ezranetwork.com" className="hover:text-primary transition-colors">info@ezranetwork.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60 text-center md:text-left">
            &copy; {currentYear} Ezra Network. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-wider opacity-60">
            <Link href="/privacy"><a className="hover:text-primary hover:opacity-100 transition-colors">Privacy Policy</a></Link>
            <Link href="/terms"><a className="hover:text-primary hover:opacity-100 transition-colors">Terms of Use</a></Link>
            <Link href="/privacy"><a className="hover:text-primary hover:opacity-100 transition-colors">Cookie Policy</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
