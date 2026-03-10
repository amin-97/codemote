import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// GET — fetch all questions for user
export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = supabaseAdmin;
  const { searchParams } = new URL(req.url);

  let query = supabase
    .from("questions")
    .select("*")
    .eq("user_id", userId)
    .order("solved_at", { ascending: false });

  const topic = searchParams.get("topic");
  if (topic) query = query.eq("topic", topic);

  const difficulty = searchParams.get("difficulty");
  if (difficulty) query = query.eq("difficulty", difficulty);

  const status = searchParams.get("status");
  if (status) query = query.eq("status", status);

  const limit = searchParams.get("limit");
  if (limit) query = query.limit(parseInt(limit));

  const { data, error } = await query;

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — add a new question
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const supabase = supabaseAdmin;

  const { data, error } = await supabase
    .from("questions")
    .insert({ ...body, user_id: userId })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// PUT — update a question
export async function PUT(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id)
    return NextResponse.json({ error: "Missing question ID" }, { status: 400 });

  const supabase = supabaseAdmin;

  const { data, error } = await supabase
    .from("questions")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE — remove a question
export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "Missing question ID" }, { status: 400 });

  const supabase = supabaseAdmin;

  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
