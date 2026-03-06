export const lessons: Record<string, { title: string; content: string }> = {
  algorithms: {
    title: "Rate Limiting Algorithms",
    content: `
## Rate Limiting Algorithms

Rate limiting protects services from abuse and ensures fair resource usage. It's a core component that appears in nearly every system design interview.

### Core Concepts

**Token Bucket**: A bucket holds tokens (refilled at a steady rate). Each request consumes a token. When empty, requests are rejected. Allows short bursts up to bucket capacity while enforcing a long-term average rate.

**Leaky Bucket**: Requests enter a queue (the bucket). They're processed at a fixed rate regardless of arrival rate. Smooths out bursty traffic but doesn't allow any bursts.

**Fixed Window Counter**: Count requests in fixed time windows (e.g., per minute). Simple but has a burst problem at window boundaries — 100 requests at 11:59:59 and 100 at 12:00:01 = 200 in 2 seconds.

**Sliding Window Log**: Track timestamps of every request. Count requests in a sliding window. Accurate but memory-intensive for high-traffic APIs.

**Sliding Window Counter**: Hybrid of fixed window and sliding window. Uses the current window count + a weighted portion of the previous window. Good balance of accuracy and memory.

### How It Works

Token bucket (most common):
1. Bucket starts with N tokens (e.g., 100)
2. Tokens are added at rate R per second (e.g., 10/sec)
3. Each request removes one token
4. If bucket is empty → 429 Too Many Requests
5. Bucket capacity caps at N (no infinite accumulation)

For distributed systems, store counters in Redis. Use \`INCR\` + \`EXPIRE\` for fixed windows, or sorted sets for sliding windows.

### When to Use It

- API gateways — per-client rate limits
- Login endpoints — prevent brute force
- Expensive operations — limit file uploads, AI inference calls
- Multi-tenant systems — fair resource allocation between tenants

### Trade-offs

| Algorithm | Burst Handling | Memory | Accuracy | Complexity |
|-----------|---------------|--------|----------|------------|
| Token Bucket | Allows bursts | Low | Good | Low |
| Leaky Bucket | No bursts | Low | Good | Low |
| Fixed Window | Edge burst issue | Very low | Approximate | Very low |
| Sliding Window Log | Controlled | High | Exact | Medium |
| Sliding Window Counter | Controlled | Low | Good | Medium |

### Interview Tip

When asked "design a rate limiter," clarify: per-user or global? Fixed or dynamic limits? Then choose token bucket (most practical), explain the distributed implementation with Redis, and discuss what happens when the rate limiter itself fails (fail-open vs fail-closed).

### Key Takeaways

- Token bucket is the industry standard — allows bursts while enforcing average rate
- Use Redis for distributed rate limiting across multiple API servers
- Fixed window has a boundary burst problem — sliding window fixes it
- Decide on fail-open (allow traffic) vs fail-closed (block traffic) for rate limiter failures
`,
  },
};
