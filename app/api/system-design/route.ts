import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// GET — fetch all system designs for user
export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createClient(cookies());
  const { searchParams } = new URL(req.url);

  let query = supabase
    .from("system_designs")
    .select("*")
    .eq("user_id", userId)
    .order("studied_at", { ascending: false });

  const topic = searchParams.get("topic");
  if (topic) query = query.eq("topic", topic);

  const difficulty = searchParams.get("difficulty");
  if (difficulty) query = query.eq("difficulty", difficulty);

  const status = searchParams.get("status");
  if (status) query = query.eq("status", status);

  const { data, error } = await query;

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — add a new system design
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("system_designs")
    .insert({ ...body, user_id: userId })
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// PUT — update a system design
export async function PUT(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id)
    return NextResponse.json({ error: "Missing design ID" }, { status: 400 });

  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("system_designs")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE — remove a system design
export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "Missing design ID" }, { status: 400 });

  const supabase = createClient(cookies());

  const { error } = await supabase
    .from("system_designs")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
