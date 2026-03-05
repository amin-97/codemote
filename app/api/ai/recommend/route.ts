import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getAIRecommendations } from "@/lib/gemini";

export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createClient(cookies());

  const { data: questions, error } = await supabase
    .from("questions")
    .select("title, difficulty, topic, status, solved_at")
    .eq("user_id", userId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const q = questions || [];

  // Build context for Gemini
  type StatusKey = "solved" | "attempted" | "revisit";
  const topicCounts: Record<
    string,
    { solved: number; attempted: number; revisit: number }
  > = {};
  q.forEach((x) => {
    if (!topicCounts[x.topic]) {
      topicCounts[x.topic] = { solved: 0, attempted: 0, revisit: 0 };
    }
    const status = x.status as StatusKey;
    topicCounts[x.topic][status]++;
  });

  const topicSummary = Object.entries(topicCounts)
    .map(([name, counts]) => {
      return `${name}: ${counts.solved} solved, ${counts.attempted} attempted, ${counts.revisit} need revisit`;
    })
    .join("\n");

  const recentProblems = q
    .sort(
      (a, b) =>
        new Date(b.solved_at).getTime() - new Date(a.solved_at).getTime(),
    )
    .slice(0, 20)
    .map((x) => `${x.title} (${x.difficulty}, ${x.topic}, ${x.status})`)
    .join("\n");

  const context = `
Total problems attempted: ${q.length}
Total solved: ${q.filter((x) => x.status === "solved").length}

Topic Progress:
${topicSummary}

Recent 20 problems:
${recentProblems || "No problems logged yet."}
  `.trim();

  try {
    const raw = await getAIRecommendations(context);
    // Clean up response — strip markdown fences if present
    const cleaned = raw
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const parsed = JSON.parse(cleaned);
    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to generate recommendations", detail: String(e) },
      { status: 500 },
    );
  }
}
