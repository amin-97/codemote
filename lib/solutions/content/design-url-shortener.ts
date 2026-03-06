export const solution = {
  title: "Design URL Shortener",
  content: `
## Design URL Shortener

A service that maps long URLs to short codes and redirects users.

### Functional Requirements

- Given a long URL, generate a unique short URL
- Redirect short URL to the original long URL
- Custom short codes (optional)
- Link expiration (optional TTL)
- Analytics: click count, referrers, geographic data

### Non-Functional Requirements

- Very low redirect latency (<50ms)
- High availability (redirects must always work)
- 100M URLs created per month, 10:1 read-to-write ratio → ~1B redirects/month
- Short codes should be unpredictable (not sequential)

### API Design

\`\`\`
POST   /urls          → { original_url, custom_code?, expires_at? } → { short_code, short_url }
GET    /:short_code   → 301 redirect to original URL
GET    /urls/:short_code/stats → { clicks, created_at, expires_at }
DELETE /urls/:short_code       → Soft delete
\`\`\`

### High-Level Architecture

**Write Path**: Client → API Server → Generate short code → Write to DB → Return short URL

**Read Path (Redirect)**: Client → CDN/Cache check → API Server → DB lookup → 301 Redirect

### Data Model

**urls**: id, short_code (indexed, unique), original_url, user_id, expires_at, created_at, click_count

### Deep Dives

**Short Code Generation**: Use Base62 encoding (a-z, A-Z, 0-9). A 7-character code gives 62^7 = ~3.5 trillion combinations. Two approaches:

1. **Hash-based**: MD5/SHA256 the URL, take first 7 chars of Base62-encoded hash. Handle collisions by appending a counter and rehashing.
2. **Counter-based**: A distributed counter (Snowflake ID or Zookeeper-based) generates unique IDs. Base62-encode the ID. No collisions but codes are sequential (add randomization layer).

**Caching**: The top 20% of URLs likely account for 80% of redirects. Cache hot URLs in Redis with the short_code as key. Cache hit → redirect immediately without DB query. Use LRU eviction.

**301 vs 302**: Use 301 (permanent redirect) if you want browsers to cache the redirect — reduces load but you lose analytics on repeat visits. Use 302 (temporary) if you need to track every click.

### Scalability

- **Read-heavy** (10:1) → cache aggressively in Redis, put CDN in front for popular links
- **Database**: Shard by short_code hash for even distribution
- **Write throughput**: Use a pre-generated pool of short codes to avoid generation bottlenecks
- **Analytics**: Write click events to Kafka, process asynchronously — don't block the redirect
`,
};
