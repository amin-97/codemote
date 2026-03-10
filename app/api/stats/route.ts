import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

interface QuestionRow {
  status: string;
  difficulty: string;
  topic: string;
}

interface DailyLogRow {
  date: string;
  questions_done: number;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = supabaseAdmin;

  const { data: questions, error: qError } = await supabase
    .from("questions")
    .select("*")
    .eq("user_id", userId);

  if (qError)
    return NextResponse.json({ error: qError.message }, { status: 500 });

  const { data: logs, error: lError } = await supabase
    .from("daily_logs")
    .select("date, questions_done")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (lError)
    return NextResponse.json({ error: lError.message }, { status: 500 });

  const q: QuestionRow[] = (questions as QuestionRow[]) || [];
  const dailyLogs: DailyLogRow[] = (logs as DailyLogRow[]) || [];

  // Counts by status
  const total_solved = q.filter(
    (x: QuestionRow) => x.status === "solved",
  ).length;
  const total_attempted = q.filter(
    (x: QuestionRow) => x.status === "attempted",
  ).length;
  const total_revisit = q.filter(
    (x: QuestionRow) => x.status === "revisit",
  ).length;

  // Counts by difficulty
  const easy_count = q.filter(
    (x: QuestionRow) => x.difficulty === "easy",
  ).length;
  const medium_count = q.filter(
    (x: QuestionRow) => x.difficulty === "medium",
  ).length;
  const hard_count = q.filter(
    (x: QuestionRow) => x.difficulty === "hard",
  ).length;

  // Streak calculation
  let current_streak = 0;
  let longest_streak = 0;

  if (dailyLogs.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dates: number[] = dailyLogs.map((l: DailyLogRow) => {
      const d = new Date(l.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    });

    const uniqueDates: number[] = [...new Set(dates)].sort(
      (a: number, b: number) => b - a,
    );

    const todayTime = today.getTime();
    const yesterdayTime = todayTime - 86400000;

    if (uniqueDates[0] === todayTime || uniqueDates[0] === yesterdayTime) {
      current_streak = 1;
      for (let i = 1; i < uniqueDates.length; i++) {
        if (uniqueDates[i - 1] - uniqueDates[i] === 86400000) {
          current_streak++;
        } else {
          break;
        }
      }
    }

    let tempStreak = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      if (uniqueDates[i - 1] - uniqueDates[i] === 86400000) {
        tempStreak++;
      } else {
        longest_streak = Math.max(longest_streak, tempStreak);
        tempStreak = 1;
      }
    }
    longest_streak = Math.max(longest_streak, tempStreak);
  }

  // Topics progress — dynamic from user's data
  const topicCounts: Record<string, number> = {};
  q.forEach((x: QuestionRow) => {
    if (x.status === "solved") {
      topicCounts[x.topic] = (topicCounts[x.topic] || 0) + 1;
    }
  });

  const topics = Object.entries(topicCounts).map(
    ([topic, solved]: [string, number]) => ({
      topic,
      solved,
    }),
  );

  // Heatmap data
  const heatmap: Record<string, number> = {};
  dailyLogs.forEach((l: DailyLogRow) => {
    heatmap[l.date] = l.questions_done;
  });

  return NextResponse.json({
    total_solved,
    total_attempted,
    total_revisit,
    easy_count,
    medium_count,
    hard_count,
    current_streak,
    longest_streak,
    topics,
    heatmap,
  });
}
