export const solution = {
  title: "Design Yelp",
  content: `
## Design Yelp

A location-based service for discovering and reviewing local businesses.

### Functional Requirements

- Search businesses by location, category, and keywords
- View business details, photos, hours, reviews
- Submit and read reviews with ratings
- "Near me" discovery with map view
- Business owners can claim and manage listings

### Non-Functional Requirements

- Search latency <200ms
- Support 100M+ businesses globally
- Location-based queries must be efficient
- Read-heavy (100:1 read-to-write ratio)

### API Design

\`\`\`
GET    /search?lat=40.7&lng=-74.0&radius=5km&category=restaurant&q=sushi
GET    /businesses/:id
GET    /businesses/:id/reviews?page=1
POST   /businesses/:id/reviews    → { rating, text, photos }
\`\`\`

### High-Level Architecture

**Client → API Gateway → Search Service / Business Service / Review Service**

The core challenge is **geospatial search** — finding businesses near a latitude/longitude efficiently.

### Deep Dives

**Geospatial Indexing — QuadTree**: Recursively divide the map into four quadrants. Dense areas (cities) get subdivided more finely. To find businesses within 5km, traverse the tree and collect all businesses in overlapping cells. Works well for non-uniform distribution.

**Alternative — Geohash**: Encode lat/lng into a string (e.g., "dr5ru7"). Nearby locations share prefixes. Store geohash as a column and use prefix queries: \`WHERE geohash LIKE 'dr5ru%'\`. Simple, works with standard databases. Used by Redis GEO commands.

**Search Layer**: Elasticsearch with geo_point fields. Combine location filter with text search: "sushi restaurants within 5km of me, sorted by rating." ES handles both full-text and geospatial queries in one index.

**Review Aggregation**: Don't compute average rating on every read. Maintain a running average and count on the business record. On new review: \`new_avg = (old_avg * count + new_rating) / (count + 1)\`. Update asynchronously.

**Photos**: Store in S3/object storage, serve via CDN. Thumbnail generation happens asynchronously via a worker queue on upload.

### Scalability

- **Read replicas** for the business database (read-heavy)
- **Elasticsearch cluster** sharded by geography for search
- **CDN** for business photos and static content
- **Cache** popular business pages and search results in Redis (short TTL since reviews change)
- **Shard reviews** by business_id — reviews for one business are always on the same shard
`,
};
