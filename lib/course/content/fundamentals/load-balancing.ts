export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Load Balancing Fundamentals",
    content: `
## Load Balancing Fundamentals

A load balancer distributes incoming requests across multiple servers so no single server becomes overwhelmed. It's the gateway to horizontal scaling.

### Core Concepts

**L4 (Transport Layer) Load Balancing**: Routes traffic based on IP address and TCP port. Fast because it doesn't inspect packet contents. Used for raw TCP/UDP traffic.

**L7 (Application Layer) Load Balancing**: Routes based on HTTP headers, URL paths, cookies. Slower but smarter — can route /api to one pool and /static to another.

**Health Checks**: The load balancer periodically pings backend servers. Unhealthy servers are removed from the pool automatically. This is how you get self-healing.

**Session Persistence (Sticky Sessions)**: Routes requests from the same client to the same backend server. Necessary when server holds session state — but it undermines even distribution. Prefer stateless backends instead.

### How It Works

1. Client sends request to the load balancer's IP
2. LB selects a backend server using its configured algorithm
3. LB forwards the request to the chosen server
4. Server processes and responds (either directly or through the LB)

**Common algorithms:**
- **Round Robin**: Rotate through servers sequentially. Simple, works when servers are identical.
- **Least Connections**: Send to the server with fewest active connections. Better when request processing times vary.
- **Weighted Round Robin**: Assign weights based on server capacity. Useful with heterogeneous hardware.
- **IP Hash**: Hash the client IP to deterministically pick a server. Provides session affinity without sticky sessions.
- **Least Response Time**: Route to the server responding fastest. Good for latency-sensitive applications.

### When to Use It

Every system with more than one application server needs a load balancer. In interviews, introduce it the moment you add a second server.

Real-world: AWS ALB (L7), NLB (L4), Nginx, HAProxy, Envoy. Cloud providers also offer global load balancing across regions.

### Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| L4 LB | Very fast, low overhead | Can't route based on content |
| L7 LB | Smart routing, SSL termination | Higher latency, more CPU |
| DNS-based LB | No single point of failure | Slow propagation, limited control |
| Sticky sessions | Simple state management | Uneven load, scaling issues |

### Interview Tip

When you add a load balancer in your design, mention what type (L4 vs L7), what algorithm, and how health checks work. This shows depth. Also mention that the LB itself can be a single point of failure — in production you'd have redundant LBs.

### Key Takeaways

- Load balancers distribute traffic to prevent any single server from being overwhelmed
- L4 is fast but dumb; L7 is smart but slower
- Health checks enable automatic failover
- Prefer stateless backends over sticky sessions
- The load balancer itself needs redundancy
`,
  },
};
