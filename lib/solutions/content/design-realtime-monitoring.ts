export const solution = {
  title: "Design Realtime Monitoring System",
  content: `
## Design Realtime Monitoring System

A system that collects, stores, and visualizes metrics from thousands of services in real-time, with alerting when thresholds are breached.

### Functional Requirements

- Ingest metrics from thousands of services (CPU, memory, latency, error rates, custom metrics)
- Store time-series data with configurable retention
- Query and visualize metrics with dashboards (Grafana-style)
- Alert when metrics breach thresholds (p99 latency > 500ms for 5 minutes)
- Support aggregation: sum, avg, percentiles over time windows

### Non-Functional Requirements

- Handle 10M+ data points per second ingestion
- Query latency <1 second for dashboard panels
- Alerting latency <1 minute from metric emission to alert
- Data retention: high-resolution (1s) for 24h, downsampled (1m) for 30d, (1h) for 1y

### High-Level Architecture

**Agents → Ingestion Gateway → Kafka → Time-Series DB + Alert Evaluator → Dashboard/API**

### Deep Dives

**Time-Series Database**: Purpose-built for timestamped data. Options: InfluxDB, TimescaleDB (PostgreSQL extension), Prometheus (pull-based). Data model: metric_name + tags (key-value labels) + timestamp + value. Example: \`http_latency{service=api,endpoint=/users,quantile=p99} 230 1704067200\`.

**Write Optimization**: Time-series data is append-only. Use LSM-tree storage (write-optimized). Batch writes in memory, flush to disk periodically. Compress with delta-of-delta encoding for timestamps and XOR encoding for values (Gorilla compression — 12x compression ratio).

**Downsampling**: Raw 1-second data is expensive to store long-term. Background jobs aggregate: 1s → 1m (avg, min, max, p99) after 24h. 1m → 1h after 30d. Reduces storage 60-3600x while preserving trends.

**Alert Evaluation**: A separate service continuously evaluates alert rules against incoming metrics. Rules like "avg(cpu_usage{service=api}) > 80% for 5m" are evaluated every 15 seconds. Use a sliding window of recent data points. On breach → send to notification service (PagerDuty, Slack, email).

**Pull vs Push**: Prometheus uses pull (scrapes /metrics endpoints). Works well in Kubernetes. Push (StatsD/OpenTelemetry) works better for short-lived processes and serverless. Most production systems support both.

### Scalability

- **Kafka** buffers between ingestion and storage — absorbs spikes
- **Shard time-series DB** by metric name hash for write distribution
- **Read replicas** for dashboard queries (separate from write path)
- **Pre-aggregate** common dashboard queries to avoid scanning raw data
- **Alert evaluation** partitioned by alert rule — scale evaluators horizontally
`,
};
