import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NEETCODE_TOPICS } from "@/lib/constants";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createClient(cookies());

  // Fetch all questions
  const { data: questions, error: qError } = await supabase
    .from("questions")
    .select("*")
    .eq("user_id", userId);

  if (qError)
    return NextResponse.json({ error: qError.message }, { status: 500 });

  // Fetch daily logs for streak calculation
  const { data: logs, error: lError } = await supabase
    .from("daily_logs")
    .select("date, questions_done")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (lError)
    return NextResponse.json({ error: lError.message }, { status: 500 });

  const q = questions || [];
  const dailyLogs = logs || [];

  // Counts by status
  const total_solved = q.filter((x) => x.status === "solved").length;
  const total_attempted = q.filter((x) => x.status === "attempted").length;
  const total_revisit = q.filter((x) => x.status === "revisit").length;

  // Counts by difficulty
  const easy_count = q.filter((x) => x.difficulty === "easy").length;
  const medium_count = q.filter((x) => x.difficulty === "medium").length;
  const hard_count = q.filter((x) => x.difficulty === "hard").length;

  // Streak calculation
  let current_streak = 0;
  let longest_streak = 0;

  if (dailyLogs.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dates = dailyLogs.map((l) => {
      const d = new Date(l.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    });

    const uniqueDates = [...new Set(dates)].sort((a, b) => b - a);

    // Check if today or yesterday has activity
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

    // Longest streak
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

  // Topics progress
  const topicCounts: Record<string, number> = {};
  q.forEach((x) => {
    if (x.status === "solved") {
      topicCounts[x.topic] = (topicCounts[x.topic] || 0) + 1;
    }
  });

  const topics = NEETCODE_TOPICS.map((t) => ({
    topic: t.name,
    solved: topicCounts[t.name] || 0,
    total: t.total,
  }));

  // Heatmap data (last 365 days)
  const heatmap: Record<string, number> = {};
  dailyLogs.forEach((l) => {
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
