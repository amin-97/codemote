export const lessons: Record<string, { title: string; content: string }> = {
  strategies: {
    title: "Sharding Strategies",
    content: `
## Sharding Strategies

Sharding splits a database across multiple machines. Each shard holds a subset of the data. It's how you scale databases horizontally when vertical scaling hits its limit.

### Core Concepts

**Range-Based Sharding**: Split data by ranges (users A-M on shard 1, N-Z on shard 2). Simple to implement but prone to hotspots — if most usernames start with "J", that shard is overloaded.

**Hash-Based Sharding**: Hash the shard key and mod by the number of shards. Distributes data evenly but makes range queries impossible (you can't ask "all users between A-M" without hitting all shards).

**Directory-Based Sharding**: A lookup service maps each key to its shard. Most flexible but the directory becomes a single point of failure and potential bottleneck.

**Consistent Hashing**: A ring-based approach where adding or removing nodes only redistributes a fraction of keys. Essential for dynamic shard counts.

### How It Works

1. Choose a **shard key** — the field that determines which shard holds each record (e.g., user_id)
2. Apply the sharding function to route reads and writes to the correct shard
3. Each shard is an independent database with its own storage and compute
4. Cross-shard queries require scatter-gather (query all shards, merge results)

**Shard key selection is critical**: A bad key creates hotspots. A good key distributes load evenly and keeps related data together.

### When to Use It

- Database exceeds the capacity of the largest single machine
- Write throughput exceeds what one server can handle
- Data volume requires more storage than one server offers

Don't shard prematurely — it adds significant complexity. Exhaust vertical scaling, read replicas, and caching first.

### Trade-offs

| Factor | Sharded | Unsharded |
|--------|---------|-----------|
| Capacity | Near-unlimited | Single machine limit |
| Complexity | High (routing, rebalancing, cross-shard queries) | Low |
| JOINs | Cross-shard joins are expensive/impossible | Normal |
| Transactions | Distributed transactions needed | ACID works normally |
| Rebalancing | Moving data between shards is disruptive | N/A |

### Interview Tip

When you mention sharding, the interviewer will likely ask about your shard key choice and how you handle rebalancing. Have a thoughtful answer: "We'd shard by user_id using consistent hashing. For rebalancing, we'd use virtual nodes so adding a shard only moves ~1/N of the data."

### Key Takeaways

- Shard key selection is the most important decision — it determines data distribution
- Hash-based sharding distributes evenly; range-based enables range queries
- Consistent hashing minimizes data movement when adding/removing shards
- Avoid sharding until you must — it's a one-way door of complexity
`,
  },
};
