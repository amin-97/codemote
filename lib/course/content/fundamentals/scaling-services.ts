export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Why Scaling Matters",
    content: `
## Why Scaling Matters

Every system eventually hits a wall. A single server can only handle so many requests per second, store so much data, and process so many operations. Scaling is how you break through that wall.

### Core Concepts

**Throughput ceiling**: Every server has a finite capacity — CPU cycles, memory, network bandwidth, and disk I/O. When traffic exceeds that capacity, requests queue up, latencies spike, and users experience failures.

**Scalability**: The ability of a system to handle increased load by adding resources. A scalable system maintains performance characteristics as demand grows.

**Elasticity**: The ability to scale up *and* back down automatically based on demand. This is critical for cost efficiency — you don't want to pay for peak capacity 24/7.

### How It Works

When your app goes from 100 users to 100,000, several things break simultaneously:

1. **Database connections** saturate — most databases max out around 100-500 concurrent connections
2. **CPU-bound operations** (encryption, compression, computation) create bottlenecks
3. **Memory pressure** increases as you cache more data and hold more sessions
4. **Network bandwidth** becomes a constraint for media-heavy applications

The solution is never a single technique — it's a combination of vertical scaling, horizontal scaling, caching, and architectural changes.

### When to Use It (Interview Context)

Every system design interview implicitly requires you to think about scale. When the interviewer says "design for 1 million daily active users," they're testing whether you understand:
- How to estimate load (QPS, storage, bandwidth)
- Where bottlenecks will appear first
- Which scaling strategies apply to which components

### Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Scale up (vertical) | Simple, no code changes | Hardware limits, single point of failure |
| Scale out (horizontal) | Near-infinite capacity | Complexity, data consistency challenges |
| Do nothing + optimize | Cheap, quick wins | Temporary — delays the inevitable |

### Interview Tip

Always start a system design answer with a **back-of-the-envelope estimation**. Calculate QPS, storage needs, and bandwidth. This shows the interviewer you think about scale from the start, not as an afterthought.

### Key Takeaways

- Scaling is about maintaining performance as load increases
- Identify bottlenecks before choosing a scaling strategy
- Back-of-the-envelope math is your first tool in any design interview
- Most real systems use a combination of vertical and horizontal scaling
`,
  },
  "vertical-vs-horizontal": {
    title: "Vertical vs Horizontal Scaling",
    content: `
## Vertical vs Horizontal Scaling

The two fundamental approaches to handling more load. Every scaling decision starts here.

### Core Concepts

**Vertical scaling (scale up)**: Add more power to an existing machine — more CPU cores, RAM, faster disks, better network cards. Your application code doesn't change.

**Horizontal scaling (scale out)**: Add more machines running the same service. Requires a load balancer to distribute traffic and usually requires your application to be **stateless**.

**Stateless services**: Services that don't store user session data locally. Every request contains all the information needed to process it. This is a prerequisite for horizontal scaling.

### How It Works

**Vertical scaling** is straightforward: upgrade your EC2 instance from t3.medium to c5.4xlarge. Your database goes from 8GB RAM to 64GB. Everything works the same, just faster. But there's a hard ceiling — the largest available machine has finite resources.

**Horizontal scaling** adds complexity but removes the ceiling:

1. Deploy multiple identical instances of your service
2. Place a load balancer in front to distribute requests
3. Ensure no instance holds state that another instance needs
4. Store shared state externally (Redis, database, S3)

The key insight: **stateless services scale horizontally with near-zero friction**. Stateful services (databases, caches) require sharding, replication, or consensus protocols.

### When to Use It

- **Vertical first**: For databases, it's often simpler to scale up before introducing sharding. A beefy database server handles a lot of traffic.
- **Horizontal for compute**: Web servers, API servers, and workers should almost always scale horizontally. They're easy to make stateless.
- **Hybrid**: Most production systems use both — vertically scaled databases with horizontally scaled application servers.

### Trade-offs

| Factor | Vertical | Horizontal |
|--------|----------|------------|
| Complexity | Low | Higher (load balancing, state management) |
| Cost curve | Exponential (big machines cost disproportionately more) | Linear (add commodity hardware) |
| Failure impact | Single point of failure | One node fails, others continue |
| Ceiling | Hardware limits (~few TB RAM, ~128 cores) | Practically unlimited |
| Downtime | Often requires restart | Rolling deploys, zero downtime |

### Interview Tip

When discussing scaling in interviews, always mention **why** you'd choose horizontal over vertical (or vice versa) for each component. Don't just say "we scale horizontally" — say "we scale the API layer horizontally because it's stateless, and the database vertically initially because sharding adds complexity we don't need yet at this scale."

### Key Takeaways

- Vertical scaling is simpler but has a hard ceiling and creates single points of failure
- Horizontal scaling requires stateless design but offers near-infinite capacity
- Make services stateless by externalizing session/state to shared stores
- Most systems use a combination: horizontal for compute, vertical (then sharded) for storage
`,
  },
};
