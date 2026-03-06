export const solution = {
  title: "Design Typeahead System",
  content: `
## Design Typeahead System

An autocomplete system that suggests search queries as the user types, with results appearing within 100ms of each keystroke.

### Functional Requirements

- Return top 5-10 suggestions as user types each character
- Rank suggestions by popularity/relevance
- Support personalized suggestions based on user history
- Update suggestion data as search trends change

### Non-Functional Requirements

- Response time <100ms (users type fast — must keep up)
- Handle 100K+ queries per second
- Suggestions update with trending data (hourly/daily)

### High-Level Architecture

**Client → CDN/Edge Cache → Typeahead Service → Trie Store**

The key insight: most prefixes are the same across users. "how t" → same suggestions for everyone. Cache aggressively.

### Deep Dives

**Trie Data Structure**: A prefix tree where each node represents a character. Store the top K suggestions at each node (precomputed). Lookup: traverse the trie character by character, return the stored suggestions at the final node. O(L) where L = prefix length.

**Precomputed Top K**: Don't compute rankings at query time. A background job periodically rebuilds the trie with updated popularity scores. Each node stores its top 5-10 completions. This makes read latency O(prefix length) with zero computation.

**Data Collection Pipeline**: Log every completed search query with timestamp → Kafka → Aggregation service computes query frequency over time windows → Rebuild trie with new weights → Deploy updated trie to serving nodes.

**Two-Layer Caching**:
1. **Browser/CDN cache**: Cache responses for common prefixes (1-3 characters) at the edge. "ho" has the same suggestions for everyone. Short TTL (1 hour) to pick up trends.
2. **Application cache**: Redis stores prefix → suggestions mappings. Trie is the fallback for cache misses.

**Personalization**: Blend global suggestions with user-specific recent searches. 70% global + 30% personal. Store user's recent 100 searches in a per-user Redis list.

**Filtering**: Remove offensive, dangerous, or legally problematic suggestions. Maintain a blocklist checked at trie-build time and at query time.

### Scalability

- **Trie fits in memory** — English language queries with top-K pruning: ~10GB. Replicate across multiple serving nodes.
- **Shard by prefix range** if data exceeds single node memory (a-m on shard 1, n-z on shard 2)
- **CDN caching** handles the majority of traffic for short, common prefixes
- **Async trie updates** — rebuild in background, swap atomically (blue-green deployment of data)
`,
};
