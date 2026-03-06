export const solution = {
  title: "Design Webhook",
  content: `
## Design Webhook

A service that receives incoming event notifications (e.g., payment processed from Stripe) and reliably delivers them to registered endpoints.

### Functional Requirements

- Register webhook endpoints with event type subscriptions
- Receive incoming events via API
- Deliver events to subscribed endpoints reliably
- Retry failed deliveries with exponential backoff
- Event logging for debugging and auditing
- Signature verification for security

### Non-Functional Requirements

- At-least-once delivery guarantee
- Process millions of events per day
- Delivery latency <30 seconds for 99% of events
- Graceful handling of slow or unresponsive endpoints

### API Design

\`\`\`
POST   /webhooks              → Register endpoint { url, events[], secret }
DELETE /webhooks/:id          → Unregister
POST   /events                → Receive event { type, payload }
GET    /webhooks/:id/logs     → Delivery logs with status
\`\`\`

### High-Level Architecture

**Ingestion → Queue → Delivery Workers → Target Endpoints**

1. Event arrives at ingestion API → stored in Events DB → published to delivery queue
2. Delivery workers pull from queue, look up subscribers for the event type
3. Worker sends HTTP POST to each subscriber's URL with signed payload
4. On success → mark delivered. On failure → requeue with backoff.

### Data Model

**webhooks**: id, user_id, url, events (text[]), secret, active, created_at

**events**: id, type, payload (JSONB), received_at

**deliveries**: id, event_id, webhook_id, status (pending/delivered/failed), attempts, next_retry_at, last_error, delivered_at

### Deep Dives

**Retry Strategy**: Exponential backoff with jitter: 1min, 5min, 30min, 2hr, 8hr, 24hr. Max 6 retries over ~34 hours. After max retries, mark as permanently failed and notify the webhook owner. Store retry state in the deliveries table.

**Signature Verification**: Sign each payload using HMAC-SHA256 with the webhook's secret. Include the signature in the \`X-Webhook-Signature\` header. Recipients verify by computing the same HMAC and comparing.

**Idempotency**: Include a unique \`event_id\` in every delivery. Recipients should deduplicate by event_id to handle at-least-once delivery.

**Circuit Breaker per Endpoint**: If an endpoint fails consistently (e.g., 5 consecutive failures), temporarily disable delivery and notify the owner. Resume with a test ping after a cooldown period.

### Scalability

- **Queue partitioning**: Partition by webhook_id so deliveries to the same endpoint are sequential (prevents overwhelming a single endpoint)
- **Worker auto-scaling**: Scale based on queue depth
- **Slow endpoints**: Set a 30-second timeout per delivery attempt — don't let one slow endpoint block workers
- **Event fan-out**: If one event has 1000 subscribers, each delivery is a separate queue message
`,
};
