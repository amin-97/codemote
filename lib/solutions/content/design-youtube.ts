export const solution = {
  title: "Design YouTube",
  content: `
## Design YouTube

A video sharing platform for uploading, processing, streaming, and discovering video content at global scale.

### Functional Requirements

- Upload videos (up to 12 hours)
- Stream/playback with adaptive quality
- Search videos by title, description, tags
- Recommendations and trending
- Like, comment, subscribe
- Video processing (transcoding to multiple resolutions)

### Non-Functional Requirements

- 500 hours of video uploaded per minute
- 1B hours watched per day
- Global low-latency playback (<2 second start time)
- High availability (99.99%)

### High-Level Architecture

**Upload Pipeline**: Client → Upload Service → Object Storage → Transcoding Pipeline (Kafka + Workers) → CDN

**Playback Pipeline**: Client → CDN → Origin (S3) → Adaptive Bitrate Streaming

### Deep Dives

**Video Transcoding Pipeline**: Raw uploaded video must be transcoded into multiple formats and resolutions (1080p, 720p, 480p, 360p) and codecs (H.264, VP9, AV1). This is massively CPU-intensive.

1. Upload lands in S3 raw bucket
2. Upload service publishes \`VideoUploaded\` event to Kafka
3. Transcoding workers (GPU instances) pull jobs, transcode in parallel (one worker per resolution)
4. Each output chunk uploaded to S3 processed bucket
5. On completion → update metadata DB, make video available

**Adaptive Bitrate Streaming (ABR)**: Video is split into small segments (2-10 seconds each). Each segment available in multiple qualities. Client downloads a manifest file (HLS/DASH) listing all segments and qualities. Client dynamically switches quality based on bandwidth — buffering is minimized.

**CDN Strategy**: Most views are for a small percentage of videos (Pareto distribution). Popular videos cached at CDN edge locations globally. Long-tail videos served from origin (S3 in the nearest region). Pre-warm CDN for trending/viral content.

**Recommendation Engine**: Collaborative filtering (users who watched X also watched Y) + content-based (similar tags, categories). Train ML models on watch history, engagement signals (watch time, likes, shares). Serve recommendations from a pre-computed cache, refreshed hourly.

**Search**: Elasticsearch index on title, description, tags, captions (auto-generated via speech-to-text). Rank by relevance + engagement signals + freshness.

### Scalability

- **Transcoding** is the biggest compute cost — use spot/preemptible instances, parallelize across resolutions
- **CDN** handles 90%+ of playback traffic
- **S3** for video storage — petabytes of content
- **Metadata DB** sharded by video_id, replicated for read scale
- **Kafka** decouples upload from processing — handles upload spikes gracefully
`,
};
