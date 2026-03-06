export const lessons: Record<string, { title: string; content: string }> = {
  "sql-vs-nosql": {
    title: "SQL vs NoSQL",
    content: `
## SQL vs NoSQL

Choosing the right database is one of the most impactful decisions in system design. It affects consistency, scalability, query patterns, and development speed.

### Core Concepts

**ACID (SQL)**: Atomicity, Consistency, Isolation, Durability. Guarantees that transactions are reliable. If a bank transfer debits one account, it *must* credit another — no partial state.

**BASE (NoSQL)**: Basically Available, Soft state, Eventually consistent. Trades strong consistency for availability and partition tolerance. Your Instagram like count might be slightly off for a few seconds.

**CAP Theorem**: In a distributed system, you can only guarantee two of three: Consistency, Availability, Partition tolerance. Since network partitions are inevitable, the real choice is between CP (consistent but may be unavailable) and AP (available but may serve stale data).

### How It Works

**Relational (SQL)**: PostgreSQL, MySQL. Data in tables with strict schemas. JOINs link related data. Best for complex queries, transactions, and data integrity. Schema changes require migrations.

**Document (NoSQL)**: MongoDB, DynamoDB. JSON-like documents with flexible schemas. Nest related data together. Best for varied data shapes and rapid iteration. No JOINs — denormalize instead.

**Key-Value**: Redis, DynamoDB. Simple get/set by key. Blazing fast. Best for caching, sessions, feature flags.

**Wide-Column**: Cassandra, HBase. Rows with dynamic columns. Best for time-series data, write-heavy workloads at massive scale.

**Graph**: Neo4j. Nodes and edges. Best for highly connected data — social networks, recommendation engines.

### When to Use It

- **SQL**: Financial transactions, user accounts, anything requiring JOINs or complex queries, data integrity is critical
- **Document NoSQL**: Product catalogs, user profiles, content management — varied schemas, read-heavy
- **Key-Value**: Caching, session storage, rate limiting counters
- **Wide-Column**: IoT sensor data, event logging, analytics at massive write scale
- **Graph**: Social connections, fraud detection, knowledge graphs

### Trade-offs

| Factor | SQL | NoSQL |
|--------|-----|-------|
| Schema | Rigid, enforced | Flexible, schema-on-read |
| Scaling | Vertical first, sharding is hard | Horizontal by design |
| Consistency | Strong (ACID) | Eventual (usually) |
| Queries | Complex JOINs, aggregations | Simple lookups, denormalized reads |
| Dev speed | Slower schema changes | Faster iteration |

### Interview Tip

Don't just pick one — use multiple databases for different parts of the system. "We'll use PostgreSQL for user accounts and orders (needs transactions), Redis for caching and sessions, and Elasticsearch for search." This shows mature architectural thinking.

### Key Takeaways

- SQL for strong consistency and complex queries; NoSQL for scale and flexibility
- CAP theorem means you're choosing between consistency and availability
- Most production systems are polyglot — they use multiple database types
- The access pattern determines the right database, not the data itself
`,
  },
};
