import type { CourseTopic } from "@/types";

export const TRACKS = [
  {
    id: "fundamentals",
    title: "Fundamentals",
    description: "Core building blocks for every system design",
  },
  {
    id: "patterns",
    title: "Design Patterns",
    description: "Reusable solutions to common distributed systems challenges",
  },
  {
    id: "advanced",
    title: "Advanced Topics",
    description: "Deep dives into complex distributed system concepts",
  },
] as const;

export const CURRICULUM: CourseTopic[] = [
  // === FUNDAMENTALS ===
  {
    slug: "scaling-services",
    title: "Scaling Services",
    track: "fundamentals",
    description:
      "Vertical vs horizontal scaling, stateless services, and when to scale",
    lessons: [
      {
        slug: "overview",
        title: "Why Scaling Matters",
        description: "The core problem every system faces at growth",
        duration: 8,
      },
      {
        slug: "vertical-vs-horizontal",
        title: "Vertical vs Horizontal Scaling",
        description:
          "Scale up or scale out — trade-offs and decision framework",
        duration: 12,
      },
    ],
  },
  {
    slug: "load-balancing",
    title: "Load Balancing",
    track: "fundamentals",
    description:
      "Distributing traffic across servers to maximize throughput and reliability",
    lessons: [
      {
        slug: "overview",
        title: "Load Balancing Fundamentals",
        description:
          "L4 vs L7, algorithms, health checks, and session persistence",
        duration: 15,
      },
    ],
  },
  {
    slug: "caching",
    title: "Caching",
    track: "fundamentals",
    description:
      "Speed up reads, reduce load — cache-aside, write-through, eviction policies",
    lessons: [
      {
        slug: "strategies",
        title: "Caching Strategies",
        description:
          "Cache-aside, write-through, write-back, and read-through patterns",
        duration: 15,
      },
      {
        slug: "pitfalls",
        title: "Cache Pitfalls",
        description:
          "Thundering herd, cache stampede, stale data, and invalidation",
        duration: 10,
      },
    ],
  },
  {
    slug: "databases",
    title: "Databases: SQL vs NoSQL",
    track: "fundamentals",
    description:
      "ACID vs BASE, relational vs document stores, and choosing the right tool",
    lessons: [
      {
        slug: "sql-vs-nosql",
        title: "SQL vs NoSQL",
        description:
          "When to use relational databases vs document/key-value stores",
        duration: 15,
      },
    ],
  },
  {
    slug: "database-sharding",
    title: "Database Sharding",
    track: "fundamentals",
    description:
      "Splitting data across multiple databases for horizontal scalability",
    lessons: [
      {
        slug: "strategies",
        title: "Sharding Strategies",
        description:
          "Range-based, hash-based, directory-based sharding and rebalancing",
        duration: 15,
      },
    ],
  },
  {
    slug: "message-queues",
    title: "Message Queues",
    track: "fundamentals",
    description:
      "Async processing with Kafka, RabbitMQ — decoupling producers and consumers",
    lessons: [
      {
        slug: "overview",
        title: "Message Queues & Async Processing",
        description:
          "Pub/sub, point-to-point, ordering guarantees, and backpressure",
        duration: 15,
      },
    ],
  },
  {
    slug: "api-design",
    title: "API Design",
    track: "fundamentals",
    description:
      "REST, GraphQL, gRPC — designing clean, versioned, paginated APIs",
    lessons: [
      {
        slug: "overview",
        title: "API Design Principles",
        description:
          "REST conventions, GraphQL trade-offs, gRPC for internal services",
        duration: 15,
      },
    ],
  },
  {
    slug: "cdn",
    title: "CDN & Content Delivery",
    track: "fundamentals",
    description:
      "Edge caching, origin shields, and global content distribution",
    lessons: [
      {
        slug: "overview",
        title: "CDN Fundamentals",
        description:
          "How CDNs work, push vs pull, cache invalidation at the edge",
        duration: 10,
      },
    ],
  },

  // === PATTERNS ===
  {
    slug: "rate-limiting",
    title: "Rate Limiting",
    track: "patterns",
    description:
      "Protecting services from abuse — token bucket, sliding window, distributed limits",
    lessons: [
      {
        slug: "algorithms",
        title: "Rate Limiting Algorithms",
        description:
          "Token bucket, leaky bucket, fixed window, sliding window log/counter",
        duration: 15,
      },
    ],
  },
  {
    slug: "consistent-hashing",
    title: "Consistent Hashing",
    track: "patterns",
    description:
      "Distributing data evenly with minimal redistribution on node changes",
    lessons: [
      {
        slug: "overview",
        title: "Consistent Hashing Deep Dive",
        description:
          "Hash rings, virtual nodes, and why it matters for caches and databases",
        duration: 12,
      },
    ],
  },
  {
    slug: "event-driven",
    title: "Event-Driven Architecture",
    track: "patterns",
    description:
      "Building reactive systems with events, CQRS, and event sourcing",
    lessons: [
      {
        slug: "overview",
        title: "Event-Driven Fundamentals",
        description:
          "Event sourcing, CQRS, saga pattern, and eventual consistency",
        duration: 15,
      },
    ],
  },
  {
    slug: "cqrs-read-write-separation",
    title: "CQRS & Read/Write Separation",
    track: "patterns",
    description:
      "Separate models for reads and writes — independent optimization and scaling",
    lessons: [
      {
        slug: "overview",
        title: "CQRS & Read/Write Separation",
        description:
          "Command vs query models, eventual consistency, and event sourcing synergy",
        duration: 15,
      },
    ],
  },
  {
    slug: "circuit-breaker",
    title: "Circuit Breaker",
    track: "patterns",
    description:
      "Preventing cascading failures with failure detection and fallback strategies",
    lessons: [
      {
        slug: "overview",
        title: "Circuit Breaker Pattern",
        description:
          "Closed, open, half-open states — retry policies and fallback strategies",
        duration: 10,
      },
    ],
  },
  {
    slug: "data-replication",
    title: "Data Replication",
    track: "patterns",
    description:
      "Leader-follower, multi-leader, and leaderless replication strategies",
    lessons: [
      {
        slug: "overview",
        title: "Replication Strategies",
        description:
          "Synchronous vs async replication, consensus algorithms, and CAP theorem",
        duration: 15,
      },
    ],
  },

  // === ADVANCED ===
  {
    slug: "microservices",
    title: "Microservices Communication",
    track: "advanced",
    description:
      "Sync vs async, service mesh, discovery, and inter-service patterns",
    lessons: [
      {
        slug: "overview",
        title: "Microservices Communication",
        description:
          "REST vs gRPC vs messaging, service discovery, and service mesh",
        duration: 15,
      },
    ],
  },
  {
    slug: "distributed-transactions",
    title: "Distributed Transactions",
    track: "advanced",
    description: "2PC, saga pattern, compensating transactions across services",
    lessons: [
      {
        slug: "overview",
        title: "Distributed Transactions",
        description:
          "Two-phase commit, saga orchestration vs choreography, and idempotency",
        duration: 15,
      },
    ],
  },
  {
    slug: "search-indexing",
    title: "Search & Indexing",
    track: "advanced",
    description: "Inverted indexes, Elasticsearch, full-text search at scale",
    lessons: [
      {
        slug: "overview",
        title: "Search & Indexing",
        description:
          "How search engines work — inverted indexes, tokenization, ranking",
        duration: 12,
      },
    ],
  },
  {
    slug: "monitoring",
    title: "Monitoring & Observability",
    track: "advanced",
    description:
      "Metrics, logging, distributed tracing, and alerting strategies",
    lessons: [
      {
        slug: "overview",
        title: "Monitoring & Observability",
        description:
          "The three pillars — metrics, logs, traces — and how to use them",
        duration: 12,
      },
    ],
  },
];

export function getTopicBySlug(slug: string): CourseTopic | undefined {
  return CURRICULUM.find((t) => t.slug === slug);
}

export function getLessonContent(topicSlug: string, lessonSlug: string) {
  return import(
    `./content/${getTopicBySlug(topicSlug)?.track}/${topicSlug}`
  ).then((mod) => mod.lessons?.[lessonSlug] || null);
}

export const TOTAL_LESSONS = CURRICULUM.reduce(
  (sum, t) => sum + t.lessons.length,
  0,
);
