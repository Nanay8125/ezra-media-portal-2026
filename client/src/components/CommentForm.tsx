import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addComment, validateComment } from "@/lib/comments";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface CommentFormProps {
  articleSlug: string;
  onCommentAdded?: () => void;
  parentId?: string;
  isReply?: boolean;
}

export default function CommentForm({
  articleSlug,
  onCommentAdded,
  parentId,
  isReply = false,
}: CommentFormProps) {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Validate
    const validation = validateComment(author, email, content);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      try {
        addComment(articleSlug, author, email, content, parentId);
        setAuthor("");
        setEmail("");
        setContent("");
        setIsLoading(false);
        toast.success(
          isReply
            ? "Reply submitted for moderation"
            : "Comment submitted for moderation"
        );
        onCommentAdded?.();
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to submit comment");
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-secondary rounded-lg p-4 md:p-6">
        <h3 className="font-bold text-secondary-foreground mb-4">
          {isReply ? "Write a Reply" : "Leave a Comment"}
        </h3>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg">
            <ul className="space-y-1 text-sm text-destructive">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary-foreground mb-2">
            Name *
          </label>
          <Input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={isLoading}
            className="bg-card text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary-foreground mb-2">
            Email *
          </label>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="bg-card text-foreground placeholder:text-muted-foreground"
          />
          <p className="text-xs text-secondary-foreground/70 mt-1">
            Your email will not be published
          </p>
        </div>

        {/* Comment Textarea */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary-foreground mb-2">
            {isReply ? "Reply" : "Comment"} * ({content.length}/1000)
          </label>
          <Textarea
            placeholder={
              isReply
                ? "Write your reply here..."
                : "Share your thoughts about this article..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, 1000))}
            disabled={isLoading}
            rows={isReply ? 3 : 5}
            className="bg-card text-foreground placeholder:text-muted-foreground resize-none"
          />
          <p className="text-xs text-secondary-foreground/70 mt-1">
            Comments are moderated and will appear after approval
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !author || !email || !content}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {isReply ? "Post Reply" : "Post Comment"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
