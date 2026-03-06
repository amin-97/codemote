export const lessons: Record<string, { title: string; content: string }> = {
  overview: {
    title: "Monitoring & Observability",
    content: `
## Monitoring & Observability

You can't fix what you can't see. Observability is about understanding the internal state of your system from its external outputs. It's how you go from "something is broken" to "this specific service has a memory leak causing 5xx errors for 3% of users."

### Core Concepts

**The Three Pillars:**

**Metrics**: Numerical measurements over time. CPU usage, request latency (p50, p95, p99), error rate, queue depth. Stored in time-series databases (Prometheus, Datadog). Cheap to store, great for alerting and dashboards.

**Logs**: Detailed records of individual events. "User 123 requested /api/orders at 14:02:03, took 230ms, returned 200." Structured logs (JSON) are searchable. Stored in ELK stack or similar. Expensive at scale.

**Traces**: Follow a single request across multiple services. "This request hit API Gateway → UserService → OrderService → PaymentService, total 450ms, PaymentService took 380ms." Distributed tracing (Jaeger, Zipkin) uses trace IDs and span IDs.

**Alerting**: Automated notifications when metrics cross thresholds. P99 latency > 500ms for 5 minutes → page the on-call engineer. Good alerts are actionable, not noisy.

### How It Works

1. Services emit metrics (counters, gauges, histograms) to Prometheus
2. Services write structured logs to a centralized log store
3. Services propagate trace context (trace ID) in request headers
4. Dashboards (Grafana) visualize metrics in real-time
5. Alerts fire when SLOs are violated (error rate > 0.1%, latency p99 > 1s)

**SLIs, SLOs, SLAs:**
- **SLI** (Service Level Indicator): The metric you measure (latency, availability)
- **SLO** (Service Level Objective): The target you set (99.9% availability)
- **SLA** (Service Level Agreement): The contract with users (refund if below 99.9%)

### When to Use It

Always. Every production system needs all three pillars. The question is depth:
- **Metrics**: From day one — basic health dashboards and alerts
- **Logs**: From day one — but be strategic about what you log (cost scales with volume)
- **Traces**: When you have 3+ services — essential for debugging distributed systems

### Trade-offs

| Pillar | Strength | Weakness | Cost |
|--------|----------|----------|------|
| Metrics | Fast overview, cheap storage | Low detail | Low |
| Logs | High detail, searchable | Expensive at scale | High |
| Traces | Cross-service visibility | Sampling needed at scale | Medium |

### Interview Tip

Mention monitoring at the end of your system design answer — it shows production-mindedness. Say: "For observability, we'd emit metrics to Prometheus with Grafana dashboards, structured logs to ELK, and distributed traces via Jaeger. We'd set SLOs for p99 latency and error rate with PagerDuty alerts."

### Key Takeaways

- The three pillars are metrics, logs, and traces — you need all three
- Metrics for dashboards and alerts, logs for debugging, traces for distributed request flows
- Define SLOs before you build alerting — know what "healthy" means
- Structured logging (JSON) is searchable; unstructured logging is not
`,
  },
};
