export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "CDN Fundamentals",
    content: `
## CDN Fundamentals

A Content Delivery Network caches content at edge servers worldwide, serving users from the nearest location. It dramatically reduces latency for static assets and can also accelerate dynamic content.

### Core Concepts

**Edge Servers (PoPs)**: Points of Presence around the world. When a user in Tokyo requests an image, they get it from the Tokyo edge server, not your origin in Virginia. Latency drops from 200ms to 20ms.

**Pull-based CDN**: Edge server fetches content from origin on the first request, then caches it. Subsequent requests are served from cache. Simple, no configuration per file.

**Push-based CDN**: You upload content directly to the CDN. Content is available before the first request. Better for large files you know will be popular.

**Cache Invalidation**: When you update content, edge caches still serve the old version until TTL expires. You can purge specific URLs or use versioned filenames (\`app.v2.js\`).

**Origin Shield**: An intermediate cache layer between edge servers and your origin. Instead of 50 edge servers hitting your origin independently, they hit one shield server — reducing origin load.

### How It Works

1. User requests \`cdn.example.com/image.jpg\`
2. DNS routes to the nearest CDN edge server
3. Edge checks local cache — hit → return (sub-10ms)
4. Cache miss → edge requests from origin (or origin shield)
5. Origin responds, edge caches and serves the response

### When to Use It

- Static assets: images, CSS, JS, fonts, videos
- API responses that are cacheable (public, read-only data)
- Reducing origin server load globally
- DDoS mitigation (CDN absorbs attack traffic at the edge)

### Trade-offs

| Factor | With CDN | Without CDN |
|--------|----------|-------------|
| Latency | Low (served from edge) | High (cross-continent round trip) |
| Origin load | Minimal for cached content | Every request hits origin |
| Cost | CDN bandwidth costs | Server bandwidth costs |
| Cache staleness | Possible — need invalidation strategy | Always fresh |
| Complexity | Additional configuration | Simpler architecture |

### Interview Tip

Mention CDNs whenever your system serves static content globally. Specify that you'd use versioned URLs for cache busting rather than TTL-based invalidation, as it's more reliable.

### Key Takeaways

- CDNs reduce latency by serving from the nearest edge server
- Pull-based is simpler; push-based is better for predictable popular content
- Use versioned filenames for reliable cache invalidation
- Origin shields reduce load on your servers when cache misses are high
`,
  },
};
