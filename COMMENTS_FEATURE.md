# Comment System Documentation

## Overview

The Radio Station News website now includes a comprehensive comment system that encourages reader engagement on article pages. The system features comment submission, moderation, nested replies, and like functionality.

## Features

### User-Facing Features

- **Comment Submission**: Readers can submit comments with their name, email, and comment text
- **Input Validation**: Comments are validated for length (5-1000 characters) and email format
- **Moderation**: All comments require approval before appearing publicly
- **Nested Replies**: Readers can reply to specific comments, creating threaded discussions
- **Like System**: Readers can like comments to show appreciation
- **Comment Counter**: Display total number of approved comments on each article
- **Responsive Design**: Comment section works seamlessly on mobile and desktop

### Admin Features (Future)

- Comment moderation dashboard
- Spam filtering
- Comment analytics
- Bulk actions (approve, delete, mark as spam)

## Technical Implementation

### Data Structure

Comments are stored with the following structure:

```typescript
interface Comment {
  id: string;              // Unique identifier
  articleSlug: string;     // Article the comment belongs to
  author: string;          // Commenter's name
  email: string;           // Commenter's email
  content: string;         // Comment text
  createdAt: string;       // ISO timestamp
  approved: boolean;       // Moderation status
  parentId?: string;       // For nested replies
  likes: number;           // Like count
}
```

### Storage

Currently, comments are stored in browser localStorage for demo purposes:

```typescript
// Storage key
const STORAGE_KEY = "radio-station-comments";

// Example stored data
[
  {
    id: "comment-1234567890-abc123def",
    articleSlug: "radio-station-launches-community-program",
    author: "John Smith",
    email: "john@example.com",
    content: "Great article! Looking forward to the program.",
    createdAt: "2024-03-24T10:30:00.000Z",
    approved: true,
    likes: 5
  },
  // ... more comments
]
```

### Components

#### CommentForm.tsx

Handles comment submission with validation.

**Props:**
- `articleSlug: string` - The article being commented on
- `onCommentAdded?: () => void` - Callback when comment is added
- `parentId?: string` - For nested replies
- `isReply?: boolean` - Whether this is a reply form

**Features:**
- Name, email, and content inputs
- Character counter (0-1000)
- Input validation with error messages
- Loading state during submission
- Success toast notification

#### CommentList.tsx

Displays approved comments with threading support.

**Props:**
- `comments: Comment[]` - Array of comments to display
- `articleSlug: string` - Current article slug
- `onCommentAdded?: () => void` - Callback when new comment added

**Features:**
- Comment display with author name and date
- Like button with counter
- Reply button to create nested responses
- Expandable replies section
- Empty state message

### Utility Functions

All comment operations are in `lib/comments.ts`:

```typescript
// Get all approved comments for an article
getArticleComments(articleSlug: string): Comment[]

// Get pending comments (for moderation)
getPendingComments(): Comment[]

// Add a new comment
addComment(
  articleSlug: string,
  author: string,
  email: string,
  content: string,
  parentId?: string
): Comment

// Approve a comment
approveComment(commentId: string): void

// Delete a comment
deleteComment(commentId: string): void

// Like a comment
likeComment(commentId: string): void

// Get replies to a comment
getCommentReplies(parentId: string): Comment[]

// Validate comment input
validateComment(
  author: string,
  email: string,
  content: string
): { valid: boolean; errors: string[] }

// Initialize sample comments for demo
initializeSampleComments(): void
```

## Usage

### On Article Pages

Comments are automatically integrated on article pages (`/news/[slug]`):

```typescript
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import { getArticleComments, initializeSampleComments } from "@/lib/comments";

export default function Article() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    initializeSampleComments();
    if (article) {
      const articleComments = getArticleComments(article.slug);
      setComments(articleComments);
    }
  }, [article]);

  return (
    <>
      <CommentForm
        articleSlug={article.slug}
        onCommentAdded={() => {
          const updated = getArticleComments(article.slug);
          setComments(updated);
        }}
      />
      <CommentList
        comments={comments}
        articleSlug={article.slug}
        onCommentAdded={() => {
          const updated = getArticleComments(article.slug);
          setComments(updated);
        }}
      />
    </>
  );
}
```

## Validation Rules

### Comment Validation

- **Name**: Minimum 2 characters
- **Email**: Valid email format (contains @ and domain)
- **Content**: 5-1000 characters
- **Moderation**: All comments require approval before display

### Error Messages

- "Name must be at least 2 characters"
- "Please enter a valid email address"
- "Comment must be at least 5 characters"
- "Comment must not exceed 1000 characters"

## Sample Data

The system includes sample comments for demonstration:

```typescript
initializeSampleComments();
```

This creates 4 sample comments across different articles:
- Comments on "Radio Station Launches Community Program"
- Comments on "Local Sports Team Advances to Regional Championship"

Sample comments are only created if no comments exist in localStorage.

## Backend Integration (Future)

To replace localStorage with a backend API:

### 1. Create API Endpoints

```typescript
// POST /api/comments
// Create a new comment
{
  articleSlug: string;
  author: string;
  email: string;
  content: string;
  parentId?: string;
}

// GET /api/comments/:articleSlug
// Get all approved comments for an article

// PATCH /api/comments/:commentId/approve
// Approve a pending comment

// DELETE /api/comments/:commentId
// Delete a comment

// POST /api/comments/:commentId/like
// Like a comment
```

### 2. Update Comment Functions

```typescript
export async function getArticleComments(articleSlug: string): Promise<Comment[]> {
  const response = await fetch(`/api/comments/${articleSlug}`);
  return response.json();
}

export async function addComment(
  articleSlug: string,
  author: string,
  email: string,
  content: string,
  parentId?: string
): Promise<Comment> {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      articleSlug,
      author,
      email,
      content,
      parentId,
    }),
  });
  return response.json();
}
```

### 3. Update Sanity CMS Schema

Add a comments reference to articles:

```typescript
{
  name: 'comments',
  title: 'Comments',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'comment' }],
    },
  ],
}
```

## Moderation Workflow

### Current (Demo)

1. User submits comment
2. Comment is marked as `approved: false`
3. Comment appears in pending queue
4. Admin manually approves via `approveComment()`
5. Comment becomes visible to public

### Recommended (Production)

1. User submits comment
2. Comment sent to moderation queue
3. Admin receives email notification
4. Admin reviews and approves/rejects in dashboard
5. User receives email confirmation
6. Comment appears on site

## Security Considerations

### Current Implementation

- Email addresses are not displayed publicly
- Comments are stored locally (no server exposure)
- Input validation prevents malformed data

### For Production

- Implement CSRF protection
- Add rate limiting to prevent spam
- Sanitize HTML in comments
- Implement CAPTCHA for anonymous users
- Add IP-based spam detection
- Log all moderation actions
- Implement comment flagging system
- Add profanity filter
- Validate email addresses with confirmation

## Performance

### Current

- Comments loaded from localStorage (instant)
- No server round-trips
- Suitable for small-scale deployments

### Optimizations for Scale

- Implement pagination (10-20 comments per page)
- Add lazy loading for nested replies
- Cache comment counts
- Implement comment search
- Add comment sorting options (newest, oldest, most liked)

## Customization

### Styling

Comment components use Tailwind CSS and can be customized:

```typescript
// In CommentForm.tsx
<div className="bg-secondary rounded-lg p-4 md:p-6">
  {/* Customize colors, spacing, etc. */}
</div>
```

### Validation Rules

Modify validation in `lib/comments.ts`:

```typescript
export function validateComment(
  author: string,
  email: string,
  content: string
): { valid: boolean; errors: string[] } {
  // Customize validation logic
}
```

### Character Limit

Change the 1000 character limit:

```typescript
// In CommentForm.tsx
onChange={(e) => setContent(e.target.value.slice(0, 5000))}

// In comments.ts
if (content.length > 5000) {
  errors.push("Comment must not exceed 5000 characters");
}
```

## Troubleshooting

### Comments Not Appearing

1. Check browser console for errors
2. Verify localStorage is enabled
3. Check that `initializeSampleComments()` was called
4. Verify article slug matches exactly

### Comments Not Saving

1. Check browser localStorage quota
2. Verify email validation passes
3. Check comment length (5-1000 characters)
4. Clear browser cache and try again

### Performance Issues

1. Implement pagination for articles with many comments
2. Add lazy loading for nested replies
3. Consider moving to backend storage

## Future Enhancements

- [ ] Email notifications for replies
- [ ] Comment search functionality
- [ ] Comment sorting (newest, oldest, most liked)
- [ ] Pagination for large comment sections
- [ ] Comment editing (with edit history)
- [ ] Comment deletion by author
- [ ] Spam detection and filtering
- [ ] Comment analytics dashboard
- [ ] Social login integration
- [ ] Comment threads with threading UI
- [ ] Rich text editor for comments
- [ ] Image/media in comments
- [ ] Emoji reactions
- [ ] Comment voting (upvote/downvote)

## Support

For issues or questions about the comment system, refer to:
- `lib/comments.ts` - Core functionality
- `components/CommentForm.tsx` - Form implementation
- `components/CommentList.tsx` - Display implementation
- `pages/Article.tsx` - Integration example

---

**Last Updated**: March 2024
