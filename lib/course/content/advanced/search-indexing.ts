export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Search & Indexing",
    content: `
## Search & Indexing

Full-text search is fundamentally different from database queries. Searching "best Italian restaurant near me" across millions of documents requires specialized data structures and algorithms.

### Core Concepts

**Inverted Index**: The core data structure of search engines. Instead of mapping documents to words (like a book), it maps words to documents. "caching" → [doc_7, doc_23, doc_891]. This makes text search O(1) per term.

**Tokenization**: Breaking text into searchable tokens. "Load Balancing 101" → ["load", "balancing", "101"]. Includes lowercasing, stemming ("running" → "run"), and stop word removal ("the", "is").

**TF-IDF (Term Frequency–Inverse Document Frequency)**: A relevance scoring method. Words that appear often in a document but rarely across all documents score higher. "Kafka" in a system design article is more relevant than "the".

**Elasticsearch**: The dominant search engine built on Apache Lucene. Distributed, real-time, handles both full-text search and analytics. Stores data in JSON documents across shards.

### How It Works

1. **Indexing**: Document is tokenized → tokens are added to the inverted index → document is stored
2. **Searching**: Query is tokenized → matching documents are found via inverted index → results are scored by relevance → top K results returned
3. **Ranking**: Combine TF-IDF with other signals (recency, popularity, personalization) to order results

Elasticsearch cluster:
- Data is split into **shards** distributed across nodes
- Each shard has **replicas** for fault tolerance
- Queries run on all relevant shards in parallel, results are merged

### When to Use It

- Full-text search (product search, article search)
- Autocomplete / typeahead suggestions
- Log aggregation and analytics (ELK stack)
- Geospatial search (restaurants near me)

### Trade-offs

| Factor | Database LIKE query | Elasticsearch |
|--------|-------------------|---------------|
| Speed | Slow (full table scan) | Fast (inverted index) |
| Relevance ranking | None | TF-IDF, BM25, custom |
| Fuzzy matching | Poor | Excellent |
| Consistency | Real-time | Near real-time (refresh interval) |
| Complexity | Zero | Additional infrastructure |

### Interview Tip

When a system needs search (products, posts, users), introduce Elasticsearch as a read-optimized secondary store. The primary database remains the source of truth, with changes streamed to ES via a change data capture pipeline or message queue.

### Key Takeaways

- Inverted indexes make full-text search fast — map words to documents, not documents to words
- Elasticsearch is the industry standard for search — distributed, real-time, feature-rich
- Search is a read-optimized secondary store, not a replacement for your primary database
- Tokenization and relevance scoring are what make search "smart"
`,
  },
};
