export const solution = {
  title: "Design TicketMaster",
  content: `
## Design TicketMaster

An event ticketing platform where users browse events, select seats, and purchase tickets — with the critical challenge of handling massive concurrent demand for popular events.

### Functional Requirements

- Browse and search events by location, date, category
- View venue seating chart with available seats
- Select seats and hold temporarily during checkout
- Purchase tickets with payment processing
- Prevent double-booking (same seat sold to two people)
- Handle flash sales (Taylor Swift: 2M people trying to buy simultaneously)

### Non-Functional Requirements

- Zero double-bookings (strong consistency for seat inventory)
- Handle 100K+ concurrent users per popular event
- Seat hold timeout (10 minutes) to prevent hoarding
- Fair queuing during high-demand events

### High-Level Architecture

**Client → CDN/Queue → API Gateway → Event Service / Inventory Service / Payment Service / Order Service**

The core challenge is **inventory management under extreme concurrency** — thousands of people clicking the same seat simultaneously.

### Deep Dives

**Seat Inventory — Pessimistic Locking**: Each seat is a row in the database: \`seats (id, event_id, section, row, number, status: available/held/sold, held_by, held_until)\`. When a user selects a seat:

1. \`UPDATE seats SET status='held', held_by=user_id, held_until=NOW()+10min WHERE id=seat_id AND status='available'\`
2. If affected rows = 1 → success, seat is held. If 0 → seat already taken, show error.
3. \`SELECT ... FOR UPDATE\` provides row-level locking.

This guarantees no double-booking at the database level. The 10-minute hold expires automatically — a background job releases expired holds.

**Virtual Queue for Flash Sales**: When demand far exceeds supply, put users in a queue before they can browse seats. Assign each user a random queue position. Process in batches (e.g., let 1000 users into the booking flow every 30 seconds). Show "Your position: 45,231" with estimated wait time. This prevents the booking system from being overwhelmed.

**Payment Flow**:
1. User selects seat → seat held for 10 minutes
2. User enters payment info → payment service charges card
3. On success → seat status = 'sold', generate ticket/confirmation
4. On failure → release seat hold
5. On timeout (10 min) → release seat hold automatically

**Idempotent Payments**: Use an order_id as idempotency key with the payment provider. If the user double-clicks "pay" or retries after a timeout, the same charge is not applied twice.

**Venue/Seating Data**: Pre-render seating charts as SVG. Store seat coordinates. Color-code by availability (green/gray/red). Update availability via WebSocket or polling every few seconds during active sales.

### Scalability

- **Shard inventory by event_id** — all seats for one event on the same database shard for transactional integrity
- **Read replicas** for event browsing and search (read-heavy)
- **Redis** for queue position tracking during flash sales
- **CDN** for static event pages, venue images, seating charts
- **Kafka** for order events → analytics, email confirmations, fraud detection
`,
};
