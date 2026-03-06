export const solution = {
  title: "Design Uber",
  content: `
## Design Uber

A ride-sharing platform that matches riders with nearby drivers in real-time.

### Functional Requirements

- Riders request a ride (pickup + destination)
- System matches with the nearest available driver
- Real-time location tracking during the ride
- ETA calculation
- Fare estimation and payment processing
- Trip history for riders and drivers

### Non-Functional Requirements

- Matching latency <30 seconds
- Location updates every 3-5 seconds per active driver
- Support millions of concurrent drivers/riders
- High availability in all operating cities

### High-Level Architecture

**Rider App / Driver App → API Gateway → Trip Service / Matching Service / Location Service / Payment Service**

The core challenge is **real-time geospatial matching** — finding the nearest available driver to a rider efficiently.

### Deep Dives

**Location Service — Tracking Millions of Drivers**: Every active driver sends GPS coordinates every 4 seconds. That's 250K updates/second for 1M active drivers. Store current positions in an in-memory geospatial index.

**Geospatial Index — Geohash Grid**: Divide the map into geohash cells (e.g., precision 6 = ~1.2km × 0.6km cells). Maintain a Redis hash: \`cell:dr5ru7 → {driver_1: {lat, lng, timestamp}, driver_2: ...}\`. To find nearby drivers: compute the rider's geohash + 8 neighboring cells → query all 9 cells → filter by distance → sort by proximity.

**Matching Algorithm**:
1. Rider requests ride → Trip Service creates trip with status "matching"
2. Matching Service queries Location Service for nearest available drivers (within 5km)
3. Send ride offer to the closest driver (with 15-second timeout)
4. If declined/timeout → offer to next closest driver
5. On accept → trip status becomes "matched," both parties notified

**ETA Calculation**: Pre-compute travel times between geohash cells using historical trip data. For real-time ETA: Dijkstra/A* on a road network graph with edge weights from current traffic conditions. Cache popular routes.

**Fare Calculation**: Base fare + (rate per km × distance) + (rate per min × duration) + surge multiplier. Surge pricing: when demand/supply ratio in a geohash cell exceeds a threshold, multiply fare by 1.2x–3x. Compute surge per cell every 2 minutes.

**Trip Lifecycle**: requesting → matching → driver_en_route → in_progress → completed → payment_processed. Each state transition published as an event for tracking, analytics, and payment.

### Scalability

- **Location Service** is write-intensive — Redis cluster with geospatial commands (GEOADD, GEOSEARCH)
- **Partition by city** — each city's matching runs independently
- **Kafka** for trip events — decouples matching from payment and analytics
- **Surge calculation** runs as a periodic batch job per geohash cell
- **Payment** processed asynchronously after trip completion
`,
};
