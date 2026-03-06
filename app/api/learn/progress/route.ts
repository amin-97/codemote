import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// GET — fetch all lesson progress for user
export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createClient(cookies());
  const { searchParams } = new URL(req.url);

  let query = supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId);

  const topicSlug = searchParams.get("topic");
  if (topicSlug) query = query.eq("topic_slug", topicSlug);

  const { data, error } = await query;

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — upsert lesson progress
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { topic_slug, lesson_slug, status, notes } = body;

  if (!topic_slug || !lesson_slug)
    return NextResponse.json({ error: "Missing slugs" }, { status: 400 });

  const supabase = createClient(cookies());

  const updates: Record<string, unknown> = { status };
  if (notes !== undefined) updates.notes = notes;
  if (status === "completed") updates.completed_at = new Date().toISOString();

  // Try to update existing
  const { data: existing } = await supabase
    .from("lesson_progress")
    .select("id")
    .eq("user_id", userId)
    .eq("topic_slug", topic_slug)
    .eq("lesson_slug", lesson_slug)
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from("lesson_progress")
      .update(updates)
      .eq("id", existing.id)
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  // Insert new
  const { data, error } = await supabase
    .from("lesson_progress")
    .insert({
      user_id: userId,
      topic_slug,
      lesson_slug,
      ...updates,
    })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
