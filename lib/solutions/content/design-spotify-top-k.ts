export const solution = {
  title: "Design Spotify Top K Songs",
  content: `
## Design Spotify Top K Songs

A system that tracks song plays in real-time and surfaces the top K most-played songs over various time windows.

### Functional Requirements

- Track every song play event
- Query top K songs globally, by genre, by region
- Support time windows: last hour, today, this week, all-time
- Near real-time updates (minutes, not hours)

### Non-Functional Requirements

- Handle 500M+ play events per day
- Top K query latency <100ms
- Eventual consistency acceptable (minutes of lag is fine)

### API Design

\`\`\`
POST   /plays                          → Record play { song_id, user_id, timestamp }
GET    /top?k=50&window=daily&genre=pop → Top K songs with filters
\`\`\`

### High-Level Architecture

**Play Events → Kafka → Stream Processor → Aggregation Store → API**

This is a classic **stream processing** problem. Don't try to query raw events — pre-aggregate.

### Deep Dives

**Count-Min Sketch**: A probabilistic data structure for approximate frequency counting. Uses multiple hash functions and a 2D array of counters. Space-efficient for tracking play counts of millions of songs. Query returns an approximate count (never underestimates).

**Time Window Aggregation**: Use tumbling windows in the stream processor (Flink/Spark Streaming). Every minute, emit counts per song for that minute. Downstream, roll up minutes into hours, hours into days.

**Storage**: Redis sorted sets per time window. \`ZINCRBY top:daily:2024-01-15 1 song_123\` increments the count. \`ZREVRANGE top:daily:2024-01-15 0 49\` returns top 50. Expire old windows automatically.

**Multi-dimensional Top K**: For per-genre or per-region top K, maintain separate sorted sets: \`top:daily:genre:pop\`, \`top:daily:region:us\`. The stream processor routes events to multiple sorted sets based on song metadata.

### Scalability

- Kafka partitioned by song_id for parallel processing
- Redis cluster for sorted sets across time windows
- Pre-compute top K periodically and cache — most queries hit the cache
- Use approximation (Count-Min Sketch + heap) for the real-time view, exact batch computation for daily/weekly leaderboards
`,
};
