export const lessons: Record<string, { title: string; content: string }> = {
  fundamentals: {
    title: "DP Fundamentals",
    content: `
## DP Fundamentals

Dynamic programming optimizes recursive solutions by storing results of subproblems. If a problem has overlapping subproblems and optimal substructure, DP applies.

### Core Concepts

**Overlapping Subproblems**: The same subproblem is solved multiple times. Fibonacci: fib(5) calls fib(3) twice, fib(2) three times. Without memoization, this is exponential.

**Optimal Substructure**: The optimal solution to the problem contains optimal solutions to subproblems. Shortest path: the shortest path from A to C through B contains the shortest path from A to B.

**Memoization (Top-Down)**: Solve recursively, but cache results. Start from the original problem, recurse into subproblems, store results in a hash map or array. Natural to write — just add a cache to your recursive solution.

**Tabulation (Bottom-Up)**: Build a table from the smallest subproblems up. Iterative. Often more space-efficient because you can optimize to O(1) space if you only need the previous row/state.

### How to Approach DP Problems

1. **Define the state**: What variables describe a subproblem? (index, remaining capacity, etc.)
2. **Define the recurrence**: How does the current state relate to smaller states?
3. **Define the base case**: What's the answer for the smallest subproblem?
4. **Determine the order**: Which subproblems must be solved first? (bottom-up direction)
5. **Optimize space**: Can you reduce from O(n²) to O(n) by only keeping the previous row?

### Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Memoization | Easy to write (add cache to recursion) | Stack overflow risk for deep recursion |
| Tabulation | No stack overflow, easier to optimize space | Harder to determine iteration order |
| Space-optimized tabulation | O(1) or O(n) space | Harder to reason about |

### Interview Tip

Start every DP problem with: "What is the state?" and "What is the recurrence?" Write these down before coding. If you can define these two things, the code writes itself. Always start with a brute-force recursive solution, then add memoization.

### Key Takeaways

- DP = recursion + caching (memoization) or iterative table-filling (tabulation)
- Two conditions: overlapping subproblems + optimal substructure
- Define state → recurrence → base case → optimize
- Start with brute-force recursion, add memoization, then optimize to tabulation if needed
`,
  },
  patterns: {
    title: "Common DP Patterns",
    content: `
## Common DP Patterns

Most DP problems fall into a handful of patterns. Recognizing the pattern is 80% of the solution.

### Core Patterns

**0/1 Knapsack**: Given items with weights and values, maximize value within a weight capacity. State: dp[i][w] = max value using first i items with capacity w. Recurrence: include item i or skip it. Variations: Subset Sum, Partition Equal Subset Sum, Target Sum.

**Unbounded Knapsack**: Same as 0/1 but items can be reused. Coin Change: dp[amount] = min coins to make amount. Iterate over coins, for each coin: dp[a] = min(dp[a], dp[a - coin] + 1).

**Longest Increasing Subsequence (LIS)**: dp[i] = length of LIS ending at index i. For each j < i: if arr[j] < arr[i], dp[i] = max(dp[i], dp[j] + 1). O(n²) basic, O(n log n) with patience sorting.

**Longest Common Subsequence (LCS)**: dp[i][j] = LCS of first i chars of s1 and first j chars of s2. If s1[i] == s2[j]: dp[i][j] = dp[i-1][j-1] + 1. Else: max(dp[i-1][j], dp[i][j-1]).

**Grid Paths**: dp[i][j] = number of ways (or min cost) to reach cell (i,j). Unique Paths, Minimum Path Sum. Usually dp[i][j] = dp[i-1][j] + dp[i][j-1].

**State Machine DP**: Model states with transitions. Best Time to Buy and Sell Stock with Cooldown: states are holding, not-holding, cooldown. Each state has a transition formula.

### Pattern Recognition Cheat Sheet

| If the problem says... | Pattern | Example |
|------------------------|---------|---------|
| "Maximum/minimum with a constraint" | Knapsack | Partition Equal Subset Sum |
| "Number of ways to reach" | Grid / counting | Unique Paths, Coin Change II |
| "Longest subsequence" | LIS / LCS | Longest Increasing Subsequence |
| "Can partition into" | Subset sum | Partition Equal Subset Sum |
| "Buy/sell with rules" | State machine | Stock problems |
| "String matching/editing" | 2D string DP | Edit Distance, Regex Matching |

### Interview Tip

When you recognize a DP pattern, name it: "This is a 0/1 knapsack variant where items are array elements and the target sum is half the total." This shows the interviewer you have a mental framework, not just memorized solutions.

### Key Takeaways

- Most DP problems are variations of 5-6 patterns
- 0/1 Knapsack: include or exclude each item
- LIS/LCS: subsequence problems with O(n²) or O(n log n) solutions
- Grid DP: build from top-left, combine from above and left
- State machine DP: model explicit states and transitions
`,
  },
};
