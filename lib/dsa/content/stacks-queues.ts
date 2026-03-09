export const lessons: Record<string, { title: string; content: string }> = {
  fundamentals: {
    title: "Stack & Queue Patterns",
    content: `
## Stack & Queue Patterns

Stacks (LIFO) and queues (FIFO) are the workhorses of algorithm design. Recognizing when to use them is half the battle.

### Core Concepts

**Stack Use Cases**: Matching parentheses, expression evaluation, undo operations, DFS traversal, monotonic stack for "next greater element" problems.

**Queue Use Cases**: BFS traversal, level-order tree traversal, task scheduling, sliding window maximum (deque).

**Monotonic Stack**: A stack that maintains elements in increasing or decreasing order. When pushing a new element, pop all elements that violate the ordering. This efficiently finds the "next greater" or "next smaller" element for every position in O(n) total.

### Key Patterns

**Parentheses Matching**: Push opening brackets. On closing bracket, check if top of stack matches. If stack is empty at the end, the string is valid.

**Min Stack**: Maintain a parallel stack of minimums. On push, push the min of (new element, current min). On pop, pop from both. getMin() is always O(1).

**Monotonic Stack Template** (next greater element):
1. Iterate through array
2. While stack is non-empty and current > stack top: pop, record current as the "next greater" for the popped element
3. Push current index onto stack

**Queue from Two Stacks**: Push to stack1. For dequeue: if stack2 is empty, pour all of stack1 into stack2 (reversing order), then pop from stack2. Amortized O(1) per operation.

### Trade-offs

| Pattern | Time | Space | Classic Problems |
|---------|------|-------|-----------------|
| Parentheses matching | O(n) | O(n) | Valid Parentheses |
| Monotonic stack | O(n) | O(n) | Daily Temperatures, Next Greater Element |
| Min stack | O(1) all ops | O(n) | Min Stack |
| BFS with queue | O(V+E) | O(V) | Level Order Traversal, Shortest Path |

### Interview Tip

If the problem involves "nearest," "next greater/smaller," or "span" — think monotonic stack. If it involves "level-by-level" or "shortest path in unweighted graph" — think BFS with a queue.

### Key Takeaways

- Stacks solve problems where you need to "go back" to the most recent item
- Queues solve problems where you need to process in order (FIFO)
- Monotonic stack finds next greater/smaller in O(n) total — memorize the template
- Min stack: maintain a parallel stack tracking the running minimum
`,
  },
};
