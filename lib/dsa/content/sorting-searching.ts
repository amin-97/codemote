export const lessons: Record<string, { title: string; content: string }> = {
  sorting: {
    title: "Sorting Algorithms",
    content: `
## Sorting Algorithms

Sorting is foundational. Knowing *when* to use which sort is more important than memorizing implementations.

### Core Concepts

**Merge Sort**: Divide array in half, sort each half recursively, merge. O(n log n) always. Stable. Uses O(n) extra space. Best for linked lists (no random access needed) and when stability matters.

**Quick Sort**: Pick a pivot, partition array into elements < pivot and > pivot, recurse on each partition. O(n log n) average, O(n²) worst case (bad pivots). In-place (O(log n) stack space). Fastest in practice due to cache locality.

**Counting Sort / Radix Sort**: Non-comparison sorts. Counting sort: O(n + k) where k = range of values. Radix sort: O(d × (n + k)) where d = number of digits. Use when values are integers in a known range.

**Quick Select**: Find the kth smallest element without fully sorting. Partition like quicksort, but only recurse into the side containing k. O(n) average, O(n²) worst.

### Trade-offs

| Algorithm | Average | Worst | Space | Stable | Best For |
|-----------|---------|-------|-------|--------|----------|
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes | Linked lists, stability needed |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No | General purpose, in-place |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No | Memory constrained |
| Counting Sort | O(n + k) | O(n + k) | O(k) | Yes | Small integer range |

### Interview Tip

You'll rarely implement merge sort from scratch in an interview, but you need to know: "I'd use merge sort here because I need stable sorting" or "The problem is essentially a partition — quicksort's partition logic applies." Also know that language built-in sorts are O(n log n) — Python uses Timsort, Java uses dual-pivot quicksort.

### Key Takeaways

- Merge sort: stable, predictable O(n log n), but uses O(n) space
- Quick sort: fastest in practice, but O(n²) worst case — use random pivot
- Quick select: finding kth element in O(n) average without sorting
- Know when to use non-comparison sorts (counting, radix) for integer data
`,
  },
  "binary-search": {
    title: "Binary Search Patterns",
    content: `
## Binary Search Patterns

Binary search isn't just "find a target in a sorted array." It's a general technique for reducing a search space by half at each step.

### Core Concepts

**Classic Binary Search**: Search for target in sorted array. Compare with mid, go left or right. O(log n). The key is getting the boundaries right — off-by-one errors are the #1 bug.

**Bisect Left / Lower Bound**: Find the leftmost position where target could be inserted to maintain sorted order. Returns the first occurrence of target (or insertion point).

**Bisect Right / Upper Bound**: Find the rightmost position. Returns one past the last occurrence of target.

**Search on Answer (Binary Search on Result)**: The search space isn't an array — it's a range of possible answers. For each candidate answer, check if it's feasible. Binary search over the answer space. Classic: Koko Eating Bananas, Minimum Days to Make Bouquets.

### Key Patterns

**Standard template (find exact match):**
\`\`\`
left, right = 0, len(arr) - 1
while left <= right:
    mid = left + (right - left) // 2
    if arr[mid] == target: return mid
    elif arr[mid] < target: left = mid + 1
    else: right = mid - 1
return -1
\`\`\`

**Search on answer template:**
\`\`\`
left, right = min_possible, max_possible
while left < right:
    mid = left + (right - left) // 2
    if feasible(mid): right = mid      # mid could be the answer
    else: left = mid + 1               # mid is too small
return left
\`\`\`

### Interview Tip

"Binary search on answer" is a powerful pattern that many candidates miss. If the problem asks "find the minimum X such that condition Y is satisfied," and Y is monotonic (if X works, X+1 also works), binary search on X. State this insight explicitly.

### Key Takeaways

- Classic binary search: O(log n) for exact match in sorted data
- Bisect left/right: find insertion points and boundary elements
- Search on answer: binary search over possible results, not array indices
- The feasibility check function is the core of "search on answer" problems
`,
  },
};
