export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Replication Strategies",
    content: `
## Replication Strategies

Data replication keeps copies of data on multiple machines for fault tolerance and read scalability. The fundamental trade-off is between consistency and availability.

### Core Concepts

**Leader-Follower (Master-Slave)**: One leader handles all writes. Followers replicate from the leader and serve reads. Simple but the leader is a bottleneck and single point of failure.

**Multi-Leader**: Multiple nodes accept writes. Conflicts must be resolved when two leaders modify the same data simultaneously. Used for multi-region deployments.

**Leaderless**: Any node can accept reads and writes. Uses quorum-based consensus — a write succeeds if W nodes acknowledge, a read succeeds if R nodes respond. When W + R > N, you get strong consistency.

**Synchronous vs Asynchronous Replication**: Synchronous waits for followers to confirm before acknowledging the write (strong consistency, higher latency). Asynchronous acknowledges immediately (lower latency, risk of data loss if leader crashes).

### How It Works

Leader-follower (most common):
1. Client writes to the leader
2. Leader writes to its local storage and streams the change to followers
3. Followers apply the change (synchronously or asynchronously)
4. Read requests can go to any follower (for read scaling) or the leader (for consistency)

**Replication lag**: The delay between a write on the leader and its availability on followers. With async replication, a user might write data and then not see it on a read (if the read hits a lagging follower). Solutions: read-your-writes consistency, monotonic reads.

### When to Use It

- Read-heavy workloads — add read replicas to distribute load
- High availability — if the leader fails, promote a follower
- Multi-region — replicate data closer to users globally
- Disaster recovery — maintain copies in different data centers

### Trade-offs

| Strategy | Consistency | Write Scalability | Complexity | Failure Handling |
|----------|------------|-------------------|------------|-----------------|
| Leader-Follower | Strong (sync) or Eventual (async) | Single leader bottleneck | Low | Failover needed |
| Multi-Leader | Eventual (conflicts) | Multiple write points | High | Conflict resolution |
| Leaderless | Tunable (quorum) | Any node writes | Medium | No failover needed |

### Interview Tip

When discussing databases in interviews, always mention replication. Specify leader-follower with async replication for most use cases, and mention that you'd use synchronous replication for critical data (financial transactions). For global systems, discuss multi-region replication with conflict resolution.

### Key Takeaways

- Leader-follower is the default — simple and well-understood
- Async replication trades consistency for performance
- Quorum reads/writes (W + R > N) provide tunable consistency in leaderless systems
- Replication lag is the root cause of most "I just saved but I don't see it" bugs
`,
  },
};
