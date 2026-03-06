export const lessons: Record<string, { title: string; content: string }> = {
  strategies: {
    title: "Caching Strategies",
    content: `
## Caching Strategies

Caching is storing frequently accessed data closer to where it's needed. It's the single most impactful performance optimization in distributed systems.

### Core Concepts

**Cache-Aside (Lazy Loading)**: Application checks the cache first. On a miss, it reads from the database, writes to cache, then returns. The application manages the cache explicitly.

**Write-Through**: Every write goes to both the cache and the database simultaneously. Ensures cache is always consistent but adds write latency.

**Write-Back (Write-Behind)**: Writes go to cache only. A background process asynchronously flushes to the database. Fastest writes, but risk of data loss if cache fails before flush.

**Read-Through**: The cache itself is responsible for loading data from the database on a miss. The application only talks to the cache, never directly to the DB.

### How It Works

Cache-aside is the most common pattern:
1. Request comes in for user profile
2. Check Redis — cache hit → return immediately (sub-millisecond)
3. Cache miss → query PostgreSQL (5-50ms), store result in Redis with a TTL, return
4. Subsequent requests hit cache until TTL expires

**TTL (Time-To-Live)**: How long a cache entry lives before expiration. Short TTL = fresher data but more DB hits. Long TTL = better performance but staler data.

**Eviction Policies**: When cache is full, which entries get removed? LRU (Least Recently Used) is the most common. LFU (Least Frequently Used) works better for some access patterns.

### When to Use It

- Read-heavy workloads (read:write ratio > 10:1)
- Data that doesn't change frequently
- Expensive computations or aggregations
- Database query results that are repeated across users

### Trade-offs

| Strategy | Consistency | Write Speed | Read Speed | Complexity |
|----------|------------|-------------|------------|------------|
| Cache-Aside | Eventual | Normal | Fast on hit | Low |
| Write-Through | Strong | Slower | Fast | Medium |
| Write-Back | Eventual | Fastest | Fast | High (data loss risk) |
| Read-Through | Eventual | Normal | Fast | Medium |

### Interview Tip

Always discuss cache invalidation in interviews — it's one of the hardest problems in CS. Mention your TTL strategy and how you handle the case where data changes but the cache still has the old value.

### Key Takeaways

- Cache-aside is the most common and simplest pattern
- TTL is your primary tool for balancing freshness vs performance
- Always plan for cache failures — the system should work without the cache, just slower
- Caching is most effective for read-heavy, relatively static data
`,
  },
  pitfalls: {
    title: "Cache Pitfalls",
    content: `
## Cache Pitfalls

Caching is powerful but introduces subtle problems. Understanding these pitfalls separates junior from senior engineers.

### Core Concepts

**Thundering Herd**: A popular cache key expires. Hundreds of concurrent requests all miss the cache simultaneously and slam the database. The DB gets crushed.

**Cache Stampede**: Similar to thundering herd but caused by cache recomputation. Multiple threads try to recompute the same expensive value concurrently.

**Stale Data**: Cache serves outdated information after the source of truth has changed. Severity depends on the domain — stale stock prices are worse than stale profile pictures.

**Cache Penetration**: Requests for data that doesn't exist in the cache *or* the database. Every request hits the DB since there's nothing to cache. Attackers can exploit this.

**Hot Key**: A single cache key receives disproportionate traffic. If that key's server fails, there's no graceful fallback.

### How It Works

**Thundering herd mitigation:**
- **Cache locking**: First thread to miss acquires a lock. Others wait for it to populate the cache, then read from cache.
- **Staggered TTLs**: Add random jitter to TTLs so keys don't all expire at the same moment.
- **Background refresh**: Refresh cache entries before they expire using a background worker.

**Cache penetration defense:**
- **Bloom filters**: A probabilistic data structure that tells you if a key *definitely doesn't exist*. Check before hitting DB.
- **Cache negative results**: Store a null marker with a short TTL for keys that don't exist.

**Hot key solutions:**
- Replicate hot keys across multiple cache nodes
- Use a local in-process cache (L1) in front of Redis (L2)

### When to Use It

Think about these pitfalls whenever you introduce caching in a system design interview. The interviewer often won't ask directly but will be impressed when you proactively address them.

### Trade-offs

| Pitfall | Solution | Overhead |
|---------|----------|----------|
| Thundering herd | Locking + jitter | Added coordination |
| Cache penetration | Bloom filter | Memory + false positives |
| Stale data | Short TTL + event invalidation | More DB reads or event infra |
| Hot key | Local cache + replication | Memory duplication |

### Interview Tip

When you mention caching in an interview, immediately follow up with "and we'd handle thundering herd by using staggered TTLs and a cache lock pattern." This shows you understand real production concerns, not just textbook caching.

### Key Takeaways

- Thundering herd is the most common cache pitfall — always plan for it
- Bloom filters prevent cache penetration attacks
- Staggered TTLs prevent mass expiration
- Every caching layer you add is a consistency trade-off you need to manage
`,
  },
};
