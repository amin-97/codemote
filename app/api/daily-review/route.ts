import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getDailyInsight } from "@/lib/gemini";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createClient(cookies());
  const { searchParams } = new URL(req.url);

  // Default to yesterday
  const dateParam = searchParams.get("date");
  const targetDate =
    dateParam ||
    (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return d.toISOString().split("T")[0];
    })();

  // Get questions solved on that day
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

  const q = questions || [];
  const topics = [...new Set(q.map((x) => x.topic))];

  // Generate AI insight if there are questions
  let insight = null;
  if (q.length > 0) {
    const withAi = searchParams.get("ai") !== "false";
    if (withAi) {
      try {
        const context = `Solved ${q.length} problems. Topics: ${topics.join(", ")}. Difficulties: ${q.map((x) => x.difficulty).join(", ")}. Problems: ${q.map((x) => x.title).join(", ")}.`;
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
