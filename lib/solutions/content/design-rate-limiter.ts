export const solution = {
  title: "Design Rate Limiter",
  content: `
## Design Rate Limiter

A middleware service that limits the number of requests a client can make within a time window, protecting backend services from abuse and overload.

### Functional Requirements

- Limit requests per client identity (user ID, API key, IP)
- Support multiple rate limit rules (e.g., 100/min for free tier, 1000/min for paid)
- Return appropriate headers (X-RateLimit-Remaining, Retry-After)
- Configurable rules without redeploying

### Non-Functional Requirements

- Sub-millisecond latency (inline at the API gateway)
- Distributed — enforce limits across multiple gateway instances
- Highly available (if rate limiter fails, prefer failing open)
- Accurate across concurrent requests

### API Design

Internal middleware — not a user-facing API. Runs inline:

\`\`\`
For each request:
  1. Extract identity (API key, user_id, IP)
  2. Look up applicable rules
  3. Check counter → allow or reject (429 Too Many Requests)
  4. Increment counter
\`\`\`

### High-Level Architecture

**Client → API Gateway (Rate Limiter middleware) → Backend Services**

The rate limiter sits at the gateway layer. It checks a centralized counter store (Redis) before forwarding requests to backend services.

### Deep Dives

**Token Bucket Algorithm** (recommended):
- Each identity has a bucket with capacity N (burst size)
- Tokens refill at rate R per second
- Each request costs 1 token
- If tokens available → allow and decrement. If empty → reject.

Redis implementation:
\`\`\`
-- Lua script for atomic token bucket
local tokens = redis.call('GET', key)
local last_refill = redis.call('GET', key..':time')
-- Calculate tokens to add since last refill
-- If tokens > 0: decrement and allow
-- Else: reject with Retry-After header
\`\`\`

Using a Lua script ensures atomicity — no race conditions between check and decrement.

**Sliding Window Counter**: Hybrid approach. Maintain counters for the current and previous window. Weight the previous window by the overlap percentage. More accurate than fixed window, cheaper than sliding log.

**Rule Configuration**: Store rules in a configuration service or database. Rules map identity type + tier to limits: \`{ identity: "api_key", tier: "free", limit: 100, window: "1m" }\`. Cache rules locally at each gateway with short TTL.

**Distributed Accuracy**: With multiple gateway instances all hitting Redis, use Redis Lua scripts for atomic read-check-increment. Accept minor over-counting (~1-2%) as acceptable.

### Scalability

- **Redis cluster** with replicas for high availability
- **Local cache** of rules at each gateway (avoid DB round trip per request)
- **Fail-open policy**: If Redis is down, allow requests through — better to risk some abuse than block all traffic
- **Sharded counters**: For extremely hot keys, shard the counter across multiple Redis keys and sum on read
`,
};
