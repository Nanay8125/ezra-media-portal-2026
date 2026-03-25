import { useState } from "react";
import { Comment, getCommentReplies, likeComment } from "@/lib/comments";
import CommentForm from "@/components/CommentForm";
import { ThumbsUp, MessageCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentListProps {
  comments: Comment[];
  articleSlug: string;
  onCommentAdded?: () => void;
}

interface CommentItemProps {
  comment: Comment;
  articleSlug: string;
  onCommentAdded?: () => void;
  isReply?: boolean;
}

function CommentItem({
  comment,
  articleSlug,
  onCommentAdded,
  isReply = false,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  const handleLoadReplies = () => {
    if (!showReplies) {
      const commentReplies = getCommentReplies(comment.id);
      setReplies(commentReplies);
    }
    setShowReplies(!showReplies);
  };

  const handleLike = () => {
    likeComment(comment.id);
    setLikes(likes + 1);
  };

  const handleReplyAdded = () => {
    // Reload replies
    const updatedReplies = getCommentReplies(comment.id);
    setReplies(updatedReplies);
    onCommentAdded?.();
    setShowReplyForm(false);
  };

  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className={`space-y-4 ${isReply ? "ml-4 md:ml-8 border-l-2 border-border pl-4" : ""}`}>
      <div className="bg-card rounded-lg p-4 border border-border">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-foreground">{comment.author}</h4>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>

        {/* Content */}
        <p className="text-foreground text-sm leading-relaxed mb-4 whitespace-pre-wrap">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            {likes > 0 ? `${likes}` : "Like"}
          </Button>

          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Reply
            </Button>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && !isReply && (
        <div className="ml-4 md:ml-8">
          <CommentForm
            articleSlug={articleSlug}
            parentId={comment.id}
            isReply={true}
            onCommentAdded={handleReplyAdded}
          />
        </div>
      )}

      {/* Replies Section */}
      {!isReply && replies.length > 0 && (
        <div className="ml-4 md:ml-8 space-y-4">
          <button
            onClick={handleLoadReplies}
            className="text-sm text-primary hover:underline font-medium"
          >
            {showReplies
              ? `Hide ${replies.length} ${replies.length === 1 ? "reply" : "replies"}`
              : `Show ${replies.length} ${replies.length === 1 ? "reply" : "replies"}`}
          </button>

          {showReplies && (
            <div className="space-y-4">
              {replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  articleSlug={articleSlug}
                  onCommentAdded={handleReplyAdded}
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CommentList({
  comments,
  articleSlug,
  onCommentAdded,
}: CommentListProps) {
  return (
    <div className="space-y-6">
      {comments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </p>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              articleSlug={articleSlug}
              onCommentAdded={onCommentAdded}
            />
          ))}
        </div>
      )}
    </div>
  );
}
