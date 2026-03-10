import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getDailyInsight } from "@/lib/gemini";

interface QuestionRow {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  status: string;
  solved_at: string;
  [key: string]: unknown;
}

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = supabaseAdmin;
  const { searchParams } = new URL(req.url);

  const dateParam = searchParams.get("date");
  const targetDate =
    dateParam ||
    (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return d.toISOString().split("T")[0];
    })();

  const startOfDay = `${targetDate}T00:00:00.000Z`;
  const endOfDay = `${targetDate}T23:59:59.999Z`;

  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .eq("user_id", userId)
    .gte("solved_at", startOfDay)
    .lte("solved_at", endOfDay)
    .order("solved_at", { ascending: true });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const q: QuestionRow[] = (questions as QuestionRow[]) || [];
  const topics: string[] = [...new Set(q.map((x: QuestionRow) => x.topic))];

  let insight: string | null = null;
  if (q.length > 0) {
    const withAi = searchParams.get("ai") !== "false";
    if (withAi) {
      try {
        const context = `Solved ${q.length} problems. Topics: ${topics.join(", ")}. Difficulties: ${q.map((x: QuestionRow) => x.difficulty).join(", ")}. Problems: ${q.map((x: QuestionRow) => x.title).join(", ")}.`;
        insight = await getDailyInsight(context);
      } catch {
        insight = null;
      }
    }
  }

  return NextResponse.json({
    date: targetDate,
    questions: q,
    total: q.length,
    topics,
    insight,
  });
}
