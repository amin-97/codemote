export const solution = {
  title: "Design Google Maps",
  content: `
## Design Google Maps

A navigation and mapping platform providing map rendering, directions, real-time traffic, and location search.

### Functional Requirements

- Render interactive maps (pan, zoom, satellite view)
- Search for locations, addresses, businesses
- Turn-by-turn directions (driving, walking, transit)
- Real-time traffic conditions
- ETA calculation with live traffic

### Non-Functional Requirements

- Map tile loading <200ms
- Directions computation <2 seconds
- Support billions of daily map tile requests
- Global coverage with real-time traffic data

### High-Level Architecture

**Client → CDN (Map Tiles) + API Gateway → Directions Service / Search Service / Traffic Service**

### Deep Dives

**Map Tile Rendering**: The world map is pre-rendered into square image tiles at multiple zoom levels (0-20). Zoom level 0 = 1 tile (whole world). Zoom level 20 = billions of tiles (street level). Each zoom level has 4x the tiles of the previous level.

Tiles are static images stored in object storage and served via CDN. The client requests tiles by coordinates: \`/tiles/{zoom}/{x}/{y}.png\`. Pre-rendering means zero computation at request time — pure static file serving. Only re-render when map data changes (roads, buildings).

**Vector Tiles**: Modern approach — instead of raster images, send vector data (roads, buildings as geometric shapes). Client renders locally. Benefits: smaller file size, smooth zoom, dynamic styling, 3D buildings. Used by Google Maps and Mapbox.

**Directions — Graph-Based Routing**: The road network is a weighted graph. Nodes = intersections, edges = road segments, weights = travel time. Dijkstra's algorithm finds shortest path. For large scale, use **Contraction Hierarchies**: pre-process the graph by contracting unimportant nodes, creating shortcuts. Reduces query time from seconds to milliseconds for continental-scale routing.

**Real-Time Traffic**: Aggregate GPS data from millions of phones. Map GPS points to road segments (map matching). Compute average speed per road segment over recent time windows (5 min). Compare with free-flow speed to classify: green (normal), yellow (slow), red (congested). Update traffic layer every 2 minutes.

**ETA Calculation**: Use historical traffic patterns by day-of-week and time-of-day for each road segment. Blend with real-time traffic data. For a route: sum the estimated traversal time for each road segment using the blended speed data.

**Location Search**: Elasticsearch with geospatial queries. Index businesses, addresses, landmarks with coordinates. Support fuzzy matching ("starbuks" → "Starbucks"), autocomplete, and "near me" filtering.

### Scalability

- **CDN** handles 99% of map tile requests — the most cacheable workload imaginable
- **Pre-computed routing** (Contraction Hierarchies) makes directions fast without massive compute
- **Traffic data** processed via stream processing (Flink) on GPS telemetry
- **Shard search index** by geographic region
- **Cache popular routes** (home → work) with TTL based on traffic volatility
`,
};
