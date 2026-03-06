export const solution = {
  title: "Design WhatsApp",
  content: `
## Design WhatsApp

A real-time messaging system supporting 1-on-1 chats, group messaging, media sharing, and online presence indicators.

### Functional Requirements

- 1-on-1 messaging with delivery/read receipts
- Group chats (up to 1024 members)
- Media sharing (images, videos, documents)
- Online/offline presence and "last seen"
- End-to-end encryption
- Message history and sync across devices

### Non-Functional Requirements

- Message delivery latency <200ms when both users online
- Support 2B+ users, 100B+ messages/day
- Messages must never be lost (durability)
- Offline message delivery when user comes back online

### High-Level Architecture

**Client ↔ WebSocket Gateway ↔ Chat Service → Message Queue → Message Store**

Persistent WebSocket connections are the foundation. Each connected client maintains a long-lived connection to a gateway server.

### Deep Dives

**Connection Management**: Each user maintains a WebSocket to a gateway server. A connection registry (Redis) maps user_id → gateway_server_id. To send a message to user B: look up B's gateway server, route the message there, push via WebSocket. If B is offline, store in an offline queue.

**Message Flow**:
1. User A sends message → A's gateway receives it
2. Gateway writes to message store (Cassandra — write-optimized, partitioned by chat_id)
3. Gateway looks up B's connection → route to B's gateway → push to B
4. B's client sends delivery receipt → routed back to A
5. If B is offline → message stored in offline queue → delivered on reconnect

**Group Messaging**: For a group of N members, the chat service fans out the message to N-1 recipients. For large groups, use a message queue to handle fan-out asynchronously. Each member's copy references the same message content (no duplication of media).

**End-to-End Encryption**: Signal Protocol. Each client generates a public/private key pair. Messages are encrypted with the recipient's public key on the sender's device. The server never sees plaintext — it only routes encrypted blobs.

**Presence System**: Lightweight heartbeat every 30 seconds over the WebSocket. If no heartbeat received within 60 seconds → mark offline. Store presence in Redis with TTL. "Last seen" = timestamp of last heartbeat.

**Media**: Upload to S3/object storage, generate a URL. Send the URL in the message body. Recipient's client downloads from CDN. Thumbnails generated server-side for preview.

### Scalability

- **WebSocket gateways** scale horizontally — each handles ~500K connections
- **Cassandra** for message storage — excellent write throughput, partitioned by conversation_id
- **Redis cluster** for connection registry and presence
- **Kafka** for async fan-out in group messages
- **Shard by user_id** for connection routing and offline queues
`,
};
