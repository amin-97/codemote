export const lessons: Record<string, { title: string; content: string }> = {
  fundamentals: {
    title: "Array Fundamentals & Two Pointers",
    content: `
## Array Fundamentals & Two Pointers

Arrays are the most fundamental data structure. Mastering array manipulation patterns is the foundation for nearly every coding interview.

### Core Concepts

**Time Complexity Awareness**: Array access is O(1), search is O(n), sorted search is O(log n). Insertion/deletion at the end is O(1) amortized, but O(n) at arbitrary positions due to shifting.

**In-Place Operations**: Many interview problems ask you to modify the array without extra space. This means O(1) extra memory — use swaps, overwriting from one end, or partitioning.

**Two Pointers**: Use two indices to traverse the array, often from opposite ends or at different speeds. This reduces O(n²) brute force to O(n).

### Key Patterns

**Opposite-direction two pointers**: Start one pointer at the beginning, one at the end. Move them toward each other. Classic problems: Two Sum (sorted), Container With Most Water, Valid Palindrome.

**Same-direction two pointers (fast/slow)**: Both start at the beginning. Fast pointer explores ahead, slow pointer tracks the "answer position." Classic: Remove Duplicates from Sorted Array, Move Zeroes.

**Three pointers**: Extension of two pointers for 3Sum — fix one element, two-pointer the rest.

### When to Use It

- Sorted array + finding pairs → two pointers from ends
- Removing/partitioning elements in-place → fast/slow pointers
- Subarray problems (sometimes) → sliding window (next lesson)

### Trade-offs

| Approach | Time | Space | When |
|----------|------|-------|------|
| Brute force (nested loops) | O(n²) | O(1) | Small n, simple logic |
| Two pointers | O(n) | O(1) | Sorted data or partitioning |
| Hash map | O(n) | O(n) | Unsorted data, need lookups |
| Sorting first | O(n log n) | O(1)-O(n) | When order doesn't matter |

### Interview Tip

When you see "find a pair" or "in-place," immediately think two pointers. State your approach before coding: "I'll use two pointers from opposite ends since the array is sorted, giving us O(n) time and O(1) space."

### Key Takeaways

- Two pointers eliminate the inner loop of a brute force approach
- Always clarify: is the array sorted? Can I modify it in-place?
- Hash maps are the alternative when two pointers don't apply (unsorted data)
- Master the three flavors: opposite-direction, same-direction, and fixed+two
`,
  },
  "sliding-window": {
    title: "Sliding Window & Prefix Sums",
    content: `
## Sliding Window & Prefix Sums

The sliding window technique maintains a "window" over a contiguous subarray, expanding and contracting it to find optimal subarrays. Prefix sums enable O(1) range sum queries.

### Core Concepts

**Fixed-Size Window**: Window of size K slides across the array. At each step, add the new element entering the window and remove the one leaving. Classic: Maximum Sum Subarray of Size K.

**Variable-Size Window**: Window expands (right pointer moves right) until a condition is violated, then contracts (left pointer moves right) until valid again. Classic: Longest Substring Without Repeating Characters, Minimum Window Substring.

**Prefix Sum Array**: \`prefix[i] = sum(arr[0..i])\`. Sum of any subarray [l, r] = prefix[r] - prefix[l-1]. Build in O(n), query in O(1). Classic: Subarray Sum Equals K (with hash map of prefix sums).

### Key Patterns

**Variable window template:**
1. Initialize left = 0, result variable
2. Expand right pointer through the array
3. Update window state (add arr[right])
4. While window is invalid: shrink from left, update state
5. Update result if current window is better

**Prefix sum + hash map**: Store prefix sums seen so far in a hash map. At each index, check if (current_prefix - target) exists in the map. This finds subarrays summing to target in O(n).

### Trade-offs

| Technique | Time | Space | Best For |
|-----------|------|-------|----------|
| Brute force all subarrays | O(n²) or O(n³) | O(1) | Small n |
| Sliding window | O(n) | O(1) or O(k) | Contiguous subarray optimization |
| Prefix sum | O(n) build, O(1) query | O(n) | Range sum queries |
| Prefix sum + hash map | O(n) | O(n) | Count/find subarrays with target sum |

### Interview Tip

If the problem involves a **contiguous subarray** or **substring** with some constraint (max sum, min length, at most K distinct), sliding window is almost certainly the approach. State this recognition early.

### Key Takeaways

- Fixed window: add new, remove old, constant window size
- Variable window: expand right, shrink left when constraint violated
- Prefix sums turn range sum queries from O(n) to O(1)
- Combining prefix sums with hash maps solves "subarray sum equals K" in O(n)
`,
  },
};
