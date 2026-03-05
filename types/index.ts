export type Difficulty = "easy" | "medium" | "hard";
export type Status = "solved" | "attempted" | "revisit";

export interface Question {
  id: string;
  user_id: string;
  title: string;
  slug: string | null;
  difficulty: Difficulty;
  topic: string;
  status: Status;
  notes: string | null;
  time_minutes: number | null;
  language: string | null;
  leetcode_num: number | null;
  solved_at: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionInsert {
  title: string;
  slug?: string;
  difficulty: Difficulty;
  topic: string;
  status?: Status;
  notes?: string;
  time_minutes?: number;
  language?: string;
  leetcode_num?: number;
  solved_at?: string;
}

export interface DailyLog {
  id: string;
  user_id: string;
  date: string;
  questions_done: number;
  topics_covered: string[];
  notes: string | null;
  created_at: string;
}

export interface Stats {
  total_solved: number;
  total_attempted: number;
  total_revisit: number;
  easy_count: number;
  medium_count: number;
  hard_count: number;
  current_streak: number;
  longest_streak: number;
  topics: TopicStat[];
}

export interface TopicStat {
  topic: string;
  solved: number;
}

export interface DailyReview {
  date: string;
  questions: Question[];
  total: number;
  topics: string[];
}

export interface AIRecommendation {
  topic: string;
  reason: string;
  suggested_questions: string[];
  priority: "high" | "medium" | "low";
}

// System Design
export type DesignStatus = "completed" | "in-progress" | "revisit";

export interface SystemDesign {
  id: string;
  user_id: string;
  title: string;
  topic: string;
  difficulty: Difficulty;
  status: DesignStatus;
  notes: string | null;
  key_concepts: string[];
  time_minutes: number | null;
  confidence: number | null;
  studied_at: string;
  created_at: string;
  updated_at: string;
}

export interface SystemDesignInsert {
  title: string;
  topic: string;
  difficulty: Difficulty;
  status?: DesignStatus;
  notes?: string;
  key_concepts?: string[];
  time_minutes?: number;
  confidence?: number;
  studied_at?: string;
}
