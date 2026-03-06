export const solution = {
  title: "Design Dropbox",
  content: `
## Design Dropbox

A cloud file storage and synchronization service that keeps files in sync across multiple devices.

### Functional Requirements

- Upload, download, and delete files
- Automatic sync across all user devices
- File versioning and conflict resolution
- Sharing files/folders with other users
- Offline editing with sync on reconnect

### Non-Functional Requirements

- Sync latency <5 seconds for small files
- Support files up to 50GB
- Efficient bandwidth usage (don't re-upload unchanged portions)
- High durability — never lose a user's file (99.999999999%)

### High-Level Architecture

**Client (Sync Agent) ↔ Sync Service ↔ Metadata DB + Block Storage (S3)**

The key insight: **chunked storage**. Don't store files as blobs — split them into fixed-size blocks (4MB). This enables deduplication and efficient delta sync.

### Deep Dives

**Block-Level Sync**: Split every file into 4MB chunks. Hash each chunk (SHA-256). Store chunks in S3 keyed by hash. Metadata DB maps: file_path → [chunk_hash_1, chunk_hash_2, ...].

When a file changes, only the modified chunks are re-uploaded. If you edit byte 100 of a 1GB file, only 1 chunk (4MB) is re-uploaded instead of the entire file.

**Deduplication**: If two users upload the same file (or same chunk), the hash is identical. Store only one copy. This dramatically reduces storage costs — common documents, photos, and libraries are heavily duplicated.

**Sync Protocol**:
1. Client detects local file change (file watcher)
2. Client chunks the file, computes hashes
3. Client sends hash list to sync service: "I have chunks A, B, C_new, D"
4. Server compares with stored hash list: "I already have A, B, D — send me C_new"
5. Client uploads only C_new
6. Server updates metadata, notifies other devices via long-poll/WebSocket
7. Other devices download only C_new

**Conflict Resolution**: If two devices edit the same file offline, both upload. Server keeps both versions. The later upload creates a "conflicted copy" with the device name and timestamp in the filename. User manually resolves.

**Metadata DB**: PostgreSQL with: files (id, user_id, path, chunk_hashes[], version, updated_at). Each edit increments the version. Version history enables file restoration.

### Scalability

- **S3** for block storage — infinite scale, 11 nines durability
- **Content-addressed storage** (hash as key) enables global deduplication
- **Metadata DB** sharded by user_id
- **Notification service** uses WebSocket + Redis Pub/Sub for real-time sync triggers
- **Upload/download** through CDN edge locations for reduced latency
`,
};
