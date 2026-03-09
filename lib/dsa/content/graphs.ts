export const lessons: Record<string, { title: string; content: string }> = {
  fundamentals: {
    title: "Graph Representations & Traversals",
    content: `
## Graph Representations & Traversals

Graphs model relationships — social networks, road maps, dependencies. The two fundamental operations are BFS and DFS.

### Core Concepts

**Adjacency List**: Each node stores a list of its neighbors. Space: O(V + E). Best for sparse graphs (most real-world graphs). \`graph = { A: [B, C], B: [A, D], ... }\`

**Adjacency Matrix**: 2D array where matrix[i][j] = 1 if edge exists. Space: O(V²). Best for dense graphs or when you need O(1) edge lookup.

**BFS (Breadth-First Search)**: Use a queue. Visit all neighbors before going deeper. Finds shortest path in unweighted graphs. O(V + E).

**DFS (Depth-First Search)**: Use recursion or a stack. Go as deep as possible before backtracking. Detects cycles, finds connected components, topological sort. O(V + E).

### Key Patterns

**BFS template:**
1. Initialize queue with starting node(s), visited set
2. While queue not empty: dequeue node, process it, enqueue all unvisited neighbors
3. Track distance by processing level-by-level (loop over current queue size)

**DFS template:**
1. Mark node as visited
2. Process node
3. For each unvisited neighbor: recurse

**Connected Components**: Run BFS/DFS from each unvisited node. Each run discovers one component. Count the number of runs.

**Cycle Detection**: DFS with three states — unvisited, in-progress, completed. If you encounter an in-progress node, there's a cycle (directed graph). For undirected: if you visit an already-visited node that isn't the parent, there's a cycle.

### Interview Tip

Most graph problems are BFS or DFS in disguise. Ask: "Am I finding shortest path (BFS) or exploring all possibilities/detecting cycles (DFS)?" Build the adjacency list first, then traverse.

### Key Takeaways

- Adjacency list for sparse graphs, matrix for dense
- BFS finds shortest path in unweighted graphs
- DFS detects cycles, finds components, and explores exhaustively
- Always use a visited set to avoid infinite loops
`,
  },
  advanced: {
    title: "Topological Sort & Shortest Paths",
    content: `
## Topological Sort & Shortest Paths

Topological sort orders DAG nodes so every edge goes from earlier to later. Shortest path algorithms find minimum-cost routes.

### Core Concepts

**Topological Sort (Kahn's Algorithm — BFS)**:
1. Compute in-degree for every node
2. Add all nodes with in-degree 0 to a queue
3. While queue not empty: dequeue node, add to result, decrement in-degree of neighbors
4. If neighbor's in-degree becomes 0, add to queue
5. If result length < V, there's a cycle

Classic use: course prerequisites, build systems, task scheduling.

**Dijkstra's Algorithm**: Shortest path from source to all nodes in a weighted graph (non-negative weights). Use a min-heap. Greedy: always process the closest unvisited node. O((V + E) log V) with a binary heap.

**Bellman-Ford**: Handles negative weights. Relax all edges V-1 times. Detects negative cycles. O(V × E) — slower than Dijkstra but more general.

**Union-Find (Disjoint Set Union)**: Tracks connected components efficiently. \`find(x)\` returns the root of x's component. \`union(x, y)\` merges two components. With path compression and union by rank: nearly O(1) amortized per operation.

### Trade-offs

| Algorithm | Weights | Negative Edges | Time |
|-----------|---------|----------------|------|
| BFS | Unweighted | N/A | O(V + E) |
| Dijkstra | Non-negative | No | O((V+E) log V) |
| Bellman-Ford | Any | Yes (detects neg cycles) | O(V × E) |
| Topological Sort + relaxation | DAG only | Yes | O(V + E) |

### Interview Tip

If the problem mentions "prerequisites" or "dependencies" → topological sort. If "shortest path" with weights → Dijkstra. If you need to detect if adding an edge creates a cycle → Union-Find.

### Key Takeaways

- Topological sort works only on DAGs — use Kahn's (BFS) or DFS
- Dijkstra: greedy, min-heap, no negative weights
- Union-Find: near O(1) component operations — essential for "connected" problems
- Choose algorithm based on graph properties: weighted vs unweighted, DAG vs cyclic, negative edges
`,
  },
};
