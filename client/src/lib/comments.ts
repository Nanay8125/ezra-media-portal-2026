// Comment system for articles
// Uses localStorage for demo; replace with backend API for production

export interface Comment {
  id: string;
  articleSlug: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  approved: boolean;
  parentId?: string; // For nested replies
  likes: number;
}

const STORAGE_KEY = "radio-station-comments";

// Get all comments for an article
export function getArticleComments(articleSlug: string): Comment[] {
  try {
    const allComments = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as Comment[];
    return allComments
      .filter((c) => c.articleSlug === articleSlug && c.approved)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  } catch {
    return [];
  }
}

// Get pending comments (for moderation)
export function getPendingComments(): Comment[] {
  try {
    const allComments = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as Comment[];
    return allComments.filter((c) => !c.approved);
  } catch {
    return [];
  }
}

// Add a new comment
export function addComment(
  articleSlug: string,
  author: string,
  email: string,
  content: string,
  parentId?: string
): Comment {
  const comment: Comment = {
    id: generateId(),
    articleSlug,
    author,
    email,
    content,
    createdAt: new Date().toISOString(),
    approved: false, // Comments require moderation
    parentId,
    likes: 0,
  };

  try {
    const allComments = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as Comment[];
    allComments.push(comment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
  } catch {
    console.error("Failed to save comment");
  }

  return comment;
}

// Approve a comment (for moderation)
export function approveComment(commentId: string): void {
  try {
    const allComments = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as Comment[];
    const comment = allComments.find((c) => c.id === commentId);
    if (comment) {
      comment.approved = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
    }
  } catch {
    console.error("Failed to approve comment");
  }
}

// Delete a comment
export function deleteComment(commentId: string): void {
  try {
    const allComments = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as Comment[];
    const filtered = allComments.filter((c) => c.id !== commentId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    console.error("Failed to delete comment");
  }
}

// Like a comment
export function likeComment(commentId: string): void {
  try {
    const allComments = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as Comment[];
    const comment = allComments.find((c) => c.id === commentId);
    if (comment) {
      comment.likes += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
    }
  } catch {
    console.error("Failed to like comment");
  }
}

// Get replies to a comment
export function getCommentReplies(parentId: string): Comment[] {
  try {
    const allComments = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as Comment[];
    return allComments
      .filter((c) => c.parentId === parentId && c.approved)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  } catch {
    return [];
  }
}

// Validation
export function validateComment(
  author: string,
  email: string,
  content: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!author || author.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!email || !isValidEmail(email)) {
    errors.push("Please enter a valid email address");
  }

  if (!content || content.trim().length < 5) {
    errors.push("Comment must be at least 5 characters");
  }

  if (content.length > 1000) {
    errors.push("Comment must not exceed 1000 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Helper functions
function generateId(): string {
  return `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Export sample comments for demo
export function initializeSampleComments(): void {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return; // Don't overwrite existing comments

  const sampleComments: Comment[] = [
    {
      id: "comment-1",
      articleSlug: "radio-station-launches-community-program",
      author: "John Smith",
      email: "john@example.com",
      content:
        "This is great news! I've been hoping for more community engagement from the radio station. Looking forward to the Community Voices program!",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      approved: true,
      likes: 5,
    },
    {
      id: "comment-2",
      articleSlug: "radio-station-launches-community-program",
      author: "Sarah Johnson",
      email: "sarah@example.com",
      content:
        "I'd love to suggest our local food bank for the first segment. They do amazing work in our community!",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      approved: true,
      likes: 3,
    },
    {
      id: "comment-3",
      articleSlug: "radio-station-launches-community-program",
      author: "Mike Davis",
      email: "mike@example.com",
      content:
        "When does the program start? I'd like to tune in for the first episode.",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      approved: true,
      likes: 2,
    },
    {
      id: "comment-4",
      articleSlug: "local-sports-team-advances-regional-championship",
      author: "Alex Thompson",
      email: "alex@example.com",
      content:
        "What an incredible game! Our team showed true grit and determination. I'll definitely be at the regional championship!",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      approved: true,
      likes: 8,
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleComments));
}
