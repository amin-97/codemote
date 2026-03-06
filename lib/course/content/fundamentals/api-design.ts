export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "API Design Principles",
    content: `
## API Design Principles

APIs are the contracts between services. A well-designed API is intuitive, consistent, and evolvable. In system design interviews, API design is often the first concrete artifact you produce.

### Core Concepts

**REST**: Resource-oriented. \`GET /users/123\`, \`POST /orders\`. Uses HTTP verbs and status codes. Stateless. The default choice for external APIs.

**GraphQL**: Client specifies exactly what data it needs. Eliminates over-fetching and under-fetching. Great for mobile clients with varying data needs. More complex server-side.

**gRPC**: Binary protocol using Protocol Buffers. Strongly typed, very fast. Ideal for internal service-to-service communication. Supports streaming.

**Pagination**: Never return unbounded lists. Use cursor-based pagination (\`?after=abc123&limit=20\`) for real-time data or offset-based (\`?page=2&size=20\`) for static data.

**Idempotency**: A request that can be safely retried without side effects. \`GET\` is naturally idempotent. For \`POST\`, use an idempotency key so retries don't create duplicates.

### How It Works

In a system design interview, define your API early:

1. List the core entities (User, Post, Comment)
2. Define the operations (CRUD + any custom actions)
3. Specify request/response shapes
4. Add pagination, filtering, and rate limiting

Example for a URL shortener:
- \`POST /urls\` — body: \`{ original_url: "..." }\` → response: \`{ short_code: "abc123" }\`
- \`GET /:short_code\` → 301 redirect to original URL
- \`GET /urls/:short_code/stats\` → click count, referrers

### When to Use It

- **REST**: External APIs, web/mobile clients, CRUD-heavy applications
- **GraphQL**: Mobile apps with diverse data needs, API aggregation layers
- **gRPC**: Internal microservice communication, low-latency requirements, streaming

### Trade-offs

| Factor | REST | GraphQL | gRPC |
|--------|------|---------|------|
| Learning curve | Low | Medium | Higher |
| Over-fetching | Common | Eliminated | N/A (defined messages) |
| Caching | Easy (HTTP caching) | Complex | Manual |
| Browser support | Native | Native | Requires proxy |
| Performance | Good | Good | Excellent |

### Interview Tip

Design your API at the start of the interview, not the end. It forces you to think about the data model and use cases clearly. Use concrete examples with real endpoints and response shapes.

### Key Takeaways

- REST for external APIs, gRPC for internal, GraphQL for flexible client needs
- Always include pagination — unbounded responses are a scalability antipattern
- Idempotency keys prevent duplicate operations on retry
- API versioning (URL path or header) enables backward-compatible evolution
`,
  },
};
