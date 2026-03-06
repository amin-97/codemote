export interface SolutionMeta {
  slug: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  companies: string[];
  topics: string[];
}

export const SOLUTIONS: SolutionMeta[] = [
  {
    slug: "design-leetcode",
    title: "Design LeetCode",
    difficulty: "hard",
    companies: ["Google", "Meta", "Amazon"],
    topics: ["API Design", "Message Queues", "Microservices"],
  },
  {
    slug: "design-url-shortener",
    title: "Design URL Shortener",
    difficulty: "easy",
    companies: ["Amazon", "Bloomberg", "Uber"],
    topics: ["Databases", "Caching", "Consistent Hashing"],
  },
  {
    slug: "design-webhook",
    title: "Design Webhook",
    difficulty: "medium",
    companies: ["Stripe", "Shopify", "Twilio"],
    topics: ["Message Queues", "Rate Limiting", "Data Replication"],
  },
  {
    slug: "design-google-docs",
    title: "Design Google Docs",
    difficulty: "hard",
    companies: ["Google", "Microsoft", "Meta"],
    topics: ["CQRS", "Event-Driven", "Data Replication"],
  },
  {
    slug: "design-spotify-top-k",
    title: "Design Spotify Top K Songs",
    difficulty: "medium",
    companies: ["Spotify", "Apple", "Amazon"],
    topics: ["Caching", "Message Queues", "Databases"],
  },
  {
    slug: "design-yelp",
    title: "Design Yelp",
    difficulty: "medium",
    companies: ["Yelp", "Google", "Uber"],
    topics: ["Search & Indexing", "CDN", "Databases"],
  },
  {
    slug: "design-rate-limiter",
    title: "Design Rate Limiter",
    difficulty: "medium",
    companies: ["Cloudflare", "Amazon", "Google"],
    topics: ["Rate Limiting", "Caching", "API Design"],
  },
  {
    slug: "design-pastebin",
    title: "Design Pastebin",
    difficulty: "easy",
    companies: ["Meta", "Amazon", "Google"],
    topics: ["Databases", "CDN", "API Design"],
  },
  {
    slug: "design-realtime-monitoring",
    title: "Design Realtime Monitoring System",
    difficulty: "hard",
    companies: ["Datadog", "Netflix", "Google"],
    topics: ["Monitoring", "Message Queues", "Databases"],
  },
  {
    slug: "design-typeahead",
    title: "Design Typeahead System",
    difficulty: "medium",
    companies: ["Google", "Amazon", "LinkedIn"],
    topics: ["Search & Indexing", "Caching", "CDN"],
  },
  {
    slug: "design-comment-system",
    title: "Design a Comment System",
    difficulty: "medium",
    companies: ["Meta", "Reddit", "Disqus"],
    topics: ["Databases", "Caching", "API Design"],
  },
  {
    slug: "design-twitter",
    title: "Design Twitter",
    difficulty: "hard",
    companies: ["Twitter/X", "Meta", "Google"],
    topics: ["Message Queues", "Caching", "Data Replication"],
  },
  {
    slug: "design-whatsapp",
    title: "Design WhatsApp",
    difficulty: "hard",
    companies: ["Meta", "Google", "Snap"],
    topics: ["Microservices", "Message Queues", "Data Replication"],
  },
  {
    slug: "design-dropbox",
    title: "Design Dropbox",
    difficulty: "hard",
    companies: ["Dropbox", "Google", "Microsoft"],
    topics: ["CDN", "Databases", "Data Replication"],
  },
  {
    slug: "design-youtube",
    title: "Design YouTube",
    difficulty: "hard",
    companies: ["Google", "Netflix", "Meta"],
    topics: ["CDN", "Message Queues", "Databases"],
  },
  {
    slug: "design-uber",
    title: "Design Uber",
    difficulty: "hard",
    companies: ["Uber", "Lyft", "Google"],
    topics: ["Databases", "Message Queues", "Caching"],
  },
  {
    slug: "design-google-maps",
    title: "Design Google Maps",
    difficulty: "hard",
    companies: ["Google", "Apple", "Uber"],
    topics: ["Caching", "CDN", "Databases"],
  },
  {
    slug: "design-ticketmaster",
    title: "Design TicketMaster",
    difficulty: "hard",
    companies: ["Ticketmaster", "Amazon", "Google"],
    topics: ["Databases", "Caching", "Message Queues"],
  },
  {
    slug: "design-netflix",
    title: "Design Netflix",
    difficulty: "hard",
    companies: ["Netflix", "Amazon", "Google"],
    topics: ["CDN", "Microservices", "Caching"],
  },
];

export function getSolutionBySlug(slug: string): SolutionMeta | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
