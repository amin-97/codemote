export const solution = {
  title: "Design Twitter",
  content: `
## Design Twitter

A social media platform for posting short messages (tweets), following users, and consuming a personalized timeline.

### Functional Requirements

- Post tweets (text, images, links)
- Follow/unfollow users
- Home timeline: aggregated feed of tweets from followed users
- User profile timeline
- Like, retweet, reply
- Search tweets and users

### Non-Functional Requirements

- Timeline generation <500ms
- Handle 500M tweets/day, 200M DAU
- Celebrity accounts with 100M+ followers
- Eventual consistency for timeline (seconds of delay acceptable)

### High-Level Architecture

**Client → API Gateway → Tweet Service / Timeline Service / User Service / Search Service**

The core challenge is **timeline generation** — a user follows 500 people, each posting multiple times daily. How do you assemble their timeline quickly?

### Deep Dives

**Fan-Out on Write (Push Model)**: When a user posts a tweet, immediately write it to the timeline cache of every follower. Each user's timeline is a pre-built Redis list. Reading timeline = simple Redis LRANGE. Fast reads, expensive writes. Problem: celebrities with 100M followers — one tweet triggers 100M writes.

**Fan-Out on Read (Pull Model)**: When a user opens their timeline, query the latest tweets from all followed users, merge, and sort. No pre-computation. Slow reads (must query N users), cheap writes.

**Hybrid Approach** (Twitter's actual solution): Use push for normal users (<10K followers). For celebrities, use pull at read time. When building a timeline: fetch pre-built timeline from cache (pushed tweets from normal users) + fetch latest tweets from followed celebrities + merge and sort.

**Tweet Storage**: Tweets in a sharded database (by tweet_id or user_id). Tweet content is immutable after posting — excellent for caching.

**Timeline Cache**: Redis list per user. Max length ~800 tweets. On new tweet (push): LPUSH to each follower's list, LTRIM to cap length. On read: LRANGE with cursor-based pagination.

**Search**: Elasticsearch index on tweet text, hashtags, and user mentions. Near real-time indexing via Kafka consumer.

### Scalability

- **Fan-out service** is the bottleneck — scale workers based on tweet volume
- **Redis cluster** for timeline caches (terabytes of timeline data)
- **Shard tweets** by creation time for efficient range queries
- **CDN** for media (images, videos attached to tweets)
- **Separate read/write paths** — timeline reads are cached, writes are async
`,
};
