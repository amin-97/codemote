export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Microservices Communication",
    content: `
## Microservices Communication

How services talk to each other is the most critical architectural decision in a microservices system. The wrong choice creates tight coupling, cascading failures, and debugging nightmares.

### Core Concepts

**Synchronous Communication**: Service A calls Service B and waits for a response. HTTP/REST or gRPC. Simple to understand but creates temporal coupling — if B is down, A fails.

**Asynchronous Communication**: Service A publishes a message/event. Service B consumes it later. Message queues (Kafka, RabbitMQ). Decoupled but harder to debug.

**Service Discovery**: How does Service A find Service B's address? Client-side discovery (service queries a registry like Consul/Eureka) or server-side discovery (load balancer handles routing).

**Service Mesh**: A dedicated infrastructure layer (Istio, Linkerd) that handles service-to-service communication — load balancing, retries, circuit breaking, mutual TLS — without changing application code.

**API Gateway**: A single entry point for external clients. Routes requests to appropriate microservices, handles auth, rate limiting, and request aggregation.

### How It Works

Typical microservice request flow:
1. Client → API Gateway (auth, rate limit)
2. Gateway → Service A via internal LB
3. Service A → Service B (sync gRPC for real-time) or → Kafka (async for processing)
4. Service mesh sidecar proxies handle retries, TLS, observability transparently

### When to Use It

- **Sync (gRPC)**: Real-time operations where the caller needs the result immediately (user fetches profile, checkout)
- **Async (Kafka)**: Background processing, event fanout, anything where immediate response isn't critical
- **Service mesh**: When you have 20+ services and need consistent cross-cutting concerns
- **API Gateway**: Always, for external-facing APIs

### Trade-offs

| Pattern | Latency | Coupling | Debugging | Complexity |
|---------|---------|----------|-----------|------------|
| REST (sync) | Higher | Tight | Easy | Low |
| gRPC (sync) | Low | Tight | Moderate | Medium |
| Message queue (async) | Higher | Loose | Hard | Medium |
| Service mesh | Slight overhead | Loose | Excellent (observability built in) | High infra |

### Interview Tip

In interviews, use sync communication for the critical path and async for everything else. Explain the trade-off explicitly: "We use gRPC between the API server and the user service because the response is needed immediately, but we publish an event to Kafka for the notification service because it can be processed asynchronously."

### Key Takeaways

- Synchronous for real-time needs, asynchronous for everything else
- Service discovery is essential — hardcoded addresses don't scale
- API gateways handle cross-cutting concerns for external traffic
- Service meshes handle cross-cutting concerns for internal traffic
`,
  },
};
