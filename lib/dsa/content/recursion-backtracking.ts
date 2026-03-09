export const lessons: Record<string, { title: string; content: string }> = {
  recursion: {
    title: "Recursion Fundamentals",
    content: `
## Recursion Fundamentals

Recursion solves a problem by solving smaller instances of itself. Every recursive solution has a base case (stop condition) and a recursive case (break down into smaller problem).

### Core Concepts

**Base Case**: The simplest instance that can be solved directly without further recursion. Forgetting the base case = infinite recursion = stack overflow. Example: factorial(0) = 1, fibonacci(0) = 0, fibonacci(1) = 1.

**Recursive Case**: Break the problem into one or more smaller subproblems of the same type. factorial(n) = n × factorial(n-1). Each call moves closer to the base case.

**Call Stack**: Each recursive call adds a frame to the call stack. Stack depth = max recursion depth. Python default limit: 1000. Java: depends on thread stack size. Deep recursion → stack overflow → convert to iteration.

**Tail Recursion**: The recursive call is the last operation in the function. Some languages (not Python/Java) optimize this to avoid stack growth. Example: factorial with an accumulator parameter.

### Key Patterns

**Linear recursion**: One recursive call per function call. Processing a linked list, factorial, binary search.

**Tree recursion**: Multiple recursive calls per function call. Fibonacci (2 calls), tree traversals (2 calls), backtracking (multiple calls). Often leads to exponential time without memoization.

**Divide and conquer**: Split problem into independent subproblems, solve each recursively, combine results. Merge sort, quick sort, binary search.

### How to Think Recursively

1. What is the **simplest case** I can solve directly? (base case)
2. If I had the answer to a **slightly smaller problem**, how would I use it? (recursive case)
3. Does each call **make progress** toward the base case? (termination guarantee)

### Interview Tip

Before coding any recursive solution, state: "The base case is X. The recursive case reduces the problem by Y. This terminates because Z." This prevents the most common bugs and shows structured thinking.

### Key Takeaways

- Every recursion needs a base case and a recursive case
- Tree recursion (multiple calls) is exponential without memoization
- If recursion depth could be large, consider iterative conversion
- Think "if I had the answer to the smaller problem, how would I use it?"
`,
  },
  backtracking: {
    title: "Backtracking Patterns",
    content: `
## Backtracking Patterns

Backtracking systematically explores all possible solutions by building candidates incrementally and abandoning ("backtracking") those that fail to satisfy constraints.

### Core Concepts

**State Space Tree**: Visualize the problem as a tree where each node is a partial solution and each edge is a decision. Backtracking = DFS on this tree, pruning branches that can't lead to valid solutions.

**Choose → Explore → Unchoose**: The three steps of backtracking. Make a choice (add element to current solution), explore recursively, then undo the choice (remove element) to try the next option.

**Pruning**: Skip entire branches of the state space tree when you can determine early that they won't lead to valid solutions. Pruning is what makes backtracking practical — without it, you're doing brute-force enumeration.

### Key Patterns

**Subsets**: Generate all subsets of a set. At each element, choose to include or exclude it. 2^n subsets total.

**Permutations**: Generate all orderings. At each position, try every unused element. n! permutations total. Use a "used" boolean array or swap elements.

**Combinations**: Choose k elements from n. Like subsets but with a fixed size constraint. Prune when remaining elements can't fill the required slots.

**Backtracking template:**
\`\`\`
function backtrack(state, choices):
    if state is a complete solution:
        add state to results
        return
    for each choice in choices:
        if choice is valid:
            make choice (modify state)
            backtrack(updated state, remaining choices)
            undo choice (restore state)
\`\`\`

**N-Queens**: Place N queens on an N×N board. At each row, try each column. Prune if column, diagonal, or anti-diagonal is already occupied. Classic backtracking + pruning.

### Trade-offs

| Problem Type | Time Complexity | Pruning Impact |
|-------------|----------------|----------------|
| Subsets | O(2^n) | Minimal — must enumerate all |
| Permutations | O(n!) | Moderate — skip used elements |
| Constraint satisfaction (N-Queens, Sudoku) | Exponential worst case | Massive — pruning makes it tractable |
| Combination Sum | O(2^n) worst | Significant — skip over-budget branches |

### Interview Tip

Draw the state space tree for a small example (n=3) before coding. This helps you see the recursion structure, identify what to choose/unchoose, and spot pruning opportunities. Interviewers love seeing this on the whiteboard.

### Key Takeaways

- Backtracking = DFS on the state space tree with pruning
- Template: choose → explore → unchoose
- Subsets (2^n), permutations (n!), combinations (n choose k)
- Pruning transforms exponential brute force into practical solutions
- Draw the tree for small inputs to understand the recursion
`,
  },
};
