export const solution = {
  title: "Design Pastebin",
  content: `
## Design Pastebin

A service where users create text "pastes" accessible via unique URLs, with optional expiration.

### Functional Requirements

- Create a paste with text content → get a unique URL
- Read a paste by its URL
- Optional: expiration time, syntax highlighting, password protection
- Optional: user accounts to manage pastes

### Non-Functional Requirements

- High availability for reads
- Low read latency (<100ms)
- 5M new pastes/day, 25M reads/day (5:1 read-to-write)
- Content size limit: 10MB per paste

### API Design

\`\`\`
POST   /pastes          → { content, language?, expires_in?, password? } → { id, url }
GET    /pastes/:id      → Paste content (with syntax highlighting metadata)
DELETE /pastes/:id      → Delete paste (owner only)
\`\`\`

### High-Level Architecture

**Write**: Client → API → Generate ID → Store metadata in DB + content in Object Storage → Return URL

**Read**: Client → CDN check → API → Cache check → DB metadata + fetch from Object Storage → Return

### Deep Dives

**Storage Separation**: Store metadata (id, created_at, expires_at, language) in PostgreSQL. Store the actual paste content in S3/object storage. This keeps the database lean — text content can be large (up to 10MB) and object storage handles that efficiently.

**ID Generation**: Same as URL shortener — Base62-encoded auto-incrementing ID or hash-based. 6-8 character codes provide billions of unique URLs.

**Expiration**: A background cleanup job runs periodically, deleting expired pastes. For immediate expiration enforcement, check expires_at on read and return 404 if expired (lazy deletion). The cleanup job handles storage reclamation.

**Caching**: Popular pastes (shared on social media) get massive read spikes. Cache hot pastes in Redis with the paste ID as key. CDN caching works well since paste content is immutable after creation.

### Scalability

- **Object storage** (S3) handles content storage at any scale
- **CDN** for popular pastes — immutable content is perfect for edge caching
- **Redis cache** for metadata of hot pastes
- **Database sharding** by paste ID if metadata volume grows
- Very similar to URL shortener in architecture — the main difference is storing larger content bodies
`,
};
