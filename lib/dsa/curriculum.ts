import type { CourseTopic } from "@/types";

export const DSA_TRACKS = [
  {
    id: "core",
    title: "Core Concepts",
    description: "Foundational data structures and problem-solving patterns",
  },
  {
    id: "structures",
    title: "Data Structures",
    description: "Trees, graphs, and advanced structures",
  },
  {
    id: "algorithms",
    title: "Algorithms",
    description: "Sorting, searching, DP, and backtracking",
  },
] as const;

export const DSA_CURRICULUM: CourseTopic[] = [
  // === CORE ===
  {
    slug: "arrays-strings",
    title: "Arrays & Strings",
    track: "core",
    description:
      "Two pointers, sliding window, prefix sums, and string manipulation",
    lessons: [
      {
        slug: "fundamentals",
        title: "Array Fundamentals & Two Pointers",
        description:
          "Time complexity, in-place operations, and the two pointer technique",
        duration: 15,
      },
      {
        slug: "sliding-window",
        title: "Sliding Window & Prefix Sums",
        description:
          "Fixed and variable window patterns, running sums, and subarray problems",
        duration: 15,
      },
    ],
  },
  {
    slug: "linked-lists",
    title: "Linked Lists",
    track: "core",
    description: "Reversal, fast/slow pointers, merge, and cycle detection",
    lessons: [
      {
        slug: "fundamentals",
        title: "Linked List Operations",
        description:
          "Traversal, reversal, insertion, deletion, and dummy head technique",
        duration: 12,
      },
      {
        slug: "patterns",
        title: "Fast/Slow Pointers & Merge",
        description: "Cycle detection, finding midpoint, merging sorted lists",
        duration: 12,
      },
    ],
  },
  {
    slug: "stacks-queues",
    title: "Stacks & Queues",
    track: "core",
    description:
      "Monotonic stack, min stack, queue from stacks, and BFS with queues",
    lessons: [
      {
        slug: "fundamentals",
        title: "Stack & Queue Patterns",
        description:
          "Parentheses matching, monotonic stack, min stack, and queue implementations",
        duration: 15,
      },
    ],
  },

  // === STRUCTURES ===
  {
    slug: "trees-bsts",
    title: "Trees & BSTs",
    track: "structures",
    description: "Traversals, DFS/BFS, BST operations, and balanced trees",
    lessons: [
      {
        slug: "traversals",
        title: "Tree Traversals & DFS",
        description:
          "Inorder, preorder, postorder, and recursive vs iterative DFS",
        duration: 15,
      },
      {
        slug: "bst-operations",
        title: "BST Operations & Balanced Trees",
        description:
          "Search, insert, delete, validation, and balancing concepts (AVL, Red-Black)",
        duration: 15,
      },
    ],
  },
  {
    slug: "graphs",
    title: "Graphs & BFS/DFS",
    track: "structures",
    description:
      "Representations, traversals, topological sort, and shortest paths",
    lessons: [
      {
        slug: "fundamentals",
        title: "Graph Representations & Traversals",
        description: "Adjacency list vs matrix, BFS, DFS, connected components",
        duration: 15,
      },
      {
        slug: "advanced",
        title: "Topological Sort & Shortest Paths",
        description: "Kahn's algorithm, Dijkstra, Bellman-Ford, and union-find",
        duration: 15,
      },
    ],
  },

  // === ALGORITHMS ===
  {
    slug: "sorting-searching",
    title: "Sorting & Searching",
    track: "algorithms",
    description: "Comparison sorts, binary search patterns, and quick select",
    lessons: [
      {
        slug: "sorting",
        title: "Sorting Algorithms",
        description:
          "Merge sort, quick sort, counting sort — when to use which",
        duration: 15,
      },
      {
        slug: "binary-search",
        title: "Binary Search Patterns",
        description:
          "Search space reduction, bisect left/right, and search on answer",
        duration: 15,
      },
    ],
  },
  {
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    track: "algorithms",
    description: "Memoization, tabulation, and common DP patterns",
    lessons: [
      {
        slug: "fundamentals",
        title: "DP Fundamentals",
        description:
          "Overlapping subproblems, optimal substructure, memoization vs tabulation",
        duration: 15,
      },
      {
        slug: "patterns",
        title: "Common DP Patterns",
        description: "Knapsack, LIS, LCS, grid paths, and state machine DP",
        duration: 20,
      },
    ],
  },
  {
    slug: "recursion-backtracking",
    title: "Recursion & Backtracking",
    track: "algorithms",
    description:
      "Base cases, state space trees, pruning, permutations and combinations",
    lessons: [
      {
        slug: "recursion",
        title: "Recursion Fundamentals",
        description:
          "Base cases, call stack, tail recursion, and recursive thinking",
        duration: 12,
      },
      {
        slug: "backtracking",
        title: "Backtracking Patterns",
        description:
          "State space trees, pruning, permutations, combinations, and subsets",
        duration: 15,
      },
    ],
  },
];

export function getDsaTopicBySlug(slug: string): CourseTopic | undefined {
  return DSA_CURRICULUM.find((t) => t.slug === slug);
}

export const DSA_TOTAL_LESSONS = DSA_CURRICULUM.reduce(
  (sum, t) => sum + t.lessons.length,
  0,
);
