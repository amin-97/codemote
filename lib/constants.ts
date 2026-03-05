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
