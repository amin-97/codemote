export const lessons: Record<string, { title: string; content: string }> = {
  fundamentals: {
    title: "Linked List Operations",
    content: `
## Linked List Operations

Linked lists test pointer manipulation skills. The key is visualizing the node connections and being careful about the order of pointer reassignments.

### Core Concepts

**Node Structure**: Each node holds a value and a pointer to the next node (singly linked) or both next and previous (doubly linked). The list is accessed through a head pointer.

**Dummy Head (Sentinel Node)**: Create a fake node before the real head. This eliminates edge cases for operations on the first node. At the end, return \`dummy.next\` as the real head.

**Reversal**: The most fundamental linked list operation. Three pointers: prev, curr, next. At each step: save next, point curr to prev, advance prev and curr.

### Key Patterns

**Iterative reversal:**
1. prev = null, curr = head
2. While curr: next = curr.next, curr.next = prev, prev = curr, curr = next
3. Return prev (new head)

**Insertion/Deletion**: Always find the node *before* the target. To delete node at position i, find node at position i-1 and set \`prev.next = prev.next.next\`. Using a dummy head handles i=0 cleanly.

### Interview Tip

Draw the linked list on paper. Label each pointer. Step through your algorithm node by node before coding. Most linked list bugs come from incorrect pointer order — always save \`next\` before modifying \`curr.next\`.

### Key Takeaways

- Use a dummy head to eliminate head-node edge cases
- Reversal: save next → redirect current → advance (three-pointer dance)
- Always find the node *before* your target for insertion/deletion
- Draw it out — linked list problems are visual
`,
  },
  patterns: {
    title: "Fast/Slow Pointers & Merge",
    content: `
## Fast/Slow Pointers & Merge

The tortoise-and-hare technique is one of the most elegant patterns in all of DSA. Two pointers move at different speeds to detect cycles, find midpoints, and more.

### Core Concepts

**Cycle Detection (Floyd's Algorithm)**: Slow moves 1 step, fast moves 2 steps. If there's a cycle, they will meet inside the cycle. If fast reaches null, there's no cycle.

**Finding the Cycle Start**: After detection, reset one pointer to head. Move both at speed 1. They meet at the cycle entrance. (Mathematical proof: distance from head to cycle start equals distance from meeting point to cycle start going around the cycle.)

**Finding the Middle**: Slow moves 1, fast moves 2. When fast reaches the end, slow is at the middle. This is used in merge sort of linked lists and palindrome checking.

**Merging Two Sorted Lists**: Compare heads, attach the smaller one to the result, advance that pointer. Use a dummy head to simplify. O(n+m) time, O(1) space.

### Key Patterns

**Merge K Sorted Lists**: Use a min-heap (priority queue) of size K. Pop the smallest, add its next node to the heap. O(N log K) where N is total nodes.

**Palindrome Check**: Find middle with fast/slow → reverse second half → compare with first half → (optionally) restore the list.

### Trade-offs

| Problem | Approach | Time | Space |
|---------|----------|------|-------|
| Cycle detection | Fast/slow | O(n) | O(1) |
| Cycle detection | Hash set | O(n) | O(n) |
| Find middle | Fast/slow | O(n) | O(1) |
| Find middle | Count + traverse | O(n) two passes | O(1) |
| Merge 2 lists | Iterative | O(n+m) | O(1) |
| Merge K lists | Min-heap | O(N log K) | O(K) |

### Interview Tip

When you see "linked list" + "detect/find cycle/middle/nth from end," fast/slow pointers is the answer. State the speeds explicitly: "slow advances one node per step, fast advances two."

### Key Takeaways

- Fast/slow pointers detect cycles in O(1) space
- When fast hits the end, slow is at the middle
- Merging sorted lists uses a dummy head and comparison
- Merge K lists: min-heap of K heads, O(N log K)
`,
  },
};
