import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setEmail("");
      toast.success("Successfully subscribed to our newsletter!");
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-secondary text-secondary-foreground rounded-lg p-6 md:p-8">
      <div className="max-w-md">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-5 h-5" />
          <h3 className="text-xl font-bold">Stay Updated</h3>
        </div>
        <p className="text-sm opacity-90 mb-4">
          Subscribe to our newsletter for the latest news delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isSuccess}
              className="bg-secondary-foreground text-secondary placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              disabled={isLoading || isSuccess}
              className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
            >
              {isSuccess ? (
                <Check className="w-4 h-4" />
              ) : isLoading ? (
                "..."
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
        </form>

        <p className="text-xs opacity-75 mt-2">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
