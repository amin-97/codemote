export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Message Queues & Async Processing",
    content: `
## Message Queues & Async Processing

Message queues decouple producers from consumers. Instead of service A calling service B directly, A puts a message on a queue and B processes it when ready. This is the foundation of resilient, scalable architectures.

### Core Concepts

**Point-to-Point**: One producer, one consumer per message. Each message is processed exactly once. Think: job queues (RabbitMQ, SQS).

**Pub/Sub**: One producer, many consumers. Each subscriber gets a copy of every message. Think: event broadcasting (Kafka topics, SNS).

**Ordering Guarantees**: Some queues guarantee FIFO (first-in, first-out) within a partition. Kafka guarantees order per partition. SQS FIFO guarantees order per message group.

**At-Least-Once vs Exactly-Once**: Most queues provide at-least-once delivery — a message might be delivered twice if the consumer crashes before acknowledging. Exactly-once requires idempotent consumers or transactional processing.

**Backpressure**: When consumers can't keep up with producers, messages pile up. Good queue systems let you monitor queue depth and auto-scale consumers.

### How It Works

1. Producer publishes a message to a topic/queue
2. Message broker stores it durably (on disk)
3. Consumer polls or receives the message
4. Consumer processes it and sends an acknowledgment
5. Broker removes acknowledged messages (or marks offset as committed in Kafka)

**Kafka** is a distributed log — messages persist for a configurable retention period. Consumers track their position (offset) in the log. This enables replay and multiple consumer groups reading the same data.

### When to Use It

- Decouple services that don't need synchronous responses
- Handle traffic spikes by buffering (producers spike, consumers process at steady rate)
- Fan-out events to multiple downstream services
- Reliable background job processing (emails, image resizing, notifications)

### Trade-offs

| Factor | Synchronous (HTTP) | Asynchronous (Queue) |
|--------|-------------------|---------------------|
| Latency | Immediate response | Delayed processing |
| Coupling | Tight — caller waits | Loose — fire and forget |
| Reliability | If downstream fails, caller fails | Queue buffers, retries later |
| Complexity | Simple | Additional infrastructure |
| Debugging | Linear request flow | Distributed, harder to trace |

### Interview Tip

When introducing a message queue in your design, specify which type (Kafka for event streaming, SQS/RabbitMQ for job queues) and why. Mention how you'd handle failures: dead-letter queues for messages that fail processing after N retries.

### Key Takeaways

- Message queues decouple services and absorb traffic spikes
- Kafka for event streaming and replay; RabbitMQ/SQS for job queues
- Design consumers to be idempotent — they may receive the same message twice
- Dead-letter queues catch messages that repeatedly fail processing
`,
  },
};
