export const solution = {
  title: "Design a Comment System",
  content: `
## Design a Comment System

A threaded comment system supporting nested replies, likes, sorting, and real-time updates — similar to Reddit, YouTube, or Disqus.

### Functional Requirements

- Post comments on content (articles, videos, posts)
- Nested replies (threaded conversations)
- Like/upvote comments
- Sort by newest, oldest, most liked
- Edit and delete own comments
- Real-time updates when new comments arrive

### Non-Functional Requirements

- Read-heavy (100:1 read-to-write)
- Low latency for loading comments (<200ms for first page)
- Support millions of comments per popular content item

### API Design

\`\`\`
GET    /content/:id/comments?sort=top&cursor=abc    → Paginated comments
POST   /content/:id/comments                         → { text, parent_id? }
PUT    /comments/:id                                  → Edit comment
DELETE /comments/:id                                  → Soft delete
POST   /comments/:id/like                             → Toggle like
\`\`\`

### Deep Dives

**Thread Storage — Adjacency List vs Materialized Path**:

**Adjacency List**: Each comment has a \`parent_id\`. Simple to insert. To load a thread, recursively query children. Problem: N+1 queries for deep threads.

**Materialized Path** (recommended): Store the full path: \`/root_id/parent_id/comment_id\`. Query all descendants with \`WHERE path LIKE '/root_id/%'\`. Single query loads entire thread. Sort by path for display order.

**Pagination**: Cursor-based on top-level comments. Load top-level comments paginated, then load their children (1-2 levels deep) in a single query using materialized path. Collapse deeply nested threads with "show more replies."

**Like Counting**: Don't query COUNT(*) on every read. Maintain \`like_count\` on the comment record. Use a separate \`comment_likes\` table (comment_id, user_id) for deduplication. Increment/decrement count atomically.

**Real-Time Updates**: WebSocket connection per content page. When a new comment is posted, publish to a Redis Pub/Sub channel keyed by content_id. Connected clients receive the new comment and insert it into the UI.

**Soft Delete**: Don't remove comments with replies — show "[deleted]" placeholder to preserve thread structure. Only hard-delete leaf comments.

### Scalability

- **Cache** top-level comments and first-level replies per content item in Redis
- **Shard** comments by content_id — all comments for one article on the same shard
- **CDN** for static content pages (invalidate on new comment via cache tag)
- **Async like counting** — buffer likes in Redis, flush to DB periodically
`,
};
