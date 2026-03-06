export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Consistent Hashing Deep Dive",
    content: `
## Consistent Hashing Deep Dive

Standard hashing breaks when you add or remove servers — nearly all keys get remapped. Consistent hashing solves this by remapping only a fraction of keys, making it essential for distributed caches and databases.

### Core Concepts

**Hash Ring**: Imagine a circle of hash values (0 to 2^32). Both servers and keys are hashed onto this ring. Each key is assigned to the next server clockwise from its position.

**Virtual Nodes**: Each physical server gets multiple positions on the ring (e.g., 150 virtual nodes per server). This ensures even distribution — without virtual nodes, servers can end up with wildly uneven loads.

**Minimal Redistribution**: When a server is added, it only takes keys from its immediate clockwise neighbor. When removed, its keys move to the next server. Only ~1/N of keys are affected.

### How It Works

1. Hash each server ID to get positions on the ring: hash("server-A") → 45, hash("server-A-v2") → 189, etc.
2. Hash each data key: hash("user:123") → 67
3. Walk clockwise from 67 → next server position is server-A at 189
4. Store/retrieve "user:123" on server-A
5. Add server-C → it claims a portion of the ring, ~1/N keys migrate

### When to Use It

- Distributed caches (Redis Cluster, Memcached)
- Database sharding with dynamic shard counts
- Load balancing with sticky routing
- Distributed hash tables (DHTs)

### Trade-offs

| Factor | Standard Hash (key % N) | Consistent Hashing |
|--------|------------------------|-------------------|
| Key redistribution on resize | ~100% | ~1/N |
| Even distribution | Good | Requires virtual nodes |
| Implementation complexity | Trivial | Moderate |
| Lookup speed | O(1) | O(log N) with sorted ring |

### Interview Tip

Consistent hashing comes up in almost every "design a distributed cache" or "design a key-value store" question. Draw the ring, place servers and keys on it, and show what happens when a node is added. Mention virtual nodes for even distribution.

### Key Takeaways

- Consistent hashing minimizes key redistribution when nodes change
- Virtual nodes are essential for even load distribution
- Used in caches, databases, and load balancers across the industry
- Adding a node only redistributes ~1/N of keys vs ~100% with modular hashing
`,
  },
};
