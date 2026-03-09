export const lessons: Record<string, { title: string; content: string }> = {
  traversals: {
    title: "Tree Traversals & DFS",
    content: `
## Tree Traversals & DFS

Trees are recursive data structures, so recursive thinking is your primary tool. Every tree problem is some variation of traversal.

### Core Concepts

**Inorder (Left, Root, Right)**: For BSTs, this produces sorted output. Used for BST validation and finding kth smallest.

**Preorder (Root, Left, Right)**: Visits the root first. Used for serialization and constructing a copy of the tree.

**Postorder (Left, Right, Root)**: Visits children before parent. Used for deletion and calculating subtree properties (height, size).

**Level Order (BFS)**: Use a queue. Process all nodes at depth d before depth d+1. Used for level-by-level problems, zigzag traversal, rightmost node per level.

### Key Patterns

**Recursive DFS template:**
\`\`\`
function dfs(node):
    if node is null: return base_case
    left = dfs(node.left)
    right = dfs(node.right)
    return combine(left, right, node.val)
\`\`\`

**Max depth**: return 0 if null, else 1 + max(dfs(left), dfs(right))

**Path sum**: subtract node.val from target, check if leaf with target=0

**Iterative DFS**: Use a stack. Push right child first, then left (so left is processed first). More explicit control over traversal.

### Interview Tip

Most tree problems follow the same pattern: recurse left, recurse right, combine results. Identify what information flows *up* (return values) vs *down* (parameters). State your recursion clearly: "base case, recursive case, and what I return."

### Key Takeaways

- Inorder for sorted BST output, preorder for serialization, postorder for bottom-up computation
- BFS with a queue for level-order problems
- Recursive DFS: always define your base case and what you return
- Most tree problems are variations of "traverse and combine"
`,
  },
  "bst-operations": {
    title: "BST Operations & Balanced Trees",
    content: `
## BST Operations & Balanced Trees

BSTs maintain the invariant: left < root < right. This enables O(log n) search, insert, and delete — but only if the tree is balanced.

### Core Concepts

**Search**: Compare target with current node. Go left if smaller, right if larger. O(h) where h = height.

**Insert**: Search for the position where the new node belongs (find the null spot), create it there. O(h).

**Delete**: Three cases: (1) leaf → just remove. (2) One child → replace with child. (3) Two children → replace with inorder successor (smallest in right subtree) or inorder predecessor (largest in left subtree), then delete that successor.

**BST Validation**: Inorder traversal should produce a strictly increasing sequence. Alternatively, pass valid ranges recursively: each node must be within (min, max) bounds inherited from its parent.

**Balanced Trees**: AVL trees maintain |height(left) - height(right)| ≤ 1 for every node via rotations. Red-Black trees have looser balancing. In interviews, you rarely implement these — just know they guarantee O(log n) operations.

### Trade-offs

| Operation | BST (balanced) | BST (worst case/skewed) | Array (sorted) |
|-----------|---------------|------------------------|----------------|
| Search | O(log n) | O(n) | O(log n) binary search |
| Insert | O(log n) | O(n) | O(n) shifting |
| Delete | O(log n) | O(n) | O(n) shifting |
| Inorder traversal | O(n) | O(n) | O(n) |

### Interview Tip

For BST problems, think "inorder traversal gives sorted order." Many BST problems (kth smallest, validate BST, closest value) reduce to some form of inorder traversal, either full or partial (stop early once you have the answer).

### Key Takeaways

- BST invariant: left < root < right (no duplicates, or left ≤ root < right)
- Delete with two children: find inorder successor, swap values, delete successor
- Validate by passing (min, max) bounds or checking inorder is sorted
- Balanced BSTs guarantee O(log n) — unbalanced degrades to O(n)
`,
  },
};
