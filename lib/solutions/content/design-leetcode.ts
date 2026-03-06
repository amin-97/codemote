export const solution = {
  title: "Design LeetCode",
  content: `
## Design LeetCode

A coding contest platform where users solve coding questions, submit solutions, and compete in timed contests.

### Functional Requirements

- Users browse problem descriptions with examples and constraints
- Users submit code solutions and run against test cases
- Support for multiple programming languages
- Timed coding contests (2 hours, 4 problems)
- Real-time leaderboard during contests
- Editorial solutions and discussion forums

### Non-Functional Requirements

- Low-latency code execution (<5 seconds per submission)
- Support 100K+ concurrent users during contests
- Sandboxed code execution (security)
- Fair contest scoring (no cheating)

### API Design

\`\`\`
GET    /problems                    → List problems (paginated, filterable)
GET    /problems/:id                → Problem detail with description
POST   /submissions                 → Submit code { problem_id, language, code }
GET    /submissions/:id/result      → Submission result (polling or websocket)
GET    /contests/:id                → Contest details
GET    /contests/:id/leaderboard    → Real-time leaderboard
POST   /contests/:id/submit         → Contest submission
\`\`\`

### High-Level Architecture

**Client → API Gateway → Problem Service / Submission Service / Contest Service**

The key insight is separating the **submission pipeline** from the rest of the system. Code execution is CPU-intensive and unpredictable — it must be isolated.

**Submission Flow:**
1. User submits code → API writes to Submissions DB with status "pending"
2. Submission pushed to a **Job Queue** (Kafka/SQS)
3. **Judge Workers** pull from queue, execute in sandboxed containers
4. Worker runs code against test cases, writes results back to DB
5. Client polls or receives WebSocket notification with results

### Data Model

**problems**: id, title, slug, description, difficulty, constraints, examples (JSON), test_cases (JSON, hidden), editorial, tags

**submissions**: id, user_id, problem_id, language, code, status (pending/running/accepted/wrong_answer/TLE/MLE), runtime_ms, memory_kb, created_at

**contests**: id, title, start_time, end_time, duration_minutes, problem_ids

**contest_submissions**: id, contest_id, user_id, problem_id, submission_id, points, penalty_time

### Deep Dives

**Code Execution Sandbox**: Each submission runs in an isolated Docker container (or Firecracker microVM). Resource limits: CPU time, memory, network (disabled), file system (read-only). The container is destroyed after execution. This prevents malicious code from affecting the system.

**Judge Workers**: Stateless workers that pull from the queue. Auto-scale based on queue depth. Each worker runs the user's code against all test cases sequentially, comparing output with expected results. Time limit per test case (e.g., 2 seconds).

**Contest Leaderboard**: During a contest, maintain a sorted set in Redis keyed by contest_id. Score = problems solved × 1000 - total penalty time. Use Redis ZADD for atomic score updates and ZREVRANGE for top-N queries. Broadcast updates via WebSocket to connected clients.

**Language Support**: Pre-built Docker images per language (Python, Java, C++, etc.). The submission service selects the correct image based on the language field. Compilation happens inside the container.

### Scalability

- **Judge workers** are the bottleneck — scale horizontally based on queue depth
- **Problem/editorial data** is read-heavy → cache aggressively in Redis/CDN
- **Contest leaderboard** uses Redis sorted sets for O(log N) updates
- **WebSocket connections** for real-time results — use a pub/sub layer (Redis Pub/Sub) so any API server can push to any connected client
- Rate limit submissions to prevent abuse (e.g., 10 per minute per user)
`,
};
