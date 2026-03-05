-- LeetCode Tracker Schema
-- Run this in your Supabase SQL Editor

-- Enum types
CREATE TYPE question_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE question_status AS ENUM ('solved', 'attempted', 'revisit');

-- Questions table
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT,
  difficulty question_difficulty NOT NULL DEFAULT 'medium',
  topic TEXT NOT NULL,
  status question_status NOT NULL DEFAULT 'solved',
  notes TEXT,
  time_minutes INTEGER,
  language TEXT DEFAULT 'Python',
  leetcode_num INTEGER,
  solved_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily logs table
CREATE TABLE daily_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  questions_done INTEGER DEFAULT 0,
  topics_covered TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Indexes
CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_questions_solved_at ON questions(solved_at);
CREATE INDEX idx_questions_topic ON questions(topic);
CREATE INDEX idx_daily_logs_user_date ON daily_logs(user_id, date);

-- Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own questions"
  ON questions FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert own questions"
  ON questions FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update own questions"
  ON questions FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can delete own questions"
  ON questions FOR DELETE USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can view own daily_logs"
  ON daily_logs FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert own daily_logs"
  ON daily_logs FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update own daily_logs"
  ON daily_logs FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER questions_updated_at
  BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-populate daily_logs on question insert
CREATE OR REPLACE FUNCTION upsert_daily_log()
RETURNS TRIGGER AS $$
DECLARE
  solved_date DATE;
BEGIN
  solved_date := DATE(NEW.solved_at);
  INSERT INTO daily_logs (user_id, date, questions_done, topics_covered)
  VALUES (NEW.user_id, solved_date, 1, ARRAY[NEW.topic])
  ON CONFLICT (user_id, date)
  DO UPDATE SET
    questions_done = daily_logs.questions_done + 1,
    topics_covered = ARRAY(
      SELECT DISTINCT unnest(daily_logs.topics_covered || ARRAY[NEW.topic])
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_question_insert
  AFTER INSERT ON questions
  FOR EACH ROW EXECUTE FUNCTION upsert_daily_log();

-- ======================
-- System Design Tracking
-- ======================

CREATE TYPE design_status AS ENUM ('completed', 'in-progress', 'revisit');

CREATE TABLE system_designs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty question_difficulty NOT NULL DEFAULT 'medium',
  status design_status NOT NULL DEFAULT 'in-progress',
  notes TEXT,
  key_concepts TEXT[] DEFAULT '{}',
  time_minutes INTEGER,
  confidence INTEGER CHECK (confidence >= 1 AND confidence <= 5),
  studied_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_system_designs_user_id ON system_designs(user_id);
CREATE INDEX idx_system_designs_studied_at ON system_designs(studied_at);
CREATE INDEX idx_system_designs_topic ON system_designs(topic);

-- RLS
ALTER TABLE system_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own system_designs"
  ON system_designs FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert own system_designs"
  ON system_designs FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can update own system_designs"
  ON system_designs FOR UPDATE USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can delete own system_designs"
  ON system_designs FOR DELETE USING (auth.jwt() ->> 'sub' = user_id);

-- Auto-update updated_at
CREATE TRIGGER system_designs_updated_at
  BEFORE UPDATE ON system_designs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-populate daily_logs on system design insert
CREATE OR REPLACE FUNCTION upsert_daily_log_design()
RETURNS TRIGGER AS $$
DECLARE
  studied_date DATE;
BEGIN
  studied_date := DATE(NEW.studied_at);
  INSERT INTO daily_logs (user_id, date, questions_done, topics_covered)
  VALUES (NEW.user_id, studied_date, 1, ARRAY['SD: ' || NEW.topic])
  ON CONFLICT (user_id, date)
  DO UPDATE SET
    questions_done = daily_logs.questions_done + 1,
    topics_covered = ARRAY(
      SELECT DISTINCT unnest(daily_logs.topics_covered || ARRAY['SD: ' || NEW.topic])
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_design_insert
  AFTER INSERT ON system_designs
  FOR EACH ROW EXECUTE FUNCTION upsert_daily_log_design();