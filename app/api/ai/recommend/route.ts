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

  // Fetch LeetCode questions
  const { data: questions, error: qError } = await supabase
    .from("questions")
    .select("title, difficulty, topic, status, solved_at")
    .eq("user_id", userId);

  if (qError)
    return NextResponse.json({ error: qError.message }, { status: 500 });

  // Fetch system designs
  const { data: designs, error: dError } = await supabase
    .from("system_designs")
    .select("title, difficulty, topic, status, confidence, studied_at")
    .eq("user_id", userId);

  if (dError)
    return NextResponse.json({ error: dError.message }, { status: 500 });

  const q = questions || [];
  const d = designs || [];

  // Build LeetCode context
  type LCStatus = "solved" | "attempted" | "revisit";
  const topicCounts: Record<
    string,
    { solved: number; attempted: number; revisit: number }
  > = {};
  q.forEach((x) => {
    if (!topicCounts[x.topic]) {
      topicCounts[x.topic] = { solved: 0, attempted: 0, revisit: 0 };
    }
    const status = x.status as LCStatus;
    topicCounts[x.topic][status]++;
  });

  const lcTopicSummary = Object.entries(topicCounts)
    .map(
      ([name, counts]) =>
        `${name}: ${counts.solved} solved, ${counts.attempted} attempted, ${counts.revisit} need revisit`,
    )
    .join("\n");

  const recentProblems = q
    .sort(
      (a, b) =>
        new Date(b.solved_at).getTime() - new Date(a.solved_at).getTime(),
    )
    .slice(0, 15)
    .map((x) => `${x.title} (${x.difficulty}, ${x.topic}, ${x.status})`)
    .join("\n");

  // Build system design context
  type SDStatus = "completed" | "in-progress" | "revisit";
  const sdTopicCounts: Record<
    string,
    { completed: number; "in-progress": number; revisit: number }
  > = {};
  d.forEach((x) => {
    if (!sdTopicCounts[x.topic]) {
      sdTopicCounts[x.topic] = {
        completed: 0,
        "in-progress": 0,
        revisit: 0,
      };
    }
    const status = x.status as SDStatus;
    sdTopicCounts[x.topic][status]++;
  });

  const sdTopicSummary = Object.entries(sdTopicCounts)
    .map(
      ([name, counts]) =>
        `${name}: ${counts.completed} completed, ${counts["in-progress"]} in progress, ${counts.revisit} need revisit`,
    )
    .join("\n");

  const recentDesigns = d
    .sort(
      (a, b) =>
        new Date(b.studied_at).getTime() - new Date(a.studied_at).getTime(),
    )
    .slice(0, 10)
    .map(
      (x) =>
        `${x.title} (${x.difficulty}, ${x.topic}, ${x.status}, confidence: ${x.confidence || "unrated"}/5)`,
    )
    .join("\n");

  const avgConfidence =
    d.length > 0
      ? (
          d.reduce((sum, x) => sum + (x.confidence || 0), 0) /
          d.filter((x) => x.confidence).length
        ).toFixed(1)
      : "N/A";

  const context = `
=== LEETCODE PROGRESS ===
Total problems attempted: ${q.length}
Total solved: ${q.filter((x) => x.status === "solved").length}

Topic Progress:
${lcTopicSummary || "No LeetCode problems logged yet."}

Recent 15 problems:
${recentProblems || "None"}

=== SYSTEM DESIGN PROGRESS ===
Total designs studied: ${d.length}
Completed: ${d.filter((x) => x.status === "completed").length}
Average confidence: ${avgConfidence}/5

Topic Progress:
${sdTopicSummary || "No system designs logged yet."}

Recent 10 designs:
${recentDesigns || "None"}
  `.trim();

  try {
    const raw = await getAIRecommendations(context);
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
