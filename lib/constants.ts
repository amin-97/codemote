// Standard DSA categories for LeetCode problems
export const TOPIC_NAMES = [
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Tries",
  "Heap / Priority Queue",
  "Backtracking",
  "Graphs",
  "Advanced Graphs",
  "1-D Dynamic Programming",
  "2-D Dynamic Programming",
  "Greedy",
  "Intervals",
  "Math & Geometry",
  "Bit Manipulation",
] as const;

export const DIFFICULTY_COLORS = {
  easy: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  medium: {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  hard: { bg: "bg-red-500/15", text: "text-red-400", dot: "bg-red-400" },
} as const;

export const STATUS_COLORS = {
  solved: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  attempted: { bg: "bg-amber-500/15", text: "text-amber-400" },
  revisit: { bg: "bg-sky-500/15", text: "text-sky-400" },
} as const;

export const LANGUAGES = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
] as const;

// System Design
export const SYSTEM_DESIGN_TOPICS = [
  "Scalability & Load Balancing",
  "Caching",
  "Database Design & Sharding",
  "Message Queues & Event-Driven",
  "API Design & Rate Limiting",
  "Consistent Hashing",
  "CDN & Content Delivery",
  "Microservices Architecture",
  "Data Replication & Consistency",
  "Search & Indexing",
  "Monitoring & Logging",
  "Security & Authentication",
] as const;

export const SYSTEM_DESIGN_PROBLEMS = [
  "Design URL Shortener",
  "Design Twitter / X",
  "Design Instagram / Photo Sharing",
  "Design Chat System / WhatsApp",
  "Design YouTube / Video Streaming",
  "Design Rate Limiter",
  "Design Web Crawler",
  "Design Notification System",
  "Design News Feed",
  "Design Uber / Ride Sharing",
  "Design Dropbox / Google Drive",
  "Design Search Autocomplete",
  "Design Distributed Cache",
  "Design Ticket Booking (e.g. Ticketmaster)",
  "Design Payment System",
] as const;

export const DESIGN_STATUS_COLORS = {
  completed: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  "in-progress": { bg: "bg-amber-500/15", text: "text-amber-400" },
  revisit: { bg: "bg-sky-500/15", text: "text-sky-400" },
} as const;

export const CONFIDENCE_LABELS = [
  "",
  "Weak",
  "Shaky",
  "Okay",
  "Solid",
  "Confident",
] as const;
