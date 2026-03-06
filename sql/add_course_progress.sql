-- Course Progress Tracking (run after base schema)

CREATE TYPE lesson_status AS ENUM ('not-started', 'in-progress', 'completed');

CREATE TABLE lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  topic_slug TEXT NOT NULL,
  lesson_slug TEXT NOT NULL,
  status lesson_status NOT NULL DEFAULT 'not-started',
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, topic_slug, lesson_slug)
);

CREATE INDEX idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_topic ON lesson_progress(user_id, topic_slug);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lesson_progress"
  ON lesson_progress FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert own lesson_progress"
  ON lesson_progress FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update own lesson_progress"
  ON lesson_progress FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id);

CREATE TRIGGER lesson_progress_updated_at
  BEFORE UPDATE ON lesson_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();