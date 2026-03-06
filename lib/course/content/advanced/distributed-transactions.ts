export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Distributed Transactions",
    content: `
## Distributed Transactions

When a business operation spans multiple services or databases, you need to ensure all-or-nothing semantics. Traditional ACID transactions don't work across network boundaries, so we use alternative patterns.

### Core Concepts

**Two-Phase Commit (2PC)**: A coordinator asks all participants to prepare (phase 1). If all agree, the coordinator tells them to commit (phase 2). If any says no, all abort. Strong consistency but slow and fragile — the coordinator is a single point of failure.

**Saga Pattern**: Break the transaction into a sequence of local transactions. Each service completes its part and publishes an event. If a step fails, execute compensating transactions to undo previous steps.

**Orchestration Saga**: A central orchestrator coordinates the saga steps, telling each service what to do. Easier to understand and debug.

**Choreography Saga**: Each service listens for events and decides its own actions. More decoupled but the flow is implicit and harder to trace.

**Idempotency**: Every operation in a saga must be safely retriable. If a message is delivered twice, the result should be the same as if it was delivered once. Use idempotency keys and deduplication.

### How It Works

Saga example — booking a trip:
1. FlightService books flight → \`FlightBooked\` event
2. HotelService books hotel → \`HotelBooked\` event
3. PaymentService charges card → \`PaymentFailed\` event
4. Compensation: HotelService cancels hotel → CarService cancels car → FlightService cancels flight

Each step is a local ACID transaction. The saga as a whole is eventually consistent.

### When to Use It

- **2PC**: When you need absolute consistency and can tolerate the latency (rare in microservices)
- **Sagas**: The default for microservice transactions — e-commerce orders, booking systems, financial workflows
- **Compensating transactions**: Any multi-step process where partial completion is unacceptable

### Trade-offs

| Pattern | Consistency | Performance | Complexity | Availability |
|---------|------------|-------------|------------|-------------|
| 2PC | Strong | Slow (blocking) | High | Low (coordinator SPOF) |
| Orchestration Saga | Eventual | Good | Medium | High |
| Choreography Saga | Eventual | Good | Lower code, higher cognitive | High |

### Interview Tip

Default to sagas over 2PC in interview answers. 2PC is too slow and fragile for modern distributed systems. When discussing sagas, always mention compensating transactions and idempotency — these show you understand the real-world challenges.

### Key Takeaways

- 2PC provides strong consistency but is slow and fragile
- Sagas provide eventual consistency with compensating transactions
- Every saga step must be idempotent for safe retries
- Orchestration is easier to debug; choreography is more decoupled
`,
  },
};
