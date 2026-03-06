export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "CQRS & Read/Write Separation",
    content: `
## CQRS & Read/Write Separation

Most applications read far more than they write. CQRS (Command Query Responsibility Segregation) exploits this asymmetry by using separate models — and often separate databases — for reads and writes.

### Core Concepts

**Command Model (Write Side)**: Handles all state changes. Normalized, optimized for consistency and data integrity. Enforces business rules and validation. Typically backed by a relational database.

**Query Model (Read Side)**: Handles all reads. Denormalized, optimized for fast queries. Pre-computed views, flattened data, no JOINs at read time. Can be backed by Elasticsearch, Redis, or a read-optimized database.

**Event Bus**: The bridge between write and read. When the write model changes state, it publishes an event. The read model consumes the event and updates its denormalized view. This makes the read model eventually consistent with the write model.

**Eventual Consistency**: The read model may lag behind the write model by milliseconds to seconds. For most applications this is acceptable — your Twitter timeline doesn't need to show a tweet within the same millisecond it was posted.

### How It Works

1. User submits a command (e.g., "place order")
2. Command handler validates and writes to the write database
3. Write database publishes an \`OrderPlaced\` event to Kafka
4. Read model consumer picks up the event
5. Consumer updates the denormalized read store (e.g., adds to the user's order history view)
6. User queries the read model (e.g., "show my orders") — fast, no JOINs

**Without CQRS**: One database serves both reads and writes. Complex read queries (dashboards, search, aggregations) compete with write transactions for resources. Indexes that speed up reads slow down writes.

**With CQRS**: Writes go to a lean, normalized store. Reads go to a purpose-built store optimized for the exact queries you need. Each can scale independently.

### When to Use It

- Read-heavy applications (social feeds, dashboards, e-commerce catalogs)
- Systems where read and write patterns are fundamentally different
- When you need to scale reads and writes independently
- Complex read queries that are expensive on a normalized schema

**Don't use it for**: Simple CRUD apps, prototypes, or systems where eventual consistency is unacceptable (real-time financial trading).

### Trade-offs

| Factor | Single Model | CQRS |
|--------|-------------|------|
| Simplicity | Simple | Complex (two models, sync logic) |
| Read performance | Constrained by normalization | Optimized, denormalized |
| Write performance | Constrained by read indexes | Lean, no read overhead |
| Consistency | Immediate | Eventual (read model lags) |
| Scalability | Read/write coupled | Independent scaling |
| Infrastructure | One database | Multiple stores + event bus |

### Combining with Event Sourcing

CQRS pairs naturally with event sourcing. Instead of storing current state in the write model, you store a sequence of events. The read model is rebuilt by replaying events. This gives you:

- Complete audit trail
- Ability to rebuild read models from scratch
- Time-travel queries (what was the state at timestamp X?)
- Multiple read models from the same event stream (one for search, one for analytics, one for notifications)

### Interview Tip

When the interviewer asks about a system with heavy reads and complex queries (news feed, analytics dashboard, e-commerce search), introduce CQRS. Explain that the write path goes to a normalized database, and the read path is served from a denormalized store purpose-built for the query patterns. Always mention the eventual consistency trade-off and how you'd handle it (show a "saving..." indicator, use read-your-writes consistency for the author).

### Key Takeaways

- CQRS separates read and write models for independent optimization and scaling
- The read model is denormalized and eventually consistent with the write model
- An event bus (Kafka) bridges the two models
- Pairs naturally with event sourcing for audit trails and temporal queries
- Adds significant complexity — only use it when read/write patterns are genuinely different
`,
  },
};
