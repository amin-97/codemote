export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Circuit Breaker Pattern",
    content: `
## Circuit Breaker Pattern

When a downstream service fails, continuing to send requests wastes resources and can cause cascading failures. The circuit breaker pattern detects failures and stops calling the failing service, giving it time to recover.

### Core Concepts

**Three States**: Closed (normal — requests flow through), Open (tripped — requests immediately fail without calling downstream), Half-Open (testing — allow a few requests through to see if the service recovered).

**Failure Threshold**: The circuit opens after N consecutive failures or when the error rate exceeds a percentage in a time window (e.g., >50% errors in 10 seconds).

**Recovery Timeout**: How long the circuit stays open before moving to half-open. Too short and you hammer a recovering service. Too long and you delay recovery.

**Fallback**: What to return when the circuit is open. Options include cached data, a default value, a degraded response, or a clear error message.

### How It Works

1. **Closed**: All requests pass through. Track success/failure counts.
2. Failures exceed threshold → circuit trips to **Open**
3. **Open**: All requests immediately return the fallback response. No downstream calls.
4. After recovery timeout → circuit moves to **Half-Open**
5. **Half-Open**: Allow one test request through. If it succeeds → Closed. If it fails → back to Open.

### When to Use It

- Any service-to-service call over the network
- Database connections during outages
- Third-party API integrations (payment gateways, email services)
- Any call where failure is expected and should be handled gracefully

### Trade-offs

| Factor | With Circuit Breaker | Without |
|--------|---------------------|---------|
| Cascading failures | Prevented | Common |
| Recovery speed | Controlled, gradual | Thundering herd on recovery |
| Complexity | Moderate | Lower |
| False positives | Possible (healthy service gets cut off) | N/A |

### Interview Tip

Mention circuit breakers when discussing microservice resilience. Pair it with retries (with exponential backoff) and timeouts to create a complete fault tolerance strategy. Libraries like Hystrix (Java) and Polly (.NET) implement this pattern.

### Key Takeaways

- Circuit breakers prevent cascading failures across microservices
- Three states: Closed → Open → Half-Open → Closed
- Always provide a fallback for when the circuit is open
- Combine with retries, timeouts, and bulkheads for comprehensive resilience
`,
  },
};
